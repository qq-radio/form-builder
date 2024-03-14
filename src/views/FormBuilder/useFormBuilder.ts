import type { FormItem } from './types/form'

import { useDebounceFn } from '@vueuse/core'
import { updateObjectByKeyPath } from '@/utils'
import { isArray, isFunction, isNumber } from '@/utils'

type State = {
  formId: string
  detail: globalThis.Ref<{
    id: string
    formName: string
    formItemList: FormItem[]
  }>
  form: globalThis.Ref<FormItem[]>
  activeFormItemId: globalThis.Ref<string | undefined>
  isShowViewRecordButton?: boolean
  viewRecordConfig?: {
    routeName: string
  }
  detailApi?: Function
  createApi?: Function
  updateApi?: Function
  deleteApi?: Function
  sortApi?: Function
}

type CreateFormItemParams = {
  isPush?: boolean
} & FormItem

type UpdateFormItemParams = {
  formItemId: string
  key: any
  value: any
}

type DeleteFormItemParams = {
  formItemId: string
}

type SortFormItemParams = {
  formItemId: string
  beforePosition: string | number | undefined
  afterPosition: string | number | undefined
}

const state: State = {
  formId: '',
  detail: ref({
    id: '',
    formName: '',
    formItemList: []
  }),
  form: ref([]),
  activeFormItemId: ref(),
  isShowViewRecordButton: true
}

export function useFormBuilder() {
  const getForm = computed({
    get() {
      return state.form.value.map(addSequence)
    },
    set(value) {
      state.form.value = value
    }
  })

  const getFormDetail = computed(() => state.detail.value)

  const getActiveFormItem = computed(() =>
    getForm.value.find((formItem) => formItem.formItemId === state.activeFormItemId.value)
  )

  const getViewRecordConfig = computed(() => state.viewRecordConfig)

  function setFormId(formId: string) {
    state.formId = formId
    queryDetail()
  }

  function setApi(api: Partial<State>) {
    state.detailApi = api.detailApi
    state.createApi = api.createApi
    state.updateApi = api.updateApi
    state.deleteApi = api.deleteApi
    state.sortApi = api.sortApi
  }

  function setActiveFormItemId(formItemId: string) {
    state.activeFormItemId.value = formItemId
  }

  async function queryDetail() {
    let detail

    if (isFunction(state.detailApi)) {
      const apiParams = {
        formId: state.formId
      }
      detail = await state.detailApi(apiParams)
    }

    state.detail.value = detail
    state.form.value = isArray(detail.formItemList) ? detail.formItemList.map(addSequence) : []
  }

  async function createFormItem(itemParams: CreateFormItemParams, insertIndex?: number) {
    let sort
    if (isFunction(state.createApi)) {
      const apiParams = {
        ...itemParams,
        formId: state.formId
      }
      const res = await state.createApi(apiParams)
      sort = res.sort
    }

    const { isPush, ...restParams } = itemParams
    if (isPush) {
      isNumber(insertIndex)
        ? state.form.value.splice(insertIndex, 0, { ...restParams, sort })
        : state.form.value.push({ ...restParams, sort })
    } else {
      const formItemIndex = findFormItemIndex(itemParams.formItemId)
      state.form.value.splice(formItemIndex, 1, { ...restParams, sort })
    }
    setActiveFormItemId(itemParams.formItemId)
  }

  const updatingQueue = new Map()

  async function setUpdateTask(formItem: FormItem) {
    updatingQueue.set(formItem.formItemId, formItem)
    debounceUpdateTask()
  }

  const debounceUpdateTask = useDebounceFn(executeUpdateTask, 1000)

  async function executeUpdateTask() {
    const promises = <any>[]

    if (isFunction(state.updateApi)) {
      updatingQueue.forEach((value) => {
        const apiParams = {
          ...value,
          formId: state.formId
        }
        if (state.updateApi) {
          promises.push(state.updateApi(apiParams))
        }
      })
    }

    await Promise.all(promises)
    updatingQueue.clear()
  }

  async function updateFormItem(itemParams: UpdateFormItemParams) {
    const { formItemId, key, value } = itemParams
    const formItemIndex = findFormItemIndex(formItemId)
    const updatingFormItem = updateObjectByKeyPath(getForm.value[formItemIndex], key, value)
    state.form.value.splice(formItemIndex, 1, updatingFormItem)
    setUpdateTask(updatingFormItem)
    setActiveFormItemId(itemParams.formItemId)
  }

  async function deleteFormItem(itemParams: DeleteFormItemParams) {
    const { formItemId } = itemParams
    if (isFunction(state.deleteApi)) {
      const apiParams = {
        formItemId,
        formId: state.formId
      }
      await state.deleteApi(apiParams)
    }
    const formItemIndex = findFormItemIndex(formItemId)
    state.form.value.splice(formItemIndex, 1)
  }

  async function sortFormItem(itemParams: SortFormItemParams, shouldCallUpdateApi?: boolean) {
    let sort
    if (getForm.value.length === 1) {
      return
    }
    if (isFunction(state.sortApi)) {
      const apiParams = {
        ...itemParams,
        formId: state.formId
      }
      const res = await state.sortApi(apiParams)
      sort = res.sort
    }
    const formItemIndex = findFormItemIndex(itemParams.formItemId)
    const formItem = getForm.value[formItemIndex]
    const sortedFormItem = { ...formItem, sort }
    state.form.value.splice(formItemIndex, 1, sortedFormItem)
    if (shouldCallUpdateApi) {
      if (isFunction(state.updateApi)) {
        const apiParams = {
          ...sortedFormItem,
          formId: state.formId
        }
        state.updateApi(apiParams)
      }
    }
  }

  function getInsertIndexAfterActive() {
    return getActiveFormItem.value ? findFormItemIndex(getActiveFormItem.value.formItemId) + 1 : 0
  }

  function findFormItemIndex(formItemId: string) {
    return getForm.value.findIndex((item) => item.formItemId === formItemId)
  }

  function excludeSelf() {
    return getForm.value.filter(
      (formItem) => formItem.formItemId !== getActiveFormItem.value?.formItemId
    )
  }

  function addSequence(formItem: FormItem, index: number) {
    return {
      ...formItem,
      sequence: index + 1
    }
  }

  return {
    getForm,
    getFormDetail,
    getActiveFormItem,
    getViewRecordConfig,
    setFormId,
    setApi,
    setActiveFormItemId,
    createFormItem,
    updateFormItem,
    deleteFormItem,
    sortFormItem,
    excludeSelf,
    findFormItemIndex,
    getInsertIndexAfterActive
  }
}

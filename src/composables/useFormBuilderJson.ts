import { useWidget } from '@/composables/useWidget'
import type { WidgetType } from '@/types/widget'
import type { FormItem, SelectOptionType, SchemeOption } from '@/types/form'
import { getTimestamp } from '@/utils/time'
import { clone } from 'remeda'

const { getWidgetConfig } = useWidget()

function getRandomSixDigitNumber() {
  return Math.floor(Math.random() * 900000) + 100000
}

function getUniqueId(type: WidgetType | SelectOptionType): string {
  const timestamp = getTimestamp()
  const number = getRandomSixDigitNumber()
  return `${type}${timestamp}_${number}`
}

export function createSelectOptionItemJson(optionType: SelectOptionType): SchemeOption {
  const optionItem = {
    optionId: getUniqueId(optionType),
    label: ''
  }
  return optionItem
}

export function createFormItemJson(type: WidgetType): FormItem {
  const component = getWidgetConfig(type)?.formConfig.valueComponent
  const formItemJson = {
    type,
    component,
    formItemId: getUniqueId(type),
    label: '',
    required: true
  } as FormItem
  const isSelect = component === 'ValueItemSelect'
  if (isSelect) {
    const optionItemName = `${type}_OPTION` as SelectOptionType
    formItemJson.scheme = {
      options: [createSelectOptionItemJson(optionItemName)]
    }
  }
  return formItemJson
}

export function copyFormItemJson(formItem: FormItem): FormItem {
  const copiedFormItem = clone(formItem)
  copiedFormItem.formItemId = getUniqueId(copiedFormItem.type)
  return copiedFormItem
}

export function copyFormJson(formDatas: FormItem[], formId: string): FormItem[] {
  return formDatas.map((formItem) => {
    const { type, ...rest } = formItem
    const copiedFormItem = {
      ...rest,
      formItemId: getUniqueId(type),
      type,
      scheme: {},
      formId
    }

    const schemeOptions = formItem.scheme?.options || []
    if (schemeOptions.length) {
      copiedFormItem.scheme = {
        options: schemeOptions.map((option) => ({
          ...option,
          optionId: getUniqueId(type === 'RADIO' ? 'RADIO_OPTION' : 'SELECT_OPTION')
        }))
      }
    }

    return copiedFormItem
  })
}

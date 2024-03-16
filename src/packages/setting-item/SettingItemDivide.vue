<template>
  <div class="flex items-center justify-end">
    <img class="mr-1 h-6 w-6" v-if="isHasDivideSetting" :src="ImageSuccess" />
    <a-button class="w-20" type="primary" @click="openModal">去设置</a-button>
    <a-modal title="设置相除函数" :visible="isVisible" :width="640" :closable="false" :keyboard="false" @ok="onOk" @cancel="onClose">
      <div class="flex justify-center px-6 py-4">
        <div class="w-2/4">
          <div class="mb-2">请选择除数题目</div>
          <div class="inline-block">
            <a-radio-group v-model:value="divideObjectInput.divisorFormItemId" :options="divisorOptions" />
          </div>
        </div>
        <div class="w-2/4">
          <div class="mb-2">请选择被除数题目</div>
          <div class="inline-block">
            <a-radio-group v-model:value="divideObjectInput.dividendFormItemId" :options="dividendOptions" />
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import type { SchemeDivideObject, RadioOption, FormItem } from '@/types/form'
import { useFormBuilder } from '@/composables/useFormBuilder'
import ImageSuccess from '@/assets/success.png'

import { clone } from 'remeda'

const emits = defineEmits(['update'])

const { getActiveFormItem, excludeSelf } = useFormBuilder()

const isVisible = ref<boolean>(false)
let divisorOptions: RadioOption[] = []
let dividendOptions: RadioOption[] = []

const defaultDivideObjectValue = {
  divisorFormItemId: '',
  dividendFormItemId: ''
}
const divideObjectInput = ref<SchemeDivideObject>(defaultDivideObjectValue)
const isHasDivideSetting = computed(() => {
  const divideObject = getActiveFormItem.value?.scheme?.divideObject
  return divideObject?.divisorFormItemId && divideObject?.dividendFormItemId
})

const formDatasToRadioOptions = (formDatas: FormItem[]) => {
  return formDatas?.map((formItem) => ({
    label: `${formItem.sequence}.${formItem.label}`,
    value: formItem.formItemId
  }))
}

const openModal = () => {
  isVisible.value = true
  const formDatas = excludeSelf()
  const radioOptions = formDatasToRadioOptions(formDatas)
  divisorOptions = clone(radioOptions)
  dividendOptions = clone(radioOptions)
  divideObjectInput.value = clone(getActiveFormItem.value?.scheme?.divideObject || defaultDivideObjectValue)
}

const onOk = async () => {
  const divideObject = divideObjectInput.value
  emits('update', divideObject)
  onClose()
}

const onClose = () => {
  isVisible.value = false
}
</script>

<style lang="less" scoped>
.ant-radio-group {
  display: flex;
  flex-direction: column;
}
</style>

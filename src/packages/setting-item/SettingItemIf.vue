<template>
  <div class="flex items-center justify-end">
    <img class='w-6 h-6 mr-1' v-if="isHasIfSetting" :src="ImageSuccess" />
    <a-button class="w-20" type="primary" @click="openModal">去设置</a-button>
    <a-modal title="设置逻辑判断" :visible="isVisible" :width="640" :closable="false" :keyboard="false" @ok="onOk"
             @cancel="onClose">
      <div class="flex px-6 py-4">
        <div class="w-2/4">
          <div class="mb-2">当用户选择本题选项:</div>
          <div class="flex">
            <a-radio-group v-model:value="ifObjectInput.optionId" :options="ifOptions" />
          </div>
        </div>
        <div class="w-2/4">
          <div class="mb-2">则显示以下题目, 否则隐藏题目</div>
          <div class="flex">
            <a-checkbox-group v-model:value="ifObjectInput.checkedFormItemIds" :options="ifFormOptions"
                              name="checkboxgroup" />
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import type { SchemeIfObject, RadioOption, CheckboxOption } from '@/types/form';
import { useFormBuilder } from '@/composables/useFormBuilder';
import { clone } from 'remeda'
import ImageSuccess from '@/assets/success.png';

const emits = defineEmits(['update']);

const {
  getActiveFormItem,
  excludeSelf
} = useFormBuilder()

const isVisible = ref<boolean>(false)

const isHasIfSetting = computed(() => {
  const optionId = getActiveFormItem.value?.scheme?.ifObject?.optionId
  const checkedFormItemIds = getActiveFormItem.value?.scheme?.ifObject?.checkedFormItemIds
  return optionId && !!checkedFormItemIds?.length
})

const ifObjectInput = ref<SchemeIfObject>({})

let ifOptions: RadioOption[] = []
const mapIfOptions = () => {
  const options = getActiveFormItem.value?.scheme?.options
  return options?.map(optionItem => ({
    label: optionItem.label,
    value: optionItem.optionId,
  })) || []
}

let ifFormOptions: CheckboxOption[] = []
const mapIfFormOptions = () => {
  const formDatas = excludeSelf()
  return formDatas?.map(formItem => ({
    label: `${formItem.sequence}.${formItem.label}`,
    value: formItem.formItemId
  })) || []
}

const openModal = () => {
  isVisible.value = true
  ifObjectInput.value = clone(getActiveFormItem.value?.scheme?.ifObject) || {}
  ifOptions = mapIfOptions()
  ifFormOptions = mapIfFormOptions()
}

const onOk = async () => {
  emits('update', ifObjectInput.value);
  onClose();
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

.ant-checkbox-group {
  display: flex;
  flex-direction: column;
}
</style>

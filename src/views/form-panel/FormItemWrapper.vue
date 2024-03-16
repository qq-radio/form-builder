<template>
  <div
    :class="['form-item-wrapper', 'relative my-2.5 box-border flex cursor-pointer justify-center rounded py-8', { active: isActive }]"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    @click="setActiveFormItemId(props.formItem.formItemId)"
  >
    <div class="mr-2.5 w-14 text-right">
      <div class="gl-ellipsis w-full">
        <span v-if="props.formItem.required" class="mr-1.5 text-red-600">*</span><span>{{ props.formItem.sequence }}</span>
      </div>
    </div>
    <div class="w-9/12">
      <div class="mb-2.5">
        <a-textarea placeholder="请输入题目标题" v-model:value="labelInput" @change="onLabelInputChange" auto-size />
      </div>
      <div>
        <slot name="value" />
      </div>
      <div class="delete" v-show="isShowAction">
        <img class="mr-3" :src="ImageCopy" @click.stop="copyItem" />
        <img :src="ImageDelete" @click.stop="deleteItem" />
      </div>
    </div>
    <img class="move" v-show="isShowAction" :src="ImageMove" />
  </div>
</template>

<script setup lang="ts">
import { useFormBuilder } from '@/composables/useFormBuilder'
import { copyFormItemJson } from '@/composables/useFormBuilderJson'
import type { FormItem } from '@/types/form'

import ImageCopy from '@/assets/copy.png'
import ImageDelete from '@/assets/delete.png'
import ImageMove from '@/assets/move.png'

const props = defineProps({
  formItem: {
    type: Object as PropType<FormItem>,
    required: true
  }
})

const { getActiveFormItem, setActiveFormItemId, createFormItem, deleteFormItem, updateFormItem, findFormItemIndex } = useFormBuilder()

const isActive = computed(() => props.formItem.formItemId === getActiveFormItem.value?.formItemId)
const isHover = ref(false)
const isShowAction = computed(() => isActive.value || isHover.value)

const labelInput = ref('')

watch(
  () => props.formItem,
  (formItemValue) => {
    labelInput.value = formItemValue.label
  },
  { immediate: true, deep: true }
)

const onLabelInputChange = () => {
  const updateParams = {
    formItemId: props.formItem.formItemId,
    key: 'label',
    value: labelInput.value
  }
  updateFormItem(updateParams)
}

const copyItem = () => {
  const formItemJson = copyFormItemJson(props.formItem)
  const createParams = {
    ...formItemJson,
    isPush: true
  }
  createFormItem(createParams, findFormItemIndex(props.formItem.formItemId))
}

const deleteItem = () => {
  const { formItemId } = props.formItem
  const deleteParams = {
    formItemId
  }
  deleteFormItem(deleteParams)
}
</script>

<style lang="less">
.form-item-wrapper {
  border: 1px dashed transparent;

  &:hover {
    border: 1px #c7ccd5 dashed;
  }

  &.active {
    border: 1px #c7ccd5 dashed;
    background-color: rgba(242, 247, 254, 0.6);
  }
}

.delete {
  display: flex;
  align-items: center;
  position: absolute;
  right: 30px;
  bottom: 6px;

  img {
    height: 18px;
    width: 18px;
  }
}

.move {
  position: absolute;
  top: 50%;
  left: -7px;
  transform: translate(0, -60%);
  width: 30px;
  height: 30px;
}

@disabledBgColor: #f9f9f9;
.ant-input {
  &[disabled] {
    background-color: @disabledBgColor;
  }
}

.ant-picker-disabled {
  background-color: @disabledBgColor !important;
}
</style>

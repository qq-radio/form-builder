<template>
  <div :class="['form-item-wrapper', { 'active': isActive }]" @mouseenter="isHover = true" @mouseleave="isHover = false"
       @click="setActiveFormItemId(props.formItem.formItemId)">
    <div class="form-item-wrapper__left">
      <div class="sequence">
        <div class="red-required-star" v-if="props.formItem.required">*</div>
        <span>{{ props.formItem.sequence }}</span>
      </div>
    </div>
    <div class="form-item-wrapper__right">
      <div class="label">
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
import { useFormBuilder } from '@/composables/useFormBuilder';
import type { FormItem } from '@/types/form';
import { copyFormItemJson } from '@/composables/useFormBuilderJson';

import ImageCopy from '@/assets/copy.png';
import ImageDelete from '@/assets/delete.png';
import ImageMove from '@/assets/move.png';


const props = defineProps({
  formItem: {
    type: Object as PropType<FormItem>,
    required: true,
  },
});

const {
  getActiveFormItem,
  setActiveFormItemId,
  createFormItem,
  deleteFormItem,
  updateFormItem,
  findFormItemIndex
} = useFormBuilder()

const isActive = computed(() => props.formItem.formItemId === getActiveFormItem.value?.formItemId);
const isHover = ref(false);
const isShowAction = computed(() => isActive.value || isHover.value);

const labelInput = ref('');

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
    value: labelInput.value,
  }
  updateFormItem(updateParams)
}

const copyItem = () => {
  const formItemJson = copyFormItemJson(props.formItem)
  const createParams = {
    ...formItemJson,
    isPush: true,
  }
  createFormItem(createParams, findFormItemIndex(props.formItem.formItemId))
}

const deleteItem = () => {
  const { formItemId } = props.formItem;
  const deleteParams = {
    formItemId,
  };
  deleteFormItem(deleteParams);
}
</script>

<style lang="less">
.form-item-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 20px 26px 30px 20px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px dashed transparent;
  cursor: pointer;

  &:hover {
    border: 1px #c7ccd5 dashed;
  }

  &.active {
    background-color: rgba(242, 247, 254, 0.6);
    border: 1px #c7ccd5 dashed;
  }

  &__left {
    width: 60px;
    margin-right: 10px;
    text-align: right;

    .sequence {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__right {
    width: 70%;
    padding-right: 20px;

    .label {
      margin-bottom: 10px;
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
  }

  .move {
    position: absolute;
    top: 50%;
    left: -7px;
    transform: translate(0, -60%);
    width: 30px;
    height: 30px;
  }
}

.red-required-star {
  display: inline-block;
  margin-right: 4px;
  color: red;
}
</style>

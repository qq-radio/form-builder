<template>
  <Draggable group="widget-drag" v-model="getForm" item-key="formItemId" ghost-class="drag-ghost" class="min-h-full"
             animation="340" @add="onFormItemAdd" @update="onFormItemSortUpdate">
    <template #item="{ element }">
      <FormItemWrapper :formItem="element">
        <template #value>
          <component :is="getComponentByType(element)" :formItem="element" />
        </template>
      </FormItemWrapper>
    </template>
  </Draggable>
</template>

<script setup lang="ts">
import { useFormBuilder } from '../useFormBuilder';
import { useWidget } from '../useWidget';
import { getComponent } from './sources';
import type { FormItem } from '../types/form';

import Draggable from "vuedraggable";

import FormItemWrapper from './FormItemWrapper.vue';

const {
  getForm,
  createFormItem,
  sortFormItem,
} = useFormBuilder()

const { getWidgetConfig } = useWidget();

const getComponentByType = (element: FormItem) => {
  console.log("1111 element:", element)
  const widget = getWidgetConfig(element.type)
  const component = widget && getComponent(widget.formConfig.valueComponent)
  console.log("1111:", component)
  return component
}

const getBeforeAndAfterPosition = (itemIndex) => {
  let beforeFormItem = <FormItem>{}
  let afterFormItem = <FormItem>{}
  switch (itemIndex) {
    case 0:
      afterFormItem = getForm.value[itemIndex + 1]
      break;
    case getForm.value.length - 1:
      beforeFormItem = getForm.value[itemIndex - 1]
      break;
    default:
      beforeFormItem = getForm.value[itemIndex - 1]
      afterFormItem = getForm.value[itemIndex + 1]
      break;
  }
  return {
    beforePosition: beforeFormItem?.sort,
    afterPosition: afterFormItem?.sort,
  }
}

const onFormItemAdd = async (event) => {
  const newFormItem = getForm.value[event.newIndex]
  await createFormItem(newFormItem)

  const sortParams = {
    formItemId: newFormItem.formItemId,
    ...getBeforeAndAfterPosition(event.newIndex)
  }
  sortFormItem(sortParams)
}

const onFormItemSortUpdate = async (event) => {
  const newFormItem = getForm.value[event.newIndex]
  const sortParams = {
    formItemId: newFormItem.formItemId,
    ...getBeforeAndAfterPosition(event.newIndex)
  }
  sortFormItem(sortParams, true)
}
</script>

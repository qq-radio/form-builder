<template>
  <Draggable
    group="widget-drag"
    v-model="getForm"
    item-key="formItemId"
    ghost-class="drag-ghost"
    animation="340"
    @add="onFormItemAdd"
    @update="onFormItemSortUpdate"
  >
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
import { useFormBuilder } from '@/composables/useFormBuilder'
import { useWidget } from '@/composables/useWidget'
import { getComponent } from '@/packages/value-item'
import type { FormItem } from '@/types/form'

import Draggable from 'vuedraggable'

import FormItemWrapper from './FormItemWrapper.vue'

const { getForm, createFormItem, sortFormItem } = useFormBuilder()

const { getWidgetConfig } = useWidget()

const getComponentByType = (element: FormItem) => {
  const widget = getWidgetConfig(element.type)
  const component = widget && getComponent(widget.formConfig.valueComponent)
  return component
}

const getBeforeAndAfterPosition = (itemIndex: number) => {
  let beforeFormItem: FormItem
  let afterFormItem: FormItem
  switch (itemIndex) {
    case 0:
      afterFormItem = getForm.value[itemIndex + 1]
      break
    case getForm.value.length - 1:
      beforeFormItem = getForm.value[itemIndex - 1]
      break
    default:
      beforeFormItem = getForm.value[itemIndex - 1]
      afterFormItem = getForm.value[itemIndex + 1]
      break
  }
  return {
    beforePosition: beforeFormItem!.sort,
    afterPosition: afterFormItem!.sort
  }
}

type DragEvent = {
  newIndex: number
  [key: string]: any
}

const onFormItemAdd = async (event: DragEvent) => {
  const newFormItem = getForm.value[event.newIndex]
  await createFormItem(newFormItem)

  const sortParams = {
    formItemId: newFormItem.formItemId,
    ...getBeforeAndAfterPosition(event.newIndex)
  }
  sortFormItem(sortParams)
}

const onFormItemSortUpdate = async (event: DragEvent) => {
  const newFormItem = getForm.value[event.newIndex]
  const sortParams = {
    formItemId: newFormItem.formItemId,
    ...getBeforeAndAfterPosition(event.newIndex)
  }
  sortFormItem(sortParams, true)
}
</script>

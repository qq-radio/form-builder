<template>
  <Draggable
    :group="formItemId"
    v-model="getSelectOptions"
    item-key="optionId"
    ghost-class="drag-ghost"
    animation="340"
    @sort="onOptionChange"
  >
    <template #item="{ element, index }">
      <div class="draggable-area" @mouseenter="onMouseHover(element, index, true)" @mouseleave="onMouseHover(element, index, false)">
        <img class="absolute h-4 w-6 translate-x-[-100%] translate-y-[110%]" v-show="element.isShowMove" :src="ImageOptionMove" />
        <div class="mt-2.5 flex flex-1 items-center" v-if="selectConfig">
          <img class="mr-1 h-6 w-6" :src="selectConfig.selectIcon" />
          <div class="mx-1 w-full">
            <a-textarea :placeholder="selectConfig.placeholder" v-model:value="element.label" @change="onOptionChange" auto-size />
          </div>
          <plus-circle-outlined class="svg-icon mx-1.5" @click="addOption(index)" />
          <minus-circle-outlined class="svg-icon" v-show="getSelectOptions.length > 1" @click="deleteOption(index)" />
        </div>
      </div>
    </template>
  </Draggable>
</template>

<script setup lang="ts">
import { useFormBuilder } from '@/composables/useFormBuilder'
import { useWidget } from '@/composables/useWidget'
import { createSelectOptionItemJson } from '@/composables/useFormBuilderJson'
import type { FormItem, SchemeOption } from '@/types/form'

import Draggable from 'vuedraggable'
import ImageOptionMove from '@/assets/option-move.png'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  formItem: {
    type: Object as PropType<FormItem>,
    required: true
  }
})

const { updateFormItem } = useFormBuilder()

const { getWidgetConfig } = useWidget()

const selectConfig = getWidgetConfig(props.formItem.type)?.formConfig

const formItemId = computed(() => props.formItem.formItemId)

const selectOptions = ref<SchemeOption[]>([])

const getSelectOptions = computed({
  get() {
    return selectOptions.value
  },
  set(value) {
    selectOptions.value = value
  }
})

watch(
  () => props.formItem,
  (formItemValue) => {
    selectOptions.value = formItemValue?.scheme?.options || []
  },
  { immediate: true, deep: true }
)

const addOption = (index: number) => {
  if (selectConfig?.selectOptionType) {
    const selectOption = createSelectOptionItemJson(selectConfig.selectOptionType)
    selectOptions.value.splice(index + 1, 0, selectOption)
    onOptionChange()
  }
}

const deleteOption = (index: number) => {
  selectOptions.value.splice(index, 1)
  onOptionChange()
}

const onOptionChange = () => {
  const updateParams = {
    formItemId: props.formItem.formItemId,
    key: 'scheme.options',
    value: selectOptions.value
  }
  updateFormItem(updateParams)
}

const onMouseHover = (optionItem: SchemeOption, index: number, isShowMove: boolean) => {
  const newOptionItem = {
    ...optionItem,
    isShowMove
  }
  selectOptions.value.splice(index, 1, newOptionItem)
}
</script>

<style lang="less" scoped>
@expandedClickArea: 40px;

.draggable-area {
  position: relative;
  display: flex;
  padding-left: @expandedClickArea;
  margin-left: -@expandedClickArea;
  padding-right: @expandedClickArea;
  margin-right: -@expandedClickArea;
}

.svg-icon {
  font-size: 22px;
  color: #707070;
  cursor: pointer;
}
</style>

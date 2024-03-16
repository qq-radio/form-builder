<template>
  <div>
    <a-collapse v-model:activeKey="widgetGroupActiveKey" :ghost="true" expandIconPosition="right">
      <a-collapse-panel v-for="group in widgetGroupList" :key="group.key" :header="group.title">
        <Draggable
          class="flex flex-wrap"
          :group="{ name: 'widget-drag', pull: 'clone', put: false }"
          :list="group.children"
          :clone="cloneComponent"
          :sort="false"
          item-key="type"
          draggable="#element"
          animation="300"
        >
          <template #item="{ element }">
            <div
              id="element"
              class="element mb-2.5 mr-2.5 flex w-24 flex-wrap items-center rounded bg-[#ebf2fda1] px-3 py-1.5 text-xs"
              @click="addComponent(element)"
            >
              <img class="mr-1.5 h-4 w-4" :src="element.icon" />
              <span>{{ element.name }}</span>
            </div>
          </template>
        </Draggable>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
import { useFormBuilder } from '@/composables/useFormBuilder'
import { useWidget } from '@/composables/useWidget'
import { createFormItemJson } from '@/composables/useFormBuilderJson'
import type { WidgetGroupItem, WidgetItem } from '@/types/widget'
import Draggable from 'vuedraggable'

const { getInsertIndexAfterActive, createFormItem } = useFormBuilder()

const { widgetGroupList: list } = useWidget()

const widgetGroupList = ref<WidgetGroupItem[]>(list)
const widgetGroupActiveKey = ref(widgetGroupList.value.map((group) => group.key))

const cloneComponent = (element: WidgetItem) => {
  return createFormItemJson(element.type)
}

const addComponent = (element: WidgetItem) => {
  const formItemJson = createFormItemJson(element.type)
  const createParams = {
    ...formItemJson,
    isPush: true
  }
  createFormItem(createParams, getInsertIndexAfterActive())
}
</script>

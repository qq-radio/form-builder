<template>
  <div class="widget-panel">
    <a-collapse v-model:activeKey="widgetGroupActiveKey" :ghost="true" expandIconPosition="right">
      <a-collapse-panel v-for='group in widgetGroupList' :key="group.key" :header="group.title">
        <Draggable class="widget-panel__content" :group="{ name: 'widget-drag', pull: 'clone', put: false }"
                   :list="group.children" :clone="cloneComponent" :sort="false" item-key="type"
                   draggable=".widget-panel__content--item" animation="300">
          <template #item="{ element }">
            <div class="widget-panel__content--item" @click="addComponent(element)">
              <img class="widget-icon" :src="element.icon" />
              <span>{{ element.name }}</span>
            </div>
          </template>
        </Draggable>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
import { useFormBuilder } from '@/composables/useFormBuilder';
import { useWidget } from '@/composables/useWidget';
import { createFormItemJson } from '@/composables/useFormBuilderJson';
import type { WidgetGroupItem, WidgetItem } from '@/types/widget';

import Draggable from "vuedraggable";

const {
  getInsertIndexAfterActive,
  createFormItem
} = useFormBuilder()

const { widgetGroupList: list } = useWidget()


const widgetGroupList = ref<WidgetGroupItem[]>(list)
const widgetGroupActiveKey = ref(widgetGroupList.value.map(group => group.key))

const cloneComponent = (element: WidgetItem) => {
  return createFormItemJson(element.type)
}

const addComponent = (element: WidgetItem) => {
  const formItemJson = createFormItemJson(element.type)
  const createParams = {
    ...formItemJson,
    isPush: true,
  }
  createFormItem(createParams, getInsertIndexAfterActive())
}
</script>

<style lang="less" scoped>
.widget-panel {
  &__content {
    display: flex;
    flex-wrap: wrap;

    &--item {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100px;
      padding: 6px 12px;
      font-size: 12px;
      margin-bottom: 10px;
      margin-right: 10px;
      border-radius: 4px;
      background: #ebf2fda1;
    }
  }
}

.widget-icon {
  height: 16px;
  width: 16px;
  margin-right: 8px;
}
</style>

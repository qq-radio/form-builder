<template>
  <div class="setting-panel" v-if="isShowSetting">
    <div class="setting-panel__title" v-if="widget">
      <img class="icon" :src="widget.icon" />
      <span class="name">{{ widget.name }}</span>
    </div>
    <div class="setting-panel__content">
      <a-collapse v-model:activeKey="settingGroupActiveKey" :ghost="true" expandIconPosition="right">
        <a-collapse-panel v-for='group in settingGroup' :key="group.key" :header="group.title">
          <template v-for='settingItem in group.children' :key="settingItem.field">
            <div class="setting-panel__content--item">
              <div class="left">{{ settingItem.label }}</div>
              <div class="right">
                <component :is="getComponent(settingItem.component)" v-bind="settingItem.componentProps"
                           @update="(value: any) => onUpdate(settingItem.field, value)"
                           :defaulValue="getDefaulValue(settingItem)" />
              </div>
            </div>
          </template>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormBuilder } from '@/composables/useFormBuilder';
import { useWidget } from '@/composables/useWidget';
import { getComponent } from '@/packages/setting-item';
import type { SettingItem } from '@/types/widget';

import { getObjectByKeyPath } from '@/utils';

const {
  getActiveFormItem,
  updateFormItem
} = useFormBuilder()

const { getWidgetConfig } = useWidget();

const widget = computed(() => getActiveFormItem.value && getWidgetConfig(getActiveFormItem.value.type))

const isShowSetting = computed(() => getActiveFormItem?.value?.formItemId);
const settingGroup = computed(() => widget.value && widget.value.settingConfig)
const settingGroupActiveKey = ref<string[] | undefined>()
watchEffect(() => {
  settingGroupActiveKey.value = settingGroup.value?.map(group => group.key)
})

const onUpdate = (key: string, value: any) => {
  const updateObject = {
    formItemId: getActiveFormItem.value!.formItemId,
    key,
    value
  }
  updateFormItem(updateObject)
}

const getDefaulValue = (setting: SettingItem) => {
  if (!getActiveFormItem.value) {
    return
  }
  const value = getObjectByKeyPath(getActiveFormItem.value, setting.field)
  // todo after fix error
  // return value ?? setting.componentProps?.defaulValue
  return value
}
</script>

<style lang="less" scoped>
.setting-panel {
  &__title {
    font-size: 18px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #eee;

    .icon {
      height: 26px;
      width: 26px;
      margin-right: 10px;
    }

    .name {
      font-weight: 700;
      font-size: 20px;
    }
  }

  &__content {
    &--item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 12px 6px;

      .left {
        width: 30%;
        margin-right: 10px;
      }

      .right {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>

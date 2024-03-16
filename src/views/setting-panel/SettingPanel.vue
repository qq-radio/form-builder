<template>
  <div v-if="isShowSetting">
    <div class="title-border mb-1 flex items-center p-3 pt-4 text-lg" v-if="widget">
      <img class="mr-2 h-6 w-6" :src="widget.icon" />
      <span class="text-xl font-bold">{{ widget.name }}</span>
    </div>
    <div>
      <a-collapse v-model:activeKey="settingGroupActiveKey" :ghost="true" expandIconPosition="end">
        <a-collapse-panel v-for="group in settingGroup" :key="group.key" :header="group.title">
          <template v-for="settingItem in group.children" :key="settingItem.field">
            <div class="mx-1.5 my-3 flex items-center justify-between">
              <div class="mr-2.5 w-1/3">{{ settingItem.label }}</div>
              <div class="flex-1 text-right">
                <component
                  :is="getComponent(settingItem.component)"
                  v-bind="settingItem.componentProps"
                  @update="(value: any) => onUpdate(settingItem.field, value)"
                  :defaulValue="getDefaulValue(settingItem)"
                />
              </div>
            </div>
          </template>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormBuilder } from '@/composables/useFormBuilder'
import { useWidget } from '@/composables/useWidget'
import { getComponent } from '@/packages/setting-item'
import type { SettingItem } from '@/types/widget'

import { getObjectByKeyPath } from '@/utils'

const { getActiveFormItem, updateFormItem } = useFormBuilder()

const { getWidgetConfig } = useWidget()

const widget = computed(() => getActiveFormItem.value && getWidgetConfig(getActiveFormItem.value.type))

const isShowSetting = computed(() => getActiveFormItem?.value?.formItemId)
const settingGroup = computed(() => widget.value && widget.value.settingConfig)
const settingGroupActiveKey = ref<string[] | undefined>()
watchEffect(() => {
  settingGroupActiveKey.value = settingGroup.value?.map((group) => group.key)
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
.title-border {
  border-bottom: 1px solid #eee;
}
</style>

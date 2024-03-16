<template>
  <div class="h-screen w-screen overflow-hidden p-2.5" :title="pageTitle" contentBackground>
    <HeaderPanel />
    <a-layout>
      <a-layout-sider class="h-screen overflow-auto !bg-white" width="370">
        <WidgetPanel />
      </a-layout-sider>
      <a-layout-content class="ml-2.5 h-screen overflow-auto !bg-white">
        <FormPanel />
      </a-layout-content>
      <a-layout-sider class="ml-2.5 h-screen overflow-auto !bg-white" width="400">
        <SettingPanel />
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { useFormBuilder } from '@/composables/useFormBuilder'
import HeaderPanel from './header-panel/HeaderPanel.vue'
import WidgetPanel from './widget-panel/WidgetPanel.vue'
import FormPanel from './form-panel/FormPanel.vue'
import SettingPanel from './setting-panel/SettingPanel.vue'

const { getFormDetail } = useFormBuilder()

const pageTitle = computed(() => getFormDetail.value.formName)
</script>

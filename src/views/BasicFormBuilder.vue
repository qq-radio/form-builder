<template>
  <div class="basic-form-builder" :title="pageTitle" contentBackground>
    <HeaderPanel />
    <a-layout>
      <a-layout-sider class="basic-form-builder__left" width="370">
        <WidgetPanel />
      </a-layout-sider>
      <a-layout-content class="basic-form-builder__content">
        <FormPanel />
      </a-layout-content>
      <a-layout-sider class="bg-white" width="400">
        <SettingPanel />
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { useFormBuilder } from '@/composables/useFormBuilder';
import HeaderPanel from './header-panel/HeaderPanel.vue'
import WidgetPanel from './widget-panel/WidgetPanel.vue'
import FormPanel from './form-panel/FormPanel.vue'
import SettingPanel from './setting-panel/SettingPanel.vue'

const {
  getFormDetail,
} = useFormBuilder()

const pageTitle = computed(() => getFormDetail.value.formName);
</script>

<style lang="less" scoped>
@bgColor: #fff;

.basic-form-builder {
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  &__left {
    height: 100vh;
    margin-right: 10px;
    background-color: @bgColor;
  }

  &__content {
    overflow: scroll;
    height: 100vh;
    background-color: @bgColor;
  }

  &__right {
    height: 100vh;
    margin-left: 10px;
    background-color: @bgColor;
  }
}
</style>

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
      <a-layout-sider class="basic-form-builder__right" width="400">
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

  &__left {
    height: 100vh;
    margin-right: 10px;
    background-color: @bgColor;
  }

  &__content {
    height: 100%;
    height: calc(100vh - 200px);
    overflow: scroll;
    background-color: @bgColor;
  }

  &__right {
    height: 100%;
    margin-left: 10px;
    background-color: @bgColor;
  }
}

/deep/ .vben-page-footer {
  border-top: 0.5px solid #eee;
  box-shadow: 0 -5px 5px -5px #eee;
}
</style>

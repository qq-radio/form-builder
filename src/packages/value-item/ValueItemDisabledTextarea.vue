<template>
  <a-textarea :placeholder="placeholder" disabled :auto-size="{ minRows: 2 }" />
</template>

<script setup lang="ts">
import { useWidget } from '@/composables/useWidget';
import type { FormItem } from '@/types/form';

const { getWidgetConfig } = useWidget();

const props = defineProps({
  formItem: {
    type: Object as PropType<FormItem>,
    required: true,
  },
});

const placeholder = getWidgetConfig(props.formItem.type)?.formConfig.placeholder
</script>

<style lang="less" scoped>
.ant-input {
  cursor: not-allowed;

  &[disabled] {
    background-color: #fff;
  }
}
</style>

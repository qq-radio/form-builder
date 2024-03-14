<template>
  <a-time-range-picker :placeholder="placeholder" style="width:100%" disabled />
</template>

<script setup lang="ts">
import { useWidget } from '../../useWidget';
import type { FormItem } from '../../types/form';

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
.ant-picker-disabled {
  cursor: not-allowed;
  background-color: #fff;
}
</style>

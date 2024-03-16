<template>
  <a-input :placeholder="placeholder" disabled />
</template>

<script setup lang="ts">
import { useWidget } from '@/composables/useWidget'
import type { FormItem } from '@/types/form'

const { getWidgetConfig } = useWidget()

const props = defineProps({
  formItem: {
    type: Object as PropType<FormItem>,
    required: true
  }
})

const placeholder = getWidgetConfig(props.formItem.type)?.formConfig.placeholder
</script>

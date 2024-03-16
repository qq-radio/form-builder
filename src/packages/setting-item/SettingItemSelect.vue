<template>
  <a-select v-bind="$attrs" class="text-left" v-model:value="value" style="width: 100%" @change="onChange" allowClear />
</template>

<script setup lang="ts">
const emits = defineEmits(['update'])

const props = defineProps({
  defaulValue: {
    type: String,
    default: undefined
  }
})

const value = ref<string | undefined>('')

watch(
  () => props.defaulValue,
  () => {
    value.value = props.defaulValue
  },
  { immediate: true }
)

const onChange = () => {
  emits('update', value.value)
}
</script>

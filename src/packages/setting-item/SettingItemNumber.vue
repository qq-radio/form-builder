<template>
  <a-input-number v-bind="$attrs" v-model:value="value" style="width: 100%" @change="onChange" />
</template>

<script setup lang="ts">
const emits = defineEmits(['update'])

const props = defineProps({
  defaulValue: {
    type: String,
    default: ''
  }
})

const value = ref('')

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

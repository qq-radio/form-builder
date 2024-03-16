<template>
  <a-textarea v-bind="$attrs" v-model:value="value" @change="onChange" auto-size />
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

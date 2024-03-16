<template>
  <a-switch v-bind="$attrs" v-model:checked="value" @change="onChange" />
</template>

<script setup lang="ts">
const emits = defineEmits(['update'])

const props = defineProps({
  defaulValue: {
    type: Boolean,
    default: false
  }
})

const value = ref(false)

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

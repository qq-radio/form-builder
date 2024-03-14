<template>
  <a-modal :visible="props.visible" :title="props.data.title" :footer="null" :keyboard="false" @cancel="onCancel">
    <div class="preview">
      <div class="loading" v-if="!loaded">
        <a-spin tip="加载中..." />
      </div>
      <iframe class="webview" :src="props.data.url" :width="375" :height="640" frameborder="0" @load="onLoaded" />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:visible']);

export interface Props {
  visible: boolean;
  data: {
    url: string;
    title: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  data: () => ({
    url: '',
    title: '',
  })
})

const loaded = ref(false);

watchEffect(() => {
  if (!props.visible) {
    loaded.value = false;
  }
});

const onLoaded = () => {
  loaded.value = true;
};

const onCancel = () => {
  emit('update:visible', false);
};
</script>

<style scoped lang="less">
.preview {
  position: relative;
  display: flex;
  justify-content: center;

  .webview {
    border: 10px solid #eff2f5;
    border-radius: 10px;
  }
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #eff2f5;
  border-radius: 4px;
  width: 375px;
  height: 100%;
  margin: 0 50px;
}
</style>

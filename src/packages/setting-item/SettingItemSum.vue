<template>
  <div class="flex items-center justify-end">
    <img class='w-6 h-6 mr-1' v-if="isHasSumSetting" :src="ImageSuccess" />
    <a-button class="w-20" type="primary" @click="openModal">去设置</a-button>
    <a-modal title="设置求和函数" :visible="isVisible" :width="640" :closable="false" :keyboard="false" @ok="onOk"
             @cancel="onClose">
      <template v-if="!sumOptions.length">
        <div class="m-10">请先创建<b>单选</b>表单项后再设置求和函数哦~</div>
      </template>
      <template v-else>
        <div v-for="formItem in sumOptions" :key="formItem.formItemId" class="px-6 py-4">
          <div class="flex">
            <a-checkbox v-model:checked="formItem.checked" />
            <div class="ml-2">
              <div class="mb-2">{{ formItem.formLabel }}</div>
              <div class="flex content-center mb-2" v-for="optionItem in formItem.options" :key="optionItem.optionId">
                <span class="pt-1 mr-1">{{ optionItem.label }}</span>
                <div class="inline-block">
                  <a-input v-model:value="optionItem.score" type="number" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import type { FormItem } from '@/types/form';
import { useFormBuilder } from '@/composables/useFormBuilder';

import ImageSuccess from '@/assets/success.png';

const emits = defineEmits(['update']);

const {
  getActiveFormItem,
  excludeSelf
} = useFormBuilder()

type SumOption = {
  formLabel: string;
  formItemId: string;
  checked: boolean;
  options: {
    optionId: string;
    label: string;
    score: string | number;
  }[];
};

const isVisible = ref<boolean>(false)

const sumOptions = ref<SumOption[]>([]);

const isHasSumSetting = computed(() => {
  const checkedFormItemIds = getActiveFormItem.value?.scheme?.sumObject?.checkedFormItemIds
  return !!checkedFormItemIds?.length
})

type ScoreMapItem = {
  [optionId: string]: string | number
}
const getScoreMap = (): ScoreMapItem => {
  const scoreOptions = getActiveFormItem.value?.scheme?.sumObject?.scoreOptions;
  return Object.fromEntries(scoreOptions?.map(option => [option.optionId, option.score]) || []);
}

const getOptions = <T extends { optionId: string }>(options: T[] | undefined, scoreMap: ScoreMapItem): (T & { score: string | number })[] => {
  return options?.map((option) => ({ ...option, score: scoreMap[option.optionId] })) || [];
};

const getChecked = (formItemId: string) => (getActiveFormItem.value!.scheme?.sumObject?.checkedFormItemIds || []).includes(formItemId);

const filterRadioFormItems = (formDatas: FormItem[]) => formDatas.filter(item => item.type === 'RADIO')

const mapSumOptions = () => {
  const formDatas = filterRadioFormItems(excludeSelf())
  const scoreMap = getScoreMap()
  return formDatas.map(formItem => {
    const { formItemId, sequence, label, scheme } = formItem;
    const formLabel = `${sequence}.${label}`;
    const checked = getChecked(formItemId);
    const options = getOptions(scheme?.options, scoreMap);
    return { formItemId, formLabel, checked, options };
  });
};

const openModal = () => {
  isVisible.value = true
  sumOptions.value = mapSumOptions()
}

const getCheckedFormItemIds = () => sumOptions.value.filter(item => item.checked).map(item => item.formItemId);

const getSumScoreOptions = () => sumOptions.value.flatMap(formItem => formItem.options.map(optionItem => ({ optionId: optionItem.optionId, score: optionItem.score })));

const onOk = async () => {
  const sumObject = {
    checkedFormItemIds: getCheckedFormItemIds(),
    scoreOptions: getSumScoreOptions(),
  }
  emits('update', sumObject);
  onClose();
};

const onClose = () => {
  isVisible.value = false
}
</script>

<style lang="less" scoped>
.ant-input {
  width: 100px !important;
}
</style>

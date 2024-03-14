import type { WidgetType } from './widget';

export type CheckboxOption = {
  label: string;
  value: string;
};

export type RadioOption = {
  label: string;
  value: string;
};

export type SelectOptionType = 'RADIO_OPTION' | 'SELECT_OPTION' | 'CHECKBOX_OPTION';

export type SchemeOption = {
  optionId: string;
  label: string;
};

export type SchemeIfObject = {
  optionId?: string;
  formItemId?: string;
  checkedFormItemIds?: string[];
};

export type ScoreOption = {
  optionId: string;
  score: string | number;
};

export type SchemeSumObject = {
  checkedFormItemIds?: string[];
  scoreOptions?: ScoreOption[];
};

export type SchemeDivideObject = {
  divisorFormItemId: string; // 除数
  dividendFormItemId: string; // 被除数
};

export interface FormItem {
  // 表单项id（前端生成/组件类型+时间戳）
  formItemId: string;
  // 组件类型（与后端对齐）
  type: WidgetType;
  // 标题
  label: string;
  // 是否必填
  required: boolean;
  // 序号（与后端对齐）
  sort?: string | number;
  // 序号（前端生成）
  sequence?: number;
  // 扩展字段
  scheme?: {
    // 单选器或下拉选择器的选项值
    options?: SchemeOption[];
    // 逻辑if设置
    ifObject?: SchemeIfObject;
    // 求和函数设置
    sumObject?: SchemeSumObject;
    // 相除函数设置
    divideObject?: SchemeDivideObject;
  };
}

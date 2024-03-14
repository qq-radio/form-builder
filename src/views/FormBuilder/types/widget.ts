import type { SelectOptionType } from './form';

export type WidgetType =
  | 'NUMBER'
  | 'FUNCTION_SUM'
  | 'FUNCTION_DIVIDE'
  | 'RADIO'
  | 'SELECT'
  | 'INPUT'
  | 'TEXTAREA'
  | 'CHECKBOX'
  | 'TIME'
  | 'TIME_RANGE'
  | 'DATE'
  | 'DATE_RANGE'
  | 'RATE'
  | 'INPUT_MAP';

export type FormItemValueComponent =
  | 'ValueItemDisabledInput'
  | 'ValueItemSelect'
  | 'ValueItemDisabledTextarea'
  | 'ValueItemDisabledTime'
  | 'ValueItemDisabledTimeRange'
  | 'ValueItemDisabledMap'
  | 'ValueItemDisabledRate';

export type SettingComponent =
  | 'SettingItemInput'
  | 'SettingItemSwitch'
  | 'SettingItemIf'
  | 'SettingItemSum'
  | 'SettingItemDivide'
  | 'SettingItemNumber'
  | 'SettingItemSelect';

export interface SettingOptionItem {
  label: string;
  value: any;
}

export interface SettingItem {
  field: string;
  label: string;
  component: SettingComponent;
  componentProps?: any;
  hide?: boolean;
}

export interface SettingGroupItem {
  key: string;
  title: string;
  children: SettingItem[];
}

export type WidgetItem = {
  type: WidgetType;
  name: string;
  sequence: number;
  icon: string;
  hide?: boolean;
  formConfig: {
    valueComponent: FormItemValueComponent;
    selectIcon?: any;
    selectOptionType?: SelectOptionType;
    placeholder?: string | Array<string>;
  };
  settingConfig: SettingGroupItem[];
};

export type WidgetGroupItem = {
  key: string;
  title: string;
  children: WidgetItem[];
};

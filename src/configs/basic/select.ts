import type { WidgetItem } from '@/types/widget'
import icon from '@/assets/dropdown.png'
import selectIcon from '@/assets/dropdown-option.png'

const config: WidgetItem = {
  type: 'SELECT',
  name: '下拉选择',
  sequence: 6,
  icon,
  formConfig: {
    valueComponent: 'ValueItemSelect',
    selectIcon,
    selectOptionType: 'SELECT_OPTION',
    placeholder: '请输入下拉选项'
  },
  settingConfig: [
    {
      key: 'basic',
      title: '基础设置',
      children: [
        {
          field: 'label',
          label: '标题',
          component: 'SettingItemInput',
          componentProps: {
            placeholder: '请输入标题'
          }
        },
        {
          field: 'required',
          label: '是否必填',
          component: 'SettingItemSwitch'
        }
      ]
    },
    {
      key: 'logic',
      title: '逻辑设置',
      children: [
        {
          field: 'scheme.ifObject',
          label: '逻辑判断',
          component: 'SettingItemIf'
        }
      ]
    }
  ]
}

export default config

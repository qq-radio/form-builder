import type { WidgetItem } from '../../types/widget'
import icon from '@/assets/checkbox.png'
import selectIcon from '@/assets/checkbox-option.png'

const config: WidgetItem = {
  type: 'CHECKBOX',
  name: '多选',
  sequence: 5,
  icon,
  hide: true,
  formConfig: {
    valueComponent: 'ValueItemSelect',
    selectIcon,
    selectOptionType: 'CHECKBOX_OPTION',
    placeholder: '请输入多选选项'
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

import type { WidgetItem } from '@/types/widget'
import icon from '@/assets/number.png'

const config: WidgetItem = {
  type: 'NUMBER',
  name: '数字',
  sequence: 1,
  icon,
  formConfig: {
    valueComponent: 'ValueItemDisabledInput',
    placeholder: '请输入数字'
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
        },
        {
          field: 'min',
          label: '最小输入值',
          component: 'SettingItemNumber',
          componentProps: {
            placeholder: '请输入数字'
          },
          hide: true
        },
        {
          field: 'max',
          label: '最大输入值',
          component: 'SettingItemNumber',
          componentProps: {
            placeholder: '请输入数字'
          },
          hide: true
        }
      ]
    }
  ]
}

export default config

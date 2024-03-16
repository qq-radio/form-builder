import type { WidgetItem } from '@/types/widget'
import icon from '@/assets/text.png'

const config: WidgetItem = {
  type: 'INPUT',
  name: '文本',
  sequence: 2,
  icon,
  formConfig: {
    valueComponent: 'ValueItemDisabledInput',
    placeholder: '请输入文本'
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
          field: 'max',
          label: '最大输入字符数',
          component: 'SettingItemNumber'
        }
      ]
    }
  ]
}

export default config

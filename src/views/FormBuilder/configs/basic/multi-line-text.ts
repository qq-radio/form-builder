import type { WidgetItem } from '../../types/widget'
import icon from '@/assets/multi.png'

const config: WidgetItem = {
  type: 'TEXTAREA',
  name: '多行文本',
  sequence: 3,
  icon,
  hide: true,
  formConfig: {
    valueComponent: 'ValueItemDisabledTextarea',
    placeholder: '请输入多行文本'
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

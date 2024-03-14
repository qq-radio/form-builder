import type { WidgetItem } from '../../types/widget'
import icon from '@/assets/rate-blue.png'

const config: WidgetItem = {
  type: 'RATE',
  name: '评分',
  sequence: 1,
  icon,
  formConfig: {
    valueComponent: 'ValueItemDisabledRate',
    placeholder: '请选择评分'
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
    }
  ]
}

export default config

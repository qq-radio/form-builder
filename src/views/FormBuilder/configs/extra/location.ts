import type { WidgetItem } from '../../types/widget'
import icon from '@/assets/location.png'

const config: WidgetItem = {
  type: 'INPUT_MAP',
  name: '定位',
  sequence: 2,
  icon,
  formConfig: {
    valueComponent: 'ValueItemDisabledMap'
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

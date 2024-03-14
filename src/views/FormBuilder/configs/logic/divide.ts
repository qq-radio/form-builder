import type { WidgetItem } from '../../types/widget'
import icon from '@/assets/divide.png'

const config: WidgetItem = {
  type: 'FUNCTION_DIVIDE',
  name: '相除函数',
  sequence: 2,
  icon,
  formConfig: {
    valueComponent: 'ValueItemDisabledInput',
    placeholder: '相除函数自动计算'
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
          field: 'scheme.divideObject',
          label: '相除函数',
          component: 'SettingItemDivide'
        }
      ]
    }
  ]
}

export default config

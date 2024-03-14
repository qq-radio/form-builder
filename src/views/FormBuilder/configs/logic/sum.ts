import type { WidgetItem } from '../../types/widget'
import icon from '@/assets/sum.png'

const config: WidgetItem = {
  type: 'FUNCTION_SUM',
  name: '求和函数',
  sequence: 1,
  icon,
  formConfig: {
    valueComponent: 'ValueItemDisabledInput',
    placeholder: '求和函数自动计算'
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
          field: 'scheme.sumObject',
          label: '求和函数',
          component: 'SettingItemSum'
        }
      ]
    }
  ]
}

export default config

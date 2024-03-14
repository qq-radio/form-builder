import type { WidgetItem } from '../../types/widget'
import icon from '@/assets/time-range.png'

const config: WidgetItem = {
  type: 'DATE_RANGE',
  name: '时间范围',
  sequence: 2,
  icon,
  formConfig: {
    valueComponent: 'ValueItemDisabledTimeRange',
    placeholder: ['请选择开始时间', '请选择结束时间']
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
          field: 'scheme.formatType',
          label: '时间格式',
          component: 'SettingItemSelect',
          componentProps: {
            placeholder: '请选择时间格式',
            defaulValue: 'YYYY-MM-DD',
            options: [
              {
                label: '月日（MM-DD）',
                value: 'MM-DD'
              },
              {
                label: '年月日（YYYY-MM-DD）',
                value: 'YYYY-MM-DD'
              }
            ]
          }
        }
      ]
    }
  ]
}

export default config

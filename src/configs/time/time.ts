import type { WidgetItem } from '@/types/widget'
import icon from '@/assets/time.png'

const config: WidgetItem = {
  // later 如果后续要的话，最后让后端枚举值DATE改为TIME, DATE_RANGE改为TIME_RANGE比较好
  type: 'DATE',
  name: '时间',
  sequence: 1,
  icon,
  formConfig: {
    valueComponent: 'ValueItemDisabledTime',
    placeholder: '请选择时间'
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

import type { WidgetGroupItem, WidgetType, WidgetItem } from '@/types/widget'
import {
  generateBasicWidgets,
  generateFunctionWidgets,
  generateTimeWidgets,
  generateExtraWidgets
} from '@/configs'

export function useWidget() {
  const basicWidgets = excludeByHide(generateBasicWidgets())
  const getBasicWidgets = basicWidgets.sort((a, b) => a.sequence - b.sequence)

  const functionWidgets = excludeByHide(generateFunctionWidgets())
  const getFunctionWidgets = functionWidgets.sort((a, b) => a.sequence - b.sequence)

  const timeWidgets = excludeByHide(generateTimeWidgets())
  const getTimeWidgets = timeWidgets.sort((a, b) => a.sequence - b.sequence)

  const extraWidgets = excludeByHide(generateExtraWidgets())
  const getExtraWidgets = extraWidgets.sort((a, b) => a.sequence - b.sequence)

  const widgetGroupList: WidgetGroupItem[] = [
    {
      key: 'basic',
      title: '基础组件',
      children: getBasicWidgets
    },
    {
      key: 'function',
      title: '函数组件',
      children: getFunctionWidgets
    },
    {
      key: 'time',
      title: '时间组件',
      children: getTimeWidgets
    },
    {
      key: 'extra',
      title: '扩展组件',
      children: getExtraWidgets
    }
  ]

  const allWidgets = widgetGroupList.flatMap((group) => group.children)

  function excludeByHide<T extends { hide?: boolean }>(array: T[]): T[] {
    return array.filter((item) => !item.hide)
  }

  function getWidgetConfig(type: WidgetType): WidgetItem | undefined {
    const widget = allWidgets.find((widget) => widget.type === type)

    if (!widget) {
      return
    }

    const settingConfig = widget.settingConfig.map((settings) => ({
      ...settings,
      children: excludeByHide(settings.children)
    }))

    return {
      ...widget,
      settingConfig
    }
  }

  return {
    widgetGroupList,
    getWidgetConfig
  }
}

import type { WidgetItem } from '@/types/widget'

function generateBasicWidgets() {
  const modules: Record<string, WidgetItem> = import.meta.glob('./basic/*.ts', {
    eager: true,
    import: 'default'
  })
  return Object.values(modules) as WidgetItem[]
}

function generateFunctionWidgets() {
  const modules: Record<string, WidgetItem> = import.meta.glob('./logic/*.ts', {
    eager: true,
    import: 'default'
  })
  return Object.values(modules) as WidgetItem[]
}

function generateTimeWidgets() {
  const modules: Record<string, WidgetItem> = import.meta.glob('./time/*.ts', {
    eager: true,
    import: 'default'
  })
  return Object.values(modules) as WidgetItem[]
}

function generateExtraWidgets() {
  const modules: Record<string, WidgetItem> = import.meta.glob('./extra/*.ts', {
    eager: true,
    import: 'default'
  })
  return Object.values(modules) as WidgetItem[]
}

export { generateBasicWidgets, generateFunctionWidgets, generateTimeWidgets, generateExtraWidgets }

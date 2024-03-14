import type { SettingComponent } from '../../types/widget'

const componentMap = new Map<SettingComponent, Component>()

getAllComponent()

export function getAllComponent() {
  const modules: Record<string, { default: any }> = import.meta.glob('./*.vue', {
    eager: true,
    import: 'default'
  })
  for (const moduleKey in modules) {
    const module = modules[moduleKey]
    const componentName = moduleKey.replace(/^.*\/([^/]+)\.vue$/, '$1') as SettingComponent
    componentMap.set(componentName, module)
  }
}

export function getComponent(componentType: SettingComponent) {
  return componentMap.get(componentType) as Component
}

import type { FormItemValueComponent } from '../../types/widget'

const componentMap = new Map<FormItemValueComponent, Component>()

getAllComponent()

export function getAllComponent() {
  const modules: Record<string, { default: any }> = import.meta.glob('./*.vue', {
    eager: true,
    import: 'default'
  })
  for (const moduleKey in modules) {
    const module = modules[moduleKey]
    const componentName = moduleKey.replace(/^.*\/([^/]+)\.vue$/, '$1') as FormItemValueComponent
    componentMap.set(componentName, module)
  }
}

export function getComponent(componentType: FormItemValueComponent) {
  return componentMap.get(componentType) as Component
}

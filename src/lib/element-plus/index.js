import {
  ElButton,
  ElContainer,
  ElHeader,
  ElAside,
  ElDrawer,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElAvatar,
  ElIcon,
  ElCard,
  ElDivider,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElDescriptions,
  ElDescriptionsItem,
  ElSkeleton,
  ElSkeletonItem,
  ElCheckbox,
  ElPopover,
  ElLink
} from 'element-plus'

import { Close, ArrowLeft, Expand } from '@element-plus/icons-vue'

/**
 * 按需导入 Element Plus 组件
 * Vite 插件 https://github.com/antfu/unplugin-vue-components
 * @param app {App}
 */
export default function handleImport(app) {
  const components = [
    ElButton,
    ElContainer,
    ElHeader,
    ElAside,
    ElDrawer,
    ElMain,
    ElMenu,
    ElMenuItem,
    ElAvatar,
    ElIcon,
    ElCard,
    ElDivider,
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElDescriptions,
    ElDescriptionsItem,
    ElSkeleton,
    ElSkeletonItem,
    ElCheckbox,
    ElPopover,
    ElLink,

    Close,
    ArrowLeft,
    Expand
  ]
  components.forEach((v) => {
    app.use(v)
  })
  return app
}

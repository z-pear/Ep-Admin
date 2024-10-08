<template>
  <div class="layout-box">
    <div :style="{ width: sideBarWidth }" class="sider" id="sider">
      <div class="logo flex-c">
        <LogoSvg />
        <span v-show="!isCollapse">Ep-Admin</span>
      </div>

      <div class="menu">
        <el-scrollbar>
          <!-- activeMenu: 页面加载时默认激活菜单的 index #001529 -->
          <el-menu
            :default-active="activeKey"
            :router="false"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="menuAccordion"
            :background-color="!isDark ? '#001529' : '#1f1f1f'"
            text-color="#ffffffa6"
            active-text-color="#ffffff"
            @select="handleClick"
          >
            <SubMenu :menuList="menuData" />
          </el-menu>
        </el-scrollbar>
      </div>
    </div>

    <div class="right-layout">
      <div class="header">
        <Header />
      </div>

      <Tabs />

      <div
        class="content"
        :style="{ padding: !route.meta?.mainFull ? '16px' : 0 }"
        v-loading="enableMainLoading && mainLoading"
      >
        <Main />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { filterMenuData } from '@/router/utils'
import useSystemStore from '@/store/modules/system'
import usePermissionStore from '@/store/modules/permission'
import SubMenu from '../components/SubMenu/index.vue'
import Header from '../components/Header/index.vue'
import Tabs from '../components/Tabs/index.vue'
import Main from '../components/Main/index.vue'
import LogoSvg from '@/assets/imgs/logo.svg?component'

defineOptions({
  name: 'LayoutVertical'
})

const router = useRouter()
const route = useRoute()

const systemStore = useSystemStore()

const { isDark, menuAccordion, enableMainLoading, mainLoading } = storeToRefs(systemStore)

const isCollapse = computed(() => systemStore.sideBar.isCollapse)
const sideBarWidth = computed(() => (isCollapse.value ? '64px' : '210px'))
const activeKey = computed(() => route.path)
const menuData = computed(() => filterMenuData(usePermissionStore().menuList))

function handleClick(key: string) {
  // 获取点击的路由
  const clickRoute = router.getRoutes().find(item => item.path === key) as RouteRecordRaw

  // 外部链接
  if (clickRoute.meta?.link) {
    return window.open(clickRoute.meta?.link as string, '_blank')
  }

  router.push(key)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

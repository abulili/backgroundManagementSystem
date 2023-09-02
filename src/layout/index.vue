<template>
    <el-container class="app-wrapper">
        <el-aside :width="asideWidth" class="sidebar-container">
            <Menu />
        </el-aside>
        <el-container class="container" :class="{ hidderContainer: !$store.getters.siderType }">
            <el-header>
                <Headers />
            </el-header>
            <el-main>
                <Users />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import Menu from './Menu'
import Headers from './headers'
import Users from '../views/users/index.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
// const asideWidth = ref('210px')
const asideWidth = computed(() => {
    return store.getters.siderType ? '210px' : '67px'
})
</script>

<style lang="scss" scoped>
.app-container {
    position: relative;
    width: 100%;
    height: 100%;
}

// 用到的变量来自style,一个是每次用的时候导入,另一个到webpack文件进行导入(vue.config.js)
.container {
    width: calc(100% - $sideBarWidth);
    height: 100%;

    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    transition: all 0.28s;

    &.hidderContainer {
        width: calc(100% - $hideSideBarWidth);
    }
}

::v-deep .el-header {
    padding: 0;
}
</style>
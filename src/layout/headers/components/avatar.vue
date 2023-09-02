<template>
    <el-dropdown>
        <span class="el-dropdown-link">
            <el-avatar shape="square" :size="40" :src="squareUrl" />
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const squareUrl = ref('https://img1.baidu.com/it/u=3582949841,1840975062&fm=253&fmt=auto&app=120&f=JPEG?w=802&h=500')

const logout = () => {
    store.dispatch('app/logout')
}
</script>

<style lang="scss" scoped>
::v-deep .el-dropdown-item {
    white-space: nowrap;
}
</style>
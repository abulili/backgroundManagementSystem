<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
            <!-- <span class="no-redirect" v-if="index === breadcrumbList.length - 1">{{ item.name }}</span>
            <span class="redirect" v-else @click="handleRedirect(item.path)">{{ item.name }}</span> -->
            <span class="no-redirect" v-if="index === breadcrumbList.length - 1">{{ $t(`menus.${item.name}`) }}</span>
            <span class="redirect" v-else @click="handleRedirect(item.path)">{{ $t(`menus.${item.name}`) }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
// 显示的数据从路由中取
import { useRoute, useRouter } from 'vue-router'
import { watch, ref } from 'vue'
const route = useRoute()
const router = useRouter()
const breadcrumbList = ref([])

const initBreadcrumbList = () => {
    breadcrumbList.value = route.matched
    console.log(route.matched)
}
const handleRedirect = (path) => {
    router.push(path)
}
// 监听,做出相应动作
watch(route, () => {
    initBreadcrumbList()
}, { deep: true, immediate: true })
</script>

<style lang="scss" scoped>
.no-redirect {
    color: #97a8be;
    cursor: text;
}

.redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        color: $menuBg;
    }
}
</style>
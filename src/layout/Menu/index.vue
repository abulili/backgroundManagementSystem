<template>
    <el-menu :active-text-color="$menuActiveText" :background-color="'$menuBg'" class="el-menu-vertical-demo"
        :default-active="defaultActive" text-color="#bfcbd9" router unique-opened :collapse="!$store.getters.siderType">
        <!-- 这里的颜色?不明白不理解 -->
        <!-- 添上路由 -->
        <el-sub-menu :index="item.id" v-for="(item, index) in menusList" :key="item.id">
            <template #title>
                <el-icon>
                    <component :is="iconList[index]"></component>
                </el-icon>
                <span>{{ item.authName }}</span>
            </template>
            <el-menu-item :index="'/' + it.path" v-for="it in item.children" :key="it.id" @click="savePath(it.path)">
                <template #title>
                    <el-icon>
                        <component :is="icon"></component>
                    </el-icon>
                    <span>{{ $t(`menus.${it.path}`) }}</span>
                </template>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
    <!-- 然后去上一级的index导入并使用 -->
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
// import variables from '@/styles/variables.scss'
const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')

const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const menusList = ref([])
const initMenuList = async () => {
    menusList.value = await menuList()
    console.log('test')
}
initMenuList()

const savePath = (path) => {
    sessionStorage.setItem('path', `/${path}`)
}
</script>

<style lang="scss" scoped></style>
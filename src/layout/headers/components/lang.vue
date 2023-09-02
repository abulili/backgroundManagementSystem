<template>
    <el-dropdown @command="handleCommand">
        <svg-icon icon="language"></svg-icon>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="zh" :disabled="currentLanguge === 'zh'">中文</el-dropdown-item>
                <el-dropdown-item command="en" :disabled="currentLanguge === 'en'">English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
// 如果是中文的状态拿中文就不应该被选中
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useStore } from 'vuex'
const i18n = useI18n()
const stroe = useStore()

const currentLanguge = computed(() => {
    return i18n.locale.value
})

const handleCommand = (val) => {
    // console.log(val)
    i18n.locale.value = val
    stroe.commit('app/changLang', val)
    localStorage.setItem('lang', val)
}
</script>

<style lang="scss" scoped></style>
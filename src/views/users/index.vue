<template>
    <el-card>
        <el-row :gutter="20" class="header">
            <el-col :span="7">
                <el-input :placeholder="$t('table.placeholder')" clearable v-model="queryForm.query"></el-input>
            </el-col>
            <el-button type="primary" :icon="Search" @click="initGetUsersList">{{ $t('table.search') }}</el-button>
            <el-button type="primary">{{ $t('table.adduser') }}</el-button>
        </el-row>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column :prop="item.prop" :label="$t(`table.${item.label}`)" v-for="(item, index) in options"
                :key="index" :width="item.width">
                <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
                    <el-switch v-model="row.mg_state" @change="changeState(row)" />
                </template>
                <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
                    <!-- <el-switch v-model="row.create_time" /> -->
                    {{ $filters.filterTime(row.create_time) }}
                </template>
                <!-- 这里两个V-if会报错:在 Vue.js 中，一个元素只能被分配给一个插槽，而不能被分配给多个插槽。如果你尝试将一个元素分配给多个插槽，就会出现这个错误。 -->
                <template #default v-else-if="item.prop === 'action'">
                    <el-button type="primary" size="small" icon="Edit"></el-button>
                    <el-button type="warning" size="small" icon="Setting"></el-button>
                    <el-button type="danger" size="small" icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block">
            <div class="demonstration">All combined</div>
            <el-pagination v-model:current-page="queryForm.pagenum" v-model:page-size="queryForm.pagesize"
                :page-sizes="[2, 5, 10, 15]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </el-card>
</template>

<script setup>
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getUser, changeUserState } from '@/api/users'
import { options } from './options'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const queryForm = ref({
    query: '',
    pagenum: 1,
    pagesize: 2
})
const total = ref(0)

const tableData = ref([])

const initGetUsersList = async () => {
    const res = await getUser(queryForm.value)
    // console.log(res)
    total.value = res.total
    tableData.value = res.users
}
initGetUsersList()

// 页面改变的方法
const handleSizeChange = (pageSize) => {
    queryForm.value.pagenum = 1
    queryForm.value.pagesize = pageSize
    initGetUsersList()
}
const handleCurrentChange = (pageNum) => {
    queryForm.value.pagenum = pageNum
    initGetUsersList()
}
// 增删改
const changeState = (info) => {
    changeUserState(info.id, info.mg_state)
    ElMessage({
        message: i18n.t('message.updeteSuccess'), // zh.js
        type: 'success'
    })
}
</script>

<style lang="scss" scoped></style>
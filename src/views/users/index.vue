<template>
    <el-card>
        <el-row :gutter="20" class="header">
            <el-col :span="7">
                <el-input :placeholder="$t('table.placeholder')" clearable v-model="queryForm.query"></el-input>
            </el-col>
            <el-button type="primary" :icon="Search" @click="initGetUsersList">{{ $t('table.search') }}</el-button>
            <el-button type="primary" @click="handleDalogValue()">{{ $t('table.adduser') }}</el-button>
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
                <template #default="{ row }" v-else-if="item.prop === 'action'">
                    <el-button type="primary" size="small" icon="Edit" @click="handleDalogValue(row)"></el-button>
                    <el-button type="warning" size="small" icon="Setting"></el-button>
                    <el-button type="danger" size="small" icon="Delete" @click="delUser(row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="queryForm.pagenum" v-model:page-size="queryForm.pagesize"
                :page-sizes="[2, 5, 10, 15]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </el-card>
    <!-- 把值传过去  v-if="dialogVisible":每次出来都是空的-->
    <Dialog v-model="dialogVisible" :dialogTitle="dialogTitle" v-if="dialogVisible" @initUserList="initGetUsersList"
        :dialogTableValue="dialogTableValue" />
</template>

<script setup>
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getUser, changeUserState, deleteUser } from '@/api/users'
import { options } from './options'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Dialog from './components/dailog'
import { isNull } from '@/utils/filters' // 编辑和添加的判断

const i18n = useI18n()
const queryForm = ref({
    query: '',
    pagenum: 1,
    pagesize: 2
})
const total = ref(0)

const tableData = ref([])
// dailog里 这个值决定是否隐藏
const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogTableValue = ref({})

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

const handleDalogValue = (row) => {
    if (isNull(row)) {
        dialogTitle.value = '添加用户'
        dialogTableValue.value = {}
    } else {
        dialogTitle.value = '编辑用户'
        dialogTableValue.value = JSON.parse(JSON.stringify(row))
        // 写入标签再传过去
    }
    dialogVisible.value = true
}

const delUser = (row) => {
    ElMessageBox.confirm(
        i18n.t('dialog.deleteTitle'),
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }
    )
        .then(async () => {
            await deleteUser(row.id)
            ElMessage({
                type: 'success',
                message: 'Delete completed'
            })
            initGetUsersList()
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled'
            })
        })
}
</script>

<style lang="scss" scoped>
.header {
    padding-bottom: 16px;
    box-sizing: border-box;
}

::v-deep .el-input__suffix {
    align-items: center;
}

::v-deep .el-pagination {
    padding-top: 16px;
    box-sizing: border-box;
    text-align: right;
}
</style>
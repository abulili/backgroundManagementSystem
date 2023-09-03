// 处理时间 day.js
const dayjs = require('dayjs')

const filterTime = (val, format = 'YYYY-MM-DD') => {
    if (!isNull(val)) {
        val = parseInt(val) * 1000 // 因为是十位的时间戳
        return dayjs(val).format(format)
    } else {
        return '--'
    }
}

export const isNull = (date) => {
    if (!date) return true
    if (JSON.stringify(date) === '[]') return true
    if (JSON.stringify(date) === '{}') return true
}

export default (app) => {
    // 传到全局应用,还要去main.js导入
    app.config.globalProperties.$filters = {
        filterTime
    }
}

// 路由守卫
import router from './index'
import store from '@/store'
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    // 方便拿token 创建getters
    if (store.getters.tokken) {
        if (to.path === '/login') {
            next('/')
            // 到首页
        } else {
            next()
            // 随便取
        }
    } else {
        // 白名单
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})
// 进行封装
import { watch } from 'vue'
import store from '@/store'
// getter里取
export const watchLang = (...cbs) => {
    watch(
        () => store.getters.lang,
        () => {
            cbs.forEach((cb) => cb(store.getters.lang))
        },
        { deep: true }
    )
}

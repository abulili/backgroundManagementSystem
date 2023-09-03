import request from './request'

export const getUser = (params) => {
    return request({
        url: '/users',
        params
    })
}

// 实现增删改的功能
export const changeUserState = (uid, type) => {
    return request({
        url: `users/${uid}/state/${type}`,
        method: 'put'
    })
}
import request from '@/utils/request.js'

/**
 * 数据可视化
 */
export const getDataTotal = () => {
    console.log('--------getDataTotal--------')
    return request({
        url: '/finlr/data/total',
        method: "post"
    })
}

export const getDataLeftTop = (params) => {
    console.log('--------getDataLeftTop--------')
    return request({
        url: '/finlr/data/leftTop',
        method: "post",
        data: params
    })
}


export const getDataLeftBottom = (params) => {
    console.log('--------getDataLeftBottom--------')
    return request({
        url: '/finlr/data/leftBottom',
        method: "post",
        data: params
    })
}

export const getDataRightTop = (params) => {
    console.log('--------getDataRightTop--------')
    return request({
        url: '/finlr/data/rightTop',
        method: "post",
        data: params
    })
}

export const getDataRightBottom = (params) => {
    console.log('--------getDataRightBottom--------')
    return request({
        url: '/finlr/data/rightBottom',
        method: "post",
        data: params
    })
}


export const getDataUsers = () => {
    console.log('--------getDataUsers--------')
    return request({
        url: '/finlr/data/users',
        method: "get"
    })
}
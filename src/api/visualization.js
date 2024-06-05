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

export const getDataLeftTop = () => {
    console.log('--------getDataLeftTop--------')
    return request({
        url: '/finlr/data/leftTop',
        method: "post"
    })
}


export const getDataLeftBottom = () => {
    console.log('--------getDataLeftBottom--------')
    return request({
        url: '/finlr/data/leftBottom',
        method: "post"
    })
}

export const getDataRightTop = () => {
    console.log('--------getDataRightTop--------')
    return request({
        url: '/finlr/data/rightTop',
        method: "post"
    })
}
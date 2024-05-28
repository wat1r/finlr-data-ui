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


export const getDataTest1 = () => {
	console.log('--------getDataTest1--------')
	return request({
		url: '/finlr/data/test1',
		method: "post"
	})
}


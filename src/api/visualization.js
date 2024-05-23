import request from '@/utils/request.js'

/**
 * 数据可视化
 */
export const getDataTest = () => {
	console.log('----------------')
	return request({
		url: '/finlr/data/test',
		method: "post"
	})
}

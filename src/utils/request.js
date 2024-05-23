import axios from 'axios'

console.log('--------C--------')

const baseURL = '/api';

const service = axios.create({

	baseURL: baseURL,
	// baseURL: process.env.BASE_URL,
	timeout: 5000,
	withCredentials: true
})

// // 请求拦截器
// service.interceptors.request.use(
// 	(config) => {
// 		config.headers.icode = 'input you icode'
// 		return config // 必须返回配置
// 	},
// 	(error) => {
// 		return Promise.reject(error)
// 	}
// )

// 响应拦截器
service.interceptors.response.use((response) => {
	const { code, msg, data } = response.data
	console.log("code:"+code)
	//   要根据success的成功与否决定下面的操作
	if (code ==200 ) {
		return data
	} else {
		return Promise.reject(new Error(message))
	}
})

export default service

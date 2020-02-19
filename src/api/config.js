/** 
 * 封装 axios 配置
*/
import axios from 'axios'

export const baseUrl = 'http://localhost:4000'

const axiosInstance = axios.create({
    baseURL: baseUrl,
})

axiosInstance.interceptors.response.use(res => res.data, err => {
    console.log(err, '网络请求错误')
}
)

export {
    axiosInstance
}
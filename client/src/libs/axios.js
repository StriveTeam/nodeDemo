import axios from 'axios'

// const checkStatus = response => {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//   const error = new Error('请求错误');
//   throw error;
// };

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        this.queue[url] = true
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url)
        // console.log(res);
        if (!(res.status >= 200 && res.status < 300) || res.data.code !== 200) {
          console.log(res) // 统一处理错误信息提示等
        }
        const { data, status } = res
        return { data, status }
      },
      error => {
        this.destroy(url)
        let errorInfo = error.response
        if (!errorInfo) {
        }
        return Promise.reject(error)
      }
    )
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest

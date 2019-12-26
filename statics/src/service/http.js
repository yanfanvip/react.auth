import axios from 'axios'
import { Message } from '@alifd/next';
import { Loginout } from '@/components/Auth'

axios.interceptors.response.use(response =>response , (err) => {
    if (err && err.response) {
      if(err.response.status == 400 || err.response.status == 401 || err.response.status == 402 || err.response.status == 403){ 
        Message.error("登录超时, 请重新登录");
        Loginout()
        return
      }
      if(err.response.data && err.response.data.message){
        err.message = err.response.data.message
      }else{
        switch (err.response.status) {
          case 400: err.message = '请求错误(400)' ; break;
          case 401: err.message = '未授权，请重新登录(401)'; break;
          case 403: err.message = '拒绝访问(403)'; break;
          case 404: err.message = '请求出错(404)'; break;
          case 408: err.message = '请求超时(408)'; break;
          case 500: err.message = '服务器错误(500)'; break;
          case 501: err.message = '服务未实现(501)'; break;
          case 502: err.message = '网络错误(502)'; break;
          case 503: err.message = '服务不可用(503)'; break;
          case 504: err.message = '网络超时(504)'; break;
          case 505: err.message = 'HTTP版本不受支持(505)'; break;
          default: err.message = `连接出错(${err.response.status})!`;
        }
      }
    }else{
        err.message = '连接服务器失败!'
    }
    Message.error(err.message);
    return Promise.reject(err);
});

axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'

export default {
  async fetchGet (url, params={}) {
    if(params){
      let search = new URLSearchParams(params).toString()
      if(search){
        if(url.indexOf('?') == -1){
          url += "?" + search;
        }else{
          url += "&" + search;
        }
      }
    }
    let data = await axios.get(url, { withCredentials:true, headers : fetchHeader() })
    return after(data)
  },
  async fetchPost (url, params = {}) {
    let data = await axios.post(url, params , { withCredentials:true, headers : fetchHeader() })
    return after(data)
  }
}

export const fetchHeader = () => {
  return { }
}

export const after = (data) => {
  if(data == null){ throw { message : '连接出错' }  }
  if(data.state < 200 || data.state >= 400){
    Message.error(data.statusText);
    throw { message : data.statusText } 
  }
  if(data.data.code != 0){
    Message.error(data.data.message);
    throw { message : data.data.message } 
  }
  return data.data.data
}

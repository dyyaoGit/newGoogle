import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router'
const baseURL = '/api/admin'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

const xhr = {
  get (url, data, config) {
    return new Promise((resolve, reject) => {
      instance.get(url, {params: data}, config).then(res => {
          if (res.data.code == 401){
            Message.error('登录状态失效，正在跳转登录页')
            router.push('/login')
          }
          resolve(res.data)
      })
    })
  },
  post (url, data, config) {
    return new Promise((resolve, reject) => {
      instance.post(url, data, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  fetch (url, data, config, methods) {
    return new Promise((resolve, reject) => {
      instance[methods](url, data, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  put (url, data, config) {
    return this.fetch(url, data, config, 'put')
  }
}

export const $axios = xhr

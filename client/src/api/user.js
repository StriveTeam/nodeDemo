import axios from '@/libs/api.request'

export const login = val => {
  return axios.request({
    url: '/api/user/login',
    method: 'post',
    data: val
  })
}

export const userAdd = val => {
  return axios.request({
    url: '/api/user/add',
    method: 'post',
    data: val
  })
}



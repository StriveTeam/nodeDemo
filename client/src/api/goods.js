import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'http://rap2api.taobao.org/app/mock/123081/tableDemoData',
    method: 'get'
  })
}

export const getGoodsList = () => {
  return axios.request({
    url: '/api/goods/list',
    method: 'get'
  })
}

export const getDetail = val => {
  return axios.request({
    url: '/api/goods/detail',
    method: 'post',
    data: val
  })
}

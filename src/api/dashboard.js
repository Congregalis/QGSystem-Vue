import request from '@/utils/request'

export function getPicData(params) {
    return request({
      url: '/question/score',
      method: 'get',
      params
    })
  }
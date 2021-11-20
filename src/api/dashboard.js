import request from '@/utils/request'

export function getPicData(params) {
  return request({
    url: '/question/score',
    method: 'get',
    params
  })
}

export function getDistributionData(params) {
  return request({
    url: '/question/distribution',
    method: 'get',
    params
  })
}

export function getTypeData(params) {
  return request({
    url: '/question/type',
    method: 'get',
    params
  })
}
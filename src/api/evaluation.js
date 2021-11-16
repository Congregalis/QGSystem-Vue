import request from '@/utils/request'

export function getFirstUnchecked(params) {
  return request({
    url: '/question/unchecked',
    method: 'get',
    params
  })
}

export function getRandom(params) {
  return request({
    url: '/question/random',
    method: 'get',
    params
  })
}

export function updateQuestion(params) {
  return request({
    url: '/question/update',
    method: 'post',
    params
  })
}

export function rateQuestion(params) {
  return request({
    url: '/question/rate',
    method: 'post',
    params
  })
}

export function deleteQuestion(params) {
  return request({
    url: '/question/' + params.id,
    method: 'delete',
  })
}
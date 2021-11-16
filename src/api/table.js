import request from '@/utils/request'

export function getList(params) {
  // // MOCK
  // return request({
  //   url: '/vue-admin-template/table/list',
  //   method: 'get',
  //   params
  // })
  return request({
    url: '/question/all/' + params.pageNumber,
    method: 'get',
    params
  })
}

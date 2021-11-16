import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login?' + 'username=' + data.username + '&' + 'password=' + data.password,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/' + token ,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

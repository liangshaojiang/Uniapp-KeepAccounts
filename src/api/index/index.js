import request from '@/common/request.js'
export function login(data,success,fail,complete) {
  return request({
    url: '/App/Account/Login',
    method: 'post',
    data,
    success,
	fail,
    complete
	// ,
	//  transformRequest: [
	//       function(data) {
	//         let ret = ''
	//         for (const it in data) {
	//           ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
	//         }
	//         ret = ret.substring(0, ret.lastIndexOf('&'))
	//         return ret
	//       }
	//     ],
  })
}

export function getUserInfo(data,success,fail,complete) {
  return request({
    url: '/App/Account/GetUserInfo',
    method: 'Post',
    data ,
    success,
	fail,
    complete
  })
}

export function oAuthLogin(data,success,fail,complete) {
  return request({
    url: '/App/Account/OAuthLogin',
    method: 'Post',
    data ,
    success,
	fail,
    complete
  })
}
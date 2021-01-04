import request from '@/common/request.js'
 
export function getBookClassList(data,success,fail,complete) {
  return request({
    url: '/App/BookClass/GetBookClassList',
    method: 'Post',
    data ,
    success,
	fail,
    complete
  })
}
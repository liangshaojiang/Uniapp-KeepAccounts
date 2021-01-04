import request from '@/common/request.js'
 
export function bookSave(data,success,fail,complete) {
  return request({
    url: '/App/Book/Save',
    method: 'Post',
    data ,
    success,
	fail,
    complete
  })
}

export function getBookList(data,success,fail,complete) {
  return request({
    url: '/App/Book/GetBookList',
    method: 'Post',
    data ,
    success,
	fail,
    complete
  })
}
export function deleteBook(data,success,fail,complete) {
  return request({
    url: '/App/Book/DeleteBook',
    method: 'Post',
    data ,
    success,
	fail,
    complete
  })
}
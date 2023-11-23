 


export function  getUserProfile() {
    return new Promise((resolve, reject) => {
      uni.getUserProfile({
        lang: 'zh_CN',
        desc: '用户登录',
        success: (res) => {
          resolve(res)
          // res.encryptedData,
          // res.iv
        },
        // 失败回调
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  
  
   export  function silentLogin() {
      return new Promise((resolve, reject) => {
        uni.login({
          success (res) {
            resolve(res)
          },
          fail (err) {
            reject(err)
          }
        })
      })
    }
  
  
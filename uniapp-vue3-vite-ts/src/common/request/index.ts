export const request = (config: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...config,
      success: (res) => {
        console.log(res)

        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

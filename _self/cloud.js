var pset = require('application.js')
function CallCloudFuncAndSetStorge(funcname,insertstorge,storgekey,data){
  return new Promise(function (resolve, reject){
    wx.cloud.callFunction({
      // 要调用云函数的名称
      name: "openapi",
      // 传递给云函数的参数
      data:data,
      success: res => {
        console.log(res)
        resolve(res.result.openid)
        if (pset.LogConfig.StorgeLog) { console.log('缓存设置成功,key为:' + storgekey) }
        if (insertstorge) {
          wx.setStorageSync(storgekey, res.result)
        }
      }, fail: (res)=> {
        console.log(res)
        if (pset.LogConfig.StorgeLog) { console.log('缓存设置失败') }
        reject("callfuncfail")
      }
    })
  })
}
function CallCloudFunc(funcname,data){
  return new Promise(function (resolve, reject) {
    wx.cloud.callFunction({
      name: "clouddb",
      data:data,
      success: res => {
        resolve(res)
        console.log(res)
      }, fail: res => {
        reject('callfuncfail')
      }
    })
  })
}
module.exports = {
  CallCloudFuncAndSetStorge: CallCloudFuncAndSetStorge,
  CallCloudFunc: CallCloudFunc
}
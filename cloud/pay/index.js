// 云函数代码
const cloud = require('wx-server-sdk')
cloud.init({
  env: "cloudbase-3grpy11vf179fdac"
})

exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "body" : "电车搭乘",
    "outTradeNo" : event.outTradeNo,
    "spbillCreateIp" : "127.0.0.1",
    "subMchId" : "1604371057",
    "totalFee" : 1,
    "envId": "cloudbase-3grpy11vf179fdac",
    "functionName": "pay_cb"
  })
  return res
}
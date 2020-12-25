// 云函数代码
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloudbase-3grpy11vf179fdac'
})

exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "body":"顺哒校园",
    "nonceStr":"1217752501201407033233368032",
    "outTradeNo":"1217752501201407033233368055",
    "spbillCreateIp":"127.0.0.1",
    "subMchId":"1604371057",
    "totalFee":1,
    "envId":"cloudbase-3grpy11vf179fdac",
    "tradeType":"JSAPI",
    "functionName":"pay_cb"
  })
  return res
}
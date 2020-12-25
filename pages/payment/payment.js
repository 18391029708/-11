// pages/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  pay:function(){
    let that = this;
    var timestamp = Date.parse(new Date());
    console.log(timestamp)
    timestamp = timestamp / 1000;
    wx.cloud.callFunction({
      name:'pay',
      data: {
        outTradeNo:timestamp+timestamp+timestamp+'ABC',

      },
      
      success: res => {
        console.log(res)
        // const payment = res.result.payment
        wx.requestPayment({
          timeStamp: 'res.result.paymentt.timeStamp',
          nonceStr: 'res.result.payment.ninceStr',
          package: 'res.result.payment.package',
          signType: 'MD5',
          paySign: 'res.result.payment.paySign',
          success (res) {
            wx.showToast({
              title: '支付成功',
            })
            console.log('pay success', res)
          },
          fail (res) {
            console.error('pay fail', err)
          }
        })
      },
      fail: console.error,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
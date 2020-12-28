// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  oldPasswordInput:function(e){
    console.log(e)
    this.setData({
      oldPassword:e.detail.value
    })
    console.log(this.data.oldPassword)
  },
  newPasswordInput:function(e){
    console.log(e)
    this.setData({
      newPassword:e.detail.value
    })
    console.log(this.data.newPassword)
  },
  orderMeeting:function(){
    var oldPassword = this.data.oldPassword;
    console.log(oldPassword)
    var newPassword = this.data.newPassword;
    console.log(newPassword)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // set:function(){
  //   wx.navigateTo({
  //     url: '../mymessage/mymessage',
  //   })
  // },s

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
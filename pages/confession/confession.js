// pages/campus/campus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lostLists:[],
    nickName:'',
    headImg:''


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
    var that=this;
    console.log(1)
    wx.getUserInfo({
      success(res){
        console.log(res)
        console.log(res.userInfo.nickName)
        that.setData({
          // nickName:res.userInfo.nickName,
          // headImg:res.userInfo.avatarUrl
          lostLists:res.userInfo
        })
        console.log(that.data.lostLists.avatarUrl)
      },
      
    })
    console.log(that.data.nickName,that.data.headImg)

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
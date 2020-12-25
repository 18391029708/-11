// pages/personal/myway/myway.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //   array:[
      
  //   {message:'起点：111，终点222'},
  //   {message:'起点：333，终点444'},
  //   {message:'起点：1333，终点1444'},
  // ],
  status:'正在进行',
  // status:[{ing:'正在进行'},
  //         {ed:'已完成'}
  //       ],
  EndPosition:'',
  position:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var wayData = getApp().globalData.wayData
    console.log(wayData)
    this.setData({
      EndPosition: wayData.EndPosition,
      position:wayData.position,
     })

    

  },
  detail:function(){
    wx.navigateTo({
      url:'../detail/detail',    
      success: function(res) {
       
      }
    })
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
    // 当车手端确认完成订单时，改变乘客订单状态为 已完成
    // this.setData({
    //   status:'已完成'
    // })

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
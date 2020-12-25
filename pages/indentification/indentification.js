// pages/indentification/indentification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    userName:'王小林',
    idNo:'20201998321614598796213',
    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getUserInfo({
      success(res) {
        console.log(res);
        wx.setStorageSync('userdata', res.userInfo );
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
    console.log(this.data.idNo,this.data.userName)


  },
  userInfo:function(){
    wx.navigateTo({
      url: "../userInfo/userInfo",
    })
  },
  // cardImage:function(){
  //   wx.navigateTo({
  //     url: "../cardImage/cardImage",
  //   })
  // },
  // faceIdentification:function(){
  //   wx.navigateTo({
  //     url: "../faceIdentification/faceIdentification",
  //   })
  // },
  electricVehicle:function(){
    wx.navigateTo({
      url: "../electricVehicle/electricVehicle",
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
   
    if(this.data.userName!='' && this.data.idNo!=''){
      var pages = getCurrentPages();
      var currPages =pages[pages.length - 1];
      var prevPage = pages[pages.length - 3];
      prevPage.setData({
        chooseBtn:false

    })
    // console.log(prevPage.data.chooseBtn)
    
  }

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
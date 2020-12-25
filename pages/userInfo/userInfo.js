// pages/userInfo/uwerInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
    name:'0000',
    gender:'',
    id:'00000000',
    addr:'',
    valid_date:''

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  // updata:function(){
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
 
  onShow: function () {
    // success: function (e) {
    //   console.log(e)
    //   this.setData({
    //     name:e.detail.name.text,
    //     id:e.detail.id.text,
    //     gender:e.detail.gender.text,
    //     addr:e.detail.address.text,
    //     // valid_date:e.detail.valid_date.text
        
    //   })
      var that = this;
      var pages = getCurrentPages();
      var currPages =pages[pages.length - 1];
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
      userName:that.data.name,
      idNo:that.data.id
  })
   
    // Success: function (e) {
    //   console.log(e)
    //   this.setData({
    //      valid_date:e.detail.valid_date.text
    //   })
    // }
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
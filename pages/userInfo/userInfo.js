// pages/userInfo/uwerInfo.js
const timeutil = require('../../utils/TimeUtil.js');
const app = getApp()
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
  success: function (e) {
    console.log(e)
    this.setData({
      name:e.detail.name.text,
      id:e.detail.id.text,
      gender:e.detail.gender.text,
      addr:e.detail.address.text,
      // valid_date:e.detail.valid_date.text
      
    })
    // 前一个页面获取数据
    var that = this;
    var pages = getCurrentPages();
    var currPages =pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
    userName:that.data.name,
    idNo:that.data.id
})
// 数据存储数据库
wx.cloud.callFunction({
  name:'clouddb',
  data:{
    opr:'add',
    tablename:'electrocar_list',
    data:{
      create_time: timeutil.TimeCode(new Date()),
      update_time: timeutil.TimeCode(new Date()),
     
      userid: app.globalData.openid,
     name:this.data.name,
     identityCardNo:this.data.id,
     sex:this.data.gender

    }
  }
})
  },
  Success: function (e) {
    console.log(e)
    this.setData({
       valid_date:e.detail.valid_date.text
    })
  },
 
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
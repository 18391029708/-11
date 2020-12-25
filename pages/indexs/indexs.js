// pages/index/index.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    indicatorDots:true,
    vertical:false,
    autoplay:true,
    interval:3000,
    duration:1000,
    hidden2:app.globalData.hidden2,
    
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var hidden2;
    // hidden2:app.globalData.hidden2;
    // var hidden3;
      
    // this.setData({
    //   hidden2:app.globalData.hidden2,
      
    //  });
    //  console.log(hidden2) 
     
    

  },
  onShow:function(){
     this.setData({
      hidden2:app.globalData.hidden2,
      
     });
  },
  confession:function(){
    wx.navigateTo({
      url: '../confession/confession',
    })
  },
  lost:function(){
    wx.navigateTo({
      url: '../lost/lost',
    })

  },


  mapTap:function(){
    wx.navigateTo({
      url:'../map/map',
    })
  },
  driverForm:function(){
    wx.navigateTo({
      url: '../driverForm/driverForm',
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
//  onShow: function () {
//    if(driver)
//    {
//      wx.navigateTo({
//        url: '../driverPage/driverPage',
//      })
//    }
  

//  },

})
// pages/confirm/confirm.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    EndPosition: '999',
    position:'o',
    confirmData:""
    
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;   //why can't use 'this'
    
   
    const eventChannel = this.getOpenerEventChannel()
   
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
      that.setData({
        EndPosition: data.data.EndPosition,
        position:data.data.position
      })
    })
    console.log(1)
    
    console.log(this.data)   //this 可以使用
  },
  // updata:function(){
  //   clear ="../map/map.js",
  //   console.log(clear.data)

  // },



  
  payMent:function(){
    var that = this;
    console.log(this.data)
    getApp().globalData.wayData = this.data;
    wx.switchTab({
      url:'../myway/myway',
     
    })
  }
})
// pages/confirm/confirm.js

const TimeUtil = require("../../utils/TimeUtil");
const timeutil = require('../../utils/TimeUtil.js');

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
    console.log(that.data.EndPosition,that.data.position)
    console.log(1)
    console.log(this.data)   //this 可以使用
  },
  // updata:function(){
  //   clear ="../map/map.js",
  //   console.log(clear.data)
  // },
  payMent:function(){
    wx.showToast({
      title: "请稍等...",
      icon: 'loading',
      // duration: 4000
    });
    let that = this;
    var timestamp = Date.parse(new Date());
    console.log(timestamp)
    timestamp = timestamp / 1000;
    // var outTradeNo = timestamp+timestamp+timestamp+'abc';
    wx.cloud.callFunction({
      name:'pay',
      data: {
        outTradeNo:timestamp+timestamp+timestamp+'abc'
      },
      success: res => {
        console.log(res)
        const payment = res.result.payment
    wx.requestPayment({
      ...payment,
      success(res) {
        console.log('pay success', res)
        wx.cloud.callFunction({
          name:'clouddb',
          data:{
            opr:'add',
            tablename:'way_list',
            data:{
              create_time: timeutil.TimeCode(new Date()),
              update_time: timeutil.TimeCode(new Date()),
             specifyGender:'',
              _openid: app.globalData.openid,
              end_position: that.data.EndPosition,
              way_status: '正在进行',
              scheduling: '等待接单',
              start_position: that.data.position 
    
            }
          }
        })
        wx.showToast({
          title: "支付成功你最美",
          icon: 'loading',
          duration: 4000
        });
        
        setTimeout(function(){
           console.log(this.data)
          getApp().globalData.wayData = this.data;
          wx.switchTab({
            url:'../myway/myway',
          })  
        },3000)
    //      getApp().globalData.wayData = this.data;
    // wx.switchTab({
    //   url:'../myway/myway',
     
    // })
      },
      fail: console.error
    })
  },
  // fail: console.error,
})
    // var that = this;
    // console.log(this.data)
    // getApp().globalData.wayData = this.data;
    // wx.switchTab({
    //   url:'../myway/myway',
     
    // })
  }
})
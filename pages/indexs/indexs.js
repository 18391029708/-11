// pages/index/index.js
const TimeUtil = require("../../utils/TimeUtil");
const timeutil = require('../../utils/TimeUtil.js');

const db = wx.cloud.database();
// const _ = db.command

var app = getApp();

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

    
    console.log(app.globalData.openid)
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res);
        that.latitude = res.latitude;
        that.longitude = res.longitude;
        console.log('当前经度',that.latitude);
        console.log('当前纬度',that.longitude);
        console.log(res.latitude)
        let speed = res.speed;
        let accuracy = res.accuracy;
        console.log(app.globalData)
        console.log(app.globalData.openid)

        // 获取经纬度添加数据库
        db.collection('common_userInfo_list').add({
          data:{
            latitude :  that.latitude,
            longitude : that.longitude,
            sex:'',
            nickName:'',
            schoolNumber:'',
            // _openid:app.globalData.openid,
            studentNumber:'',
            realName:'',
            idCardNo:'',
            vehicleInformation:{
              have:'false',
              vehicleId:'',
            }
        },
        // success: function(res) {
        //   console.log(res)
        // }
      })
      },
      
    })
    // 获取用户微信信息
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              console.log(res.userInfo.gender,res.userInfo.nickName)
              // 更新数据库中微信用户信息
              if(res.userInfo.gender == 1){
                res.userInfo.gender = "男"
              }else if(res.userInfo.gender == 2){
                res.userInfo.gender = "女"
              }else{res.userInfo.gender = "未知"}
              console.log(res.userInfo.gender)
             
              db.collection('common_userInfo_list').where({_openid:app.globalData.openid}).update({
                data: {
                  sex:res.userInfo.gender,
                  nickName:res.userInfo.nickName,
                },
                success: function(res) {
                  console.log(res)
                }
              })
              wx.setStorage({
                key:"nickName",
                data:res.userInfo.nickName},
                {
                  key:"headImage",
                  data:res.userInfo.avatarUrl
                })
               
            }
          })
        }
      }
    })

   
    // wx.cloud.callFunction({
    //   name:'clouddb',
    //   data:{
    //     opr:'add',
    //     tablename:'common_userInfo_list',
    //     data:{
    //       userid: app.globalData.openid,
    //       // latitude =  that.latitude,
    //       // longitude = res.longitude
    //     }
    //   }
    // })
  

    // var hidden2;
    // hidden2:app.globalData.hidden2;
    // var hidden3;
      
    // this.setData({
    //   hidden2:app.globalData.hidden2,
      
    //  });
    //  console.log(hidden2) 
     
    

  },
  onShow:function(){
    console.log(app.globalData.openid)
     this.setData({
      hidden2:app.globalData.hidden2,
     });
     
  },
  confession:function(){
    wx.navigateTo({
      url: '../index/index',
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
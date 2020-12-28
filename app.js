//app.js
// 添加朋友圈
const cloudsets = require('_self/application.js').CloudSetting;
const cloud = require('_self/cloud.js');
// 结束
var app = getApp()
App({

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:'',
    hidden2:false,
    
  },
  onLaunch:function(){
    wx.cloud.init({
      env:"cloudbase-3grpy11vf179fdac"
    })
  },
  
  // globalData:{
  //   openid:'',
  //   userInfo:null
  // },
  //先序执行的函数
  onLaunch: function() {
    env:'cloudbase-3grpy11vf179fdac';
    traceUser: true;
    this.InitCloud();
  },
  InitCloud() {
    var that = this;
    wx.getStorage({
      key: 'wxuserinfo',
      success: function (res) {
        console.log(res)
        that.globalData.userInfo = res.data
      },
      
    })
    console.log(that.globalData.userInfo)
    if (cloudsets.UseCloud) {
      console.log('* 云开发 * √' + ' 服务器:' + cloudsets.CloudId)
      if (!wx.cloud) {
        console.log(' -- 不支持云开发 -- ')
      } else {
        wx.cloud.init({
          env: cloudsets.CloudId,
          traceUser: cloudsets.TraceUser
        })
        //缓存信息
        cloud.CallCloudFuncAndSetStorge('openapi', cloudsets.AdaptStorge, 'userinfo',{action:'getOpenData'}).then(function (res) {
          console.log(res)
        
          if (res != 'callfuncfail') {
            //console.log(res)
            that.globalData.openid = res //给全局变量 openid 赋值
            
          }
        })
        console.log(that.globalData.openid)
        

      }
    } else {
      console.log('* 云开发 * X')

    }
  },
  ModeServer(){
    //模式验证函数,检验是否是管理员 用户 / 黑名单用户
    
  }
  // 朋友圈结束
  
})
const timeutil = require('../../utils/TimeUtil.js');
var app = getApp();
const db = wx.cloud.database('cloudbase-3grpy11vf179fdac');
const _ = db.command;

Page({

  data: {
    hidden: true,
    latitude: "",
    longitude: "",
    theme: ""

  },
  goSign: function () {
    this.setData({
      hidden: true
    })
  },

  taInput(e) {
    console.log(e)
    this.setData({
      queryContent: e.detail.value.trim()
    })
    console.log(this.data.queryContent)
  },

  sign: function () {
  },

  sponsorSign: function () {
    var that = this;
    that.onShow()
    wx.showModal({
      // cancelColor: 'cancelColor',
      title: "提示",
      content: "确认发起签到吗？",
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          var randnum = that.rand(1000, 9999);

          console.log(randnum)
          var s = randnum.toString()
          console.log(s)
          that.setData({
            hidden: false,
            signString: s,
            theme: ''
          })
        }
      }
    })
  },

  rand: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  inputTheme: function (e) {
    console.log(e.detail.value)
    this.setData({
      theme: e.detail.value,
    })
    console.log("主题为")
    console.log(this.data.theme)
  },

  confirm: function () {
    if (this.data.theme == "") {
      //提示
      wx.showToast({
        title: '请输入活动主题',
        icon: 'error',
        duration: 2000,
        mask: true
      })
    } else if (this.data.theme != "" && this.data.signString != "") {
      db.collection('sign_list').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          latitude: this.data.latitude,
          longitude: this.data.longitude,
          theme: this.data.theme,
          signString: this.data.signString
        }
      }).then(res => {
        console.log(res)
        wx.showToast({
          title: '发起成功',
          duration: 2000
        })
      })
      wx.navigateTo({
        url: '../signInfo/signInfo',
      })
    }
  },

  signtheme: function (e) {
    this.setData({
      signtheme: e.detail.value
    })
  },

  //跟上面一样
  signpwds: function (e) {
    this.setData({
      signpwds: e.detail.value
    })
  },

  confirmbtns: function () {
    var that = this;
    console.log(that.data.signtheme)
    console.log(that.data.signpwds)
    db.collection('sign_list').where({
        theme: that.data.signtheme,
        signString: that.data.signpwds
      })
      .get({
        success: function (res) {
          console.log(res.data)
          console.log(res.data[0]._id)
          console.log(that.data.headImage)
          db.collection('sign_list').where({
              _id: res.data[0]._id
            }).update({
              data: {
                signInfo: [{
                  nickName: that.data.nickName,
                  headImage: that.data.headImage,
                  create_time: timeutil.TimeCode(new Date()),
                }]
              }
            })
            .then(res => {
              console.log(res)
            })
          wx.showToast({
            title: '签到成功',
          })
          var hidden = false
          wx.navigateTo({
            url: '../signInfo/signInfo?status=' + hidden,
          })
        }
      })
  },

  onLoad: function (options) {
    var that = this
    //获取本地存储的用户信息
    wx.getStorage({
      key: 'nickName',
      success(res) {
        console.log(res.data)
        that.setData({
          nickName: res.data
        })
      }
    })

    wx.getStorage({
      key: 'headImage',
      success(res) {
        console.log(res.data)
        that.setData({
          headImage: res.data
        })
      }
    })
    console.log(this.data.nickName, this.data.headImage)
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        console.log('当前经度', that.data.latitude);
        console.log('当前纬度', that.data.longitude);
        let accuracy = res.accuracy;
      }
    })
  },
})
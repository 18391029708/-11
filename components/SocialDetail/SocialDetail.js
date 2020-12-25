// components/SocialDetail/SocialDetail.js
const app = getApp();
const usecloud = require('../../_self/application.js').CloudSetting.UseCloud;
const escurl = require('../../_self/application.js').EscSetting.EscDomain;
const db = wx.cloud.database();
const timeutil = require('../../utils/TimeUtil.js');
const cwx = require('profunc.js');
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    id: '',
    circleitem: null,
    content: '',
    comments: [],
    liked: true
  },

  lifetimes:{
    created(){
      var that = this;
    // console.log(options.id)
    //console.log(app.globalData.userInfo)
    wx.getStorage({
      key: 'selcircle',
      success(res) {
        console.log(res)
        that.setData({
          circleitem: res.data
        }, () => {
          console.log(that)
          that.reqThumbs();
          that.reqComment();
        })
      }
    })
      
    }
  },
  /**
   * 组件的方法列表
   */
  
  methods: {
    
    ViewImage(e) {
      wx.previewImage({
        urls: e.currentTarget.dataset.imglist,
        current: e.currentTarget.dataset.url
      });
    },
    pubcom(e) {
      var that = this;
      wx.showLoading({
        title: '上传中',
        mask: true
      })
      console.log(e)
      that.setData({
        content:e.detail
      },()=>{
        cwx.AddRemarks(that.data).then(res => {
          console.log(res);
          that.reqComment();
          //调用组件中的方法
          this.commentBottom = this.selectComponent("#commentBottom");
          this.commentBottom.handleCloseInput();
        })
      })
      
    },
    topub(e) {
      if (e.detail.errMsg == "getUserInfo:ok") {
        console.log('获得授权成功')
        app.globalData.userInfo = e.detail.userInfo;
        wx.setStorageSync('wxuserinfo', e.detail.userInfo)
        //console.log(e.detail.userInfo)
        // wx.navigateTo({

        //   url: 'SocialCirclePub/SocialCirclePub',
  
        // }) 找的方法
        this.triggerEvent('topub', 'helloworld') 
      } else {
        console.log('获得授权失败')
      }

    },
    reqComment() {
      var that = this;
      console.log(that)
      if (usecloud) {
        wx.showLoading({})
        db.collection('remarks_list').where({
          circle_id: that.data.circleitem._id,
       }).get().then(res => {
          console.log(res)
          console.log(that.data)
          that.setData({
            comments: res.data,
            content: '',
          })
          that.data.circleitem.remarksnum = that.data.comments.length
          that.setData({
            remarksnum:that.data.circleitem.remarksnum
          })
          console.log(that)
          wx.hideLoading();
        })
      } else {
        //非云开发请求写在这里
        wx.request({
          url: escurl+'/remark',
          method:'GET',
          data:{
            circleid:that.data.circleitem.id
          },
         success:res=>{
           console.log(res.data)
           that.setData({
            comments: res.data,
            content: ''
          })
         },fail:res=>{
           console.log(res)
         },complete:()=>{
          wx.hideLoading();
         }
        })
      }
    },
    
    ilike() {
      var that = this;
      if (usecloud) {
        wx.showLoading({})
        cwx.AddThumbs(that.data).then(ans => {
          console.log(ans)
          var titem = that.data.circleitem;
          titem.thumbsnum = titem.thumbsnum + 1
          that.setData({
            liked: !liked,
            // circleitem: titem
          })
          console.log(ans);
          wx.hideLoading()
        })
  
      } else {
        //非云开发处理方式写在这里
        wx.showLoading({})
        cwx.AddThumbs(that.data).then(ans => {
          var titem = that.data.circleitem;
          titem.thumbsnum = titem.thumbsnum + 1
          that.setData({
            liked: false,
            circleitem: titem
          })
          wx.hideLoading()
        })
  
      }
    },
    // textAreaBlur(e) {
    //   console.log(e)
    //   console.log(e)
    //   this.setData({
    //     content: e.detail.value
    //   })
    // },
    reqThumbs() {
      //请求看看自己是否喜欢
      var that = this;
      if (usecloud) {
        db.collection('thumbs_list').where({
          userid: app.globalData.openid,
          circle_id: that.data.circleitem._id
        }).get().then(res => {
          console.log(res)
          console.log(res.data)
          if (res.data.length != 0) {
            that.setData({
              liked: false
            })
          }
        })
      } else {
        wx.request({
          url: escurl+'/thumb',
          method:'GET',
          data:{
            userid: app.globalData.userid,
            circleid: that.data.circleitem.id
          },
          success:res=>{
            console.log(res)
            that.setData({
              liked:!res.data.status
            })
          }
        })
      }
    }
  }
})

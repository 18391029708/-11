// pages/CircleFriends/CircleFriends.js
var app = getApp()
var that

Page({
  /**
   * 页面的初始数据
   */
  data: {
    DataSource: [1, 1, 1, 1, 1],
    icon: '',
    content: '我大学毕业到一家集团公司的办公室当文员。办公室主任有一特长，即文章写得好，很有思想，公司董事长很器重他，董事长的讲话稿和企业的年终总结等一系列重大文章都是出自他的手笔。',
    resource: ['',
      '',
      '',
      '',
      ''
    ],
    zanSource: ['张三', '李四', '王五', '找钱', '孙俪', '王宝'],
    contnet: [{
        'firstname': '张三',
        'content': '你好漂亮呀！！'
      },
      {
        'firstname': '李四',
        'content': '纳尼！！'
      },
      {
        'firstname': '王五',
        'content': '鬼扯咧'
      },
      {
        'firstname': '王宝',
        'content': '昨晚11点左右，一则郑爽胡彦斌疑似复合的消息刷爆各大论坛，微博在深夜11点热度高达200万直接爆掉，中国意难忘又开始了！！！'
      }
    ],
    photoWidth: wx.getSystemInfoSync().windowWidth / 5,
    hidden1:true,
    scroll:false,
    

    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
    isShow: true, //判断是否显示弹出框
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var value = wx.getStorageSync('userdata')
   
    this.setData({
      nickName:value.nickName,
      icon:value.avatarUrl

    })
  },
  // 点击图片进行大图查看
  LookPhoto: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.photurl,
      urls: this.data.resource,
    })
  },

  // 点击点赞的人
  TouchZanUser: function(e) {
    wx.showModal({
      title: e.currentTarget.dataset.name,
      showCancel: false
    })
  },
 
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },

  // 删除朋友圈
  delete: function() {
    wx.showToast({
      title: '删除成功',
    })
  },
  TouchDiscuss:function(){
      this.setData({
        hidden1:!this.data.hidden1,
        // scroll:!scroll
      })  
      console.log(this.data.hidden1)
  }

})
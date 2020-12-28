// pages/indentification/indentification.js
const app = getApp();
wx.cloud.init({
  env: 'cloudbase-3grpy11vf179fdac'
});
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    userName:'...',
    idNo:'...',
    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getUserInfo({
      success(res) {
        console.log(res);
        wx.setStorageSync('userdata', res.userInfo );
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
    // 从数据库读取信息
    

    console.log(this.data.idNo,this.data.userName)


  },
  userInfo:function(){
    wx.navigateTo({
      url: "../userInfo/userInfo",
    })
  },
  // cardImage:function(){
  //   wx.navigateTo({
  //     url: "../cardImage/cardImage",
  //   })
  // },
  // faceIdentification:function(){
  //   wx.navigateTo({
  //     url: "../faceIdentification/faceIdentification",
  //   })
  // },
  electricVehicle:function(){
    wx.navigateTo({
      url: "../electricVehicle/electricVehicle",
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
  onShow: function () {
    var that = this;
    console.log( app.globalData.openid)
   var cardId = app.globalData.openid
    db.collection('electrocar_list').where({
     userid: cardId,
     
    }).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          userName:res.data[0].name,
          idNo:res.data[0].identityCardNo,
          
        })
        console.log(that.data.userName,that.data.idNo)

        // if(that.data.userName!='' && that.data.idNo!=''){
          // 把用户姓名身份证号码存入数据库
          var openid = app.globalData.openid
          console.log(openid)
          console.log(that.data.userName,that.data.idNo)
              db.collection('common_userInfo_list').where({_openid:app.globalData.openid}).update({
            data: {
             realName:res.data[0].name,
             idCardNo:res.data[0].identityCardNo
            },
            success: function(res) {
              console.log(res)
          }
          })
        

          
          // var pages = getCurrentPages();
          // var currPages =pages[pages.length - 1];
          // var prevPage = pages[pages.length - 3];
          // prevPage.setData({
          //   chooseBtn:false
    
        // })
        // console.log(prevPage.data.chooseBtn)
        
      // }
      } 
    })
    console.log(that.data.userName)
   
 

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
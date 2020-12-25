// pages/personal/personal.js
var app = getApp();
Page({
  data: {
    userInfo: [],
    switch1Checked:false,
    chooseBtn:true,
    hidden2:app.globalData.globalData,
    
   
    uname:'',
    usex:'',
    utx:'',
    utype:0,
    uphone:''
  },
  // changeSwitchChecked:function(){
  //   app.globalData.switchChecked='true';
  // },
  // {
  //   console.log(app.globalData.loginState),
  //   app.globalData.loginState=true,
  // },
 

  /**
   * 生命周期函数--监听页面加载
   */
  aa:function(event){
    console.log(event)
    app.globalData.hidden2=event.detail.value;
    console.log(app.globalData.hidden2,this.data.switch1Checked);
    console.log(event)
  },
  onLoad: function (options) {
    var that=this;
    wx.getUserInfo({
      success(res) {
        console.log(res);
        wx.setStorageSync('userdata', res.userInfo );
        console.log(1)
        that.setData({
          userInfo: res.userInfo,
         
        })
        console.log(that.data.userInfo)
        
      }
    })
    console.log(this.data.chooseBtn)
  
    // app.globalData.hidden2=this.data.switch1Checked;
    // console.log(app.globalData.hidden2,this.data.switch1Checked);
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
    console.log(this.data.chooseBtn)
    this.setData({
      chooseBtn:this.data.chooseBtn
    })
    console.log(this.data.chooseBtn)
    
    // app.globalData.hidden2=this.data.hidden2;
    // console.log(app.globalData.hidden2)
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
  share: function () {
    console.log("1")
    wx.showShareMenu();
  },
  /**
   * 用户点击右上角分享
   */
  
  personal:function(){
    wx.navigateTo({
      url: '../showmessage/showmessage'
    })
  },
  indentification:function(){
    wx.navigateTo({
      url: '../indentification/indentification'
    })
  },
  
  mymoney: function () {
    wx.navigateTo({
      url: '../mymoney/mymoney'
    })
  },
  set:function(){
    wx.navigateTo({
      url:'../set/set'
    })
  },
  mymessage: function () {
    wx.navigateTo({
      url: '../mymessage/mymessage'
    })
  },
  setto: function () {
    wx.navigateTo({
      url: '../set/set'
    })
  },
  regulation:function(){
    wx.navigateTo({
      url: '../regulation/regulation',
    })
  },
  service: function () {
    wx.navigateTo({
      url: '../service/service'
    })
  },

  // product: function () {
  //   wx.navigateTo({
  //     url: 'product/productmanage'
  //   })
  // }
})
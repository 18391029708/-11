// pages/driverForm/driverForm.js

const app = getApp()
const db = wx.cloud.database();
const usecloud = require('../../_self/application.js').CloudSetting.UseCloud;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wayBill:[
      // {position:'起点：东九大石头',Endposition:'终点：东十九小石头'},
      // {position:'起点：东十九大石头',Endposition:'终点:东一十九小石头'},
      // {position:'起点：东三十九大石头',Endposition:'终点：东二十九小石头'},
  
    ],
    moveStartX:0,//起始位置
    moveSendVtnLeft:0,//发送按钮的left属性
    moveEndX:0,//结束位置
    screenWidth:0,//屏幕宽度
    moveable:true,//是否可滑动
    disabled:true,//验证码输入框是否可用
    SendBtnColor:"#7f7f7f"//滑动按钮颜色


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
},
// slideButtonTap(e) {
//   console.log('slide button tap', e.detail)
// },
  orderReceiving:function(e){
    console.log(e)
    var that = this;
    var wayId = e.currentTarget.id;    
    console.log(wayId)
 
    // update({
    //   data:{
    //     scheduling:'已接单'
    //   },
    //   success:function(res){
    //     console.log(res.data)
    //   }
    // })
    for(var i = 0; i < that.data.wayBill.length; i++ ){
      console.log(that.data.wayBill[i]._id)
       if(this.data.wayBill[i]._id == wayId){
        console.log(this.data.wayBill[i]._id == wayId)
        db.collection('way_list').doc(wayId).
        //  get({
        //   success: function(res) {
        //     // res.data 包含该记录的数据
        //     console.log(res.data)
        //   }
        // })
         update({ 
          // data 传入需要局部更新的数据
          data: {
            scheduling: '已接单'
          },
          success: function(res) {
            console.log(res)
            console.log(1)
          }
        })
      }
    }
    wx.switchTab({
      url:'../myway/myway',
    })
    // wx.navigateTo({
    //   url: '../orderReceiving/orderReceiving',
    // })
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
    var _ = this;
    _.ReqData();
   
  },
    ReqData(){
      wx.showLoading({
        title:'加载中...',
      })
      var that = this;
      console.log(that.data)
      var len = that.data.wayBill.length;
      console.log(len)
      console.log(1)
      that.QueryWayLists(len).then(res => {
        console.log(1)
        console.log(res)
        if(res.data != 'reauest fail'){
          that.setData({
            wayBill: that.data.wayBill
          })
        }
        console.log(that.data.wayBill);
        wx.stopPullDownRefresh();
        wx.hideLoading();
      })
    
  },
  QueryWayLists:function(skipstep){
    var that = this;
    if(usecloud){
      return new Promise(function(resolve,reject){
        // .skip(skipstep)作用加在数组过程接载数组长度
        db.collection('way_list').skip(skipstep).where({scheduling:"等待接单"}).orderBy('create_time','desc').get({
          success(res){
            console.log(res.data)
            that.setData({
              wayBill: that.data. wayBill.concat(res.data)
            })
            console.log(that.data.wayBill)
            console.log(res)
            resolve(res)
          },fail(res){
            reject('request fail')
          }
        })
      })
    }
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
    var _ = this;
    _.setData({
      wayBill: []
    },() => {
      _.ReqData();
    })
    console.log(_data.wayBill)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底函数')
    var _ =this;
    _.ReqData()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})
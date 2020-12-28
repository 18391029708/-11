// pages/personal/myway/myway.js
const db = wx.cloud.database('cloudbase-3grpy11vf179fdac');
wx.cloud.init({
  env: 'cloudbase-3grpy11vf179fdac'
});
const usecloud = require('../../_self/application.js').CloudSetting.UseCloud;
const _ = db.command;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
    orderLists:[],
  //   array:[
      
  //   {message:'起点：111，终点222'},
  //   {message:'起点：333，终点444'},
  //   {message:'起点：1333，终点1444'},
  // ],
  status:'正在进行',
  // status:[{ing:'正在进行'},
  //         {ed:'已完成'}
  //       ],
  EndPosition:'',
  position:'',
  hidden:'false',
hidden1:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openid)
    
    // console.log(this.data)
    // var that =this;
    this.ReqData()
 
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
    // 判断加载页面为哪个
    console.log(this.data.reLists)
    console.log(app.globalData.hidden2)
    this.setData({
      hidden:app.globalData.hidden2
    })
    //展示普通用户订单
    if(this.data.hidden==false){
      var _ = this;
    _.ReqData()
// 展示车手用户订单
    }else {
      var _ = this;
      _.requestList()
      _.onLoad()
    }
  },
  requestList(){
    wx.showLoading({
      title:'加载中...',
    })
    console.log(1010)
    var that = this;
    db.collection('way_list').where({scheduling:'已接单'}).orderBy('create_time','desc').get({
        success: function(res) {
          // res.data 包含该记录的数据
          console.log(res.data)
   
          that.setData({
            reLists:res.data
          })
          wx.stopPullDownRefresh();
          wx.hideLoading();
        }
        
  
      })

  },
  // ReqData(){
  //   wx.showLoading({
  //     title:'加载中...',
  //   })
  //   console.log(2020)
  //   var that = this;
  //   console.log(that.data)
  //   var len = that.data.lists.length;
  //   console.log(len)
  //   console.log(1)
  //   that.QueryWayLists(len).then(res => {
  //     console.log(1)
  //     console.log(res.data)
        
  //             if(res.data != 'reauest fail'){
  //               that.setData({
  //                 lists: that.data.lists
  //               })
  //             }
  //     console.log(that.data.lists);
  //     wx.stopPullDownRefresh();
  //     wx.hideLoading();
  //   })
  // },
  // QueryWayLists:function(skipstep){
  //   this.onLoad()
  //   var that = this;
  //   if(usecloud){
  //     return new Promise(function(resolve,reject){
  //       db.collection('way_list').skip(skipstep).orderBy('create_time','desc').get({
  //         success(res){
  //           console.log(res.data)
               

  //             that.setData({
  //               lists: that.data.lists.concat(res.data)
  //             })
  //             console.log(that.data.lists)
  //     //  for(var i = 0;i<that.data.lists.length;i++){
  //     //    if(app.globalData.openid==that.data.lists[i]._openid){
  //     //      console.log(this.data.list)
  //     //      that.setData({
      
  //     //        orderLists:that.data.lists[i]
  //     //      })
  //     //    }
  //     //  }
  //           console.log(that.data.orderLists)
  //           console.log(that.lists)
  //           console.log(res)
  //           resolve(res)
  //         },fail(res){
  //           reject('request fail')
  //         }
  //       })
  //     })
  //   }
  // },
  ReqData(){
    wx.showLoading({
      title:'加载中...',
    })
    var that = this;
    console.log(that.data)
    var len = that.data.lists.length;
    console.log(len)
    console.log(1)
    that.QueryWayLists(len).then(res => {
      console.log(1)
      console.log(res)
      if(res.data != 'reauest fail'){
        that.setData({
          lists: that.data.lists
        })
      }
      console.log(that.data.lists);
      wx.stopPullDownRefresh();
      wx.hideLoading();
    })
  },
  QueryWayLists:function(skipstep){
    var that = this;
    if(usecloud){
      return new Promise(function(resolve,reject){
        console.log(app.globalData.openid)
        db.collection('way_list').skip(skipstep).where({_openid:app.globalData.openid}).orderBy('create_time','desc').get({
          success(res){
            console.log(res.data)
            that.setData({
              lists: that.data.lists.concat(res.data)
            })
            console.log(that.data.lists)
            console.log(res)
            resolve(res)
          },fail(res){
            reject('request fail')
          }
        })
      })
    }
  },
  over:function(e){
    console.log(e)
    var that = this;
    var wayId = e.currentTarget.id;
    console.log(wayId)
    console.log(that.data.reLists)
 
    for(var i = 0; i<that.data.reLists.length; i++){
      
      if(this.data.reLists[i]._id == wayId){
        if(this.data.reLists[i].way_status=="已完成"){
          that.onShow()
            wx.showToast({
              title: '行程已经完成',
              icon: 'success',
              duration: 2000
            })
            
    
        }
        else{db.collection('way_list').doc(wayId).update({
          data:{
            way_status:'已完成'
          },
          
          success:function(res){
            that.onShow()
            wx.showToast({
              title: '结束行程中...',
              icon: 'success',
              duration: 2000
            })
            
            
            console.log(res)
          }
        })
      }
      }
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if(this.data.hidden=='!false'){

    }
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
    // if(this.data.hidden=='false'){
      var _ = this;
      _.setData({
        lists: []
      },() => {
        _.ReqData();
      })
      console.log(_data.lists)

    // }
  
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    console.log('触底函数')
    // if(this.data.hidden=='false'){
      var _ =this;
      _.ReqData()

    // }
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})
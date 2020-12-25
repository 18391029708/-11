// pages/map/map.js
const app = getApp()
//  var QQMapWX = require('../../map/qqmap-wx-jssdk.js');//引入腾讯地图jssdk
Page({
  /**
   * 页面的初始数据
   */
  data: {
    markers:[{
      latitude: '',
      longitude:'', 
    }
    
    ],
    EndPosition: '999',
    position:'o',
    
  },
  
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.getLocation({
      type:'wgs84',
      success:function(res){
        console.log(res)
        var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + res.latitude + "," + res.longitude + "&key=FSVBZ-SFQK4-DBSUM-DLPJP-LKONQ-IQBWQ";
        that.longitude = res.longitude;
        that.latitude = res.latitude;
        wx.request({          
          url: getAddressUrl,
          success: function (result) {  
            app.globalData.userInfo=result,
            console.log(result)
            console.log( result.data.result.address)     
            that.locations = result.data.result.address   
            that.setData({position:result.data.result.address})
           
          }
        })
        that.setData({
          // latitude:res.latitude,
          // longitude:res.longitude,
          scale:20,
          markers:[{
              id:1,
              latitude:res.latitude,
              longitude:res.longitude,             
              iconPath:"../images/01.jpg"
          }]
          
        })
      }      
    })    
  },
  chooseLocation:function(){
    var that = this;
   wx.chooseLocation({
     success:function(res){
       console.log(res);
       that.setData({
          EndPosition:res.name
       })
       
      that.changeStyle();
     },     
   })   
   console.log(this.data)
   console.log(that.data)

  },   
  

  changeStyle:function(){
   var that = this;
    wx.navigateTo({
      url:'../confirm/confirm',    
      success: function(res) {
        // var that = this;
        // console.log(that.data);
        console.log(that)
        console.log(res)
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: that.data})      
        console.log(that.data)
      }
    })
  },
  
 
    
 

})
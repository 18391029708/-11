// pages/map/map.js

//  var QQMapWX = require('../../map/qqmap-wx-jssdk.js');//引入腾讯地图jssdk
const app = getApp()
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    markers:[],
    EndPosition: '999',
    position:'o',
    
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取车手经纬度
    var that = this;
    db.collection('common_userInfo_list').where({'vehicleInformation.have':'true'}).get({
      success: function(res) {
        // res.data 包含该记录的数据
        // console.log(res.data)
     function   setdata( ary,ard){
          let arr=[]
          for (const iterator of ary) {
             arr.push({
              latitude:iterator.latitude,
                longitude	:iterator.longitude,
                iconPath:'../images/10.png'})
          }
          let tmp=arr.concat(ard)
          return  ard!=undefined? tmp:arr
        }
        that.setData({
          markers:setdata(res.data,that.data.markers)
        })
        console.log(that.data.markers)

      }
    })

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
       function setdata( ary,ard){
          let arr=[]
          for (const iterator of ary) {
             arr.push({
              latitude:iterator.latitude,
                longitude	:iterator.longitude,
                iconPath:'../images/01.jpg'})
          }
          let tmp=arr.concat(ard)
          return  ard!=undefined? tmp:arr
        }
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude,
           markers:setdata([{
            latitude:res.latitude,
              longitude	:res.longitude
              }],that.data.markers)
        
          // latitude:res.latitude,
          // longitude:res.longitude,
          // scale:20,
          // markers:[{
          //     id:'1',
          //     latitude:res.latitude,
          //     longitude:res.longitude,             
          //     iconPath:"../images/01.jpg"
          // }]
        })
        console.log(res.latitude)
      }    
    })    
  },
  chooseStartLocation:function(){
    var that = this;
   wx.chooseLocation({
     success:function(res){
       console.log(res);
       that.setData({
        position:res.name
       })
       
     
     },     
   })   
   console.log(this.data)
   console.log(that.data)

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
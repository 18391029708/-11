// pages/personal/personmessage/psm.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   no:'66666',
   name:'王小林',
   schoolName:'西科大',
   sex:'',
    uphone: '101010101',
    ImgInfo:'',
    words: []
  },
  electricVehicle:function(){
    wx.navigateTo({
      url: '../indentification/indentification'
    })
  },
  onLoad: function (options) {
    var that = this; 
    wx.getStorage({
      key: 'userdata',//对应存储的key名
      success: function (res) {
        //成功之后的操作，建议还是先打印res找到需要的东西
        console.log(res)
        if(res.data.gender==1){
          res.data.gender = "男"
        }else{
          res.datargender = "女"
        }
        console.log(res.data.gender)
        that.setData({
          sex:res.data.gender
        })

      }
    })
        
        
      


  },


 
  

    })


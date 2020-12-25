// components/SocalPublish/SocialPublish.js
const app = getApp();
const cwx = require('profunc.js');
const timeutil = require('../../utils/TimeUtil.js');
const usecloud = true; //是否使用 云开发 正式开发环境中使用 application.js 中的配置
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    images: [],
    content: '',
    imgid: 0,
    userinfo: null,
    realList:[]
  },
  lifetimes:{
    created(){
      var that = this;
      console.log(app.globalData.userInfo)
      that.setData({
        userinfo: app.globalData.userInfo
      })
      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    upimages(){
      var that = this;
      var _imgid = this.data.imgid ;
      wx.showLoading({
        title: '上传中~',
        mask:true
      }) // 这个地方有重复调用，但是不值得去做优化
      cwx.UploadImage(this.data.images[_imgid]).then(function(res){
       // console.log(res)
        that.setData({
          imgid:_imgid+1,
          realList: that.data.realList.concat([res.fileID])
        },()=>{
          if (that.data.imgid == that.data.images.length){
            //全部上传完成
            cwx.UpCircleInfo(that.data).then(tres=>{
              console.log(tres)
              wx.navigateBack({
                
              })
            })
            wx.hideLoading();
          }else{
            that.upimages();
          }
        })
      })
    },
    ChooseImage() {
      wx.chooseImage({
        count: 6, //默认9
        sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          if (this.data.images.length != 0) {
            this.setData({
              images: this.data.images.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              images: res.tempFilePaths
            })
          }
        }
      });
    },
    ViewImage(e) {
      wx.previewImage({
        urls: this.data.images,
        current: e.currentTarget.dataset.url
      });
    },
    DelImg(e) {
  
      this.data.images.splice(e.currentTarget.dataset.index, 1);
      this.setData({
        images: this.data.images
      })
    },
    textareaAInput(e) {
      this.setData({
        content: e.detail.value
      })
    },
  }
})

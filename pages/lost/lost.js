
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DataSource: [1, 1, 1, 1, 1],
    lostInfo:[
    {typt:'书',time:'早晨',place:'图书馆'},
    {typt:'饭卡',time:'中午',place:'餐厅'}
  
  ],
  hidden:'false',
  pics:[],
  status:'',
  featurePublish:'按特征发布',
  featureSearch:'按特征搜索',

  shareshow: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  publish:function(event){
    // console.log(event)
    // var hidden = event.mut
    // console.log(hidden)
    this.setData({
      hidden:!this.data.hidden,
      status:'发布'
    })
    console.log(this.data.hidden)
  
  },
  search:function(event){
  
    this.setData({
      hidden:!this.data.hidden,
      status:'搜索'
    })
  },
  statusClick:function(){
    if(this.data.status == '发布'){
      wx.showLoading({
        title: '发布中...',
      })
      this.setData({
        type:success,
        delay:2000,
        msg:"发布成功"
      })
      
        // setTimeout(function(){
        //   if(this.data.featurePublish == '发布成功'){
        //     this.setData({
        //       featurePublish:'按特征发布',
        //     })
        //   }
        // },2000)
      
      
    }else{
      this.setData({
        status:'搜索成功',
      })
    }
    console.log(this.data.hidden)
    setTimeout(function(){
      updata

    },2000)
    console.log(this.data.hidden)
  },
  updata:function(){
    this.setData({
      hidden:!this.data.hidden,
      
    });

  },
  //  //给照片添加一个点击事件，上传照片使用
  //  handleUploadImg(){
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType:['compressed','original'],
  //     sourceType:['album','camera'],
  //     success(res){
  //       const tfp = res.tempFilePaths;
  //       const tf = res.tempFiles;
  //       console.log(tfp);
  //       console.log(tf);
  //     }
  //   })
  // },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  

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

  },
   /**获取textarea值：评论内容 */
   bindTextAreaBlur:function(e){
    this.setData({
      advice:e.detail.value
    })
  },
  /**上传图片 */
  uploadImage:function(){
    let that=this;
    let pics = that.data.pics;
    wx.chooseImage({
      count:3 - pics.length,
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: function(res) {
        let imgSrc = res.tempFilePaths;
         pics.push(imgSrc);
        if (pics.length >= 3){
          that.setData({
            isShow: false
          }) 
        }
       that.setData({
          pics: pics
        })
      },
    })
 
  },
 
  /**删除图片 */
  deleteImg:function(e){
    let that=this;
    let deleteImg=e.currentTarget.dataset.img;
    let pics = that.data.pics;
    let newPics=[];
    for (let i = 0;i<pics.length; i++){
     //判断字符串是否相等
      if (pics[i]["0"] !== deleteImg["0"]){
        newPics.push(pics[i])
      }
    }
    that.setData({
      pics: newPics,
      isShow: true
    })
    
  },


})
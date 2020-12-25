// pages/takePhoto/takePhoto.js
Page({
  data:{
    name:'',
    gender:'',
    id:'',
    addr:'',
    valid_date:''

  },
 success: function (e) {
    console.log(e)
    this.setData({
      name:e.detail.name.text,
      id:e.detail.id.text,
      gender:e.detail.gender.text,
      addr:e.detail.address.text,
      // valid_date:e.detail.valid_date.text
    })
  },
  Success: function (e) {
    console.log(e)
    this.setData({
       valid_date:e.detail.valid_date.text
    })
  },
 
})
const timeutil = require('../../utils/TimeUtil.js');
const usecloud = require('../../_self/application.js').CloudSetting.UseCloud;
const escurl = require('../../_self/application.js').EscSetting.EscDomain;
const db = wx.cloud.database();
const app = getApp();

function AddRemarks(_res) {
  console.log(_res)
  return new Promise(function (resolve, reject) {
    //使用云开发的的方案
    if(usecloud){
      wx.cloud.callFunction({
        name: 'clouddb',
        data: {
          opr: 'add',
          tablename: 'remarks_list',
          data: {
            create_time: timeutil.TimeCode(new Date()),
            update_time: timeutil.TimeCode(new Date()),
            circle_id: _res.circleitem._id,
            nickname: app.globalData.userInfo.nickName,
            avatar: app.globalData.userInfo.avatarUrl,
            content: _res.content,
            
            userid: app.globalData.openid
          }
        },
        success(res) {
          wx.cloud.callFunction({
            name: 'transfunc',
            data: {
              opr: 'incremark',
              id: _res.circleitem._id
            },
            success(ans) {
              console.log(ans)
              resolve(ans)
            },
            fail(ans) {
              reject('call fail')
            }
          })
  
        }
      })
    }
    else{
      //下面是非云开发方案
      wx.request({
        url: escurl + '/remark',
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          create_time: timeutil.TimeCode(new Date()),
          circleid: _res.circleitem.id,
          nickname: app.globalData.userInfo.nickName,
          avatar: app.globalData.userInfo.avatarUrl,
          content: _res.content,
          userid: app.globalData.userid
        },
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject('call fail')
        }
      })
    }
    

  })
}

function AddThumbs(_res) {
  return new Promise(function(resolve,reject){
    wx.cloud.callFunction({
      name: 'clouddb',
      data: {
        opr: 'add',
        tablename: 'thumbs_list',
        data: {
          create_time: timeutil.TimeCode(new Date()),
          update_time: timeutil.TimeCode(new Date()),
          userid: app.globalData.openid,
          circle_id: _res.circleitem._id,
        }
      },
      success(res) {
        //resolve(res);
        // 请求自增
        wx.cloud.callFunction({
          name: 'transfunc',
          data: {
            opr: 'incthumb',
            id: _res.circleitem._id
          }
        })
        // console.log(that.data.transfunc)
      }
    })
  })
  
}
module.exports = {
  AddRemarks: AddRemarks,
  AddThumbs: AddThumbs
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloudbase-3grpy11vf179fdac'
})

const db = cloud.database({env: 'cloudbase-3grpy11vf179fdac'})
const _ = db.command
exports.main = async (event, context) => {
  var opr = event.opr;
  if(opr == 'incthumb'){
    try{
      return db.collection('circles_list').doc(event.id).update({
        data:{
          thumbsnum:_.inc(1)
        }
      })
    }catch(e){
      console.error(e)
    }
  }else if (opr == 'incremark') {
    try {
      return db.collection('circles_list').doc(event.id).update({
        data: {
          remarksnum:_.inc(1)
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
}
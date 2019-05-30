// 云函数入口文件

const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

  var openid = event.openid;//openId

  try {
   return await db.collection('yb_expressinformation').where({
      _id: event.id,
      state:0
    }).update({
      data: {
        state: 1,
        jie_id: openid,
        jie_Date: event.date,
      },
    })
   
  } catch (e) {
    console.log(e)
  }
}
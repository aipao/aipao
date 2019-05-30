// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    var que = await db.collection('yb_register').where({
      openid: event.openid,
    }).get();
    return que.data
  } catch (e) {
    console.log(e)
    return { no: 'no result' }
  }
}
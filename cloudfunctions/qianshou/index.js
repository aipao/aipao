// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
     await db.collection('yb_expressinformation').where({
      _id:event._id
    })
      .update({
        data: {
          state:3
        },
      })
  } catch (e) {
    console.log(e)
    return { no: 'no result' }
  }
}
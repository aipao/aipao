// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var openid = event.openid;//openId
  var name = event.name;//姓名
  var id_number = event.id_number;//身份证号
  var telephone = event.telephone;//电话

  var createdate = event.createdate;//时间
  var state = event.state;//状态

  var wx_nickname = event.wx_nickname;
  console.log("-------------" + openid);
  console.log("-------------" + name);
  console.log("-------------" + id_number);
  console.log("-------------" + telephone);
  console.log("-------------" + createdate);
  console.log("-------------" + state);
  console.log("-------------" + wx_nickname);
  try {
    return await db.collection('yb_register').add({
      data: {
        openid: openid,
        name: name,
        id_number: id_number,
        telephone: telephone,
        createdate: createdate,
        state: state,
        wx_nickname: wx_nickname
      }
    })
  } catch (e) {
    console.log(e)
  }
}
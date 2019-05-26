// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var campus = event.campus;//校区
  var dormitory = event.dormitory;//宿舍楼号
  var district = event.district;//区
  var dormnumber = event.dormnumber;//宿舍号
  var reserve_telephone = event.reserve_telephone;//联系电话
  var name = event.name;//预留姓名
  var telephone = event.telephone;//预留电话
  var content = event.content;//内容
  var state = event.state;//单状态
  var openid = event.openid;//openId
  var wx_nickname = event.wx_nickname;
  console.log("-------------" + campus);
  console.log("-------------" + dormitory);
  console.log("-------------" + district);
  console.log("-------------" + dormnumber);
  console.log("-------------" + reserve_telephone);
  console.log("-------------" + name);
  console.log("-------------" + telephone);
  console.log("-------------" + content);
  console.log("-------------" + state);
  console.log("-------------" + openid);
  console.log("-------------" + wx_nickname);
  try {
    return await db.collection('yb_expressinformation').add({
      data: {
        campus: campus,
        dormitory: dormitory,
        district: district,
        dormnumber: dormnumber,
        reserve_telephone: reserve_telephone,

        name: name,
        telephone: telephone,
        content: content,
        state: state,
        openid: openid,

        wx_nickname: wx_nickname
      }
    })
  } catch (e) {
    console.log(e)
  }
}
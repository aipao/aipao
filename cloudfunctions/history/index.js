// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 1. 获取数据库引用
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // 2. 构造查询语句
  // collection 方法获取一个集合的引用
  // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
  // get 方法会触发网络请求，往数据库取数据 
  try {
    return await db.collection('yb_expressinformation').get({
      success: function (res) {
        // return res
      }
    });
  } catch (e) {
    console.error(e);
  }
}
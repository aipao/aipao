var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var utils = require("../../../utils/util.js");
const app = getApp()
Page({
  data: {
    wantjiedan: [],
    wantjiedanTest: [{ message:'33'}],
  
  },
  onLoad: function () {
    var that = this;
    that.getHistory(0);

  
    wx.getUserInfo({
      withCredentials: false,
      success: res => {
        app.globalData.userInfo = res.userInfo;
        console.log(app.globalData.userInfo.nickName);
      }
    })
  },
 
  /***
   * 发单记录，
   * param
   *  openid 用户唯一标识
   *  state   单状态0，未签收，已签收 
   */
  
  getHistory: function (state) {

    wx.cloud.callFunction({
      name: 'jie_index',
      data: {
        state: state
      },
      success: res => {
        this.setData({
          wantjiedan: res.result
        })
        console.log(this.data.wantjiedan);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取数据失败',
        })
        console.error('[云函数] [history] 调用失败：', err)
      }
    })
  },
  /**
   * 
   * 添加接单
   */
  cancleCollected: function (e) {
    
    tianjia(e.currentTarget.id);   
    
  },
});

function tianjia(id,telephone) {

  var openid = app.globalData.openid;//openId
  wx.cloud.callFunction({
    name: 'tianjia',
    data: {
      id: id,
      openid: openid,
      date: utils.formatTime(new Date()),
      jie_telephone: telephone
    },
    success: res => {
      if(res.result.stats.updated==0){
           wx.showModal({
             content: '手慢了哦！此单已经接走啦！！！',
             title: '提示',
             showCancel: false,
             success: function(resss){
               if(resss.confirm){
                 wx.navigateTo({
                   url: '../xiangqing/xiangqing',
                   success: function (e) {
                     var page = getCurrentPages().pop();
                     if (page == undefined || page == null) return;
                     page.onLoad();
                   }
                 });
               }
             }
           })
      }else{
      wx.showModal({
        content: '接单成功',
        showCancel: false,
        success: function (ress) {
          if (ress.confirm) {
            wx.navigateTo({
              url: '../xiangqing/xiangqing',
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            });
          }
        }
      });
      }
      console.log('返回值' + JSON.stringify(res.result));
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '提交失败，稍后再试',
      })
      console.error('[云函数] [sum] 调用失败：', err)
    }
  })
}
// pages/jie/juti/juti.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    xinxi:[]
  },

  onLoad: function (options) {
    var that = this;
    this.id = options._id;

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)

        //根据opendid查询发单记录，这里默认state=0,但是查询时暂时没用state这个属性，我感觉可以将所有的单查询到本地再页面显示的时候去过滤单的状态。避免反复查询数据库网络延迟
        that.getHistory(this.id);
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    wx.getUserInfo({
      withCredentials: false,
      success: res => {
        app.globalData.userInfo = res.userInfo;
        console.log(app.globalData.userInfo.nickName);
      }
    })

  },


  getHistory: function (id) {

    wx.cloud.callFunction({
      name: 'information',
      data: {
        id: id
      },
      success: res => {
        this.setData({
          xinxi: res.result
        })
        console.log(this.data.xinxi);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取数据失败',
        })
        console.error('[云函数] [information] 调用失败：', err)
      }
    })
  },
  jieanniu: function(e){
       var id= e.currentTarget.id;
       updata(id);
   
  }
})
function updata(id) { 
  console.log(id);
  wx.cloud.callFunction({
    name: 'gengxin',
    data: {
      _id: id,
    },
    success: res => {
      wx.showModal({
        content: '已送达',
        showCancel: false,
        success: function (res) {
          wx.navigateTo({
            url: '../index/index',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
          
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
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
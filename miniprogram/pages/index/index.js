var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    tabs: ["已签收", "未签收"],
    activeIndex: 1,
    sliderOffset: 0
  },
  onLoad: function () {
    var that = this;

    mylogin();
    getHistory();


    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});
function getHistory() {
  wx.cloud.callFunction({
    name: 'history',
    data: {
    },
    success: res => {
      var data = res.result.data.reverse();
       console.log(data);
      //pag.setData({ array: data });

    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '调用失败',
      })
      console.error('[云函数] [history] 调用失败：', err)
    }
  })
}
function mylogin(){
  // 调用云函数
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log('[云函数] [login] user openid: ', res.result.openid)
      app.globalData.openid = res.result.openid
    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
    }
  })
  wx.getUserInfo({
    withCredentials:false,
    success: res => {
      app.globalData.userInfo = res.userInfo;
      console.log(app.globalData.userInfo.nickName);
    }
  })
}
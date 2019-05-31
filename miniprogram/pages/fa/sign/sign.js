const app = getApp()

Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    all: []
  },

  tiao: function () {
    wx.navigateTo({
      url: '../register/register',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },
  qishou: function () {
    wx.navigateTo({
      url: '/pages/jie/index/index',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },

  onLoad: function () {
   
    var that = this;
    var openid = app.globalData.openid;
    var that = this;
    //登录获取用户信息
    // 调用云函数
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    wx.cloud.callFunction({
      name: 'register_state',
      data: {
        openid: openid,
      },
      success: res => {
        this.setData({
          all: res.result
        })
        wx.hideLoading();
        if (res.result.length == 0) {
          this.setData({
            all: [{ "state": '0' }]
          })
        }
        /***根据openid获取指定用户的发单记录 */
        //在页面显示
        console.log("123")
        console.log(res.result);

        //pag.setData({ array: data });

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
  getUserInfo: function (e) {
    console.log('asdad'+e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });

  }
})



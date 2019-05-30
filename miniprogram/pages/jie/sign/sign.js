const app = getApp()

Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    all: []
  },
  fadan: function () {
    wx.navigateTo({
      url: '/pages/fa/index/index',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

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
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });

  }
})



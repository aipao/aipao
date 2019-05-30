var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    tabs: ["未送达", "已送达"],
    activeIndex: 0,
    sliderOffset: 1,
    all:[]
  },
  onLoad: function() {
    var that = this;
    //登录获取用户信息
    
    // 调用云函数
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid;
        //根据opendid查询发单记录，这里默认state=0,但是查询时暂时没用state这个属性，我感觉可以将所有的单查询到本地再页面显示的时候去过滤单的状态。避免反复查询数据库网络延迟
        that.getHistory(res.result.openid);
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

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

/***
 * 发单记录，
 * param
 *  openid 用户唯一标识
 *  state   单状态0，未签收，已签收 
 */
  getHistory:function(openid) {
    console.log(11);
    console.log(openid);
  wx.cloud.callFunction({
    name: 'jielisting',
    data: {
      
      openid: openid,
    },
    success: res => {
      this.setData({
        all: res.result
      })  
      console.log(res.result);
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '获取数据失败',
      })
      console.error('[云函数] [jielisting] 调用失败：', err)
    }
  })
}
});
/**
 * 登录获取用户信息
 * 
*/
function mylogin() {
  // 调用云函数
  wx.showLoading({
    title: '加载中',
  });
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log('[云函数] [login] user openid: ', res.result.openid)
      app.globalData.openid = res.result.openid;
      //根据opendid查询发单记录，这里默认state=0,但是查询时暂时没用state这个属性，我感觉可以将所有的单查询到本地再页面显示的时候去过滤单的状态。避免反复查询数据库网络延迟
      getHistory(res.result.openid);
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
}
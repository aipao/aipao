// miniprogram/pages/xiangqing/xiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    r:[],
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //登录获取用户信息

    // 调用云函数
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    that.history(options._id);
  },
history:function(_id){
  wx.cloud.callFunction({
    name: 'xiangqing',
    data: {
      _id: _id,
    },
    success: res => {
      this.setData({
        r: res.result
      })
      wx.hideLoading();

      /***根据openid获取指定用户的发单记录 */
      //在页面显示
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
qianshou:function(e){
  console.log(e.currentTarget.id)
    wx.cloud.callFunction({
      name: 'qianshou',
      data: {
        _id:e.currentTarget.id
      },
      success: res => {
        wx.showModal({
          content: '快递以送达',
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
  }
  )},
  chexiao: function (e) {
    console.log(e.currentTarget.id)
    wx.cloud.callFunction({
      name: 'chexiao',
      data: {
        _id: e.currentTarget.id
      },
      success: res => {
        wx.showModal({
          content: '确定撤销该订单吗',
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
    }
    )
  }
})
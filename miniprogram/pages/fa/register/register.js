var util = require("../../../utils/util.js");
const app = getApp()
Page({
  data: {
    name: '',
    id_number: '',
    telephone: '',
    createdate: '',
    files: []
  },
 
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  id_numberInput: function (e) {
    this.setData({
      id_number: e.detail.value
    })
  },
  telephoneInput: function (e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  tijiao: function () {
    var name = this.data.name;//姓名
    var id_number = this.data.id_number;//身份证号
    var telephone = this.data.telephone;//电话
    var createdate = util.formatTime(new Date);
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    
    if (name == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入姓名',
      })
      return;
    }
    if (id_number.length == '' || !reg.test(id_number)) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的身份证号码',
      })
      return;
    }
    if (telephone == '' || !myreg.test(telephone)) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的电话号码',
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    register(name, id_number, telephone, this.data.files, createdate);
    console.log("-------------" + name);
    console.log("-------------" + id_number);
    console.log("-------------" + telephone);
    console.log("-------------" + this.data.files);
    console.log("-------------" + createdate);
    /*wx.showModal({
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });*/
  },

});
function register(name, id_number, telephone, files, createdate) {
  var state = 1;//审核状态
  var openid = app.globalData.openid;//openId
  var wx_nickname = app.globalData.userInfo.nickName;
  wx.cloud.callFunction({
    name: 'register',
    data: {
      openid: openid,
      name: name,
      id_number: id_number,
      telephone: telephone,
      files: files,
      createdate: createdate,
      state: state,
      wx_nickname: wx_nickname
    },
    success: res => {
      wx.hideLoading();
      wx.showModal({
        content: '体验版无需审核即可成为骑手',
        showCancel: false,
        success: function (res) {
          wx.navigateTo({
            url: '../index/index',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          });

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

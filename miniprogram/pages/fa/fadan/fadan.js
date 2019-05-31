var util = require("../../../utils/util.js");
const app = getApp()
Page({
  data: {
    showTopTips: false,
    campus: "1",
    dormitory: "",
    district: "",
    dormnumber:"",
    telephone:"",
    name: "",
    reserve_telephone: "",
    content: "",

    radioItems: [
      { name: 'cell standard', value: '0' },
      { name: 'cell standard', value: '1', checked: true }
    ],
    checkboxItems: [
      { name: '东校区', value: '0', checked: true},
      { name: '西校区', value: '1'}
    ],
    date: "2016-09-01",
    time: "12:01",
    isAgree: false
  },
  radio: function (e) {
    this.setData({
      guige_key02: e.currentTarget.dataset.id
    })
    console.log(e.currentTarget.dataset.id)
  },
  // 发货地址选择,获取用户选择的单选框的值
  radioChange: function (e) {
    this.setData({
      arr_guige02: e.detail.value
    })
    console.log(e.detail.value)
  },
  
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems,
      campus:e.detail.value
    });
    console.log(this.data.campus)
  },
  dormitoryInput: function (e) {
    this.setData({
      dormitory: e.detail.value
    })
  },
  districtInput: function (e) {
    this.setData({
      district: e.detail.value
    })
  },
  dormnumberInput: function (e) {
    this.setData({
      dormnumber: e.detail.value
    })
  },
  telephoneInput: function (e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  reserve_telephoneInput: function (e) {
    this.setData({
      reserve_telephone: e.detail.value
    })
  },
  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  tijiao: function () {
    var campus = this.data.campus;//校区
    var dormitory = this.data.dormitory;//宿舍楼号
    var district = this.data.district;//区
    var dormnumber = this.data.dormnumber;//宿舍号
    var reserve_telephone = this.data.reserve_telephone;//联系电话

    var name = this.data.name;//预留姓名
    var telephone = this.data.telephone;//预留电话
    var content = this.data.content;//内容
    var createdate = util.formatTime(new Date);
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (parseInt(campus)<0){//这里有默认值，判断不了需要改
      wx.showToast({
        icon: 'none',
        title: '请选择校区',
      })
      return;
    }
    if (dormitory == '') {
      wx.showToast({
        icon: 'none',
        title: '输入宿舍楼号',
      })
      return;
    }
    if (district == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入区号',
      })
      return;
    }
    if (dormnumber == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入宿舍门牌号',
      })
      return;
    }
    if (reserve_telephone == '' || !myreg.test(reserve_telephone)) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的联系电话',
      })
      return;
    }
    if (name == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入预留姓名',
      })
      return;
    }
    if (telephone == '' || !myreg.test(telephone)) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的预留电话号码',
      })
      return;
    }
    if (content.length<6) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的快递短信内容',
      })
      return;
    }

    
      
    fadan(campus, dormitory, district, dormnumber, reserve_telephone, name, telephone, content, createdate);
    console.log("-------------" + campus);
    console.log("-------------" + dormitory);
    console.log("-------------" + district);
    console.log("-------------" + dormnumber);
    console.log("-------------" + reserve_telephone);
    console.log("-------------" + name);
    console.log("-------------" + telephone);
    console.log("-------------" + content);
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
function fadan(campus, dormitory, district, dormnumber, reserve_telephone, name, telephone, content, createdate) {
  var state = 0;//单状态
  var openid = app.globalData.openid;//openId
  var wx_nickname = app.globalData.userInfo.nickName;
  wx.cloud.callFunction({
    name: 'fadan',
    data: {
      openid: openid,
      campus: campus,
      dormitory: dormitory,
      district: district,
      dormnumber: dormnumber,
      telephone: telephone,
      name: name,
      reserve_telephone: reserve_telephone,
      content: content,
      createdate: createdate,
      state: state,
      wx_nickname: wx_nickname
    },
    success: res => {
       wx.showModal({
      content: '体验版不需要付钱哦',
      showCancel: false,
      success: function (res) {
        console.log('123')
        wx.navigateTo ({
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
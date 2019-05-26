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
      { name: '东校区', value: '0'},
      { name: '西校区', value: '1' }
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
    console.log("校区"+this.data.campus+"宿舍楼号" + this.data.dormitory + "区" + this.data.district + "宿舍号" + this.data.dormnumber+"联系电话"+this.data.reserve_telephone+"预留姓名"+this.data.name+"预留电话"+this.data.telephone+"内容"+this.data.content )
    wx.showModal({
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  
});
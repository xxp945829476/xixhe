// pages/wallet/add_card/add_card.js
var wxRequest = require('../../utils/wxRequest.js')
var InsureUrl = require("../../config.js").InsureUrl;

var city = require("../../utils/city.js");
var allCity = city.city;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    insurant:'自己',
    socialindex:0,
    array: ['自己', '丈夫', '妻子', '父亲', '母亲', '女儿','儿子'],
    socialArray:['有','无'],
    enddate:'',
    name:'',
    tel:'',
    code:'',
    province:'',
    city:'',
    citySrray: allCity,
    minIndex: 0,
    date: '请选择',
    cityIdex: 0,
    codename:'获取验证码',
    disabled:false
  },
  onLoad:function(){
    var myDate = new Date();
    var y = myDate.getFullYear();
    var m = myDate.getMonth()+1;
    var d = myDate.getDate();
    var dd = y + '-' + m + '-' + d;
    this.setData({
      enddate: y + '-' + m + '-' + d
    })
  console.log(dd)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var who = '自己';
    if (e.detail.value==0){
      who = '自己'
    } else if (e.detail.value == 1){
      who = '丈夫'
    } else if (e.detail.value == 2) {
      who = '妻子'
    } else if (e.detail.value == 3) {
      who = '父亲'
    } else if (e.detail.value == 4) {
      who = '母亲'
    } else if (e.detail.value == 5) {
      who = '女儿'
    } else if (e.detail.value == 6) {
      who = '儿子'
    }
    
    this.setData({
      index: e.detail.value,
      insurant:who
    })
  },
  sociaChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      socialindex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindNmae:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  bindTel:function(e){
    this.setData({
      tel: e.detail.value
    })
  },
  bindCode:function(){
    this.setData({
      minIndex: e.detail.value,
    });
  },
  getCode:function(){
    var that = this;
    var num = 10;
    
    var t = setInterval(function () {
      var cu = --num;
      that.setData({
        codename: cu + 's',
        disabled:true
      });
      if (cu<=0){
        clearInterval(t);
        that.setData({
          codename: '重新发送',
          disabled:false
        });
      }
    }, 1000)
  },
  bindProvinceChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.citySrray[e.detail.value].city.length);
    var i = this.data.citySrray[e.detail.value].city.length;
    if(i==1){
      this.setData({
        cityIdex:0
      })
    }
    this.setData({
      minIndex: e.detail.value,
      province: this.data.citySrray[e.detail.value].name,
      city: this.data.citySrray[e.detail.value].city[0].name
    });
  },
  bindCityChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cityIdex: e.detail.value,
      city: this.data.citySrray[this.data.minIndex].city[e.detail.value].name
    })
  },
  submit: function () {
    var that = this;
    var insurant = this.data.insurant;
    var index = this.data.index;
    var socialindex = this.data.socialindex;
    var date = this.data.date;
    var name = this.data.name;
    var tel = this.data.tel;
    // var code = this.data.code;
    var province = this.data.province;
    var city = this.data.city;
    console.log(date)
    if (date == '' || date == '请选择'){
      wx.showToast({
        title:'请选择出生年份',
        icon:'none'
      });
      return false;
    };
    if (name==''){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
      return false;
    };
    if (tel == '') {
      wx.showToast({
        title: '联系电话不能为空',
        icon: 'none'
      })
      return false;
    };
    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(tel))){
      wx.showToast({
        title: '联系电话格式错误',
        icon: 'none'
      })
      return false;
    };
    // if (code == '') {
    //   wx.showToast({
    //     title: '验证码不能为空',
    //     icon: 'none'
    //   })
    //   return false;
    // };
    if (province == '') {
      wx.showToast({
        title: '省份不能为空',
        icon: 'none'
      })
      return false;
    };

    let data = {
      insurant: insurant,
      name: name,
      socialSecurity: socialindex,
      telephone: tel,
      birthday: date,
      area: province + '省' + city + '市',
    };
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wxRequest.postRequest(InsureUrl, data).then(function (res) {
      console.log(res.data);
      wx.hideLoading()
      if (res.data.code==0){
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        });
        wx.navigateBack({
          delta: 2
        });
      }else{
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        });
      }
     
    })
    
  }


})
// pages/personal/appointment/appointment.js
var wxRequest = require('../../../utils/wxRequest.js')
var resueSave = require("../../../config.js").resueSave;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:'',
    tude: '请获取',
    service: ['轿车（含小型SUV）', '商务SUV','货车'],
    index:0,
    tel:'',
    carNumber:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getLoca: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(latitude, longitude)
        that.setData({
          latitude: latitude,
          longitude: longitude,
          tude: '已获取'
        })

      }
    })

  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    if (e.detail.value == 1) {
      this.setData({
        discountShow: true,
        serviceType: '道路救援'
      })
    } else {
      this.setData({
        discountShow: false,
        serviceType: '洗车'
      })
    }
  },
  bindTel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  bindcarNumber:function(e){
    this.setData({
      carNumber: e.detail.value
    })
  },

  submit:function(){
    var that = this;
    var latitude = that.data.latitude;
    var longitude = that.data.longitude;
    var service = that.data.service[that.data.index];
    var tel = that.data.tel;
    var carNumber = that.data.carNumber;
    if (latitude==''){
      wx.showToast({
        title: '未获取门店坐标',
        icon: 'none'
      });
      return false
    };
    if (tel == '') {
      wx.showToast({
        title: '手机号未填写',
        icon: 'none'
      });
      return false
    };

    if (!(/^1[34578]\d{9}$/.test(tel))) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      });
      return false;
    };
    if (carNumber == '') {
      wx.showToast({
        title: '手机号未填写',
        icon: 'none'
      });
      return false
    };

    var data = {
      location: latitude + ',' + longitude,
      carType: service,
      telephone:tel,
      carNumber: carNumber,
      enterpriseId:''
    };
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wxRequest.postRequest(resueSave, data).then(function (res) {
      console.log(res.data);
      if (res.data.code == 0) {
        // wx.navigateBack({
        //   delta: 1
        // })
      }
      wx.hideLoading()
    })

  }

 
})
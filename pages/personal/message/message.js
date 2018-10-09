// pages/personal/message/message.js
const app = getApp();
var wxRequest = require('../../../utils/wxRequest.js')
var infoUrl = require("../../../config.js").infoUrl;
var updateUrl = require("../../../config.js").updateUrl;
var upload = require("../../../config.js").upload;
var fileUrl = require("../../../config.js").fileUrl;
Page({

  /**
   * 页面的初始数据
   */

  data: {
    img: '',
    name: '请输入',
    tel: '请输入手机号',
    plate: '请输入车牌号',
    date: '',
    sex: '',
    index: 0,
    array: ['男', '女'],
    motor: '(选填)',
    date: '(选填)',
    date1: '(选填)'
  },

  onShow: function() {
    console.log(app.globalData.userInfo);
    this.getData()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

   

  },
  getPic: function(pic) {
    var that = this;
    let data = {};
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    var fileUrl1 = fileUrl + pic

    wxRequest.getRequest(fileUrl1, data).then(function(res) {
      console.log(res.data);
      wx.hideLoading()





    })

  },
  getData: function() {
    var that = this;
    let data = {};
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    var url = infoUrl + '/' + wx.getStorageSync('userDO').userId

    console.log(url)
    wxRequest.getRequest(url, data).then(function(res) {
      console.log(res.data);
      wx.hideLoading()
      if (res.data.code == 0) {
        if (res.data.userDO.name == null || res.data.userDO.name == '') {
          that.setData({
            name: app.globalData.userInfo.nickName,
          });
        } else {
          that.setData({
            name: res.data.userDO.name,
          });
        };

        if (res.data.userDO.sex == null || res.data.userDO.sex == '') {
          that.setData({
            index: Number(app.globalData.userInfo.gender)-1,
          });
        } else {
          that.setData({
            index: Number(res.data.userDO.sex) - 1,
          });
        };

        that.setData({
          tel: res.data.userDO.mobile,
          plate: res.data.userDO.carNumber,
          motor: res.data.userDO.engineNumber,
          date: res.data.userDO.insuranceExpirationTime.substr(0,10),
          date1: res.data.userDO.driverLicenseExpiryDate.substr(0, 10)
        });

      }

    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    });
    this.sure(3)
  },

  upHeader: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0]);


        wx.uploadFile({
          url: upload, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            const data = JSON.parse(res.data)
            console.log(data)
            wx.hideLoading()
            console.log(data.fileName)
            that.getPic(data.fileName)

            // that.setData({
            //   face: imgUrl + JSON.parse(data)[0],
            //   IDCardFront: JSON.parse(data)[0]
            // });
          }
        })

        that.setData({
          img: tempFilePaths[0]
        })
      }
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    this.sure(1)
  },
  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
    this.sure(2)
  },
  sure: function(sta) {

    var that = this;
    let data = {};
    console.log(that.data.date)
    if (sta == 1) {
      data = {
        insuranceExpirationTime: that.data.date,
        userId: wx.getStorageSync('userDO').userId
      }
    } else if (sta == 2) {
      console.log(that.data.date1)
      data = {
        driverLicenseExpiryDate: that.data.date1,
        userId: wx.getStorageSync('userDO').userId
      }
    } else if (sta == 3) {
      data = {
        sex: Number(that.data.index)+1,
        userId: wx.getStorageSync('userDO').userId
      }
    }



    wx.showLoading({
      title: '加载中',
      mask: true
    });
    console.log(updateUrl);
    wxRequest.postRequest(updateUrl, data).then(function(res) {
      console.log(res.data);
      wx.hideLoading();
      if (res.data.code == 0) {

      } else {
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    })
  }
})
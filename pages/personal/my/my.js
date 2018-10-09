//index.js
//获取应用实例
const app = getApp()
var wxRequest = require('../../../utils/wxRequest.js')
// var userIdUrl = require("../../../config.js").userIdUrl;
var infoUrl = require("../../../config.js").infoUrl;


Page({
  data: {
    show:false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name:''
  },

  onShow:function(){
    this.getData()
  },
  
  onLoad: function () {

    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          that.setData({
            show:false
          })
        }else{
          that.setData({
            show: true
          })
        }
      }
    });

   

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo){
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfpo: true,
        show:false
      })
    }
   
  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '1340000' 
    })
  },
  getData: function () {
    var that = this;
    let data = {};
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    var url = infoUrl + '/' + wx.getStorageSync('userDO').userId

    console.log(url)
    wxRequest.getRequest(url, data).then(function (res) {
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

 

        that.setData({
          tel: res.data.userDO.mobile,
          plate: res.data.userDO.carNumber,
          motor: res.data.userDO.engineNumber,
          date: res.data.userDO.insuranceExpirationTime,
          date1: res.data.userDO.driverLicenseExpiryDate
        });

      }

    })
  },
  
})

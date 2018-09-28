//index.js
//获取应用实例
const app = getApp()
var wxRequest = require('../../../utils/wxRequest.js')
// var userIdUrl = require("../../../config.js").userIdUrl;


Page({
  data: {
    show:false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
  
})

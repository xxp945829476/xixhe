//app.js
// var wxApi = require('../../utils/wxApi')
var wxRequest = require('./utils/wxRequest.js')
var userIdUrl = require("./config.js").userIdUrl;
var userSaveUrl = require("./config.js").userSaveUrl;
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    var that = this


    // 登录
    wx.login({
      success: res => {
        var d = that.globalData
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
        wx.request({
          url: l,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          // header: {}, // 设置请求的 header  
          success: function (res) {
            var obj = {};
            console.log(res.data)
            obj.openid = res.data.openid;
            obj.expires_in = Date.now() + res.data.expires_in;
            wx.setStorageSync('user', obj);//存储openid
            var data1 = {};
            var url = userIdUrl + '/' + res.data.openid;

            var data2 = {
              openId: res.data.openid
            };
            
            
            wxRequest.getRequest(url, data1).then(function (res) {
              console.log(res.data)
              if (res.data.code==0){
                wx.setStorageSync('userDO', res.data.userDO);
              }
              if(res.data.code == 1){ //当code=1时候openid不存在，需要保存数据
                wxRequest.postRequest(userSaveUrl, data2).then(function (res) {
                  console.log(res.data)
                })
              }
            })

          
          }
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    appid: 'wx3e51f7e2c9db69bd',//appid需自己提供，此处的appid我随机编写
    secret: 'ef6d5b6be8527e9a28afa6ec7c93a866',//secret需自己提供，此处的secret我随机编写
  }
})
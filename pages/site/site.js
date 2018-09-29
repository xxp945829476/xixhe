// pages/site/site.js
var wxRequest = require('../../utils/wxRequest.js')
var nearEnterprise = require("../../config.js").nearEnterprise;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getList(options.longitude, options.latitude)
  },
  navigation:function(){
    wx.openLocation({
      longitude: 120.263951,
      latitude: 31.565338,
      name: '飞悦洗车行'
    })
  },
  getList: function (longitude, latitude) {
    var that = this;
    var data = {};
    var url = nearEnterprise + '/' + latitude + ',' + longitude;
    wxRequest.getRequest(url, data).then(function (res) {
      console.log(res)
      that.setData({
        lists: res.data.rows
      });
    })
  },
  
})
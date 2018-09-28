// pages/news_details/news_details.js
var wxRequest = require('../../utils/wxRequest.js')
var articleDetailUrl = require("../../config.js").articleDetailUrl;
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    eyes:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.getData(options.id);
    
  },
  getData: function (id) {
    var that = this;
    let data = {
    };
    let url = articleDetailUrl+'/' + id
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wxRequest.getRequest(url, data).then(function (res) {
      console.log(res.data);
      wx.hideLoading()
      if (res.data.code==0){
        var article = res.data.data.content;
        that.setData({
          title: res.data.data.title,
          eyes: res.data.data.clicks
        });
          WxParse.wxParse('article', 'html', article, that, 5);
      }else{
        wx.showToast({
          title: 'res.data.msg',
          icon:'none'
        })
      }
      
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
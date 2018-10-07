// pages/earn_details/earn_details.js

var wxRequest = require('../../utils/wxRequest.js')
var getpoint = require("../../config.js").getpoint;
var insuranceDetailUrl = require("../../config.js").insuranceDetailUrl;
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    colorHey:false,
    articleId:'',
    title:'',
    publisher:'',
    eyes:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      this.setData({
        articleId: options.id
      });
     this.getData(options.id);
  },

  getData: function (id) {
    var that = this;
    let data = {
    };
    let url = insuranceDetailUrl + '/' + id
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wxRequest.getRequest(url, data).then(function (res) {
      console.log(res.data);
      wx.hideLoading()
      if (res.data.code == 0) {
        var article = res.data.data.content;
        that.setData({
          title: res.data.data.title,
          publisher: res.data.data.publisher,
          eyes: res.data.data.clicks
        });
        WxParse.wxParse('article', 'html', article, that, 5);
      } else {
        wx.showToast({
          title: 'res.data.msg',
          icon: 'none'
        })
      }

    })
  },

  praise:function(){
    var that=this;
    var data = {
      articleId: that.data.articleId,
      userId: wx.getStorageSync('userDO').userId
    }
    wxRequest.postRequest(getpoint, data).then(function (res) {
      console.log(res.data);
      wx.hideLoading()
      if (res.data.code==0){
        wx.showToast({
          title: '点赞成功，获得+x积分',
          icon: 'none'
        });
      }else{
        wx.showToast({
          title: '点赞失败',
          icon: 'none'
        });
      }
     
      
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
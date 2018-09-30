// pages/merchant/mall_detail/mall_detail.js
var wxRequest = require('../../../utils/wxRequest.js')
var goodsBuy = require("../../../config.js").goodsBuy;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  add:function(){
    this.setData({
      num:++this.data.num
    })
  },
  minus:function(){
    if(this.data.num>1){
      this.setData({
        num: --this.data.num
      })
    }
  },
  buy:function(){
    var that = this;
    let data = {
      number: that.data.num,
      goodsId: '',
      userId: wx.getStorageSync('userId')
    };
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wxRequest.getRequest(goodsBuy, data).then(function (res) {
      console.log(res.data);
      wx.hideLoading()

    })
    
  }
})
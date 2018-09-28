// pages/earn_points/earn_points.js
var wxRequest = require('../../utils/wxRequest.js')
var insuranceListUrl = require("../../config.js").insuranceListUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit: 10,
    offset: 0,
    lists: [],
    load:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  getData: function () {
    var that = this;
    let data = {
      limit: that.data.limit,
      offset: that.data.offset
    };
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wxRequest.getRequest(insuranceListUrl, data).then(function (res) {
      console.log(res.data);
      wx.hideLoading()
      that.setData({
        lists: that.data.lists.concat(res.data.rows)
      });
      if (res.data.rows.length <= 0) {
        that.setData({
          load: false
        });
        wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
      };
    })
  },

 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.load) {
      this.setData({
        offset: this.data.offset + 10,
      })
      this.getData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
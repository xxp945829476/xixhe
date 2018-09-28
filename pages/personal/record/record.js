// pages/personal/record/record.js
var wxRequest = require('../../../utils/wxRequest.js')
var orderList = require("../../../config.js").orderList;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit:15,
    offset:0,
    lists:[],
    load:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
    wxRequest.getRequest(orderList, data).then(function (res) {
      console.log(res.data);
      wx.hideLoading()


        that.setData({
          lists: res.data.rows
        });
       if (res.data.rows<=0){
         load:false
        }

   
        // wx.showToast({
        //   title: 'res.data.msg',
        //   icon: 'none'
        // })
      

    })
  },
  onReachBottom: function () {
    if (this.data.load) {
      this.setData({
        offset: this.data.offset + 10,
      })
      this.getData()
    }
  },

 
})
// pages/personal/edit/edit.js
var wxRequest = require('../../../utils/wxRequest.js')
var updateUrl = require("../../../config.js").updateUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      show:'',
      name:'',
      tel:'',
      carNumber:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var barTitle = options.type;
    wx.setNavigationBarTitle({
      title: barTitle
    });
    if (barTitle=='姓名'){
        this.setData({
          show:1
        })
    } else if (barTitle == '手机号码'){
      this.setData({
        show: 2
      })
    }else{
      this.setData({
        show: 3
      })
    }
   
  },

  sure:function(){

    var that = this;
    let data = {
      name: that.data.name,
      carNumber: that.data.carNumber,
      userId: wx.getStorageSync('user').openid
    };
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wxRequest.postRequest(updateUrl, data).then(function (res) {
      console.log(res.data);
      wx.hideLoading()
    })
  }
})
// pages/merchant/exchange_card/exchange_card.js
var wxRequest = require('../../../utils/wxRequest.js')
var cardList = require("../../../config.js").cardList;
var exchangeSave = require("../../../config.js").exchangeSave;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit:10,
    offset:0,
    load:true,
    show: false,
    lists:[],
    name:'',
    tel:'',
    alpayAccount:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  getData: function () {
    var that = this;
    console.log(that.data.offset)
    let data = {
      limit: that.data.limit,
      offset: that.data.offset,
      userId: wx.getStorageSync('userId')
    };
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wxRequest.getRequest(cardList, data).then(function (res) {
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

  use:function(){
    var that = this;
    that.setData({
      show:true
    })
  },
  bindName:function(e){
    console.log(e)
    this.setData({
      name:e.detail.value
    })
  },
  bindTel: function (e) {
    console.log(e)
    this.setData({
      tel: e.detail.value
    })
  },
  bindAccount: function (e) {
    console.log(e)
    this.setData({
      alpayAccount: e.detail.value
    })
  },

  useCard:function(){
    var that = this;
    var name = that.data.name;
    var tel = that.data.tel
    var alpayAccount = that.data.alpayAccount;
    if (name==''){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return false
    }
    if (tel == '') {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      });
      return false
    };
    if (tel == '') {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      });
      return false
    };
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(tel))) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      });
      return false;
    } 
    if (alpayAccount == '') {
      wx.showToast({
        title: '请输入账号',
        icon: 'none'
      });
      return false
    };

    var data = {
      userId: wx.getStorageSync('userId'),
      cardId:'',
      name:name,
      telephone:tel,
      alpayAccount: alpayAccount
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wxRequest.postRequest(exchangeSave, data).then(function (res) {
      console.log(res.data);
     
      wx.hideLoading()
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
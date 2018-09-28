// pages/personal/message/message.js
const app = getApp();
var wxRequest = require('../../../utils/wxRequest.js')
var infoUrl = require("../../../config.js").infoUrl;
Page({

  /**
   * 页面的初始数据
   */

  data: {
        img:'',
        name:'请输入',
        tel:'',
        plate:'',
        date:'',
        sex:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo);
    var sexuality;
    if (app.globalData.userInfo.gender==1){
      sexuality = '男'
    }else{
      sexuality = '女'
    }
    this.setData({
      img: app.globalData.userInfo.avatarUrl,
      name: app.globalData.userInfo.nickName,
      sex: sexuality
    });
    this.getData()
  },
  getData: function () {
    var that = this;
    let data = {};
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    var url = infoUrl + '/' + wx.getStorageSync('user').openid
    wxRequest.getRequest(url, data).then(function (res) {
      console.log(res.data);
      wx.hideLoading()
    })
  },

  upHeader:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])
        that.setData({
          img: tempFilePaths[0]
        })
      }
    })
  }
})
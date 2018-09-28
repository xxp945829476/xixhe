// pages/site/site.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      x:'',
      y:'',
      show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  navigation:function(){
    wx.navigateTo({
      url: '/pages/personal/appointment/appointment',
    })
  },



    
  
})
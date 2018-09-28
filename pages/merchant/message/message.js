// pages/personal/message/message.js
const app = getApp();
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
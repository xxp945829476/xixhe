// pages/Car_news/Car_news.js
var wxRequest = require('../../utils/wxRequest.js')
var articleListUrl = require("../../config.js").articleListUrl;
var listAll = require("../../config.js").list_all;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit: 10,
    offset: 0,
    lists: [],
    navList:[],
    load:true,
    categoriesId:'',
    tabShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList();
  },
  tab:function(event){
    this.setData({
      categoriesId: event.currentTarget.id,
      offset:0,
      tabShow:false,
      load:true
    });
    this.getData()
  },

  getData: function() {
    var that = this;
    console.log(that.data.offset)
    let data = {
      limit: that.data.limit,
      offset: that.data.offset,
      categoriesId: that.data.categoriesId
    };
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wxRequest.getRequest(articleListUrl, data).then(function(res) {
      console.log(res.data);
      wx.hideLoading()
      if(that.data.tabShow){
        that.setData({
          lists: that.data.lists.concat(res.data.rows)
        });
        if (res.data.rows.length <= 0) {
          that.setData({
            load: false
          });
          wx.showToast({
            title:'没有更多了',
            icon:'none'
          })
        };
      }else{
        that.setData({
          lists: res.data.rows
        })
      }
      
     
    })
  },

  getList:function(){
    var that = this;
    let data = {};
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wxRequest.getRequest(listAll, data).then(function (res) {
      console.log(res.data);
      wx.hideLoading()
      if (res.data.code==0){
        that.setData({
          navList: res.data.data,
          categoriesId: res.data.data[0].id
        });
        that.getData();
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none',
          duration:2000
        })
      }
     
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.load){
          this.setData({
            offset: this.data.offset + 10,
            tabShow:true
          })
          this.getData()
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
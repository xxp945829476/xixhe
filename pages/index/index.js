// var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
// var qqmapsdk;

var wxRequest = require('../../utils/wxRequest.js')
var nearEnterprise = require("../../config.js").nearEnterprise;

Page({
  data: {
    ison:false,
    getData: [
      
    ],
    scale: '14',
    Height: '0',
    controls: '40',
    latitude: '',
    longitude: '',
    markers: [],
    list:[]
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        that.setData({
          scale: 13,
          longitude: res.longitude,
          latitude: res.latitude
        });
        that.getList(res.longitude, res.latitude)
      }
    });

    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          view: {
            Height: res.windowHeight
          },
        })
      }
    });

  },
  getList: function (longitude,latitude){
    var that = this;
    var data = {};
    var url = nearEnterprise + '/' + latitude + ',' + longitude;
    wxRequest.getRequest(url, data).then(function (res) {
      console.log(res.data)
        that.setData({
          getData: res.data.rows
        });
      that.getDtan()
    })
  },
  getDtan:function(){
    var that = this;
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        that.setData({
          markers: that.getSchoolMarkers(),
          scale: 13,
          longitude: res.longitude,
          latitude: res.latitude
        });
       
      }
    });
  },
  controltap(e) {
    this.moveToLocation()
  },
  getSchoolMarkers() {

    var market = [];
    console.log(this.data.getData)
    for (let item of this.data.getData) {

      let marker1 = this.createMarker(item);

      market.push(marker1)
    }
    return market;
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  strSub: function (a) {
    var str = a.split(".")[1];
    str = str.substring(0, str.length - 1)
    return a.split(".")[0] + '.' + str;
  },
  createMarker(point) {
    console.log(point)
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "../../images/che.png",
      id: point.id || 0,
      name: point.placeName || '',
      title: point.placeName || '',
      latitude: latitude,
      longitude: longitude,
      label: {
        x: -24,
        y: -26,
        content: point.placeName
      },
      width: 30,
      height: 30
    };
    return marker;
  },
  linksite:function(){
    var that = this;
    wx.navigateTo({
      url: '/pages/site/site?latitude=' + that.data.latitude + '&longitude=' + that.data.longitude
    })
  },
  linknew:function(){
    wx.navigateTo({
      url: '/pages/Car_news/Car_news'
    })
  },
  linkearn: function () {
    wx.navigateTo({
      url: '/pages/earn_points/earn_points'
    })
  },
  meunMy:function(){
    wx.navigateTo({
      url: '/pages/personal/my/my'
    })
  },
  
  meunShow:function(){

    if (this.data.ison){
      this.setData({
        ison: false
      })
    }else{
      this.setData({
        ison: true
      })
    }
   
  },
  scancode:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  }
  
})
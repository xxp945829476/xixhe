var QQMapWX = require('../../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({
  data: {
    ison:false,
    listData:[],
    getData: [
      {
        "id": 1,
        // "placeName": "中关村广场",
        "placeImageUrl": "",
        "placeAddress": "江南大学",
        "longitude": "120.277757",
        "latitude": "31.489746"
      },
      {
        "id": 2,
        // "placeName": "中关村广场",
        "placeImageUrl": "",
        "placeAddress": "海岸城",
        "longitude": "120.301923",
        "latitude": "31.494951"
      },
       {
        "id": 3,
        // "placeName": "中关村广场",
        "placeImageUrl": "",
        "placeAddress": "南禅寺",
        "longitude": "120.312563",
        "latitude": "31.57326"
      },
      {
        "id": 4,
        // "placeName": "中关村广场",
        "placeImageUrl": "",
        "placeAddress": "无锡体育中心",
        "longitude": "120.271532",
        "latitude": "31.548368"
       },
       {
         "id": 5,
         // "placeName": "中关村广场",
         "placeImageUrl": "",
         "placeAddress": "三阳广场",
         "longitude": "120.306399",
         "latitude": "31.581373"
       }
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

    qqmapsdk = new QQMapWX({
      key: '7XQBZ-ASOEW-LYMRB-O5O4J-N5Q75-LRB5E'
    });

    // that.setData({
    //   url: app.globalData.url
    // })

    // var data = JSON.stringify({
    //   page: 1,
    //   pageSize: 10,
    //   request: {
    //     placeLongitude: app.globalData.longitude,
    //     placeLatitude: app.globalData.latitude,
    //     userId: app.globalData.userId
    //   }
    // })
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        
        that.setData({
          scale: 13,
          longitude: res.longitude,
          latitude: res.latitude
        });
        that.getDtan()
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
  getDtan:function(){
    var that = this;
    qqmapsdk.calculateDistance({
      from: {
        latitude: that.data.latitude,
        longitude: that.data.longitude
      },
      to: that.data.getData,
      success: function (res) {
        console.log(res);
        var arr = [];
        var recently = [];
        console.log(res.result.elements[0].distance);
        res.result.elements.forEach(function (element) {
          arr.push(element.distance)
        });

        arr = arr.sort(that.sortNumber);
        console.log(arr);
        res.result.elements.forEach(function (element,index) {
        
          if (element.distance == arr[0]){
               
                res.result.elements[index].to['distance'] = element.distance
                recently.push(res.result.elements[index].to)
          } else if (element.distance == arr[1]){
            res.result.elements[index].to['distance'] = element.distance
            recently.push(res.result.elements[index].to)
          } else if (element.distance == arr[2]) {
            res.result.elements[index].to['distance'] = element.distance
            recently.push(res.result.elements[index].to)
          }
         
        });

        console.log(recently)

        that.setData({
          listData: recently
        });
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
      
      fail: function (res) {
        console.log(res);
      }
    });
  },
  sortNumber: function (a, b) {
    return a - b
  },
  controltap(e) {
    this.moveToLocation()
  },
  getSchoolMarkers() {

    var market = [];

    for (let item of this.data.listData) {

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
    let latitude = point.lat;
    let longitude = point.lng;
    let marker = {
      iconPath: "../../../images/che.png",
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
    wx.navigateTo({
      url: '/pages/personal/rescueSite/rescueSite'
    })
  },


  
})
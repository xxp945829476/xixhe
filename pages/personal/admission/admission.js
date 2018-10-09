// pages/personal/admission/admission.js
var wxRequest = require('../../../utils/wxRequest.js')
var enterpriseSave = require("../../../config.js").enterpriseSave;
var upload = require("../../../config.js").upload;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:'',
    adress:'',
    company:'',
    contacts:'',
    tel:'',
    service: [{'id':1,'serviceName':'道路救援'},{'id':2,'serviceName':'洗车'}],
    index: 0,
    discountShow:false,
    pic: '/images/add.png',
    tude:'请获取',
    serviceType:'',
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getLoca:function(){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(latitude, longitude)
        that.setData({
          latitude: latitude,
          longitude: longitude,
          tude: '已获取'
        })

      }
    })
  
  },

  bindAdress:function(e){
    console.log(e.detail.value)
    this.setData({
      adress: e.detail.value
    })
  },

  bindCompany:function(e){
    this.setData({
      company: e.detail.value
    })
  },
  bindTel:function(e){
    this.setData({
      tel: e.detail.value
    })
  },
  bindContacts:function(e){
    this.setData({
      contacts: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log(e.detail);
    this.setData({
      
      index: e.detail.value
    })
    if (e.detail.value==1){
      this.setData({
        discountShow: true,
        serviceType: 1
      })
    }else{
      this.setData({
        discountShow: false,
        serviceType: 2
      })
    }
  },
  upPic:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          pic: tempFilePaths[0]
        });
        console.log(res.tempFilePaths)
        let data = {
          file: tempFilePaths[0]
        }
        wx.uploadFile({
          url: upload, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            const data = res.data
            console.log(data)
            wx.hideLoading()
            // self.setData({
            //   face: imgUrl + JSON.parse(data)[0],
            //   IDCardFront: JSON.parse(data)[0]
            // });
          }
        })
      }
    })
  },
  submit:function(){

  
    var that = this;  
    var latitude = that.data.latitude;
    var longitude = that.data.longitude;
    var adress = that.data.adress;
    var company = that.data.company;
    var contacts = that.data.contacts;
    var tel = that.data.tel;
    var index = index;
    var pic = that.data.pic;

    if (latitude==''){
      wx.showToast({
        title: '未获取门店坐标',
        icon: 'none'
      });
      return false
    };

    if (adress == '') {
      wx.showToast({
        title: '请输入门店地址',
        icon: 'none'
      });
      return false
    };
    if (company == '') {
      wx.showToast({
        title: '请输入门店名称',
        icon: 'none'
      });
      return false
    };

    if (contacts == '') {
      wx.showToast({
        title: '请输入联系人',
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

    var data = {
      geographicCoordinates: latitude + ',' + longitude,
      address: adress,
      storeName: company,
      name: contacts,
      telephone:tel,
      serviceType: that.data.serviceType,
      picUrl: pic,
      userId: wx.getStorageSync('userDO').userId
    }

    
    wxRequest.postRequest(enterpriseSave, data).then(function (res) {
      console.log(res.data);
      if (res.data.code==0){
          wx.navigateBack({
            delta: 1
          })
      }
      wx.hideLoading()
    })

     
  },

 
})
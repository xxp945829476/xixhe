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
      carNumber:'',
      motor:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var barTitle = options.type;
    wx.setNavigationBarTitle({
      title: barTitle
    });
    if (barTitle=='姓名'){
        this.setData({
          show:1,
        })
    } else if (barTitle == '手机号码'){
      this.setData({
        show: 2
      })
    } else if (barTitle == '车牌号'){
      this.setData({
        show: 3
      })
    }else{
      this.setData({
        show: 4
      })
    }
   
  },
  bindName:function(e){
      console.log(e)
      this.setData({
        name: e.detail.value
      })
  },
  bindTel:function(e){
    this.setData({
      tel: e.detail.value
    })
  },
  bindCar: function (e) {
    this.setData({
      carNumber: e.detail.value
    })
  },
  bindMotor:function(e){
    this.setData({
      motor: e.detail.value
    })
  },

  sure:function(){

    var that = this;
    let data = {
     
      
     
      
      
    };
    var saveValue = that.data.show;
    if (saveValue==1){
      data={
        name: that.data.name,
        userId: wx.getStorageSync('userDO').userId
      }
    } else if (saveValue == 2){
      data = {
        mobile: that.data.tel,
        userId: wx.getStorageSync('userDO').userId
      }
     
    } else if (saveValue == 3){

      data = {
        carNumber: that.data.carNumber,
        userId: wx.getStorageSync('userDO').userId
      }
     
    }else{
      data = {
        engineNumber: that.data.motor,
        userId: wx.getStorageSync('userDO').userId
      }
     
    }


    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wxRequest.postRequest(updateUrl, data).then(function (res) {
      console.log(res.data);
      wx.hideLoading();
      if (res.data.code==0){
        wx.navigateBack({
          delta: 1
        })
      }else{
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    })
  }
})
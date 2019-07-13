// pages/commodity/commodity.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isshow:false,
      isshow1:false,
      sid:"",
      list:[],
      list1:[],
      id:"",
      ide:"",
      count: 1,
      index:[],
      count1:0,
      list2:[],
      productId:"",
    markers:[],
    page:1,
    size:2,
    uuu:""
  },
  // 选择省市区
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 跳转购物车
  tocar:function(){
    wx.switchTab({
      url: '/pages/gwc/gwc',
    })
  },
  // 领取优惠券
  lqyhq:function(e){
    var couponId = e.target.dataset.couponid;
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/coupon/ReceiveCoupon',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { openId: app.globalData.openId, couponId: couponId},
      success(res) {
        wx.request({
          url: app.globalData.url + '/api/coupon/couponList',
          method: "POST",
          header: { 'content-type': 'application/json'},
          data: { openId: app.globalData.openId },
          success(res) {
            that.setData({ list2: res.data.result })
          }
        })
      }
      })
  },
  add:function(){
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        var name = res.name
        var address = res.address
        var latitude = res.latitude
        var longitude = res.longitude
        _this.setData({
          name: name,
          address: address,
          latitude: latitude,
          longitude: longitude
        })
        wx.request({
          url: app.globalData.url + '/api/machine/NearMachinePageList',
          method: "POST",
          header: { 'content-type': 'application/json' },
          data: { page: 1, size: 10, longitude: _this.data.longitude, latitude: _this.data.longitude.latitude },
          success(res) {
            _this.setData({ markers: res.data.result })
          }
        })
      }
    })
  },
  // 商品数量减
  jian: function (e) {
    var a = this.data.count - 1;
    if (a < 1) { a = 1 }
    this.setData({ count: a })
  },
  // 商品数量加
  jia: function (e) {
    var a = this.data.count + 1;
    this.setData({ count: a })
  },
  yhzx:function(){
    this.setData({isshow:true})
  },
  wc:function(){
    this.setData({isshow:false})
  },
  show_1:function(){
    this.setData({isshow1:true})
  },
  del:function(){
    this.setData({isshow1:false})
  },
  // 立即购买
  nowshop:function(){
    if(!this.data.uuu){
      wx.showToast({
        title: '请选择斤数',
        duration:2000,
        icon:"none"
      })
    } else{
      var that = this;
      wx.request({
        url: app.globalData.url + '/api/product/OperationFreightByProduct',
        method: "POST",
        header: { 'content-type': 'application/json' },
        data: { productId: that.data.productId, productNum: that.data.count },
        success(res) {
          if (res.data.code == 200) {
            wx.navigateTo({
              url: '/pages/fill/fill?id=' + that.data.productId + "&count=" + that.data.count + "&sid=1" + "&productName=" + that.data.list.productName + "&productWeight=" + that.data.list.productWeight + "&price="
                + that.data.list.productPrice + "&freight=" + res.data.result.freight + "&imgurl=" + that.data.list1[0],
            })
          }
        }
      })
    }  
  },
  // 选择公斤规格
  xz:function(e){
    var that = this;
    this.setData({ id: e.target.dataset.zl, uuu: e.target.dataset.zl}) 
    wx.request({
      url: app.globalData.url + '/api/product/ProductDetailsByType',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { productType: that.data.ide, productWeight:that.data.id },
      success(res) {
        that.setData({ list: res.data.result, productId: res.data.result.productId})
      }
    })
  },
  // 显示更多设备
  more:function(){
    this.data.size+=2;
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/machine/NearMachinePageList',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { page: that.data.page, size: that.data.size, longitude: app.globalData.longitude, latitude: app.globalData.latitude },
      success(res) {
        that.setData({ markers: res.data.result })
      }
    })
  },
  // 导航去附近设备
  go: function (e) {
    var a = e.target.dataset;
    wx.openLocation({
      latitude: a.latitude,
      longitude: a.longitude,
      name: a.title,
      scale: 15
    })
  },
  // 添加购物车
  tocart:function(){
    if(!this.data.uuu){
      wx.showToast({
        title: '请选择斤数',
        duration: 2000,
        icon: "none"
      })
    } else{
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/Product/ProductCartAdd',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { openId: app.globalData.openId, productId: that.data.productId, productNum: that.data.count },
      success(res) {
        if(res.data.code==200){
          wx.showToast({
            title: '加入成功',
            duration:1000
          })
          wx.request({
            url: app.globalData.url + '/api/product/ProductCartInfo',
            method: "POST",
            header: { 'content-type': 'application/json' },
            data: { openId: app.globalData.openId },
            success(res) {
              that.setData({ count1: res.data.result.length })
            }
          })
        }
      }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ sid:options.id,productId:options.id})
    var that = this;
    // 商品详情
    wx.request({
      url: app.globalData.url + '/api/product/ProductDetails',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { productId:that.data.sid},
      success(res) {
        var gg = res.data.result.productImg.split(",")
        that.setData({ list: res.data.result, list1: gg, ide: res.data.result.productType})
        var article =res.data.result.productDetails;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
    // 购物车数量
    wx.request({
      url: app.globalData.url + '/api/product/ProductCartInfo',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { openId: app.globalData.openId },
      success(res) {
        that.setData({ count1: res.data.result.length })
      }
    })
    // 优惠券列表
    wx.request({
      url: app.globalData.url + '/api/coupon/couponList',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { openId: app.globalData.openId},
      success(res) {
        that.setData({list2:res.data.result})
      }
    })
    // 附近设备列表
    wx.request({
      url: app.globalData.url + '/api/machine/NearMachinePageList',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { page: that.data.page, size: that.data.size, longitude: app.globalData.longitude, latitude: app.globalData.latitude },
      success(res) {
        that.setData({ markers: res.data.result })
      }
    })
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
    this.setData({id:"",uuu:""})
    var that = this;
    // 商品详情
    wx.request({
      url: app.globalData.url + '/api/product/ProductDetails',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { productId: that.data.sid },
      success(res) {
        var gg = res.data.result.productImg.split(",")
        that.setData({ list: res.data.result, list1: gg, ide: res.data.result.productType}) 
        var article = res.data.result.productDetails;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
    // 购物车数量
    wx.request({
      url: app.globalData.url + '/api/product/ProductCartInfo',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { openId: app.globalData.openId },
      success(res) {
        that.setData({ count1: res.data.result.length })
      }
    })
    // 优惠券列表
    wx.request({
      url: app.globalData.url + '/api/coupon/couponList',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { openId: app.globalData.openId },
      success(res) {
        that.setData({ list2: res.data.result })
      }
    })
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
    return {
      title: '邀请你加入团队',
      path: '/pages/logs/logs?openid=' + app.globalData.openId,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
// pages/commodity/commodity.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
var timespan = new Date().getTime();
var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
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
      list2:[]
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  tocar:function(){
    wx.switchTab({
      url: '/pages/gwc/gwc',
    })
  },
  jian: function (e) {
    var a = this.data.count - 1;
    if (a < 1) { a = 1 }
    this.setData({ count: a })
  },
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
  nowshop:function(){
    var that = this;
    var a = wx.getStorageSync('Token'); 
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/product/OperationFreightByProduct',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { productId: that.data.ide, productNum: that.data.count },
      success(res) {
        console.log(res)
        if(res.data.code==200){
          wx.navigateTo({
            url: '/pages/fill/fill?id=' + that.data.ide + "&count=" + that.data.count + "&sid=1" + "&productName=" + that.data.list.productName + "&productWeight=" + that.data.list.productWeight + "&price=" 
              + that.data.list.productPrice + "&freight=" + res.data.result.freight+"&imgurl="+that.data.list1[0],
          })
        }
      }
    })
  },
  xz:function(e){
    this.setData({ id: e.target.dataset.zl})
    var that=this;
    var a = wx.getStorageSync('Token');
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/product/ProductDetailsByType',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { productType: that.data.ide, productWeight:that.data.id },
      success(res) {
        console.log(res)
        that.setData({ list: res.data.result, productId: res.data.result.productId})
      }
    })
  },
  tocart:function(){
    var that = this;
    var a = wx.getStorageSync('Token');
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/Product/ProductCartAdd',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId: app.globalData.openId, productId: that.data.productId },
      success(res) {
        console.log(res,)
        if(res.data.code==200){
          wx.showToast({
            title: '加入成功',
            duration:1000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ sid:options.id})
    var that = this;
    var a = wx.getStorageSync('Token');
    console.log(a)
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/product/ProductDetails',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { productId:that.data.sid},
      success(res) {
        console.log(res)
        var gg = res.data.result.productImg.split(",")
        that.setData({ list: res.data.result, list1: gg, ide: res.data.result.productType, id: res.data.result.productWeight})
        var article =res.data.result.productDetails;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
    wx.request({
      url: app.globalData.url + '/api/product/ProductCartInfo',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId: app.globalData.openId },
      success(res) {
        console.log(res)
        that.setData({ count1: res.data.result.length })
      }
    })
    wx.request({
      url: app.globalData.url + '/api/coupon/couponList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId: app.globalData.openId},
      success(res) {
        console.log(res)
        that.setData({list2:res.data.result})
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
    var that = this;
    var a = wx.getStorageSync('Token');
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/product/ProductCartInfo',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId:app.globalData.openId },
      success(res) {
        console.log(res)
        that.setData({count1:res.data.result.length})
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

  }
})
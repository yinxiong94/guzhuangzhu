// pages/commodity/commodity.js
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
      ide:""
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
  xz:function(e){
    this.setData({ id: e.target.dataset.zl})
    var that=this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/product/ProductDetailsByType',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { productType: that.data.ide, productWeight:that.data.id },
      success(res) {
        console.log(res)
        that.setData({ list: res.data.result,ide:res.data.result.productId})
      }
    })
  },
  tocart:function(){
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/Product/ProductCartAdd',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId: app.globalData.openId, productId: that.data.ide },
      success(res) {
        console.log(res)
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
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
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
        console.log(that.data.id)
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
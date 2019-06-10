// pages/fill/fill.js
const app = getApp()
var timespan = new Date().getTime();
var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow:0,
    iftrue: false,
    id:"",
    count:"",
    list:[],
    list1:[],
    productName:"",
    productWeight:"",
    freight:"",
    freight:"",
    imgurl:"",
    price:"",
    price1:"",
    list111:[],
    isshow1:false,
    price2:0,
    zj:"",
    list1111:[],
    list2:[],
    isshow2:false
      },
  t1:function(){
    this.setData({ isshow: 0, iftrue: false})
    var a = this.data.price1 - this.data.price2;
    this.setData({zj:a})
  },
  t2: function () {
    this.setData({ isshow: 1, iftrue: true})
    var a = this.data.price1 - this.data.price2 -(-this.data.freight)
    this.setData({zj:a})
  },
  t111:function(){
    this.setData({isshow2:false})
  },
  tozf:function(){
    wx.navigateTo({
      url: '/pages/ddzf/ddzf',
    })
  },
  t123456:function(e){
    console.log(e.target.dataset)
    this.setData({ list1111: e.target.dataset})
  },
  todz:function(){
    this.setData({isshow2:true})
  },
  tolq:function(){
      this.setData({isshow1:true})
  },
  del:function(){
    this.setData({isshow1:false})
  },
  sy:function(e){
    console.log(e.target.dataset.price)
    this.setData({ isshow1: false, price2: e.target.dataset.price})
    if (this.data.isshow == 0) {
      var a = this.data.price1 - this.data.price2
      this.setData({ zj: a })
    }
  },
  tosh: function () {
    wx.navigateTo({
      url: '/pages/tjdz/tjdz',
    })
  },
  f123: function (e) {
    var that = this;
    var a = wx.getStorageSync('Token');
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/MemberCard/SetDefaultAddress',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { addressId: e.target.dataset.fid },
      success(res) {
        console.log(res)
      }
    })
  },
  bj1: function (e) {
    console.log(1)
    wx.navigateTo({
      url: '/pages/tjdz1/tjdz1?addressId=' + e.target.dataset.fid + "&consignee=" + this.data.list2[e.target.dataset.uid].consignee + "&phone=" + this.data.list2[e.target.dataset.uid].phone + "&area=" + this.data.list2[e.target.dataset.uid].area + "&address=" + this.data.list2[e.target.dataset.uid].address,
    })
  },
  del1: function (e) {
    var that = this;
    var a = wx.getStorageSync('Token');
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/MemberCard/AddressDel',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { addressId: e.target.dataset.fid },
      success(res) {
        console.log(res)
        wx.request({
          url: app.globalData.url + '/api/MemberCard/AddressList',
          method: "POST",
          header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
          data: { openId: app.globalData.openId },
          success(res) {
            console.log(res)
            that.setData({ list2: res.data.result })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({ id: options.id, count: options.count, productName: options.productName, productWeight: options.productWeight, freight: options.freight, freight: options.freight, imgurl: options.imgurl, price: options.price})
    if(options.sid==1){
      var a=options.count*options.price
      this.setData({price1:a})
    }
    var that = this;
    var a = wx.getStorageSync('Token');
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/coupon/AvailableMemberCoupon',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId: app.globalData.openId, sumMoney:that.data.price1 },
      success(res) {
        console.log(res)
        that.setData({list111:res.data.result})
      }
    })
    wx.request({
      url: app.globalData.url + '/api/MemberCard/AddressList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId: app.globalData.openId },
      success(res) {
        console.log(res)
        that.setData({ list1111: res.data.result[0],list2:res.data.result})
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
      if(this.data.isshow==0){
        var a = this.data.price1 - this.data.price2
        this.setData({zj:a})
      }
    var that = this;
    var a = wx.getStorageSync('Token');
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/MemberCard/AddressList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId: app.globalData.openId },
      success(res) {
        console.log(res)
        that.setData({ list1111: res.data.result[0], list2: res.data.result })
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
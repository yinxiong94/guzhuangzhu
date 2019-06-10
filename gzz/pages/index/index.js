const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/pages/img/hui.png',
      '/pages/img/hui.png',
      '/pages/img/hui.png',
    ],
    list:[],
    swiperIndex: 1,
    list1:[],
    row:[],
    row1:[]
  },
  lqyhq:function(e){
    var id=e.target.dataset.id;
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/coupon/ReceiveCoupon',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId: app.globalData.openId, couponId:id},
      success(res) {
        wx.request({
          url: app.globalData.url + '/api/coupon/couponList',
          method: "POST",
          header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
          data: { openId: app.globalData.openId },
          success(res) {
            that.setData({ list1: res.data.result })
          }
        })
      }
    })
  },
  swiperChange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  kthy:function(){
    wx.navigateTo({
      url: '/pages/membership/membership',
    })
  },
  spxq:function(e){
    wx.navigateTo({
      url: '/pages/commodity/commodity?id='+e.target.dataset.sid,
    })
  },
  yhqzx:function(){
    wx.navigateTo({
      url: '/pages/discount/discount',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    var that=this;  
    var a=wx.getStorageSync('Token');
    var timespan = new Date().getTime();   
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/rotationChart/rotationChartList',
      method:"POST",
      header: { 'content-type': 'application/json', signKey:a.signId, timespan: timespan, nonce: nonce, signature: signature},
      success(res){
        console.log(res)
        that.setData({list:res.data.result})
      }
    }),
    // 优惠券 
    wx.request({
      url: app.globalData.url +'/api/coupon/couponList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data:{openId:app.globalData.openId},
      success(res){
        that.setData({list1:res.data.result})
      }
    }),
    // 电子会员卡
    wx.request({
      url: app.globalData.url +'/api/memberCard/memberCardConfigList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      success(res){
        that.setData({ imgUrls: res.data.result })
      }
    }),
    // 商品展示
    wx.request({
      url: app.globalData.url +'/api/product/productByHomeList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      success(res) {
        console.log(res)
        that.setData({row1:res.data.result})
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
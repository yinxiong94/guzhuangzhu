// pages/discount/discount.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:1,
      list:[]
  },
  quan:function(e){
    var that=this;
    var b = e.target.dataset.id
    this.setData({ id:b})
    if(b==2){
     
      var a = wx.getStorageSync('Token'); 
      var timespan = new Date().getTime();
      var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));     
      var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();    
      // 会员领取优惠券列表
      wx.request({
        url: app.globalData.url + '/api/coupon/MemberCouponList',
        method: "POST",
        header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
        data: { openId: app.globalData.openId },
        success(res){
          that.setData({list:res.data.result})
        }
      })
    } else if(b==3){
      var a = wx.getStorageSync('Token');
      var timespan = new Date().getTime();
      var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1)); 
      var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
      // 会员到期优惠券列表
      wx.request({
        url: app.globalData.url + '/api/coupon/MemberCouponByExpireList',
        method: "POST",
        header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
        data: { userId: app.globalData.openId,page:1,size:10},
        success(res) {
          console.log(2)
          that.setData({ list: res.data.result })
          console.log(res)
        }
      })
    } else{
      var that = this;
      var a = wx.getStorageSync('Token');
      var timespan = new Date().getTime();
      var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
      var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
      // 优惠券列表
      wx.request({
        url: app.globalData.url + '/api/coupon/couponList',
        method: "POST",
        header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
        data: { openId: app.globalData.openId },
        success(res) {
          console.log(res)
          that.setData({ list: res.data.result })
        }
      })
    }
  },
  // 立即领取优惠券
  ljlq:function(e){
      console.log(e.target.dataset.id)
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      // 立即领取优惠券
      url: app.globalData.url + '/api/coupon/ReceiveCoupon',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId: app.globalData.openId, couponId: e.target.dataset.id},
      success(res) {
        wx.request({
          // 刷新优惠券列表
          url: app.globalData.url + '/api/coupon/couponList',
          method: "POST",
          header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
          data: { openId: app.globalData.openId },
          success(res) {
            console.log(res)
            that.setData({ list: res.data.result })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    // 优惠券列表
      wx.request({
        url: app.globalData.url + '/api/coupon/couponList',
        method: "POST",
        header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
        data: { openId: app.globalData.openId },
        success(res) {
          that.setData({ list: res.data.result })
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
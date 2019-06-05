// pages/personal/personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list:[],
    phone:""
  },

  wddd:function(){
    wx.navigateTo({
      url: '/pages/wddd/wddd',
    })
  },
  bdhyk:function(){
    wx.navigateTo({
      url: '/pages/bangka/bangka',
    })
  },
  wdhyk:function(){
    wx.navigateTo({
      url: '/pages/member/member?balance=' + this.data.list.balance,
    })
  },
  cz:function(){
    wx.navigateTo({
      url: '/pages/recharge/recharge',
    })
  },
  bbhyk:function(){
    wx.navigateTo({
      url: '/pages/bbhuy/bbhyk',
    })
  },
  gsj:function(){
    wx.navigateTo({
      url: '/pages/gsj/gsj',
    })
  },
  yhqzx:function(){
    wx.navigateTo({
      url: '/pages/discount/discount',
    })
  },
  dz:function(){
    wx.navigateTo({
      url: '/pages/dz/dz',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/MemberCard/MemberInfo',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data:  { openId:'00001' },
      success(res) {
        console.log(res)
          var a = res.data.result.phone;
          var b = a.replace(/^(\w{3})\w{4}(.*)$/, '$1****$2')
        that.setData({ list: res.data.result ,phone:b})
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
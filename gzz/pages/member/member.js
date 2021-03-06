// pages/member/member.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:1,
      list:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    balance:"",
    beginTime: "",
    index: "请选择开始时间",
    index1: "请选择结束时间",
    page:1,
    size:1000,
    endTime: ""
  },
  abc:function(e){
    this.setData({ beginTime: e.detail.value })
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/recharge/RechargeConsumeList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { userId: app.globalData.openId, page: 1, size: 100, beginTime:that.data.beginTime },
      success(res) {
        console.log(res)
        that.setData({ list: res.data.result })
      }
    })
  },
  bindPickerChange: function (e) {
    this.setData({ sid: 4 })
    var that = this;
    var id = wx.getStorageSync('agentId');
    if (this.data.beginTime) {
      wx.request({
        url: app.globalData.url + "/api/recharge/RechargeConsumeList",
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        data: {
          userId: app.globalData.openId,
          page: this.data.page,
          size: this.data.size,
          beginTime: this.data.beginTime,
          endTime: this.data.endTime
        },
        success(res) {
          console.log(res)
          that.setData({
            list: res.data.result
          })
        }
      })
    }
    this.setData({
      index: e.detail.value,
      beginTime: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    this.setData({ sid: 4 })
    var that = this;
    var id = wx.getStorageSync('agentId');
    this.setData({
      index1: e.detail.value,
      endTime: e.detail.value
    })
    if (!this.data.beginTime) {
      wx.showToast({
        title: '请选择开始时间',
        duration: 2000,
        icon: "none"
      })
    } else {
      wx.request({
        url: app.globalData.url + "/api/recharge/RechargeConsumeList",
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        data: {
          userId: app.globalData.openId,
          page: this.data.page,
          size: this.data.size,
          beginTime: this.data.beginTime,
          endTime: this.data.endTime
        },
        success(res) {
          console.log(res)
          that.setData({
            list: res.data.result
          })
        }
      })
    }
  },
quan:function(e){
  var that = this;
  var a = e.target.dataset.id
  this.setData({ id: a })
  if (a == 3) {
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/recharge/RechargeList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: {
        userId: app.globalData.openId, page: 1, size: 1000, beginTime: this.data.beginTime,
        endTime: this.data.endTime},
      success(res) {
        that.setData({ list: res.data.result })
      }
    })
  } else if (a == 2) {
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/recharge/ConsumeList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: {
        userId: app.globalData.openId, page: 1, size: 1000, beginTime: this.data.beginTime,
        endTime: this.data.endTime},
      success(res) {
        that.setData({ list: res.data.result })
      }
    })
  } else{
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/recharge/RechargeConsumeList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: {
        userId: app.globalData.openId, page: 1, size: 1000, beginTime: this.data.beginTime,
        endTime: this.data.endTime },
      success(res) {
        that.setData({ list: res.data.result })
      }
    })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ balance: options.balance})
    console.log(this.data.balance)
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
    }
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/recharge/RechargeConsumeList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { userId: app.globalData.openId, page: 1, size: 100, beginTime: "", endTime:""},
      success(res) {
        console.log(res)
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
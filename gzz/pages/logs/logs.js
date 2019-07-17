//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code:"",
    openid:""
  },
  login:function(){

  },
  //事件处理函数
  onLoad: function (options) {
    if(options.openid){
      this.setData({ openid: options.openid })
    }
    wx.login({
      success: res => {
        this.setData({ code: res.code })
      }
    });
    if (this.data.hasUserInfo && !this.data.canIUse){
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
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
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo){
    wx.setStorage({
      key: "login",
      data: 1,
    })
    app.globalData.userInfo = e.detail.userInfo;
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/memberCard/MemberLogin',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { code: that.data.code, iv: e.detail.iv, encryptedData: e.detail.encryptedData, signature: e.detail.signature, rawData: e.detail.rawData, recommendOpenId:that.data.openid },
      success(res) {
        app.globalData.openId = res.data.result.openId
        wx.setStorage({
          key: "openId",
          data: res.data.result.openId,
        })
      }
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.switchTab({
      url: '/pages/index/index',
    })
  } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
  }
  }
})

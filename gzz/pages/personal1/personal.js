// pages/personal/personal.js
var timespan = new Date().getTime();
var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [],
    index: 0
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  to: function (e) {
    this.setData({ index: e.currentTarget.dataset.index })
    if(this.data.index==1){
      wx.navigateTo({
        url: '/pages/mydevice/mydevice',
      })
    }
  },
  tc:function(){
    wx.removeStorage({
      key: 'userId',
      success: function(res) {
        wx.showToast({
          title: '退出成功',
          duration: 2000,
          success: res => {
            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/sign/sign',
              })
            }, 2000)
          }
        })
      },
    })    
  },
  mymember: function () {
    wx.navigateTo({
      url: '/pages/mymember/mymember',
    })
  },
  wdtx: function () {
    wx.navigateTo({
      url: '/pages/tixian/tixian',
    })
  },
  jyjl: function () {
    wx.navigateTo({
      url: '/pages/transaction/transaction',
    })
  },
  myyj: function () {
    wx.navigateTo({
      url: '/pages/royalty/royalty',
    })
  },
  yhk: function () {
    wx.navigateTo({
      url: '/pages/index1/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = wx.getStorageSync('Token');
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    var that = this;
    var id = wx.getStorageSync('userId');
    wx.request({
      url: app.globalData.url + '/api/Users/GetUser',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { userid: id },
      success(res) {
        console.log(res)
        that.setData({ list: res.data.result })
      }
    })
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
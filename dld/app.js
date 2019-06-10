//app.js
App({
  onLaunch: function () {
    var that = this
    //展示本地存储能力
    // wx.clearStorageSync()
    // wx.removeStorageSync({
    //   key: 'Token',
    //   success: function(res) {},
    // })
    var a = wx.getStorageSync('Token');
    console.log(!a)
    if (!a || new Date(a.timespan) <= new Date()) {
      //如果Token过期请求Token
      var timespan = new Date().getTime();        //时间戳
      var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));     //随机数
      var signKey = '123456';        //请求秘钥
      wx.request({
        url: this.globalData.url + '/api/Token/GetToken',
        header: { 'content-type': 'application/json', signKey: signKey, timespan: timespan, nonce: nonce },
        data: { signKey: 123456 },
        success(res) {
          if (res.code = 200) {
            wx.setStorage({
              key: 'Token',
              data: res.data.result
            })
          }
        }
      })
    }
    // var b = wx.getStorage('Token');
    // console.log(b)
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        this.globalData.code = res.code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxfacfc9a34535692e&secret=SECRET&js_code=' + that.globalData.code + '&grant_type=authorization_code',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.globalData.openid = res.data.openid //返回openid
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    url: "http://192.168.1.188:81",
    code: "",
    openid: ""
  }
})
//app.js
App({
  onLaunch: function () {
    this.authorAddress()
    wx.getStorage({
      key: 'login',
      success: function (res) {
        wx.switchTab({
          url: '/pages/index/index',
        })
      },
    })
    var that=this
    //展示本地存储能力
    wx.getStorage({
      key: 'Token',
      success: function(res) {
        var timespan = new Date().getTime();        //时间戳
        var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));     //随机数
        var signKey = '123456';        //请求秘钥
        wx.request({
          url: that.globalData.url + '/api/Token/GetToken',
          header: { 'content-type': 'application/json', signKey: signKey, timespan: timespan, nonce: nonce },
          method:"Get",
          data: { signKey: signKey },
          success(res) {
            if (res.code = 200) {
              wx.setStorage({
                key: 'Token',
                data: res.data.result
              })
            }
          }
        })
      },
      fail:function(){
          //如果Token过期请求Token
          var timespan = new Date().getTime();        //时间戳
          var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));     //随机数
          var signKey = '123456';        //请求秘钥
          wx.request({
            url: that.globalData.url + '/api/Token/GetToken?signKey=123456',
            header: { 'content-type': 'application/json', signKey: signKey, timespan: timespan, nonce: nonce },
            method: "Get",
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
    })
   
    // var b = wx.getStorage('Token');
    // console.log(b)
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

var a;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4d667e4f7fe9aa60&secret=74a4aa67350fe14ccf2d6dac58fefb6e&js_code=' + res.code + '&grant_type=authorization_code';
        wx.request({
          url: url,
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            that.globalData.openId = res.data.openid //返回openid
          }
        })
      }
    });
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
  authorAddress: function () {
    var that = this;
    that.getCurrentLocation('gcj02', function (res) {
        that.globalData.longitude=res.longitude,
        that.globalData.latitude=res.latitude
      // that.showMarkerInfo(res.longitude, res.latitude);
    });
  },
  getCurrentLocation: function (typeCode, succFun) {
    var that = this;
    wx.getLocation({
      type: typeCode,
      success: function (res) {
        return succFun(res);
      },
      fail: function (res) {
        wx.openSetting({
          success: function (data) {
            that.authorAddress();
          },
          fail: function () {
            console.info("设置失败返回数据");
          }
        });
      }
    })
  },
  globalData: {
    userInfo: null,
    url:"https://gzz.hncoon.com",
    code:"",
    openId:""
  }
})
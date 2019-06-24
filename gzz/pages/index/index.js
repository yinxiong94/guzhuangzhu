const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
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
    list: [],
    swiperIndex: 1,
    list1: [],
    row: [],
    row1: [],
    a: {},
    list2: [],
  },
  // 领取优惠券
  lqyhq: function(e) {
    var id = e.target.dataset.id;
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/coupon/ReceiveCoupon',
      method: "POST",
      header: {
        'content-type': 'application/json',
        signKey: a.signId,
        timespan: timespan,
        nonce: nonce,
        signature: signature
      },
      data: {
        openId: app.globalData.openId,
        couponId: id
      },
      success(res) {
        wx.request({
          url: app.globalData.url + '/api/coupon/couponList',
          method: "POST",
          header: {
            'content-type': 'application/json',
            signKey: a.signId,
            timespan: timespan,
            nonce: nonce,
            signature: signature
          },
          data: {
            openId: app.globalData.openId
          },
          success(res) {
            that.setData({
              list1: res.data.result
            })
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
  // 加入购物车
  gwc:function(e){
    var cc=e.target.dataset.sid;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/Product/ProductCartAdd',
      method: "POST",
      header: {
        'content-type': 'application/json',
        signKey: a.signId,
        timespan: timespan,
        nonce: nonce,
        signature: signature
      },
      data: { openId: app.globalData.openId, productId:cc},
      success(res) {
        if(res.data.code==200){
          wx.showToast({
            title: '添加购物车成功',
            duration:2000
          })
        }
      }
    })
  },
  // 立即购买
  nowshop:function(e){
    var cc=e.target.dataset;
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/product/OperationFreightByProduct',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { productId: cc.sid, productNum: 1 },
      success(res) {
        if (res.data.code == 200) {
          wx.navigateTo({
            url: '/pages/fill/fill?id=' + cc.sid + "&count=" + 1 + "&sid=1" + "&productName=" + cc.name + "&productWeight=" + cc.wei + "&price="
              + cc.price + "&freight=" + res.data.result.freight + "&imgurl=" + cc.img,
          })
        }
      }
    })
  },
  // 跳转开通会员
  kthy: function() {
    wx.navigateTo({
      url: '/pages/membership/membership',
    })
  },
  // 跳转商品详情
  spxq: function(e) {
    wx.navigateTo({
      url: '/pages/commodity/commodity?id=' + e.target.dataset.sid,
    })
  },
  // 跳转优惠券中心
  yhqzx: function() {
    wx.navigateTo({
      url: '/pages/discount/discount',
    })
  },
  // 轮播图跳转
  toss:function(e){
    var c = e.target.dataset.rotationrelationid;
    var b = e.target.dataset.rotationtype;
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/Article/ArticleList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { page: 1, size: 10 },
      success(res) {
        console.log(res)
        that.setData({ list2: res.data.result })
        for (var i = 0; i < res.data.result.length; i++) {
          that.setData({ ['article[' + i + ']']: res.data.result[i].articleContent })
          WxParse.wxParse('article', 'html', that.data.article[i], that, 5);
        }
        // var article = res.data.result[0].articleContent;

      }
    })
    if(b==0){
      for(var i=0;i<that.data.list2.length;i++){
        if (that.data.list2[i].articleId==c){
          wx.navigateTo({
            url: '/pages/article/article?img=' + this.data.list2[i].articleImg + "&title=" + this.data.list2[i].articleName + "&content=" + this.data.list2[i].articleContent + "&time=" + this.data.list2[i].createTime,
          })
        }
      }
      
    } else{
      wx.navigateTo({
        url: '/pages/commodity/commodity?id='+c,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'Token',
      success: function(res) {
        var a = res.data;
        var timespan = new Date().getTime();
        var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
        var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
        // 轮播图
        wx.request({
            url: app.globalData.url + '/api/rotationChart/rotationChartList',
            method: "POST",
            header: {
              'content-type': 'application/json',
              signKey: a.signId,
              timespan: timespan,
              nonce: nonce,
              signature: signature
            },
            success(res) {
              console.log(res)
              that.setData({
                list: res.data.result
              })
            }
          }),
          // 优惠券 
          wx.request({
            url: app.globalData.url + '/api/coupon/couponList',
            method: "POST",
            header: {
              'content-type': 'application/json',
              signKey: a.signId,
              timespan: timespan,
              nonce: nonce,
              signature: signature
            },
            data: {
              openId: app.globalData.openId
            },
            success(res) {
              that.setData({
                list1: res.data.result
              })
            }
          }),
          // 电子会员卡
          wx.request({
            url: app.globalData.url + '/api/memberCard/memberCardConfigList',
            method: "POST",
            header: {
              'content-type': 'application/json',
              signKey: a.signId,
              timespan: timespan,
              nonce: nonce,
              signature: signature
            },
            success(res) {
              that.setData({
                imgUrls: res.data.result
              })
            }
          }),
          // 商品展示
          wx.request({
            url: app.globalData.url + '/api/product/productByHomeList',
            method: "POST",
            header: {
              'content-type': 'application/json',
              signKey: a.signId,
              timespan: timespan,
              nonce: nonce,
              signature: signature
            },
            success(res) {
              that.setData({
                row1: res.data.result
              })
            }
          })
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'Token',
      success: function(res) {
        var a = res.data;
        var timespan = new Date().getTime();
        var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
        var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
        // 轮播图
        wx.request({
            url: app.globalData.url + '/api/rotationChart/rotationChartList',
            method: "POST",
            header: {
              'content-type': 'application/json',
              signKey: a.signId,
              timespan: timespan,
              nonce: nonce,
              signature: signature
            },
            success(res) {
              that.setData({
                list: res.data.result
              })
            }
          }),
          // 优惠券 
          wx.request({
            url: app.globalData.url + '/api/coupon/couponList',
            method: "POST",
            header: {
              'content-type': 'application/json',
              signKey: a.signId,
              timespan: timespan,
              nonce: nonce,
              signature: signature
            },
            data: {
              openId: app.globalData.openId
            },
            success(res) {
              that.setData({
                list1: res.data.result
              })
            }
          }),
          // 电子会员卡
          wx.request({
            url: app.globalData.url + '/api/memberCard/memberCardConfigList',
            method: "POST",
            header: {
              'content-type': 'application/json',
              signKey: a.signId,
              timespan: timespan,
              nonce: nonce,
              signature: signature
            },
            success(res) {
              that.setData({
                imgUrls: res.data.result
              })
            }
          }),
          // 商品展示
          wx.request({
            url: app.globalData.url + '/api/product/productByHomeList',
            method: "POST",
            header: {
              'content-type': 'application/json',
              signKey: a.signId,
              timespan: timespan,
              nonce: nonce,
              signature: signature
            },
            success(res) {
              that.setData({
                row1: res.data.result
              })
            }
          })
      },
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
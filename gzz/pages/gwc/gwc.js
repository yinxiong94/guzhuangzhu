// pages/gwc/gwc.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    productPrice: 0.00,
    checked: [], //购物车各列的选中状态
    ind: [],
    a: 0,
    b: 0,
    c: false,
    count: [], //购物车各列的数量
    fid: ""
  },
  tosp:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/commodity/commodity?id=' + e.currentTarget.dataset.productid,
    })
  },
  nowshop: function() {
    var aaa = "";
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.checked[i] === true) {
        aaa += ","
        aaa += this.data.list[i].productCartId;
      }
    }
    this.setData({
      fid: aaa.substr(1)
    })
    if (this.data.fid.length == 0) {
      wx.showToast({
        title: '请选择商品',
        duration: 2000,
        icon: "none"
      })
    } else {
      wx.navigateTo({
        url: '/pages/fill1/fill1?ddd=' + this.data.fid,
      })
    }
  },
  all: function() {
    this.data.b += 1;
    if (this.data.b % 2 != 0) {
      var a = 0;
      for (var i = 0; i < this.data.list.length; i++) {
        this.setData({
          ['checked[' + i + ']']: true,
          ['ind[' + i + ']']: 1
        })
        a += this.data.list[i].productPrice * this.data.count[i]
      }
      this.setData({
        productPrice: a,
        c: true
      })
    } else {
      for (var i = 0; i < this.data.list.length; i++) {
        this.setData({
          ['checked[' + i + ']']: false,
          ['ind[' + i + ']']: 0
        })
      }
      this.setData({
        productPrice: 0,
        c: false,
        ind: []
      })
    }
  },
  jian: function(e) {
    var a = this.data.count[e.target.dataset.id] - 1;
    var b = e.target.dataset.uid;
    if (a < 1) {
      a = 1
    }
    this.setData({
      ['count[' + e.target.dataset.id + ']']: a
    })
    var sum=0;
    for(var i=0;i<this.data.list.length;i++){
        if(this.data.checked[i]==true){
          sum += this.data.list[i].productPrice*this.data.count[i]
        }
    }
    this.setData({ productPrice:sum})
    var that = this;
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/Product/ProductCartNumModify',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        productCartId: b,
        operationType: 0
      },
      success(res) {}
    })
  },
  jia: function(e) {
    var a = this.data.count[e.target.dataset.id] + 1;
    var b = e.target.dataset.uid;
    this.setData({
      ['count[' + e.target.dataset.id + ']']: a
    })
    var sum = 0;
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.checked[i] == true) {
        sum += this.data.list[i].productPrice * this.data.count[i]
      }
    }
    this.setData({ productPrice: sum })
    var that = this;
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/Product/ProductCartNumModify',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        productCartId: b,
        operationType: 1
      },
      success(res) {

      }
    })
  },
  change: function(e) {
    var c = e.target.dataset.ind;
    var a = e.target.dataset.productprice;
    var b = e.target.dataset.productnum;
    var sum = 0;
    if (!this.data.ind[c]) {
      var e = parseInt(this.data.a) + 1;
    } else {
      var e = parseInt(this.data.ind[c]) + 1;
    }
    this.setData({
      ['ind[' + c + ']']: e
    })
    if (this.data.ind[c] % 2 != 0) {
      this.setData({
        productPrice: a * b + this.data.productPrice,
        ['checked[' + c + ']']: true
      })
    } else {
      this.setData({
        productPrice: this.data.productPrice - a * b,
        ['checked[' + c + ']']: false
      })
    }
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.checked[i] === true) {
        sum += 1
      }
    }
    if (sum != this.data.list.length) {
      this.setData({
        c: false,
        b: 0
      })
    } else {
      this.setData({
        c: true,
        b: 1
      })
    }
  },
  del: function(e) {
    var b = e.target.dataset.uid;
    var that = this;
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/Product/ProductCartDel',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        productCartId: b
      },
      success(res) {
        // 轮播图
        wx.request({
          url: app.globalData.url + '/api/product/ProductCartInfo',
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          data: {
            openId: app.globalData.openId
          },
          success(res) {
            var ff = [];
            for (var i = 0; i < res.data.result.length; i++) {
              ff.push(res.data.result[i].productNum)
            }
            that.setData({
              list: res.data.result,
              count: ff
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/product/ProductCartInfo',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        openId: app.globalData.openId
      },
      success(res) {
        console.log(res)
        var ff = [];
        for (var i = 0; i < res.data.result.length; i++) {
          ff.push(res.data.result[i].productNum)
        }
        that.setData({
          list: res.data.result,
          count: ff
        })

      }
    })
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
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/product/ProductCartInfo',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        openId: app.globalData.openId
      },
      success(res) {
        var ff = [];
        for (var i = 0; i < res.data.result.length; i++) {
          ff.push(res.data.result[i].productNum)
        }
        that.setData({
          list: res.data.result,
          count: ff
        })

      }
    })
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
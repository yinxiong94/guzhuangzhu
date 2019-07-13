// pages/fill/fill.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: 0,
    iftrue: false,
    id: "",
    count: 1,
    list: [],
    list1: [],
    productName: "",
    productWeight: "",
    freight: "",
    freight: "",
    imgurl: "",
    price: "",
    price1: "",
    list111: [],
    isshow1: false,
    price2: 0,
    zj: "",
    list1111: [],
    list2: [],
    isshow2: false,
    memberCouponId: "",
    obj: [],
    info: [],
    addressId: "",
    iii: 2
  },
  inputedit: function(e) {
    // 1. input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    //data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象，有obj和item属性，可以通过这两个实现双向数据绑定，通过更改这两个值，对不同name的变量赋值
    let value = e.detail.value;
    this.data[dataset.obj][dataset.item] = value;
    this.setData({
      obj: this.data[dataset.obj]
    });
  },
  t1: function(e) {
    this.setData({
      isshow: 0,
      iftrue: false
    })
    var a = this.data.price1 - this.data.price2;
    this.setData({
      zj: a,
      iii: e.target.dataset.iii
    })
  },
  t2: function(e) {
    this.setData({
      isshow: 1,
      iftrue: true
    })
    var a = this.data.price1 - this.data.price2 - (-this.data.freight)
    this.setData({
      zj: a,
      iii: e.target.dataset.iii
    })
  },
  jian: function (e) {
    var a = this.data.count - 1;
    if (a < 1) { a = 1 }
    this.setData({ count: a })
  },
  // 商品数量加
  jia: function (e) {
    var a = this.data.count - (-1);
    this.setData({ count: a })
  },
  t111: function() {
    this.setData({
      isshow2: false
    })
  },
  tozf: function() {
    if (this.data.iii == 2) {
      wx.showToast({
        title: '选择配送方式',
        duration: 2000,
        icon: "none"
      })
    } else if(this.data.iii==1) {
      console.log(this.data.addressId)
      if (!this.data.addressId) {
        wx.showToast({
          title: '请选择地址',
          duration: 2000,
          icon: "none"
        })
      } else {
        var that = this;
        wx.request({
          url: app.globalData.url + '/api/product/ProductPlaceOrder',
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          data: {
            openId: app.globalData.openId,
            productId: this.data.id,
            productNum: this.data.count,
            addressId: this.data.addressId,
            pickupWay: this.data.isshow,
            freight: this.data.freight,
            memberCouponId: this.data.memberCouponId,
            message: this.data.obj.message
          },
          success(res) {
            console.log(res)
            wx.navigateTo({
              url: '/pages/ddzf/ddzf?orderId=' + res.data.result.orderId + "&productId=" + that.data.id + "&price=" + that.data.zj + "&point=" + res.data.result.point + "&pickupWay=" + that.data.isshow
            })
          }
        })
      }
    } else {
      var that = this;
      wx.request({
        url: app.globalData.url + '/api/product/ProductPlaceOrder',
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        data: {
          openId: app.globalData.openId,
          productId: this.data.id,
          productNum: this.data.count,
          addressId: this.data.addressId,
          pickupWay: this.data.isshow,
          freight: this.data.freight,
          memberCouponId: this.data.memberCouponId,
          message: this.data.obj.message
        },
        success(res) {
          console.log(res)
          wx.navigateTo({
            url: '/pages/ddzf/ddzf?orderId=' + res.data.result.orderId + "&productId=" + that.data.id + "&price=" + that.data.zj + "&point=" + res.data.result.point + "&pickupWay=" + that.data.isshow,
          })
        }
      })
    }
  },
  t123456: function(e) {
    console.log(e.target.dataset)
    this.setData({
      list1111: e.target.dataset,
      addressId: e.target.dataset.addressId
    })
  },
  todz: function() {
    this.setData({
      isshow2: true
    })
  },
  tolq: function() {
    this.setData({
      isshow1: true
    })
  },
  del: function() {
    this.setData({
      isshow1: false
    })
  },
  sy: function(e) {
    console.log(e)
    this.setData({
      isshow1: false,
      price2: e.currentTarget.dataset.price,
      memberCouponId: e.currentTarget.dataset.msg
    })
    if (this.data.isshow == 0) {
      var a = this.data.price1 - this.data.price2
      this.setData({
        zj: a
      })
    } else {
      var a = this.data.price1 - this.data.price2 - (-this.data.freight)
      this.setData({
        zj: a
      })
    }
  },
  tosh: function() {
    wx.navigateTo({
      url: '/pages/tjdz/tjdz',
    })
  },
  f123: function(e) {
    var that = this;
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/MemberCard/SetDefaultAddress',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        addressId: e.target.dataset.fid
      },
      success(res) {
        console.log(res)
      }
    })
  },
  bj1: function(e) {
    wx.navigateTo({
      url: '/pages/tjdz1/tjdz1?addressId=' + e.target.dataset.fid + "&consignee=" + this.data.list2[e.target.dataset.uid].consignee + "&phone=" + this.data.list2[e.target.dataset.uid].phone + "&area=" + this.data.list2[e.target.dataset.uid].area + "&address=" + this.data.list2[e.target.dataset.uid].address,
    })
  },
  del1: function(e) {
    var that = this;
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/MemberCard/AddressDel',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        addressId: e.target.dataset.fid
      },
      success(res) {
        console.log(res)
        wx.request({
          url: app.globalData.url + '/api/MemberCard/AddressList',
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          data: {
            openId: app.globalData.openId
          },
          success(res) {
            console.log(res)
            that.setData({
              list2: res.data.result
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
    this.setData({
      id: options.id,
      count: options.count,
      productName: options.productName,
      productWeight: options.productWeight,
      freight: options.freight,
      imgurl: options.imgurl,
      price: options.price
    })
    if (options.sid == 1) {
      var a = options.count * options.price
      this.setData({
        price1: a
      })
    }
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/coupon/AvailableMemberCoupon',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        openId: app.globalData.openId,
        sumMoney: that.data.price1
      },
      success(res) {
        console.log(res)
        that.setData({
          list111: res.data.result
        })
      }
    })
    wx.request({
      url: app.globalData.url + '/api/MemberCard/AddressList',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        openId: app.globalData.openId
      },
      success(res) {
        if (res.data.result.length == 0) {
          that.setData({
            list1111: "",
            list2: "",
            addressId: ""
          })
        } else {
          that.setData({
            list1111: res.data.result[0],
            list2: res.data.result,
            addressId: res.data.result[0].addressId
          })
        }
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
    if (this.data.isshow == 0) {
      var a = this.data.price1 - this.data.price2
      this.setData({
        zj: a
      })
    }
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/MemberCard/AddressList',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        openId: app.globalData.openId
      },
      success(res) {
        if (res.data.result.length == 0) {
          that.setData({
            list1111: "",
            list2: "",
            addressId: ""
          })
        } else {
          that.setData({
            list1111: res.data.result[0],
            list2: res.data.result,
            addressId: res.data.result[0].addressId
          })
        }
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
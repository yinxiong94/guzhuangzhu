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
    count: "",
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
    sid:"",
    list3:[],
    memberCouponId: "",
    obj: [],
    info: [],
    addressId:"",
    iii:2
  },
  inputedit: function (e) {
    // 1. input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    //data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象，有obj和item属性，可以通过这两个实现双向数据绑定，通过更改这两个值，对不同name的变量赋值
    let value = e.detail.value;
    this.data[dataset.obj][dataset.item] = value;
    this.setData({
      obj: this.data[dataset.obj]
    });
  },
  t1: function (e) {
    this.setData({ isshow: 0, iftrue: false })
    var a = this.data.price1 - this.data.price2;
    this.setData({ zj: a, iii: e.target.dataset.iii})
  },
  t2: function (e) {
    this.setData({ isshow: 1, iftrue: true })
    var a = this.data.price1 - this.data.price2 - (-this.data.freight)
    this.setData({ zj: a, iii: e.target.dataset.iii})
  },
  t111: function () {
    this.setData({ isshow2: false })
  },
  tozf: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/product/ProductCartPlaceOrder',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { openId: app.globalData.openId, productCartIds: that.data.sid, addressId:that.data.addressId , pickupWay:that.data.isshow, freight: that.data.freight, memberCouponId:that.data.memberCouponId, message:that.data.obj.message},
      success(res) {
        console.log(res)
        wx.navigateTo({
          url: '/pages/ddzf/ddzf?orderId=' + res.data.result.orderId +"&productId="+that.data.sid+"&price="+that.data.zj+"&point="+res.data.result.point,
        })
      }
    })
    
  },
  t123456: function (e) {
    this.setData({ list1111: e.target.dataset })
  },
  todz: function () {
    this.setData({ isshow2: true })
  },
  tolq: function () {
    this.setData({ isshow1: true })
  },
  del: function () {
    this.setData({ isshow1: false })
  },
  sy: function (e) {
    this.setData({ isshow1: false, price2: e.target.dataset.price, memberCouponId: e.target.dataset.memberCouponId })
    if (this.data.isshow == 0) {
      var a = this.data.price1 - this.data.price2
      this.setData({ zj: a })
    }
  },
  tosh: function () {
    wx.navigateTo({
      url: '/pages/tjdz/tjdz',
    })
  },
  f123: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/MemberCard/SetDefaultAddress',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { addressId: e.target.dataset.fid },
      success(res) {
      }
    })
  },
  bj1: function (e) {
    wx.navigateTo({
      url: '/pages/tjdz1/tjdz1?addressId=' + e.target.dataset.fid + "&consignee=" + this.data.list2[e.target.dataset.uid].consignee + "&phone=" + this.data.list2[e.target.dataset.uid].phone + "&area=" + this.data.list2[e.target.dataset.uid].area + "&address=" + this.data.list2[e.target.dataset.uid].address,
    })
  },
  del1: function (e) {
    var that = this;
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/MemberCard/AddressDel',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { addressId: e.target.dataset.fid },
      success(res) {
        wx.request({
          url: app.globalData.url + '/api/MemberCard/AddressList',
          method: "POST",
          header: { 'content-type': 'application/json' },
          data: { openId: app.globalData.openId },
          success(res) {
            console.log(res)
            that.setData({ list2: res.data.result, addressId: res.data.result[0].addressId })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    this.setData({sid:options.ddd})
    var that = this;
    var ggg = 0;
    wx.request({
      url: app.globalData.url + '/api/product/ProdyctCartList',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { cartList:that.data.sid},
      success(res) {
        var rest=res.data.result;
        that.setData({ list3: rest })
        for (var i = 0; i < rest.length; i++) {
          ggg += rest[i].productNum *rest[i].productPrice
        }
        that.setData({ price1: ggg,zj:ggg })
        wx.request({
          url: app.globalData.url + '/api/coupon/AvailableMemberCoupon',
          method: "POST",
          header: { 'content-type': 'application/json' },
          data: { openId: app.globalData.openId, sumMoney: that.data.price1 },
          success(res) {
            that.setData({ list111: res.data.result })
          }
        }) 
      }
    })
    wx.request({
      url: app.globalData.url + '/api/product/OperationFreightByCart',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { openId: app.globalData.openId, productCartIds:that.data.sid},
      success(res) {
        that.setData({freight:res.data.result.freight})
      }
    })  
    wx.request({
      url: app.globalData.url + '/api/MemberCard/AddressList',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { openId: app.globalData.openId },
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.isshow == 0) {
      var a = this.data.price1 - this.data.price2
      this.setData({ zj: a })
    }
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/MemberCard/AddressList',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { openId: app.globalData.openId },
      success(res) {
        that.setData({ list1111: res.data.result[0], list2: res.data.result})
      }
    })
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
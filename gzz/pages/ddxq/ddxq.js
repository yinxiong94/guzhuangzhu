// pages/ddxq/ddxq.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
    markers:[],
    page:1,
    size:2,
    uuu:""
  },
  more: function () {
    this.data.size += 2;
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/machine/NearMachinePageList',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { page: that.data.page, size: that.data.size, longitude: app.globalData.longitude, latitude: app.globalData.latitude },
      success(res) {
        console.log(res.data.result)
        that.setData({ markers: res.data.result })
      }
    })
  },
  toxq:function(e){
    wx.navigateTo({
      url: "/pages/commodity/commodity?id=" + e.currentTarget.dataset.productid
    })
  },
  // 导航去附近设备
  go:function (e) {
    console.log(e.target.dataset)
    var a = e.target.dataset;
    wx.openLocation({
      latitude: a.latitude,
      longitude: a.longitude,
      name: a.title,
      scale: 15
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var id = options.orderId; 
    this.setData({uuu:options.uuu})
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/product/ProductOrderList',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { orderId:id },
      success(res) {
        console.log(res)
        that.setData({ list: res.data.result})
        console.log(!that.data.list.productOrder[0].pickupCode)
      }
    }),
    // 附近设备列表
    wx.request({
      url: app.globalData.url + '/api/machine/NearMachinePageList',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { page: that.data.page, size: that.data.size, longitude: app.globalData.longitude, latitude: app.globalData.latitude },
      success(res) {
        console.log(res.data.result)
        that.setData({ markers: res.data.result })
      }
    })
    // wx.request({
    //   url: 'http://www.kuaidi100.com/query',
      
    // })
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
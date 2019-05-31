// pages/find/find.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/pages/img/deas.png',
      '/pages/img/deas.png',
      '/pages/img/deas.png'
    ],
    swiperIndex: 1,
    list:[]
  },
  swiperChange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },

  wzxq: function (e) {
    var a=e.target.dataset.uid
    wx.navigateTo({
      url: '/pages/article/article?img=' + this.data.list[a].articleImg + "&title=" + this.data.list[a].articleName + "&content=" + this.data.list[a].articleContent + "&time=" + this.data.list[a].createTime,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) {
    var that=this;
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
        that.setData({list:res.data.result})
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

  }
})
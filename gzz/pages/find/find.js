// pages/find/find.js
var WxParse = require('../../wxParse/wxParse.js');
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
    list:[],
    article:[]
  },
  swiperChange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },

  wzxq: function (e) {
    var a=e.target.dataset.uid
    wx.navigateTo({
      url: '/pages/article/article?img=' + this.data.list[a].articleImg + "&title=" + this.data.list[a].articleName + "&time=" + this.data.list[a].createTime + "&productId=" + this.data.list[a].productId + "&articleId=" + this.data.list[a].articleId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.url + '/api/Article/ArticleList',
      method: "POST",
      header: { 'content-type': 'application/json'},
      data: { page: 1, size: 10 },
      success(res) {
        console.log(res)
        that.setData({list:res.data.result})
        for(var i=0;i<res.data.result.length;i++){
          that.setData({ ['article[' + i + ']']: res.data.result[i].articleContent})
          WxParse.wxParse('article', 'html', that.data.article[i], that, 5);
        }
        // var article = res.data.result[0].articleContent;
        
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
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/Article/ArticleList',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { page: 1, size: 10 },
      success(res) {
        console.log(res)
        that.setData({ list: res.data.result })
        for (var i = 0; i < res.data.result.length; i++) {
          that.setData({ ['article[' + i + ']']: res.data.result[i].articleContent })
          WxParse.wxParse('article', 'html', that.data.article[i], that, 5);
        }
        // var article = res.data.result[0].articleContent;

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
// pages/article /article.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      content:"",
      img:"",
      time:"",
      title:"",
    productId:"",
    list:{}
  },
toxq:function(e){
  wx.navigateTo({
    url: '/pages/commodity/commodity?id=' + e.currentTarget.dataset.productid,
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
      console.log(options)
    this.setData({ content: options.content, img: options.img, time: options.time, title: options.title, productId: options.productId})
      var article = this.data.content;
       WxParse.wxParse('article', 'html', article, that, 5);
       if(that.data.productId){
       wx.request({
         url: app.globalData.url +"/api/product/ProductDetails",
         method:"post",
         header: { 'content-type': 'application/json'},
         data: { productId: this.data.productId},
         success:res=>{
           var gg=res.data.result.productImg.split(",")
           this.setData({list:res.data.result,url:gg[0]})
         }
         })
       } else{
         that.setData({productId:0})
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
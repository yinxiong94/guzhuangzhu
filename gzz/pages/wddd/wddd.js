// pages/wddd/wddd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
    size:5,
    sid:1
  },
 ddxq:function(e){
   console.log(e.currentTarget.dataset.orderid)
   wx.navigateTo({
     url: '/pages/ddxq/ddxq?orderId=' + e.currentTarget.dataset.orderid,
   })
 },
 to345:function(e){
      var a=e.target.dataset.uid;
      var b = e.target.dataset.orderid;
   var c = e.target.dataset.paymoney;
      console.log(e.target.dataset)
      if(a==0){
        wx.navigateTo({
          url: "/pages/ddzf/ddzf?orderId=" + b +"&price="+c,
        })
      }
 },
 t1:function(e){
   this.setData({ sid: e.target.dataset.sid})
   var that = this;
   var a = wx.getStorageSync('Token');
   var timespan = new Date().getTime();
   var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
   var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
   wx.request({
     url: app.globalData.url + '/api/product/OrderInfoList',
     method: "POST",
     header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
     data: { key: app.globalData.openId, page: 1, size: that.data.size },
     success(res) {
       console.log(res)
     if(that.data.sid==1){
       that.setData({list:res.data.result})
     } else if(that.data.sid==2){
       var cc=[]
       for(var i=0;i<res.data.result.length;i++){
         if (res.data.result[i].payState==0){
           cc.push(res.data.result[i])
         }
       }
       console.log(cc)
       that.setData({list:cc})
     } else if(that.data.sid==3){
       var cc = []
       for (var i = 0; i < res.data.result.length; i++) {
         if (res.data.result[i].payState == 1) {
           cc.push(res.data.result[i])
         }
       }
       that.setData({ list: cc })
     }
     }
   })
 },
 tk:function(){
   wx.navigateTo({
     url: '/pages/refund/refund',
   })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/product/OrderInfoList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { key: app.globalData.openId, page:1,size:that.data.size},
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
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    that.setData({size:that.data.size-(-5)})
    wx.request({
      url: app.globalData.url + '/api/product/OrderInfoList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { key: app.globalData.openId, page: 1, size: that.data.size },
      success(res) {
        console.log(res)
        that.setData({ list: res.data.result })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
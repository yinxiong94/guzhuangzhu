// pages/transaction/transaction.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      isshow:false,
      list:[],
      coco:[],
    beginTime:"",
    price:0
  },
  xs:function(){
    if(this.data.isshow==false){
          this.setData({isshow:true})
    } else {
      this.setData({isshow:false})
    }
  },
  abc:function(e){
    this.setData({ beginTime: e.detail.value})
    var that = this;
    var id = wx.getStorageSync('agentId');
    var ide = wx.getStorageSync("userId");
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/Users/MachineOrderPageList',
      method: "POST",
      header: {
        'content-type': 'application/json',
        signKey: a.signId,
        timespan: timespan,
        nonce: nonce,
        signature: signature
      },
      data: {
        key: id,
        page: 1,
        size: 5,
        beginTime: that.data.beginTime
      },
      success(res) {
        console.log(res);
        that.setData({
          coco: res.data.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var id = wx.getStorageSync('agentId');
    var ide = wx.getStorageSync("userId");
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/Users/QuerySumOrder',
      method: "POST",
      header: {
        'content-type': 'application/json',
        signKey: a.signId,
        timespan: timespan,
        nonce: nonce,
        signature: signature
      },
      data: {
        key: id
      },
      success(res) {
        that.setData({
          list: res.data.result,
          price: res.data.result.sumOrder
        })
      }
    })
    wx.request({
      url: app.globalData.url + '/api/Users/MachineOrderPageList',
      method: "POST",
      header: {
        'content-type': 'application/json',
        signKey: a.signId,
        timespan: timespan,
        nonce: nonce,
        signature: signature
      },
      data: {
        key: id,
        page: 1,
        size: 5,
        beginTime: that.data.beginTime
      },
      success(res) {
        that.setData({
          coco: res.data.result
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
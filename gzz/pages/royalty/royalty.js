// pages/royalty/royalty.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    coco:[],
    isshow:false,
    beginTime:""
  },
xs:function(){
    if(this.data.isshow==false){
      this.setData({isshow:true})
    } else {
      this.setData({isshow:false})
    }
},
  abc: function (e) {
    this.setData({ beginTime: e.detail.value })
    var that = this;
    var id = wx.getStorageSync('agentId');
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/Users/MachinePageList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { key: id, page: 1, size: 5, beginTime: that.data.beginTime },
      success(res) {
        console.log(res)
        let list = res.data.result;
        that.setData({ coco: list })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    var that = this;
    var id = wx.getStorageSync('agentId');
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/Users/QueryCommission',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { key: id, page: 1, size: 5},
      success(res) {
        let cop = res.data.result;
        that.setData({ list: cop })
      }
    })
    wx.request({
      url: app.globalData.url + '/api/Users/MachinePageList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { key: id, page: 1, size: 5, beginTime: that.data.beginTime},
      success(res) {
        let list = res.data.result;
        that.setData({ coco:list})
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
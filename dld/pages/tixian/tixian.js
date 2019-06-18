// pages/tixian/tixian.js
const app = getApp()
var timespan = new Date().getTime();
var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price:"",
    IdCard:"",
    list:[],
    price1:0,
    obj: [],
    info: []
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
  txjl:function(){
    wx.navigateTo({
      url: '/pages/cash/cash',
    })
  },
  qrtx:function(){
    if (this.data.obj.manager>this.data.price1){
      wx.showToast({
        title: '可提现金额不足',
        icon:"none"
      })
    } else{
      var that = this;
      var id = wx.getStorageSync('agentId');
      var a = wx.getStorageSync('Token');
      var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
      wx.request({
        url: app.globalData.url + '/api/Users/ApplyWithdraw',
        method: "POST",
        header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
        data: {
          agentId: id, withdrawPrice: that.data.obj.manager, backName: that.data.list[0].BackName, backIdCard: that.data.list[0].IdCard
        },
        success(res) {
          console.log(res)
          if(res.data.code==200){
            wx.showToast({
              title: '请等待审核',
            })
          }
        }
      })
    }   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = wx.getStorageSync('userId');
    var a = wx.getStorageSync('Token');
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/Users/GetBackCardPrice',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      success(res) {
        console.log(res)
        that.setData({ price: res.data.result.money})
      }
    })
    wx.request({
      url: app.globalData.url + '/api/Users/GetUser',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { userid: id },
      success(res) {
        console.log(res)
        if (res.data.result[0].BackName != null) {
          that.setData({ show: 0 })
        }
        var a = res.data.result[0].IdCard;
        var b = a.replace(/^(\w{0})\w{15}(.*)$/, '$1**** **** **** **** $2')
        that.setData({ list: res.data.result, IdCard: b ,price1:res.data.result[0].price})
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
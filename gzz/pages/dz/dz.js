// pages/dz/dz.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      show1:0,
      list:[]
  },
tosh:function(){
  wx.navigateTo({
    url: '/pages/tjdz/tjdz',
  })
},
f123:function(e){
  var that = this;
  var a = wx.getStorageSync('Token');
  var timespan = new Date().getTime();
  var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
  var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
  // 轮播图
  wx.request({
    url: app.globalData.url + '/api/MemberCard/SetDefaultAddress',
    method: "POST",
    header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
    data: { addressId: e.target.dataset.fid },
    success(res) {
          console.log(res)
      }
    })
},
bj1:function(e){
    wx.navigateTo({
      url: '/pages/tjdz1/tjdz1?addressId=' + e.target.dataset.fid + "&consignee=" + this.data.list[e.target.dataset.uid].consignee + "&phone=" + this.data.list[e.target.dataset.uid].phone + "&area=" + this.data.list[e.target.dataset.uid].area + "&address=" + this.data.list[e.target.dataset.uid].address,
    })
},
del1:function(e){
  var that = this;
  var a = wx.getStorageSync('Token');
  var timespan = new Date().getTime();
  var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
  var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
  // 轮播图
  wx.request({
    url: app.globalData.url + '/api/MemberCard/AddressDel',
    method: "POST",
    header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
    data: { addressId: e.target.dataset.fid },
    success(res) {
      console.log(res)
      wx.request({
        url: app.globalData.url + '/api/MemberCard/AddressList',
        method: "POST",
        header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
        data: { openId: app.globalData.openId },
        success(res) {
          console.log(res)
          that.setData({ list: res.data.result })
          if (that.data.list.length != 0) {
            that.setData({
              show1: 1
            })
          } else {
            that.setData({
              show1: 0
            })
          }
        }
      })
    }
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
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/MemberCard/AddressList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId:app.globalData.openId},
      success(res) {
        console.log(res)
        var rest=res.data.result;
        that.setData({ list: res.data.result})
        if (rest.length!=0){
          that.setData({
            show1:1
          })
        }else{
          that.setData({
            show1:0
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
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/MemberCard/AddressList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId: app.globalData.openId },
      success(res) {
        console.log(res)
        var rest = res.data.result;
        that.setData({ list: res.data.result })
        if (rest.length != 0) {
          that.setData({
            show1: 1
          })
        } else {
          that.setData({
            show1: 0
          })
        }

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
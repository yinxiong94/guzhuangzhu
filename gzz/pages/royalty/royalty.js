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
    beginTime:"",
    price:0,
    price1:0,
    index:"请选择开始时间",
    index1:"请选择结束时间",
    sid:1,
    endTime:"",
    page:1,
    size:100
  },
  type: function (e) {
    var that = this;
    var id = wx.getStorageSync('agentId');
    this.setData({ sid: e.currentTarget.dataset.sid })
    wx.request({
      url: app.globalData.url + "/api/Users/MachineOrderPageList",
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        key: id,
        page: this.data.page,
        size: this.data.size,
        beginTime: this.data.beginTime,
        endTime: this.data.endTime,
        type: this.data.sid
      },
      success(res) {
        that.setData({
          coco: res.data.result
        })
      }
    })
  },
xs:function(){
    if(this.data.isshow==false){
      this.setData({isshow:true})
    } else {
      this.setData({isshow:false})
    }
},
  bindPickerChange: function (e) {
    this.setData({ sid: 4 })
    var that = this;
    var id = wx.getStorageSync('agentId');
    if (this.data.beginTime) {
      wx.request({
        url: app.globalData.url + "/api/Users/MachineOrderPageList",
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        data: {
          key: id,
          page: this.data.page,
          size: this.data.size,
          beginTime: this.data.beginTime,
          endTime: this.data.endTime,
          type: this.data.sid
        },
        success(res) {
          that.setData({
            coco: res.data.result
          })
        }
      })
    }
    this.setData({
      index: e.detail.value,
      beginTime: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    this.setData({ sid: 4 })
    var that = this;
    var id = wx.getStorageSync('agentId');
    this.setData({
      index1: e.detail.value,
      endTime: e.detail.value
    })
    if (!this.data.beginTime) {
      wx.showToast({
        title: '请选择开始时间',
        duration: 2000,
        icon: "none"
      })
    } else {
      wx.request({
        url: app.globalData.url + "/api/Users/MachineOrderPageList",
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        data: {
          key: id,
          page: this.data.page,
          size: this.data.size,
          beginTime: this.data.beginTime,
          endTime: this.data.endTime,
          type: this.data.sid
        },
        success(res) {
          that.setData({
            coco: res.data.result
          })
        }
      })
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
      data: { key: id, page: 1, size: 500, beginTime: that.data.beginTime },
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
      data: { key: id, page: 1, size: 500},
      success(res) {
        console.log(res)
        let cop = res.data.result;
        that.setData({ list: cop, price: cop.timeCommission, price1: cop.totalCommission })
      }
    })
    wx.request({
      url: app.globalData.url + '/api/Users/MachinePageList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { key: id, page: 1, size: 500, beginTime: that.data.beginTime},
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
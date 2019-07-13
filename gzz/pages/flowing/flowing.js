// pages/flowing/flowing.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      sid:1,
      index:"请选择开始时间",
      index1:"请选择结束时间",
    machineId:"",
    page:1,
    size:5,
    beginTime:"",
    endTime:"",
    list:[],
    price:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  type:function(e){
    this.setData({ sid: e.currentTarget.dataset.sid})
    wx.request({
      url: app.globalData.url +"/api/Users/MachineOrderPageListByMachineId",
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { key: this.data.machineId, page: this.data.page, size: this.data.size, beginTime: this.data.beginTime, endTime: this.data.endTime, type: this.data.sid },
      success: res => {
        this.setData({ list: res.data.result, price: res.data.result[0].money })
      }
    })
  },
  bindPickerChange: function (e) {
    this.setData({ sid: 4 })
    var that = this;
    if (this.data.beginTime) {
      wx.request({
        url: app.globalData.url + "/api/Users/MachineOrderPageListByMachineId",
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        data: { key: this.data.machineId, page: this.data.page, size: this.data.size, beginTime: this.data.beginTime, endTime: this.data.endTime, type: this.data.sid },
        success: res => {
          this.setData({ list: res.data.result, price: res.data.result[0].money })
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
        url: app.globalData.url + "/api/Users/MachineOrderPageListByMachineId",
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        data: { key: this.data.machineId, page: this.data.page, size: this.data.size, beginTime: this.data.beginTime, endTime: this.data.endTime, type: this.data.sid },
        success: res => {
          this.setData({ list: res.data.result, price: res.data.result[0].money })
        }
      })
    }
  },
  onLoad: function (options) {
    this.setData({ machineId: options.machineId})
     console.log(this.data.machineId) 
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
    console.log(this.data.machineId) 
    wx.request({
      url: app.globalData.url + "/api/Users/MachineOrderPageListByMachineId",
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { key: this.data.machineId, page: this.data.page, size: this.data.size, beginTime: this.data.beginTime, endTime: this.data.endTime, type: this.data.sid },
      success: res => {
        console.log(res)
        this.setData({ list: res.data.result, price: res.data.result[0].money})
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
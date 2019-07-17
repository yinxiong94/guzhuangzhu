// pages/sign/sign.js
const app = getApp()
var timespan = new Date().getTime();
var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: [],
    info: [],
    obj1: [],
    info1: []
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
  // 返回商城主页
  home:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  inputedit1: function (e) {
    // 1. input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    //data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象，有obj和item属性，可以通过这两个实现双向数据绑定，通过更改这两个值，对不同name的变量赋值
    let value = e.detail.value;
    this.data[dataset.obj1][dataset.item1] = value;
    this.setData({
      obj1: this.data[dataset.obj1]
    });
  },
  login:function(){
    var a = wx.getStorageSync('Token');   
    console.log(a) 
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/users/LoginVerify',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { account: this.data.obj.manager, password:this.data.obj1.manager1 },
      success(res) {
        console.log(res)
          if(res.data.code==200){
            wx.showToast({
              title: '登录成功',
              duration: 2000
            })
            wx.setStorage({
              key: 'userId',
              data: res.data.result.UserId,
            })
            wx.setStorage({
              key: 'agentId',
              data: res.data.result.agentId,
            })
            setTimeout(function(){
              wx.navigateTo({
                url: '/pages/personal1/personal',
              })
            },2000)
            
          } else {
            wx.showToast({
              title: '请检查信息',
              duration: 2000,
              icon: 'none',
            })
          }
      }
      })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
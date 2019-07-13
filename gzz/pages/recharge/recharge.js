// pages/recharge/recharge.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      index1:0,
      isshow:true,
      orderId:"",
      obj1: "",
      rechargeId:"",
      memberCard:""
  },
  wx:function(){
    if(this.data.isshow==true){
      this.setData({isshow:false})
    } else {
      this.setData({isshow:true})
    }
  },
  inputedit1: function (e) {
    // 1. input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    //data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象，有obj和item属性，可以通过这两个实现双向数据绑定，通过更改这两个值，对不同name的变量赋值
    var  value = e.detail.value;
    this.setData({
      obj1: value
    });
  },
  // 选择充值额度
  xz:function(e){
      console.log(e.currentTarget.dataset)
    this.setData({ index1: e.currentTarget.dataset.id, rechargeId: e.currentTarget.dataset.rechargeid})
  },
  // 充值
  chongzhi:function(){
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/recharge/generateRechargeOrder',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { memberCard: that.data.obj1, rechargeId: that.data.rechargeId},
      success(res){
        if(res.data.code!=200){
          wx.showToast({
            title: '无效手机号码',
            duration:2000,
            icon:"none"
          })
        } else{
        that.setData({ orderId:res.data.result.orderId})
        wx.request({
          url: app.globalData.url + '/api/recharge/RechargeWxPay',
          method: "POST",
          header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
          data: { openId: app.globalData.openId, orderId: that.data.orderId },
          success(res) {
            console.log(res)
            var rest=res.data.result;
            wx.requestPayment({
              timeStamp: rest.timeStamp,
              nonceStr: rest.nonceStr,
              package: rest.package,
              signType: rest.signType,
              paySign: rest.paySign,
              success(res){
                wx.showToast({
                  title: '充值成功',
                  duration:2000,
                  icon:"none"
                })
                setTimeout(function(){
                  wx.switchTab({
                    url: '/pages/personal/personal',
                  })
                },2000)
                
              }
            })
          }
          })
        }
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
    // 获取充值额度列表
    wx.request({
      url: app.globalData.url + '/api/Recharge/RechargeConfigList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      success(res) {
        console.log(res)
        that.setData({ list: res.data.result,rechargeId:res.data.result[0].rechargeId })
      }
    });
    // 获取自身会员卡卡号
    wx.request({
      url: app.globalData.url + '/api/MemberCard/MemberInfo',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data:{openId:app.globalData.openId},
      success(res) {
        console.log(res)
        that.setData({ obj1: res.data.result.phone})
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
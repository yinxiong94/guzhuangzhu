// pages/kkxx/kkxx.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 60,
    obj1: [],
    info1: [],
    obj2: [],
    info2: [],
    obj3: [],
    info3: [],
    obj4: [],
    info4: [],
    orderId:""
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
  inputedit2: function (e) {
    // 1. input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    //data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象，有obj和item属性，可以通过这两个实现双向数据绑定，通过更改这两个值，对不同name的变量赋值
    let value = e.detail.value;
    this.data[dataset.obj2][dataset.item2] = value;
    this.setData({
      obj2: this.data[dataset.obj2]
    });
  },
  inputedit3: function (e) {
    // 1. input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    //data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象，有obj和item属性，可以通过这两个实现双向数据绑定，通过更改这两个值，对不同name的变量赋值
    let value = e.detail.value;
    this.data[dataset.obj3][dataset.item3] = value;
    this.setData({
      obj3: this.data[dataset.obj3]
    });
  },
  inputedit4: function (e) {
    // 1. input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    //data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象，有obj和item属性，可以通过这两个实现双向数据绑定，通过更改这两个值，对不同name的变量赋值
    let value = e.detail.value;
    this.data[dataset.obj4][dataset.item4] = value;
    this.setData({
      obj4: this.data[dataset.obj4]
    });
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    var interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({ disabled: true });
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/common/getVerificationCode',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { phone: this.data.obj2.manager2, effectiveTime: 60 },
      success(res) {
      }
    })
  },
  tj:function(){
    var that=this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/memberCard/bindMemberCard',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { memberName: this.data.obj1.manager1, nickName: this.data.obj1.manager1, phone: this.data.obj2.manager2, code: this.data.obj3.manager3, address: this.data.obj4.manager4, openId: app.globalData.openId },
      success(res) {
        console.log(res)
          if(res.data.code==200){
            wx.showToast({
              title: '信息提交成功',
              duration: 2000
            })
            setTimeout(()=>{           
              var a = wx.getStorageSync('Token');
              var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
              wx.request({
                url: app.globalData.url + '/api/recharge/RechargeWxPay',
                method: "POST",
                header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
                data: { openId: app.globalData.openId, orderId:that.data.orderId },
                success(res) {
                      console.log(res)
                      var rest = res.data.result;
                      wx.requestPayment({
                        timeStamp: rest.timeStamp,
                        nonceStr: rest.nonceStr,
                        package: rest.package,
                        signType: rest.signType,
                        paySign: rest.paySign,
                      })
                    }
              })   
              // wx.switchTab({
              //   url: '/pages/index/index',
              // })
            },2000)
          } else{
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
    this.setData({ orderId: options.orderId})
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
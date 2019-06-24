// pages/ddzf/ddzf.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:"",
    productId:"",
    list:[],
    price:"",
    disabled:true,
    id:""
  },
  abc:function(e){   
    this.setData({ disabled: false, id: e.target.dataset.id})
  },
  ddxq:function(){
    var that = this;
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    if(that.data.id==1){
    wx.request({
      url: app.globalData.url + '/api/product/ProductOrderWxPay',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { openId: app.globalData.openId, orderId:that.data.orderId },
      success(res) {
            var rest = res.data.result;
            wx.requestPayment({
              timeStamp: rest.timeStamp,
              nonceStr: rest.nonceStr,
              package: rest.package,
              signType: rest.signType,
              paySign: rest.paySign,
              success(res){
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            })
          }
        })
    } else{
      wx.request({
        url: app.globalData.url +'/api/product/PayProductOrder',
        method:"POST",
        header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
        data: { openId: app.globalData.openId, orderId: that.data.orderId, payType:0},
        success(res){
          console.log(res)
          if(res.data.code==200){
            wx.showToast({
              title: '支付成功',
              duration:2000,
              success(res){               
                setTimeout(function(){
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                },2000)
              }
            })
          }
          else if(res.data.code==424){
            wx.showToast({
              title: '会员卡余额不足',
              duration:2000,
              icon:"none"
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
      console.log(options)
      this.setData({orderId:options.orderId,price:options.price})
        var that = this;
        var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
        var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
        wx.request({
          url: app.globalData.url + '/api/product/ProductOrderList',
          method: "POST",
          header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
          data: { orderId: that.data.orderId },
          success(res) {
            var cc=[];
            cc.push(res.data.result)
           that.setData({list:cc})
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
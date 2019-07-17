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
    id:"",
    meb:{},
    point:"",
    pickupWay:""
  },
  abc:function(e){   
    this.setData({ disabled: false, id: e.target.dataset.id})
  },
  ddxq:function(){
    console.log(this.data.id)
    var that = this;
    if(that.data.id==1){
    wx.request({
      url: app.globalData.url + '/api/product/ProductOrderWxPay',
      method: "POST",
      header: { 'content-type': 'application/json' },
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
                wx.navigateTo({
                  url: '/pages/ddxq/ddxq?orderId=' + that.data.orderId + "&uuu=" + 1,
                })
              }
            })
          }
        })
    } else if(that.data.id==0) {
      wx.request({
        url: app.globalData.url +'/api/product/PayProductOrder',
        method:"POST",
        header: { 'content-type': 'application/json' },
        data: { openId: app.globalData.openId, orderId: that.data.orderId, payType:0},
        success(res){
          console.log(res)
          if(res.data.code==200){
            wx.showToast({
              title: '支付成功',
              duration:2000,
              success(res){               
                setTimeout(function(){
                  wx.navigateTo({
                    url: '/pages/ddxq/ddxq?orderId=' + that.data.orderId + "&uuu=" + 1,
                  })
                },2000)
              }
            })
          }
          else {
            wx.showToast({
              title: '会员卡余额不足',
              duration:2000,
              icon:"none"
            })
          }
        }
      })
    } else {
      wx.request({
        url: app.globalData.url + '/api/product/PayProductOrder',
        method: "POST",
        header: { 'content-type': 'application/json' },
        data: { openId: app.globalData.openId, orderId: that.data.orderId, payType: 2 },
        success(res) {
          console.log(res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '支付成功',
              duration: 2000,
              success(res) {
                setTimeout(function () {
                  wx.navigateTo({
                    url: '/pages/ddxq/ddxq?orderId=' + that.data.orderId + "&uuu=" + 1,
                  })
                }, 2000)
              }
            })
          }
          else {
            wx.showToast({
              title: '会员卡积分不足',
              duration: 2000,
              icon: "none"
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
    this.setData({ orderId: options.orderId, price: options.price, point: options.point, pickupWay: options.pickupWay })    
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
        wx.request({
          url: app.globalData.url + '/api/product/ProductOrderList',
          method: "POST",
          header: { 'content-type': 'application/json'},
          data: { orderId: that.data.orderId },
          success(res) {
            var cc=[];
            cc.push(res.data.result)
           that.setData({list:cc})
          }
        })
        wx.request({
          url: app.globalData.url +"/api/MemberCard/MemberInfo",
          method:"post",
          header: { 'content-type': 'application/json' },
          data: { openId:app.globalData.openId},
          success:res=>{
            that.setData({meb:res.data.result})
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
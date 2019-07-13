// pages/membership/membership.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    swiperIndex: 1,
    list:[],
    
  },
  swiperChange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  // 立即开通会员
  kt: function() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/MemberCard/BuyMemberCardOrder',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        openId: app.globalData.openId,
        memberConfigId: this.data.imgUrls[this.data.swiperIndex].configId
      },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.navigateTo({
            url: '/pages/kkxx/kkxx?orderId=' + res.data.result.orderId,
          })
        } else {
          wx.navigateTo({
            url: '/pages/recharge/recharge',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 电子优惠券列表
    wx.request({
      url: app.globalData.url + '/api/memberCard/memberCardConfigList',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          imgUrls: res.data.result
        })
      }
    })

    wx.request({
      url: app.globalData.url +"/api/MemberCard/MemberEquityList",
      method:"post",
      header: { 'content-type': 'application/json'},
      success:res=>{
        that.setData({list:res.data.result})
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
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
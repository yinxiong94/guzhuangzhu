// pages/wddd/wddd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
    size:5,
    sid:1
  },
 ddxq:function(e){
   var id = e.currentTarget.dataset.ind;
   if(this.data.list[id].payState==2){
     wx.navigateTo({
       url: '/pages/ddxq/ddxq?orderId=' + e.currentTarget.dataset.orderid + "&uuu=" +2,
     }) 
   } else{
   wx.navigateTo({
     url: '/pages/ddxq/ddxq?orderId=' + e.currentTarget.dataset.orderid + "&uuu=" + e.currentTarget.dataset.ccc,
     })
   }
 },
 to345:function(e){
      var a=e.target.dataset.uid;
      var b = e.target.dataset.orderid;
   var c = e.target.dataset.paymoney;
      console.log(e.target.dataset)
      if(a==0){
        wx.navigateTo({
          url: "/pages/ddzf/ddzf?orderId=" + b +"&price="+c,
        })
      } else {
        wx.navigateTo({
          url: '/pages/ddxq/ddxq?orderId=' + b + "&uuu=" + e.currentTarget.dataset.ccc,
        })
      }
 },
 t1:function(e){
   this.setData({ sid: e.target.dataset.sid})
   var that = this;
   wx.request({
     url: app.globalData.url + '/api/product/OrderInfoList',
     method: "POST",
     header: { 'content-type': 'application/json' },
     data: { key: app.globalData.openId, page: 1, size: that.data.size },
     success(res) {
     if(that.data.sid==1){
       that.setData({list:res.data.result})
     } else if(that.data.sid==2){
       var cc=[]
       for(var i=0;i<res.data.result.length;i++){
         if (res.data.result[i].payState==0){
           cc.push(res.data.result[i])
         }
       }
       that.setData({list:cc})
     } else if(that.data.sid==3){
       var cc = []
       for (var i = 0; i < res.data.result.length; i++) {
         if (res.data.result[i].payState == 1) {
           if (res.data.result[i].pickupWay==0){
           cc.push(res.data.result[i])
           }
         }
       }
       that.setData({ list: cc })     
     }
      else if(that.data.sid==4){
        var cc=[]
       for (var i = 0; i < res.data.result.length; i++) {
           if (res.data.result[i].payState == 1) {
             if (res.data.result[i].pickupWay == 1) {
               cc.push(res.data.result[i])
             }
           }
      }
       that.setData({ list: cc })
     }
      else if(that.data.sid==5) {
       var cc = []
       for (var i = 0; i < res.data.result.length; i++) {
         if (res.data.result[i].payState == 2) {
           cc.push(res.data.result[i])
         }
       }
       console.log(cc)
       that.setData({ list: cc })
      }
     }
   })
 },
 tk:function(){
   wx.navigateTo({
     url: '/pages/refund/refund',
   })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/product/OrderInfoList',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { key: app.globalData.openId, page:1,size:that.data.size},
      success(res) {
       console.log(res)
       that.setData({list:res.data.result})
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
    var that = this;
    that.setData({size:that.data.size-(-5)})
    wx.request({
      url: app.globalData.url + '/api/product/OrderInfoList',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { key: app.globalData.openId, page: 1, size: that.data.size },
      success(res) {
        console.log(res)
        that.setData({ list: res.data.result })
        wx.request({
          url: app.globalData.url + '/api/product/OrderInfoList',
          method: "POST",
          header: { 'content-type': 'application/json' },
          data: { key: app.globalData.openId, page: 1, size: that.data.size },
          success(res) {
            if (that.data.sid == 1) {
              that.setData({ list: res.data.result })
            } else if (that.data.sid == 2) {
              console.log(2)
              var cc = []
              for (var i = 0; i < res.data.result.length; i++) {
                if (res.data.result[i].payState == 0) {
                  cc.push(res.data.result[i])
                }
              }
              console.log(cc)
              that.setData({ list: cc })
            } else if (that.data.sid == 3) {
              console.log(3)
              var cc = []
              for (var i = 0; i < res.data.result.length; i++) {
                if (res.data.result[i].payState == 1) {
                  if (res.data.result[i].pickupWay == 0) {
                    cc.push(res.data.result[i])
                  }
                }
              }
              console.log(cc)

            }
            else if (that.data.sid == 4) {
              console.log(4)
              var cc = []
              for (var i = 0; i < res.data.result.length; i++) {
                if (res.data.result[i].payState == 1) {
                  if (res.data.result[i].pickupWay == 1) {
                    cc.push(res.data.result[i])
                  }
                }
              }
              console.log(cc)
              that.setData({ list: cc })
            }
          }
        })
      }
    })
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
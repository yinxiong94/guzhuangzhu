// pages/tjdz/tjdz.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      index:"",
    obj: [],
    info: [],
    obj1: [],
    info1: [],
    obj2: [],
    info2: []
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
  r123:function(){
    var that = this;
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/common/GetAreaList',
      method: "POST",
      header: { 'content-type': 'application/json' },
      success(res) {
        console.log(res)
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bc:function(e){  
    var that = this;
    // 轮播图
    if (this.data.addressId && this.data.info.manager && this.data.info.manager1 && this.data.index && this.data.info.manager2){
      var gg = "";
      for (var i = 0; i < this.data.index.length; i++) {
        gg += this.data.index[i];
        gg += ","
      }
    wx.request({
      url: app.globalData.url + '/api/MemberCard/AddressAdd',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: { openId: app.globalData.openId, consignee: this.data.obj.manager, phone: this.data.obj1.manager1, area: gg, address:this.data.obj2.manager2},
      success(res) {
        console.log(res)
        if(res.data.code==200){
          wx.showToast({
            title: '添加成功',
            duration:2000,
            success(res){
              setTimeout(function(){
                wx.navigateBack({
                  delta:1
                })
              },2000)            
            }
          })
        }
      }
      })
    }
     else{
       wx.showToast({
         title: '信息请填写完整',
         icon:"none"
       })
     }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        console.log(options)
    this.setData({ ['info.manager']: options.consignee, ['info.manager1']: options.phone, ['info.manager2']: options.address, index: options.area})
    console.log(this.data)
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
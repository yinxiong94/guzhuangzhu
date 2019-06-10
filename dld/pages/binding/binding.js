// pages/binding/binding.js
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
    info1: [],
    obj2: [],
    info2: [],
    obj3: [],
    info3: [],
    obj4: [],
    info4: [],
    obj5: [],
    info5: [],
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 60,
    disabled: true,
  },
  ty:function(){
    if(this.data.disabled==true){
      this.setData({ disabled: false })
    }
      else {
        this.setData({ disabled: true})
      }
  },
  tt:function(){
    var that = this;   
    var id = wx.getStorageSync('agentId');
    var a = wx.getStorageSync('Token');
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    wx.request({
      url: app.globalData.url + '/api/Users/UpdateBackCard',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { cardUserName: that.data.obj.manager, cardsfzCard: that.data.obj2.manager2, backName: that.data.obj3.manager3,  agentId: id},
      success(res) {
        console.log(res)
        if(res.data.code==200){
          wx.showToast({
            title: '绑定成功',
            duration:2000,
            success(res){
              setTimeout(function(){
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              },2000)
            }
          })
        }
      }
    })
  },
  yhxy:function(){
    var that = this;
    var id = wx.getStorageSync('userId');  
    var a = wx.getStorageSync('Token');
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase(); 
    wx.request({
      url: app.globalData.url + '/api/Users/GetWenjian',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      // data: { cardUserName:, cardsfzCard:, idCard:, backName:, cardTel:, userId:id },
      success(res) {
        console.log(res)
        // that.setData({ list: res.data.result })
      }
    })
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
  inputedit5: function (e) {
    // 1. input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    //data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象，有obj和item属性，可以通过这两个实现双向数据绑定，通过更改这两个值，对不同name的变量赋值
    let value = e.detail.value;
    this.data[dataset.obj5][dataset.item5] = value;
    this.setData({
      obj5: this.data[dataset.obj5]
    });
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

  }
})
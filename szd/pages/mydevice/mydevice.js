import Canvas from '../../utils/canvas.js'
Page({
  ...Canvas.options,
  /**
   * 页面的初始数据
   */
  data: {
    ...Canvas.data,
  },
  tols:function(){
    wx.navigateTo({
      url: '/pages/flowing/flowing',
    })
  },
  tozz:function(){
    wx.navigateTo({
      url: '/pages/zhuangzheng/zhuangzheng',
    })
  },
  tosb:function(){
    wx.navigateTo({
      url: '/pages/fault/fault',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.draw('runCanvas', 78 , 1000);
  },
})
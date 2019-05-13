Page({
  data: {
    imgUrls: [
      '/pages/img/deas.png',
      '/pages/img/deas.png',
      '/pages/img/deas.png'
    ],
    swiperIndex: 1
  },
  swiperChange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  }
})

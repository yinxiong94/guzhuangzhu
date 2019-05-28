var getToken=function(){
var that = this;
wx.getStorage({
  key: 'Token',
  success: function (res) {
    var rest = res.data;
    if (rest.signToken == undefined || rest.signTokenn == null || new Date(rest.timespan) <= new Date()) {
      //如果Token过期请求Token
      var timespan = new Date().getTime();        //时间戳
      var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));     //随机数
      var signKey = '79846445647';        //请求秘钥
      wx.request({
        url: that.globalData.url + '/api/Token/GetToken',
        header: { 'content-type': 'application/json', signKey: signKey, timespan: timespan, nonce: nonce },
        data: { signKey: signKey },
        success(res) {
          if (res.code = 200) {
            var rest = res.result;
            wx.setStorage({
              key: 'Token',
              data: res.data.result,
            })
          }
        }
      })
    }
  },
})
}
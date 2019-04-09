const app = getApp();


module.exports =  function request (url,method,data,callback,refresh = false) {

  wx.request({
    url: app.globalData.baseUrl + url,
    header: {
      Authorization: app.globalData.access_token
    },
    method: method,
    data: data,
    success: (res) => {
      if (res.statusCode === 401 && !refresh) {
        wx.request({
          url: app.globalData.baseUrl + 'v1/auth',
          method: 'GET',
          data: {
            refreshToken: app.globalData.refresh_token,
            openId: app.globalData.user.openId
          },
          success: (res) => {
            app.globalData.access_token = res.data.access_token;
            console.log(...arguments)
            request(url,method,data,callback,refresh = true);
            return;
          }
        })
      }
      callback(res);
    },
  })
}


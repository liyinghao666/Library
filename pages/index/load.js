const app = getApp();
const request = require('./request.js')
Page({
  data: {
    id: null,
    name: null,
    class: null,
    tel: null,
    loading: false,
    itemList: [
      '财务管理1701班', 
      '财政1701班', 
      '工商1701班',
      '管实1701班',
      '物流1701班',
      '物流1702班',
      '信管1701班',
      '信管1702班',
      '市营1701班',
      '会计1701班',
      '会计1702班',
    ],
    index: null
    
  },
  idInput: function (e){
    this.setData({
      id: e.detail.value
    })
  },
  classInput: function (e) {
    console.log(e)
    this.setData({
      index: e.detail.value,
      class: this.data.itemList[e.detail.value]
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },

  onSubmit: function () {
    console.log(app.globalData.openId)
    if (!(this.data.id && this.data.name && this.data.class && this.data.tel)){
      wx.showToast({title: '信息不全！'});
      return;
    }
    this.setData({loading:true});
    wx.request({
      url: app.globalData.baseUrl + 'v1/users',
      header: {
        Authorization: app.globalData.access_token
      },
      method: 'POST',
      data: {
        openid: app.globalData.openId,
        name: this.data.name,
        studentId: this.data.id,
        class: this.data.class,
        qq: this.data.tel
      },
      success: (res) => {
        console.log(res);
        this.setData({loading:false})
        if (res.data.error_type === 'not_management_student') {
          wx.showToast({title: '非管理学院学员'});
          setTimeout(() => {
            wx.hideToast();
          }, 1000);
        } else if (res.data.error_type === 'has_exist') {
          wx.showToast({title: '账户已经存在'});
          setTimeout(() => {
            wx.hideToast();
          }, 1000);
        } else {
          console.log(res)
          let data = res.data;
          app.globalData.user = data.user;
          
          wx.login({
            success: (res) => {
              request('v1/auth','POST',{code:res.code},(res) => {
                console.log(res)
                let data = res.data;
                app.globalData.user = data.user;
                if (!data.errorType) {
                    app.globalData.refresh_token = data.token.refresh_token;
                    app.globalData.access_token = data.token.access_token;
                }
                else {
                  wx.showToast({title: '请重新登录'})
                }
              })
              wx.navigateTo({
                url: './home'
              })  
            }
          });
        }

      }
    })
  }
})
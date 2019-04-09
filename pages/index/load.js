const app = getApp();

Page({
  data: {
    id: null,
    name: null,
    class: null,
    tel: null,
    loading: false
  },
  idInput: function (e){
    this.setData({
      id: e.detail.value
    })
  },
  classInput: function (e) {
    this.setData({
      class: e.detail.value
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
        openid: app.globalData.user.openId,
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
        }

      }
    })
  }
})
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
      setTimeout(() => {
        wx.hideToast();
      }, 1000);
      return;
    }
    this.setData({loading:true});
    console.log(this.data)
    setTimeout(() => {
      this.setData({loading:false})
    }, 1000);

  }
})
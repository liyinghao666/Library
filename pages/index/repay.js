const app = getApp();
const request = require('./request.js');
Page({
  data: {
    user: null,
    userInfo: {
      head: './assets/head.svg',
      message: '自动化校际交流李英豪'
    },
    borrows: null
  },
  onLoad: function() {
    this.setData({
      user: app.globalData.user,
      userInfo: app.globalData.userInfo,
      borrows: app.globalData.currentBook
    })
  },
  back: function() {
    wx.showModal({
      title: '⚠',
      content: '请确认书已经转交借阅者或管理员',
      success: (res) => {
        if (res.confirm) {
          request('v1/books/'+ app.globalData.currentBook._id,'PUT',{
            id: this.data.borrows._id,
            currentOwner: '000000000000000000000000',
            bookState: '空闲'
          }, (res) => {
            if(res.statusCode !== 200){return}
            request('v1/users/'+app.globalData.user._id,'PUT',{
              id: app.globalData.user._id,
              bookId: this.data.borrows._id,
              type: '还'
            },(res) => {
              app.globalData.currentBook = null;
              console.log(res)
              wx.showToast({
                title: '还书成功'
              })
              app.globalData.user = res.data;
              this.onLoad();
            })
          },true)
        }
      }
    })
  },
  // 函数们
  toBorrow: function() {
    wx.navigateTo({
      url: './borrow'
    })
  },
  toRepay: function() {
    wx.navigateTo({
      url: './repay'
    })
  },
  toHistory: function() {
    wx.navigateTo({
      url: './history'
    })
  },
  speakSao: function() {
    wx.navigateTo({
      url: './speakSao'
    })
  }
})
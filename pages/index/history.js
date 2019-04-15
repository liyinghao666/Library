const app = getApp();
const request = require('./request.js');
Page({
  data: {
    user: null,
    userinfo: {
      head: './assets/head.svg',
      name: '自动化校际交流李英豪'
    },
    borrows: []

  },
  onLoad: function() {
    this.setData({
      user: app.globalData.user,
      borrows : app.globalData.user.records,
      userinfo : app.globalData.userInfo
    },function () {
      let borrows = this.data.borrows;
      borrows.forEach(book => {
        request('v1/books/'+book.bookId,'GET',{
          id: book.bookId
        },(res) => {
          book.bookName = res.data.bookName;
          if(book.borrowTime.slice(0,1) === '0'){
            book.borrowTime = false
          }else {
            book.borrowTime = book.borrowTime.slice(0,10);
          }
          if(book.lendTime.slice(0,1) === '0'){
            book.lendTime = false
          }else {
            book.lendTime = book.lendTime.slice(0,10);
          }
          this.setData({
            borrows: borrows
          },() => {console.log(this.data)})
        })
      })
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
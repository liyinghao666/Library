const app = getApp();
const request = require('./request.js');
Page({
  data: {
    kind: null,
    kindList: [],
    bookList: [],
    input: null
  },
  onLoad: function() {
    request('v1/books','GET',null,(res) => {
      console.log(res.data)
      this.setData({
        bookList: res.data,
      })
    });
  },
  handleInput: function(e) {
    this.setData({
      input: e.detail.value
    })
  },
  handleSearch: function() {
    this.data.bookList.forEach((book, index) => {
      if(book.bookName === this.data.input) {
        let list = this.data.bookList
        let s = list[0];
        list[0] = book;
        list[index] = s;
        this.setData({
          bookList: list
        })
      }
    });
  },
  handleTap: function(e) {
    let index = parseInt(e.target.id);
    if (app.globalData.currentBook) {
      wx.showModal({
        title: '同时只能借阅一本',
        content: '请先还旧书'
      })
      console.log('不可借')
      return;
    }
    if (this.data.bookList[index].bookState === '在读') {
      console.log('书在读');
      request('v1/users/' + this.data.bookList[index].currentOwner, 'GET', {
        _id: this.data.bookList[index].currentOwner
      },(res) => {
        console.log(res)
        wx.setClipboardData({
          data: res.data.QQ || res.data.weChat || res.data.tel,
          success: () => {
            wx.showModal({
              title: '此书已被借',
              content: '联系方式' + res.data.QQ || res.data.weChat || res.data.tel + '已经复制到剪切板'
            })
          },
          fail: () => {
            wx.showModal({
              title: '此书已被借',
              content: '联系方式' + res.data.QQ || res.data.weChat || res.data.tel
            })
          }
        })
        console.log('不可借')
      },false);
      return;
    }
    request('/v1/books/' + this.data.bookList[index]._id ,'PUT',{
      id: this.data.bookList[index]._id,
      bookState: '在读',
      currentOwner: app.globalData.user._id,
      readRank: this.data.bookList[index].readRank + 1
    },(res) => {
      request('v1/users/' + app.globalData.user._id, 'PUT', {
        bookId: this.data.bookList[index]._id,
        id: app.globalData.user._id,
        type: '借'
      },(res) => {
        if (res.data) {
          app.globalData.user = res.data;
          app.globalData.currentBook = this.data.bookList[index]
        }
      },true)
      request('v1/books','GET',null,(res) => {
        this.setData({
          bookList: res.data,
        })
      });  
    },false)
  }
})
const app = getApp();
const request = require('./request.js');
Page({
  data: {
    kind: null,
    kindList: [],
    bookList: []
  },
  onLoad: function() {
    request('v1/books','GET',null,(res) => {
      console.log(res.data)
      this.setData({
        bookList: res.data,
      })
    });
  },
  handleTap: function(e) {
    let index = parseInt(e.target.id);
    // if (this.data.bookList[index].bookState === '空闲') {
    //   wx.showModal({
    //     title: '此书已被',
    //     content: '联系方式'
    //   })
    //   console.log('不可借')
    //   return;
    // }
    request('/v1/books/' + this.data.bookList[index]._id ,'PUT',{
      id: this.data.bookList[index]._id,
      bookState: '在读',
      currentOwner: "000000000000000000002000",
      readRank: this.data.bookList[index].readRank + 1
    },(res) => {
      console.log(res);
      request('v1/books','GET',null,(res) => {
        this.setData({
          bookList: res.data,
        })
      });  
    },false)
  }
  // 函数们
  // "_id": "5cac6909f8f68c000140b463",
  // "bookNumber": "1",
  // "bookName": "少林英雄传",
  // "author": "江诗毅",
  // "bookState": "空闲",
  // "currentOwner": "000000000000000000000000",
  // "readRank": 0
})
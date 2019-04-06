Page({
  data: {
    kind: null,
    kindList: [],
    bookList: [
      {
        name: '少林英雄传',
        user: '管卓江诗毅',
        id:1
      },
      {
        name: 'lie to me',
        user: '会计刘选怡',
        id:2
      },
      {
        name: '杀死一只知更鸟',
        user: '',
        id: 3
      }
    ]
  },
  onLoad: function() {

    console.log('home loaded')
  },
  // 函数们
})
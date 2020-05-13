Page({
  data: {
    box1: true,
    box2: false,
    box3: false,
    box4: false,
    showLight: false,
    boxMoveAnimation: null,
    backgroundAnimationClass: null,
    prizeAnimationClass: null,
    drewResultAnimation: null,
    animation: null,
    animation_1: null,
    animation_2: null,
    animation_3: null,
    indexNumber: 1,
    backgroundHeight: 'calc(100vh-40rpx)',
    rayRotateClass: null,
    sadInconLink: '../../img/sad-icon.png',
    sadAnimationClass: null,
    queryAnimationClass: null,
    happyAnimationClass: null,
    showSadIncon: 1,
    showHappyIcon: 1,
    showFinalStatus: 0
  },
  onLoad(query) {
    this.animation()
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  animation: function () {
    let $this = this
    $this.animation = my.createAnimation()
    // 计算背景图应该有的高度
    let systemInfo = my.getSystemInfoSync() // 系统信息
    my.createSelectorQuery().select('.prize-intro').boundingClientRect().exec((ret) =>{
      // 权益奖品的高度
      let topAreaHeight = ret[0]['height']
      my.createSelectorQuery().select('.prize-content').boundingClientRect().exec((result) =>{
        // 随机权益高度
        let middleHeight = result[0]['height']
        let backgroundHeight = ((40 + 32 + 40 + 240 + 40 + 94)/2)*systemInfo.windowWidth/375 + topAreaHeight + middleHeight
        let boxPosition = (((240 - 190)/2 + 40 + 94)/2)*systemInfo.windowWidth/375
        $this.animation.opacity(1).bottom(boxPosition).step()
        $this.setData({
          backgroundHeight: `${backgroundHeight}px`,
          boxMoveAnimation: $this.animation.export()
        })
      })
    })
    for(let i = 1; i < 4; i++) {
      setTimeout(() => {
        let box1 = false,
          box2 = true,
          box3 = false,
          box4 = false,
          showLight = false
        if (i === 1) {
          box1 = true,
          box2 = false,
          box3 = false,
          box4 = false,
          showLight = false
        }
        if (i === 2) {
          box1 = false,
          box2 = false,
          box3 = true,
          box4 = false,
          showLight = true
        }
        if (i === 3) {
          box1 = false,
          box2 = false,
          box3 = false,
          box4 = true,
          showLight = true
        }
        $this.setData({
          box1,
          box2,
          box3,
          box4,
          showLight
        })
      }, 800 + i*100)
    }
    setTimeout( () => {
      $this.setData({
        backgroundAnimationClass: 'background-rise'
      })
    }, 1200)
    setTimeout( () => {
      $this.setData({
        prizeAnimationClass: 'prize-content-animation'
      })
    },1700)
    setTimeout(() => {
      $this.boxMoveAnimation()
    }, 3900)
  },
  boxMoveAnimation: function () {
    let $this = this
    let systemInfo = my.getSystemInfoSync()
    $this.animation = my.createAnimation({
      duration: 240
    })
    my.createSelectorQuery().select('.box').boundingClientRect().exec((ret) => {
      console.log(ret)
      my.createSelectorQuery().selectAll('.prize-content .item').boundingClientRect().exec((res) => {
        // console.log(res)
        let resData = res[0]
        let windowHeight = systemInfo.windowHeight
        resData.forEach((item, index) => {
          // console.log(index)
          setTimeout( () => {
            $this.animation.opacity(1)
            .top(item.top)
            .left(item.left)
            .width(item.width)
            .height(item.height).step()
            if (index===0) {
              $this.setData({ 
                animation: $this.animation.export() 
              })
            }
            if (index===1) {
              $this.setData({ 
                animation_1: $this.animation.export() 
              })
            }
            if (index===2) {
              $this.setData({ 
                animation_2: $this.animation.export() 
              })
            }
            if (index===3) {
              $this.setData({ 
                animation_3: $this.animation.export() 
              })
            }
          },200*index)
        })
      })
      setTimeout(() => {
        $this.animation = my.createAnimation({
          duration: 400
        })
        my.createSelectorQuery().selectAll('.prize-content').boundingClientRect().exec( (res) => {
          let contentData = res[0]
          $this.animation.top(contentData[0].bottom + 20/2*systemInfo.screenWidth/375).step()
          $this.setData({ 
            drewResultAnimation: $this.animation.export()
          }, () => {
            $this.finallAnimation()
          })
        })
      }, 1200)
    })
  },
  finallAnimation: function () {
    let $this = this
    setTimeout( () => {
      $this.setData({ 
        rayRotateClass: 'ray-rotate'
      })
    }, 400)
    setTimeout( () => {
      $this.animation = my.createAnimation({
        duration: 1000
      })
      $this.animation.opacity(0).step().width(0).height(0)
      $this.setData({
        boxMoveAnimation: $this.animation.export()
      }, () => {
        $this.iconAnimation()
      })
    }, 600)
  },
  iconAnimation: function () {
    let $this = this
    $this.setData({
      sadAnimationClass: 'sad-icon-animation',
      queryAnimationClass: 'query-icon-animation',
      happyAnimationClass: 'happy-icon-animation',
    })
    setTimeout( () => {
      $this.setData({
        showSadIncon: 1,
        showHappyIcon: 0
      })
    }, 1600)
    setTimeout ( () => {
       $this.setData({
        sadInconLink: '../../img/sad-final-icon.png',
        showFinalStatus: 1,
      })
    }, 2400)
  },
  getIndexNumber: function (e) {
    let indexNumber = e.detail.current
    // console.log(indexNumber)
    this.setData({
      indexNumber: indexNumber + 1
    })
  }
});

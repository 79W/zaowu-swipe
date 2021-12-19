// 最外层div 获取 
let banner = document.getElementsByClassName('banner')[0]
// 获取底部图片
let bannerBackground = document.getElementsByClassName('banner-background')[0]
// 获取底部全部图片
let bannerBackgroundImages = document.getElementsByClassName('banner-background-image')
// 获取轮播div
let bannerSwipe = document.getElementsByClassName('banner-swipe')[0]
// 获取当个轮播
let bannerSwipeItems = document.getElementsByClassName('banner-swipe-item')
// 获取抡博全部端图片
let bannerSwipeItemImages = document.getElementsByClassName('banner-swipe-item-image')
// 获取图片的宽度
let imageWidth = bannerSwipeItemImages[0].clientWidth
// 翻倍 做无限
bannerSwipe.innerHTML += bannerSwipe.innerHTML

// 获取item 长度
let itemLen = bannerSwipeItems.length
// 获取item image 长度
let imageLen = bannerSwipeItemImages.length

// 初始化
bannerSwipe.style.transform = 'translateX(0px)'

// 声明变量 
let startPointX = 0,pointLeft = 0,movePointX = 0,cn = 0,ln = 0,time = null

// 手指开始触摸
bannerSwipe.addEventListener('touchstart',function (ev) {
    console.log('手指开始触摸',ev.changedTouches[0],itemLen,imageLen)
    ev.preventDefault();  //阻止浏览器默认事件
    clearInterval(time)
    bannerSwipe.style.transition = null
    if(cn === 0){
        cn = imageLen / 2
        console.log(imageLen / 2)
    }
    if(cn === imageLen - 1){
        cn = imageLen / 2 - 1
    }

    bannerSwipe.style.transform = `translateX(${ -cn * imageWidth }px)`

    const startXY = ev.changedTouches[0]
    startPointX = startXY.pageX
    pointLeft = parseFloat(bannerSwipe.style.transform.split('(')[1])
    console.log(startPointX,pointLeft)
})

// 手指移动
bannerSwipe.addEventListener('touchmove',function (ev) {
    // ev.preventDefault();
    const moveXY = ev.changedTouches[0]
    console.log('手指移动',ev)
    movePointX = moveXY.pageX - startPointX
    bannerSwipe.style.transform = `translateX(${movePointX + pointLeft}px)`
})

// 手指结束触摸
bannerSwipe.addEventListener('touchend',function (ev) {
    console.log('手指结束触摸',ev)
    const endXY = ev.changedTouches[0]
    movePointX = endXY.pageX - startPointX
    let backWidth =  imageWidth / 8
    console.log(backWidth)
    if(Math.abs(movePointX) > backWidth){
        // if(movePointX > 0){
        //     // cn --
        // }
        // if(movePointX < 0){
        //     // cn ++
        // }
        cn -= movePointX / Math.abs(movePointX)
    }
    bannerSwipe.style.transition = `.5s`
    bannerSwipe.style.transform = `translateX(${ -cn * imageWidth }px)`

    let hn = cn % (imageLen / 2)
    console.log(bannerBackgroundImages,ln,hn)
    bannerBackgroundImages[ln].className = 'banner-background-image backgroundHide'
    bannerBackgroundImages[hn].className = 'banner-background-image backgroundShow'
    ln = hn

    time = setInterval(move,3000)
})

function move () {
    cn ++ 
    bannerSwipe.style.transition = `.5s`
    bannerSwipe.style.transform = `translateX(${ -cn * imageWidth }px)`

    bannerSwipe.addEventListener('transitionend',function(){
        if(cn >= imageLen - 1){
            cn = imageLen / 2 - 1
        }
        bannerSwipe.style.transition = null
        bannerSwipe.style.transform = `translateX(${ -cn * imageWidth }px)`
    })

    let hn = cn % (imageLen / 2)
    bannerBackgroundImages[ln].className = 'banner-background-image backgroundHide'
    bannerBackgroundImages[hn].className = 'banner-background-image backgroundShow'
    ln = hn
}

time = setInterval(move,3000)
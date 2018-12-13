export default class HsliderB {
  constructor(options) {
    this.config = HsliderB.mergeUserConfig(options)

    this.selector =
      String(this.config.selector) === this.config.selector
        ? document.querySelector(this.config.selector)
        : this.config.selector

    if (this.selector === null) {
      throw new Error('Your selector was error!!!')
    }

    this.selectorWorH =
      this.config.direction === 'row' ? this.selector.offsetWidth : this.selector.offsetHeight
    this.sliderWrap = null
    this.currentIndex = Math.floor(this.config.startIndex / this.config.sliderPage)
    this.detail = {
      sliderWrapWorH: null,
      childrenDomsLen: null,
      normalPage: this.config.sliderPage
    }

    const Events = [
      'resizeHandler',
      'mousemoveHandler',
      'mousedownHandler',
      'mouseupHandler',
      'mouseleaveHandler'
    ]
    Events.forEach((event) => {
      this[event] = this[event].bind(this)
    })
    HsliderB.utilResponsivePage.call(this)

    this.init()
  }

  static mergeUserConfig(options) {
    let settings = {
      selector: '.HsliderB',
      duration: 200,
      easing: 'cubic-bezier(.39,.575,.565,1)',
      sliderPage: 1,
      startIndex: 0,
      direction: 'row',
      responsives: [],
      draggable: true,
      onInit: () => {},
      onChange: () => {}
    }

    const userOptions = options
    for (const attrname in userOptions) {
      settings[attrname] = userOptions[attrname]
    }

    return settings
  }

  static utilResponsivePage() {
    const responsives = this.config.responsives
    let responsiveMin = { view: null, sliderPage: null }

    if (responsives.length > 0) {
      responsives.forEach((responsive) => {
        if (responsiveMin.view) {
          responsiveMin.view > responsive.view && (responsiveMin = responsive)
        } else {
          responsive.view > this.selectorWorH && (responsiveMin = responsive)
        }
      })
    }
    this.config.sliderPage = responsiveMin.view ? responsiveMin.sliderPage : this.detail.normalPage
  }

  static utilTranslate3d(nextIndex) {
    let actionIndex = null
    if (nextIndex === 'next') {
      actionIndex = this.currentIndex + 1
    } else if (nextIndex === 'prev') {
      actionIndex = this.currentIndex - 1
    } else {
      actionIndex = Number(nextIndex)
    }

    const singleWorH = this.selectorWorH / this.config.sliderPage
    let offset = singleWorH * actionIndex
    const maxOffset = this.detail.sliderWrapWorH - singleWorH * this.config.sliderPage
    const surplusOffset = Math.abs(maxOffset - offset)

    if (maxOffset > surplusOffset && surplusOffset < singleWorH) {
      offset = offset - surplusOffset
    } else if (offset < 0 || offset > maxOffset) {
      return null
    }

    this.currentIndex = actionIndex

    const translate3d =
      this.config.direction === 'row'
        ? `translate3d(-${offset}px,0px,0px)`
        : `translate3d(0px,-${offset}px,0px)`
    return translate3d
  }

  static utilSlide() {
    if (this.config.direction === 'row') {
      
    } else {
      
    }
    const utilSlide = HsliderB.utilSlide.bind(this)
    this.drag.pointerDown && requestAnimationFrame(utilSlide)
    console.log(this.drag)
  }

  static addEvents() {
    window.addEventListener('resize', this.resizeHandler)

    if (this.config.draggable) {
      this.drag = {
        pointerDown: false,
        start: 0,
        move: 0,
        canSlide: true
      }
      this.selector.addEventListener('touchstart', this.touchstartHandler)
      this.selector.addEventListener('touchend', this.touchendHandler)
      this.selector.addEventListener('touchmove', this.touchmoveHandler)
      this.selector.addEventListener('mousedown', this.mousedownHandler)
      this.selector.addEventListener('mouseup', this.mouseupHandler)
      this.selector.addEventListener('mouseleave', this.mouseleaveHandler)
      this.selector.addEventListener('mousemove', this.mousemoveHandler)
      this.selector.addEventListener('click', this.clickHandler)
    }
  }

  static removeEvents() {
    window.removeEventListener('resize', this.resizeHandler)
    this.selector.removeEventListener('mousemove', this.mousemoveHandler)
  }

  resetDrag() {
    this.drag = {
      pointerDown: false,
      startX: 0,
      endX: 0,
      startY: 0,
      endY: 0,
      canSlide: true
    }
  }

  resizeHandler() {
    const selectorWorH = (this.selectorWorH =
      this.config.direction === 'row' ? this.selector.offsetWidth : this.selector.offsetHeight)

    HsliderB.utilResponsivePage.call(this)

    const sliderWrapWorH = (selectorWorH / this.config.sliderPage) * this.detail.childrenDomsLen
    this.detail.sliderWrapWorH = sliderWrapWorH
    this.config.direction === 'row'
      ? (this.sliderWrap.style.width = sliderWrapWorH + 'px')
      : (this.sliderWrap.style.height = sliderWrapWorH + 'px')
    this.goToSilder(this.currentIndex)
  }

  mousedownHandler(ev) {
    this.drag.pointerDown = true
    if (this.config.direction === 'row') {
      this.drag.start = ev.pageX
    } else {
      this.drag.start = ev.pageY
    }
  }

  mousemoveHandler(ev) {
    if (this.drag.pointerDown) {
      if (this.config.direction === 'row') {
        this.drag.move = ev.pageX - this.drag.start
        this.drag.start = ev.pageX
      } else {
        this.drag.move = ev.pageY - this.drag.start
        this.drag.start = ev.pageY
      }
      const utilSlide = HsliderB.utilSlide.bind(this)
      this.drag.canSlide && (requestAnimationFrame(utilSlide), (this.drag.canSlide = false))
    }
  }

  mouseupHandler(ev) {
    this.drag.pointerDown = false
  }

  mouseleaveHandler(ev) {
    this.drag.pointerDown = false
  }

  init() {
    this.buildFrame()
    this.goToSilder(this.currentIndex)
    HsliderB.addEvents.call(this)
    this.config.onInit()
  }

  buildFrame() {
    const sliderWrap = document.createElement('div')
    const childrenDoms = this.selector.childNodes
    this.detail.childrenDomsLen = childrenDoms.length
    const sliderWrapWorH =
      (this.selectorWorH / this.config.sliderPage) * this.detail.childrenDomsLen

    sliderWrap.classList.add('HsliderB-wrap')
    sliderWrap.style.cssText = `width: 100%;height: 100%;${
      this.config.direction === 'row'
        ? 'width: ' + (sliderWrapWorH + 'px')
        : 'height: ' + (sliderWrapWorH + 'px')
    };display: flex;flex-direction: ${this.config.direction};transform: translate3d(0px,0px,0px);`

    for (let i = 0, len = this.detail.childrenDomsLen, perWorH = 100 / len; i < len; i++) {
      const childrenDom = childrenDoms[i].cloneNode(true)
      childrenDom.style.cssText = `width: 100%;height: 100%;${
        this.config.direction === 'row' ? 'width: ' + (perWorH + '%') : 'height: ' + (perWorH + '%')
      };`
      sliderWrap.appendChild(childrenDom)
    }

    this.selector.innerHTML = ''
    this.selector.style.cssText = 'overflow: hidden;'
    this.selector.appendChild(sliderWrap)
    this.sliderWrap = sliderWrap
    this.detail.sliderWrapWorH = sliderWrapWorH
  }

  goToSilder(index, callback) {
    const translate3d = HsliderB.utilTranslate3d.call(this, index)
    if (!translate3d) {
      return null
    }
    this.sliderWrap.style.transition = `all ${this.config.duration}ms ${this.config.easing}`
    this.sliderWrap.style.transform = translate3d
    this.config.onChange()
    if (callback) {
      callback(this)
    }
  }
}

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
    this.detail = { sliderWrapWorH: null }

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
      loop: false,
      onInit: () => {},
      onChange: () => {}
    }

    const userOptions = options
    for (const attrname in userOptions) {
      settings[attrname] = userOptions[attrname]
    }

    return settings
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
    const offset = singleWorH * actionIndex
    if (offset < 0 || offset > this.detail.sliderWrapWorH - singleWorH * this.config.sliderPage) {
      return null
    }

    this.currentIndex = actionIndex
    const translate3d =
      this.config.direction === 'row'
        ? `translate3d(-${offset}px,0px,0px)`
        : `translate3d(0px,-${offset}px,0px)`
    return translate3d
  }

  init() {
    this.buildFrame()
    this.goToSilder(this.currentIndex)
  }

  buildFrame() {
    const sliderWrap = document.createElement('div')
    const childrenDoms = this.selector.childNodes
    const sliderWrapWorH = (this.selectorWorH / this.config.sliderPage) * childrenDoms.length

    sliderWrap.classList.add('HsliderB-wrap')
    sliderWrap.style.cssText = `width: 100%;height: 100%;${
      this.config.direction === 'row'
        ? 'width: ' + (sliderWrapWorH + 'px')
        : 'height: ' + (sliderWrapWorH + 'px')
    };display: flex;flex-direction: ${
      this.config.direction
    };transform: translate3d(0px,0px,0px);transition: all ${this.config.duration}ms ${
      this.config.easing
    }`

    for (let i = 0, len = childrenDoms.length, perWorH = 100 / len; i < len; i++) {
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
    this.sliderWrap.style.transform = translate3d
    console.log(this.currentIndex)
    if (callback) {
      callback.call(this, this)
    }
  }
}

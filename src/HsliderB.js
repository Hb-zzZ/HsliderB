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

    this.selectorWidth = this.selector.offsetWidth
    this.childrenDoms = this.selector.childNodes

    this.init()
  }
  static mergeUserConfig(options) {
    let settings = {
      selector: '.HsliderB',
      duration: 200,
      easing: 'ease-out',
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

  init() {
    this.buildFrame()
  }

  buildFrame() {
    const sliderWrap = document.createElement('div')
    const childrenDoms = this.childrenDoms
    const sliderPage = this.config.sliderPage
    const direction = this.config.direction
    const sliderWrapWidth =
      (this.selectorWidth / sliderPage) * childrenDoms.length

    sliderWrap.classList.add('HsliderB-wrap')
    sliderWrap.style.cssText = `width: ${sliderWrapWidth +
      'px'};display: flex;flex-direction: ${direction}`

    for (let i = 0, len = childrenDoms.length; i < len; i++) {
      const childrenDom = childrenDoms[i].cloneNode(true)
      childrenDom.style.cssText = `width: ${100 / len + '%'};`
      sliderWrap.appendChild(childrenDom)
    }

    this.selector.innerHTML = ''
    this.selector.style.cssText = 'overflow: hidden;'
    this.selector.appendChild(sliderWrap)
  }
}

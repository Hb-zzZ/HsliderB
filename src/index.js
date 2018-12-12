import HsliderB from './HsliderB.js'
import './test.scss'

let hsliderB = new HsliderB({
  duration: 500,
  startIndex: 2,
  direction: 'column',
  // direction: 'row',
  sliderPage: 1.6
})

document.querySelector('.prev').addEventListener('click', function() {
  hsliderB.goToSilder('prev')
})
document.querySelector('.next').addEventListener('click', function() {
  hsliderB.goToSilder('next', function(slider) {
    console.log(slider)
  })
})

let test_hsliderB = new HsliderB({
  selector: '.tset-HsliderB',
  duration: 500,
  startIndex: 2,
  // direction: 'column',
  direction: 'row',
  sliderPage: 2.6,
  responsives: [{ view: 800, sliderPage: 1.5 }, { view: 400, sliderPage: 1 }, { view: 1000, sliderPage: 2 }, { view: 1200, sliderPage: 2.4 }]
})

document.querySelector('.tset-prev').addEventListener('click', function() {
  test_hsliderB.goToSilder('prev')
})
document.querySelector('.tset-next').addEventListener('click', function() {
  test_hsliderB.goToSilder('next')
})

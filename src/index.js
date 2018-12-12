import HsliderB from './HsliderB.js'
import './test.scss'

let hsliderB = new HsliderB({
  duration: 500,
  startIndex: 2,
  direction: 'column',
  // direction: 'row',
  sliderPage: 1.5
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
  sliderPage: 1.5
})

document.querySelector('.tset-prev').addEventListener('click', function() {
  test_hsliderB.goToSilder('prev')
})
document.querySelector('.tset-next').addEventListener('click', function() {
  test_hsliderB.goToSilder('next')
})

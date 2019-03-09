/***** link positioning *****/

var links = $('.nav-text')

for (var link of links) {
  var position = link.className.replace(/nav-text /, '')
  $(link).css('transform-origin', position)

  var isTop = /top/.test(position)
  var isLeft = /left/.test(position)

  var rotation = `rotate(${isLeft ? '-' : ''}90deg)`

  var translation = `translate${
      isTop ? 'X' : 'Y'
    }(${
      isTop && isLeft ? '-' : ''
    }100%)`

  $(link).css('transform', `${rotation} ${translation}`)
}


/***** set up transitions *****/

for (var el of $('div[id^="detail"]')) {
  $(el).css('height', el.clientHeight)
}

var goHomeExcept = active => {
  for (link of $('[id^="link-home-"]')) {
    if (!link.id.includes(active)) $(link).click()
  }
}

var setActiveLink = active => {
  $('.active').removeClass('active')
  $('#link-' + active).addClass('active')
}

var setAsFullScreen = (active, prev) => {
  if (active) goHomeExcept(active)
  setActiveLink(active)

  if (active) {
    $('#main-text').addClass('d-none')
    $('#' + active).addClass('d-block')
  } else {
    $('#' + prev).removeClass('d-block')
    $('#main-text').removeClass('d-none')
  }
}

var setPaddingForScreenshots = () => {

  var screenshotHeight = $('.screenshots-scroll-container img').height()
  var paddingY = (window.innerHeight - screenshotHeight) / 2
  $('.screenshots-scroll-container').css('padding', `${paddingY}px 0 0`)

  var styles = `
  <style>
    .screenshots-scroll-container:after {
      height: ${paddingY}px;
    }
  </style>`
  
  $('head').append(styles)

}


/***** set up link handlers *****/

$('#link-contact').click(() => {
  goHomeExcept('contact')
  setActiveLink('contact')

//      $('#detail-home').css('overflow', null)
  $('#detail-home').addClass('hidden')

  setTimeout(() => {
    $('#detail-contact').removeClass('hidden')
    setTimeout(() => $('#detail-contact').css('overflow', 'visible'), 300)
  }, 300)
})

$('#link-home-from-contact').click(() => {
  setActiveLink(null)

  $('#detail-contact').css('overflow', '')
  $('#detail-contact').addClass('hidden')

  setTimeout(() => {
    $('#detail-home').removeClass('hidden')
//        setTimeout(() => $('#detail-home').css('overflow', 'visible'), 300)
  }, 300)
})

$('#link-code').click(() => setAsFullScreen('code'))
$('#link-home-from-code').click(() => setAsFullScreen(null, 'code'))

$('#link-screenshots').click(() => {
  setAsFullScreen('screenshots')
  setPaddingForScreenshots()
})
$('#link-home-from-screenshots').click(() => {
  setAsFullScreen(null, 'screenshots')
})


/***** final preparations *****/

var setPaddingForScreenshotsDebounced = _.debounce(setPaddingForScreenshots, 500)
window.addEventListener('resize', setPaddingForScreenshotsDebounced)

$('#detail-contact').addClass('hidden')
setTimeout(() => {
  $('.nav-wrapper').css('opacity', '1')
  $('.main-text-detail').css('opacity', '1')
}, 1000)
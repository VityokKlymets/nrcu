import "slick-carousel"
import "slick-carousel/slick/slick.css"
import "./assets/fonts.css"

window.$ = $
let audio = null
function onRadioClick() {
  const $icon = $(this).children(".radio-btn-icon")
  $icon.toggleClass("pause")
  if ($icon.hasClass("pause")) {
    if (!audio && window.AUDIO_URL) {
      audio = new Audio(window.AUDIO_URL)
    }
    if (audio) {
      audio.play()
    }
  } else {
    if (audio) {
      audio.pause()
    }
  }
}
const onWindowLoad = () => {
  $("#navToggle").on("click", function() {
    $(this).toggleClass("active")
    $(".top-nav-menu").toggleClass("open")
    // this line ▼ prevents content scroll-behind
    $("body").toggleClass("locked")
  })

  $(".radio-btn").on("click", onRadioClick)
  const mainSliderConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    appendArrows: ".slider .slide-arrows",
    appendDots: ".slider .slide-dots"
  }

  const speakersSliderConfig = {
    slidesToShow: 5,
    slidesToScroll: 3,
    dots: false,
    infinite: false,

    appendArrows: ".speakers .slide-arrows",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  }
  const channelsSliderConfig = {
    ...speakersSliderConfig,
    slidesToShow: 6,
    appendArrows: "#channelsSlider .slide-arrows",
    slidesToScroll: 1
  }

  $("#channelsSlider").slick(channelsSliderConfig)
  $("#speakersSlider").slick(speakersSliderConfig)
  $("#mainSlider").slick(mainSliderConfig)

  const radioSlider = $("#radioSlider")

  const radioSliderConfig = {
    ...speakersSliderConfig,
    slidesToShow: 5,
    slidesToScroll: 5,
    appendArrows: ".radio-slider .slide-arrows",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }

  radioSlider.on("init", function(e, slick) {
    const activeIndex = $(".radio-slider-item").index($(".radio-slider-item.active"))
    slick.slickGoTo(activeIndex)
  })

  radioSlider.slick(radioSliderConfig)
}

const copyRecentNewsChannelNameForMobileLayout = () => {
  const news = $(".recent-news-item")
  news.each((idx, el) => {
    const parent = $(el)
    const channelName = parent.find(".recent-news-channel-title").clone()
    const dateContainer = parent.find(".news-date")
    dateContainer.prepend(channelName)
  })
}
copyRecentNewsChannelNameForMobileLayout()

$(onWindowLoad)

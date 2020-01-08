import "slick-carousel"
import "slick-carousel/slick/slick.css"

window.$ = $

const onWindowLoad = () => {
  $("#navToggle").click(function() {
    $(this).toggleClass("active")
    $(".top-nav-menu").toggleClass("open")
    // this line ▼ prevents content scroll-behind
    $("body").toggleClass("locked")
  })

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
          slidesToShow: 1
        }
      }
    ]
  }
  const channelsSliderConfig = {
    ...speakersSliderConfig,
    slidesToShow: 6,
    appendArrows: "#channelsSlider .slide-arrows"
  }


  const radioSliderConfig = {
    ...speakersSliderConfig,
    slidesToShow: 5,
    slidesToScroll: 1,
    appendArrows: ".radio-slider .slide-arrows",
    initialSlide: $('.radio-slider-item').index($('.radio-slider-item.active'))
  }

  $("#channelsSlider").slick(channelsSliderConfig)
  $("#speakersSlider").slick(speakersSliderConfig)
  $("#mainSlider").slick(mainSliderConfig)
  $("#radioSlider").slick(radioSliderConfig)
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

import $ from "jquery";
import "slick-carousel";
import "slick-carousel/slick/slick.css";
import "./assets/fonts.css";
import "./custom.css";
import { IMediaList, IMediaItem } from "./components/store/types";
import store from "./components/store";
import { play, pause } from "./components/store/actions/playerActions";
import { IPlayerState } from "./components/store/reducers/playerReducer";
import { getPlayer } from "./components/store/selectors/playerSelectors";

const initSliders = () => {
  const mainSliderConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    appendArrows: ".slider .slide-arrows",
    appendDots: ".slider .slide-dots",
  };

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
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const channelsSliderConfig = {
    ...speakersSliderConfig,
    slidesToShow: 6,
    appendArrows: "#channelsSlider .slide-arrows",
    slidesToScroll: 1,
  };

  $("#channelsSlider").slick(channelsSliderConfig);
  $("#speakersSlider").slick(speakersSliderConfig);
  $("#mainSlider").slick(mainSliderConfig);

  const radioSlider = $("#radioSlider");
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
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  radioSlider.on("init", function (e, slick) {
    const activeIndex = $(".radio-slider-item").index(
      $(".radio-slider-item.active")
    );
    slick.slickGoTo(activeIndex);

    $("#radioSlider .radio-slider-item").on("click", function () {
      $("#radioSlider .radio-slider-item.active").removeClass("active");
      $(this).addClass("active");
    });
    
  });
  radioSlider.slick(radioSliderConfig);
};

const initElements = () => {
  $("#navToggle").on("click", function () {
    $(this).toggleClass("active");
    $(".top-nav-menu").toggleClass("open");
    // this line ▼ prevents content scroll-behind
    $("body").toggleClass("locked");
  });

  const copyRecentNewsChannelNameForMobileLayout = () => {
    const news = $(".recent-news-item");
    news.each((idx, el) => {
      const parent = $(el);
      const channelName = parent.find(".recent-news-channel-title").clone();
      const dateContainer = parent.find(".news-date");
      dateContainer.prepend(channelName);
    });
  };
  copyRecentNewsChannelNameForMobileLayout();
};

const buildList = (items: JQuery<HTMLElement>) => {
  const result: IMediaList = [];

  items.each((idx, item) => {
    const $item = $(item);

    const title = $item.data("media-title");
    const path = $item.data("media-path");
    const metadata = $item.data("media-metadata");
    const description = $item.data("media-description");
    const picture = $item.data("media-picture");

    const mediaItem: IMediaItem = {
      idx,
      title,
      path,
      metadata,
      picture,
      description,
      $element: $item,
    };

    result.push(mediaItem);
  });
  return result;
};

const initMedia = () => {
  const mediaContainers = $("*[data-media-container]");

  mediaContainers.each((idx, container) => {
    const mediaItems = $(container).find("*[data-media-item]");
    const list = buildList(mediaItems);

    list.forEach((mediaItem, listID) => {
      mediaItem.$element.on("click", (event) => {
        event.preventDefault();
        const state: IPlayerState = getPlayer(store.getState());
        if (state.play) {
          if ((state.current.idx === mediaItem.idx, state.listID === listID)) {
            store.dispatch(pause());
          } else {
            store.dispatch(play(mediaItem, list, listID));
          }
        } else {
          store.dispatch(play(mediaItem, list, listID));
        }
      });
    });
  });
};

export default () => {
  initSliders();
  initElements();
  initMedia();
};

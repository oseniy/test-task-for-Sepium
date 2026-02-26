const ProductSlider = (function () {
  'use strict';

  const swiperInstances = [];
  const isMobile = window.matchMedia('(max-width: 768px)');

  function initSliders() {
    const sliderEls = document.querySelectorAll('.product-card__slider .swiper');

    sliderEls.forEach(function (el) {
      const card = el.closest('.product-card');
      const paginationEl = card.querySelector('.product-card__pagination');
      const prevEl = card.querySelector('.product-card__nav-prev');
      const nextEl = card.querySelector('.product-card__nav-next');
      const totalSlides = el.querySelectorAll('.swiper-slide').length;

      const swiper = new Swiper(el, {
        loop: true,
        speed: 400,
        spaceBetween: 0,
        autoplay: isMobile.matches ? {
          delay: 3000,
          disableOnInteraction: false
        } : false,
        pagination: {
          el: paginationEl,
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '" style="width:' + (100 / totalSlides) + '%"></span>';
          }
        },
        navigation: {
          prevEl: prevEl,
          nextEl: nextEl
        },
        on: {
          init: function () {
            // Set pagination bar widths after init
            const bullets = paginationEl.querySelectorAll('.swiper-pagination-bullet');
            bullets.forEach(function (bullet) {
              bullet.style.width = (100 / totalSlides) + '%';
            });
          }
        }
      });

      swiperInstances.push(swiper);
    });

    // Listen for viewport changes to toggle autoplay
    isMobile.addEventListener('change', handleViewportChange);
  }

  function handleViewportChange(e) {
    swiperInstances.forEach(function (swiper) {
      if (e.matches) {
        swiper.params.autoplay = { delay: 3000, disableOnInteraction: false };
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    });
  }

  function getActiveSlideIndex(cardEl) {
    const swiperEl = cardEl.querySelector('.swiper');
    if (swiperEl && swiperEl.swiper) {
      return swiperEl.swiper.realIndex;
    }
    return 0;
  }

  return {
    init: initSliders,
    getActiveSlideIndex: getActiveSlideIndex
  };
})();

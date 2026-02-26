const ProductFancybox = (function () {
  'use strict';

  function init() {
    // Bind Fancybox to all gallery links
    if (typeof Fancybox !== 'undefined') {
      Fancybox.bind('[data-fancybox]', {
        animated: true,
        showClass: 'fancybox-fadeIn',
        hideClass: 'fancybox-fadeOut',
        Toolbar: {
          display: {
            left: [],
            middle: [],
            right: ['close']
          }
        },
        Images: {
          zoom: true
        }
      });
    }

    // Zoom button opens Fancybox starting at the current slide
    $(document).on('click', '.product-card__zoom', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const card = $(this).closest('.product-card');
      const activeIndex = ProductSlider.getActiveSlideIndex(card[0]);
      const galleryLinks = card.find('.product-card__gallery-link');

      if (galleryLinks.length === 0) return;

      // Build gallery items array
      const items = [];
      galleryLinks.each(function () {
        items.push({
          src: $(this).attr('href'),
          type: 'image'
        });
      });

      Fancybox.show(items, {
        startIndex: activeIndex,
        animated: true,
        Toolbar: {
          display: {
            left: [],
            middle: [],
            right: ['close']
          }
        }
      });
    });
  }

  return {
    init: init
  };
})();

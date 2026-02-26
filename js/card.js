const ProductCard = (function () {
  'use strict';

  function init() {
    bindModifications();
    bindLike();
    bindCardClick();
  }

  // Toggle active modification within a card
  function bindModifications() {
    $(document).on('click', '.product-card__modification', function (e) {
      e.stopPropagation();

      const $btn = $(this);
      const $container = $btn.closest('.product-card__modifications');

      // Remove active from siblings
      $container.find('.product-card__modification').removeClass('product-card__modification--active');
      // Remove check icons from siblings (they're hidden via CSS, but clean up)

      // Set active on clicked
      $btn.addClass('product-card__modification--active');
    });
  }

  // Toggle like (heart) button
  function bindLike() {
    $(document).on('click', '.product-card__like', function (e) {
      e.stopPropagation();

      const $btn = $(this);
      const $count = $btn.find('.product-card__like-count');
      const count = parseInt($count.text(), 10) || 0;
      const isActive = $btn.hasClass('product-card__like--active');

      if (isActive) {
        $btn.removeClass('product-card__like--active');
        $count.text(Math.max(0, count - 1));
      } else {
        $btn.addClass('product-card__like--active');
        $count.text(count + 1);
      }

      // Trigger pop animation
      $btn.addClass('product-card__like--animating');
      setTimeout(function () {
        $btn.removeClass('product-card__like--animating');
      }, 300);
    });
  }

  // Click on card navigates to product (except interactive elements)
  function bindCardClick() {
    $(document).on('click', '.product-card', function (e) {
      const $target = $(e.target);

      // Don't navigate if clicking on interactive elements
      if (
        $target.closest('.product-card__modification').length ||
        $target.closest('.product-card__like').length ||
        $target.closest('.product-card__order-btn').length ||
        $target.closest('.product-card__zoom').length ||
        $target.closest('.product-card__calc-link').length ||
        $target.closest('.product-card__nav').length ||
        $target.closest('.swiper-pagination').length
      ) {
        return;
      }

      const cardId = $(this).data('card-id');
      // Navigate to product page
      window.location.href = '/card?id=' + cardId;
    });
  }

  return {
    init: init
  };
})();

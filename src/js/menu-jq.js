(function() {
  $('.main-navigation__menu-item--has-child').on('click', function(event) {
    event.preventDefault();

    var thisSubmenu = $(this).find('.sub-menu');
    if (thisSubmenu.is(':visible')) {
      thisSubmenu.slideUp('fast');
    } else {
      $('.sub-menu:visible').slideUp('fast');
      thisSubmenu.slideDown('fast');
    }

    event.stopPropagation();
  });

  $(document).on('click', function(event) {
    $('.sub-menu:visible').slideUp('fast');
  })
})();
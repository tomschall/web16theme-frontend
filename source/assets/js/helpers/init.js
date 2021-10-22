/**
 * Init widgets modules on specified events
 *
 * @license APLv2
 */

(function($, undefined) {
  'use strict';

  function pageReload() {
    window.RT = setTimeout(function() {
      $('body').append(
        '<div id="overlay"><div id="fhnw-spinner"></div></div>'
        );
        $('#fhnw-spinner').spinner({
          radius: 30,
          strokeWidth: 6,
          color: '#fff',
        });
        this.location.reload(false);
      }, 2000);
  }

  // TABLET DEVICES -> CHANGE ORIENTATION (PORTRAIT/LANDSCAPE)
  var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  window.addEventListener('orientationchange', function() {
    if (iOS === true) {
      pageReload();
    }
  });

  // WINDOW RELOAD ON RESIZE - CONDITIONAL BASED ON COMPONENTS
  var hasMap = $('#locations').length;
  var hasTeaser = $('.widg_teaser__wrapper').length;
  var dwidth = jQuery(window).width();
  var hasEasyForm = $('.easyform-thankspage').length;
  console.log('hasEasyForm', hasEasyForm);

  $(window).bind('resize', function() {
    var isToMediumSize = window.estatico.mq.query({to: 'medium'});
    console.log('isToMediumSize', isToMediumSize);
    var wwidth = jQuery(window).width();

    if (dwidth !== wwidth && hasMap === 1 &&
      isToMediumSize === true ||
      hasTeaser >= 1 && isToMediumSize === true ||
      hasEasyForm === 0
    ) {
        dwidth = jQuery(window).width();
        if (window.RT) {
          clearTimeout(window.RT);
        }
        pageReload();
      }
  });


  var $document = $(document),
    initEvents = estatico.helpers.initEvents || {},
    keys = Object.keys(initEvents);

  if (keys.length === 0) {
    return;
  }

  // avoid initialization if running in test mode
  if (window.__PREVENT_INITIALIZATION__) {
    return;
  }

  $document.on(keys.join(' '), function(event) {
    var initPlugins = initEvents[event.type];

    $('[data-init]').each(function() {
      var $this = $(this),
        plugins = $this.data('init').split(' '),
        i = 0;

      for (i = 0; i < plugins.length; i++) {
        if (initPlugins.indexOf(plugins[i]) !== -1) {
          $.fn[plugins[i]].apply($this);
        }
      }
    });
  });

  /* Removing empty p-Tags */
  $('p:empty').remove();

  /* Call To Action */
  $('.widg_calltoaction .ch-info-back a').hover(function() {
    $('.ch-info-back .widg_teaser__arrow').css({
      'padding-left': 20,
    });
  });

  $('.widg_calltoaction .ch-info-back a').mouseout(function() {
    $('.ch-info-back .widg_teaser__arrow').css({
      'padding-left': 0,
    });
  });

  $(document).ready(function() {
    $('.noborder').each(function() {
      $(this).parent().parent().parent().addClass('error');
    });

    if ($('#form').length) {
      $('html, body').animate(
        {
          scrollTop: $('.error:visible:first').offset.top,
        },
        1000
      );
    }

    // var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    // if (isMobile === null) {
    //   if ($('.widg_location_slider').length) {
    //     var resizeTimer;
    //     $(window).on('resize', function() {
    //       var windowSize = $(window).width();
    //       if (windowSize <= 1022) {
    //         clearTimeout(resizeTimer);
    //         resizeTimer = setTimeout(function() {
    //           $('.widg_location_slider').append(
    //             '<div id="overlay"><div id="fhnw-spinner"></div></div>'
    //           );
    //           $('#fhnw-spinner').spinner({
    //             radius: 30,
    //             strokeWidth: 6,
    //             color: '#fff',
    //           });
    //           this.location.reload(false); /* false to get page from cache */
    //         }, 1000);
    //       }
    //     });
    //   }
    // }
  });

  // INITIALIZATION PROTIP
  $.protip();

  var el = $('.protip');
  el.protipSet({
    scheme: 'black',
    position: 'bottom',
    skin: 'default',
    arrow: true,
    size: 'small',
    width: '300'
  });

  $(window).resize(function() {
    if ($(window).width() <= 768) {
      if ($('.widg_full_bleed_teaser').length) {
        $('.full_bleed__widg_teaser img').css('display', 'block');
      }
    }

    if ($(window).width() >= 769) {
      if ($('.widg_full_bleed_teaser').length) {
        $('.full_bleed__widg_teaser img').css('display', 'none');
      }
    }
  });


})(jQuery);



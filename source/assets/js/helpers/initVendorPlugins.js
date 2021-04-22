/**
 Initializes the vendor plugins

 **/

 ;(function($, undefined) {
	'use strict';

	$(window).on('resize', function() {
		if ($(window).width() > 1022) {
			$('.widg_teaser__img img').imageScale({
				rescaleOnResize: true,
				scale: 'best-fill',
				align: 'center'
			});
		}
	});

	$(document).ready(function() {
		// The Jquery Spinner, has to be implemented when element is added later than document.ready
		$('.fhnw-spinner').spinner({
			radius: 30,
			strokeWidth: 6,
			color: '#999999'
		});

		if ($(window).width() > 1022) {
			$('.widg_teaser__img img').imageScale({
				rescaleOnResize: true,
				scale: 'best-fill',
				align: 'center'
			});
		}

		function initScale(el) {
			if ($(el).data('imageScale')) {
				return;
			}
			var maxHeight = Math.min((el.naturalHeight || el.height), 526);
			$(el).parent()
				.css('height', maxHeight + 'px')
				.addClass('is-loaded');
			$(el).imageScale({
				rescaleOnResize: true,
				scale: 'best-fill',
				align: 'center'
			});
		}

		if ($(window).width() > 100000) {
			$('.widg_full_bleed_teaser img').load(function() {
				initScale(this);
			}).each(function() {
				if (this.complete) {
					// already loaded before the load event got registered
					initScale(this);
				}
			});
		}

		if ($(window).width() > 1022) {
			$('.widg_teaser__img img').imageScale({
				rescaleOnResize: true,
				scale: 'best-fill',
				align: 'center'
			});
		}

		if (window.estatico.mq.query({from: 'subnav'})) {
			$('.search__form-wrapper').scrollToFixed();
		}
	});

	$(window).load(function() {
    if ($(window).width() > 1022) {
			$('.custom-scrollbar, .widg_navigation__sub-wrapper, .widg_header').mCustomScrollbar({
        theme: 'fhnw'
      });
		} else {
      $('.custom-scrollbar, .widg_navigation__sub-wrapper').mCustomScrollbar({
        theme: 'fhnw'
      });
    }

    $.fn.hasScrollBar = function() {
      return this.height() < $('#mCSB_1_container')[0].scrollHeight;
    };

    var checkIfScrollable = function() {
      if ($('#mCSB_1_scrollbar_vertical').hasScrollBar()) {
        $('#mCSB_1_container').css('height', 'unset');
      } else {
        $('#mCSB_1_container').css('height', '100%');
      }
    };

    checkIfScrollable();

    $(window).on('resize', function() {
      checkIfScrollable();
    });
	});
})(jQuery);

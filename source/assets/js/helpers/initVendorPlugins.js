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
      if ($('#mCSB_1_container')[0] !== undefined) {
        return this.height() < $('#mCSB_1_container')[0].scrollHeight;
      }
      return false;
    };

    var checkIfScrollable = function() {
      if ($('.widg_header #mCSB_1_scrollbar_vertical').hasScrollBar()) {
        $('.widg_header #mCSB_1_container').css('height', 'unset');
      } else {
        $('.widg_header #mCSB_1_container').css('height', '100%');
      }
    };

    checkIfScrollable();
		/*
		// WINDOW RELOAD ON RESIZE WINDOW
		var dwidth = jQuery(window).width();
		$(window).bind('resize', function() {
			var wwidth = jQuery(window).width();
			if (dwidth !== wwidth) {
				dwidth = jQuery(window).width();
				if (window.RT) {
					clearTimeout(window.RT);
				}
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
		});*/
	});
})(jQuery);

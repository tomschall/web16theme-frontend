/*!
 * Image Gallery
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'image_gallery',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				slider: '[data-' + name + '="slider"]',
				thumbnails: '[data-' + name + '="thumbs"]',
				legend: '[data-' + name + '="legend"]'
			},

			stateClasses: {
				// isActive: 'is_active'
			}
		},
		data = {
			// items: ["Item 1", "Item 2"]
		};

	/**
	 * Create an instance of the widget
	 * @constructor
	 * @param {object} element - The DOM element to bind the widget
	 * @param {object} options - Options overwriting the defaults
	 */
	function Widget(element, options) {
		this._helper = estatico.helpers.SuperClass;

		this._helper({
			name: name,
			element: element,
			defaults: defaults,
			options: options,
			events: events,
			data: data
		});
	}

	Widget.prototype = $.extend(true, {}, estatico.helpers.SuperClass.prototype, Widget.prototype);

	/**
	 * Initialize Widget, bind events.
	 * @method
	 * @public
	 */
	Widget.prototype.init = function() {
		var galleryDefaults = {
			arrows: false,
			adaptiveHeight: true,
			infinite: true,
			dots: false,
			accessibility: false,
			mobileFirst: true,
			dotsClass: 'image_gallery__dots not-default',
			nextArrow: '<button type="button" class="not-default image_gallery__arrow image_gallery__next">Next</button>',
			prevArrow: '<button type="button" class="not-default image_gallery__arrow image_gallery__prev">Previous</button>',
			autoplay: false,
			responsive: [{
				breakpoint: 0,
				settings: {
					arrows: true
				}
			}],
			slidesToShow: 1, //countThumbs() - 1, // must always be one digit below
			slidesToScroll: 1, //countThumbs(),
			centerMode: false,
			focusOnSelect: true,
			centerPadding: '0px',
			swipeToSlide: true
		};

		// function countThumbs(thumbs) {
		// 	var setSlideToShow = 0;
		// 	var totalImages = thumbs.size();
		// 	console.log(totalImages);
		//
		// 	if (totalImages <= 5) {
		// 		setSlideToShow = totalImages;
		// 	} else {
		// 		setSlideToShow = 5 + 1;
		// 	}
		//
		// 	return setSlideToShow;
		// }


		$(this.options.domSelectors.slider).map(function(index) {
			if ($(this).next('*[data-image_gallery="legend"]').length) {
				$(this).addClass('remote_' + index);
				var galleryOptions = _.assign(galleryDefaults, { asNavFor: '.remote_' + index });
				$('.remote_' + index).not('.slick-initialized').slick(galleryOptions);

				// legend options
				$(this).next().addClass('remote_' + index);
				var setLegendOptions = _.pick(galleryDefaults, ['adaptiveHeight']);
				var galleryLegendOptions = _.assign(setLegendOptions, { asNavFor: '.remote_' + index }, { arrows: false });
				$(this).next().not('.slick-initialized').slick(galleryLegendOptions);


			} else {
				// Default gallery without legends and thumbnails
				$(this).addClass('remote_' + index);
				var setGalleryOptions = _.pick(galleryDefaults, ['adaptiveHeight','infinite', 'dots', 'arrows', 'accessibility', 'mobileFirst', 'dotsClass', 'nextArrow', 'prevArrow', 'autoplay', 'responsive']);
				$('.remote_' + index).not('.slick-initialized').slick(setGalleryOptions);
			}

			if ($(this).nextAll('.image_gallery__thumbs').length) {
				var thumbs = $('.remote_' + index + ' img').size();
				$(this).nextAll('.image_gallery__thumbs').addClass('remote_' + index);
				var totalImages = 0;
				if (thumbs <= 5) {
					totalImages = thumbs;
				} else {
					totalImages = 5 + 1;
				}
				var setThumbsOptions = _.pick(galleryDefaults, ['centerPadding', 'focusOnSelect', 'centerMode', 'arrows', 'swipeToSlide', 'adaptiveHeight','infinite', 'dots', 'accessibility', 'dotsClass', 'nextArrow', 'prevArrow', 'autoplay', 'responsive']);
			 	var galleryThumbsOptions = _.assign(setThumbsOptions, { asNavFor: '.remote_' + index}, { slidesToScroll: totalImages }, {slidesToShow: totalImages - 1 }, { arrows: false });
			 	$('.remote_' + index).not('.slick-initialized').slick(galleryThumbsOptions);
			}
		});
	};

	/**
	 * Unbind events, remove data, custom teardown
	 * @method
	 * @public
	 */
	Widget.prototype.destroy = function() {
		// Unbind events, remove data
		estatico.helpers.SuperClass.prototype.destroy.apply(this);

		// Custom teardown (removing added DOM elements etc.)
		// If there is no need for a custom teardown, this method can be removed
	};

	// Make the plugin available through jQuery (and the global project namespace)
	estatico.helpers.SuperClass.register(Widget, name, {
		initEvents: ['ready', 'ajaxload'],
		events: events
	});

})(jQuery);

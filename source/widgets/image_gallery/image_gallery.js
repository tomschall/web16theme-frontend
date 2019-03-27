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
				gallery: '[data-init="image_gallery"]',
				slider: '[data-' + name + '="slider"]',
				thumbnails: '[data-' + name + '="thumbs"]',
				legend: '[data-' + name + '="legend"]'
			},

			stateClasses: {
				remote: 'remote_'
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

		// Initialize selectors
		var legendSelector = this.options.domSelectors.legend;
		var thumbnailSelector = this.options.domSelectors.thumbnails;
		var remoteSelector = this.options.stateClasses.remote;

		$(this.options.domSelectors.slider).map(function(index) {
			// Options for gallery with legends
			if ($(this).next(legendSelector).length) {
				$(this).addClass(remoteSelector + index);
				var galleryOptions = _.assign(galleryDefaults, { asNavFor: '.' + remoteSelector + index });
				$('.' + remoteSelector + index).not('.slick-initialized').slick(galleryOptions);

				// Set legend gallery options
				$(this).next().addClass(remoteSelector + index);
				var setLegendOptions = _.pick(galleryDefaults, ['adaptiveHeight']);
					setLegendOptions = _.assign(setLegendOptions, { asNavFor: '.' + remoteSelector + index }, { arrows: false });
				$(this).next().not('.slick-initialized').slick(setLegendOptions);

			} else {
				// Default gallery without legends and thumbnails
				$(this).addClass(remoteSelector + index);
				var setGalleryOptions = _.pick(galleryDefaults, ['adaptiveHeight','infinite', 'dots', 'arrows', 'accessibility', 'mobileFirst', 'dotsClass', 'nextArrow', 'prevArrow', 'autoplay', 'responsive']);

				if ($(this).nextAll(thumbnailSelector).length) {
					// Set default gallery with thumbnails only
					var setThumbnailOptions = _.pick(galleryDefaults);
						setThumbnailOptions = _.assign(setGalleryOptions, { asNavFor: '.' + remoteSelector + index});
					$('.' + remoteSelector + index).not('.slick-initialized').slick(setThumbnailOptions);
				} else {
					// Set default gallery without legends and thumbnails
					setGalleryOptions = _.assign(galleryDefaults);
					$('.' + remoteSelector + index).not('.slick-initialized').slick(galleryDefaults);
				}
			}

			if ($(this).nextAll(thumbnailSelector).length) {
				// Set gallery thumbnail options; Calculate exception for thumbnails less than 5 images.
				$(this).nextAll(thumbnailSelector).addClass(remoteSelector + index);
				var thumbs = $('.image_gallery__thumbs.remote_' + index + ' img').size();
				var totalImages = Widget.prototype.countThumbs(thumbs);
				var setThumbsOptions = _.pick(galleryDefaults, ['centerPadding', 'focusOnSelect', 'centerMode', 'arrows', 'swipeToSlide', 'adaptiveHeight','infinite', 'dots', 'accessibility', 'dotsClass', 'nextArrow', 'prevArrow', 'autoplay', 'responsive']);
			 		setThumbsOptions = _.assign(setThumbsOptions, { asNavFor: '.' + remoteSelector + index}, { slidesToScroll: totalImages }, {slidesToShow: totalImages - 1 }, { arrows: false });
			 	$('.' + remoteSelector + index).not('.slick-initialized').slick(setThumbsOptions);
			}

			var maxSlickImages = $('.remote_' + index + ' .image_gallery__slide[aria-hidden="true"]').not('.slick-cloned').length + 1;
			var currentSlickIndex = $('.remote_' + index + ' .image_gallery__slide.slick-slide.slick-current.slick-active').attr('data-slick-index');
			console.log(maxSlickImages + ' / ' + currentSlickIndex);
		});

	};

	Widget.prototype.countThumbs = function(thumbs) {
		var totalImages = 0;
		if (thumbs <= 5) { totalImages = thumbs; } else { totalImages = 5 + 1; }
		return totalImages;
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

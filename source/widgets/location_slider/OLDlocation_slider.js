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

	var name = 'location_slider',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				slider: '[data-' + name + '="slider"]',
				map: '[data-' + name + '="map"]',
				staticMap: '[data-' + name + '="static-map"]',
				bar: '[data-' + name + '="bar"]',
				navOption: '[data-' + name + '="nav-option"]',
				navList: '[data-' + name + '="nav-list"]',
				markerData: '[data-' + name + '="markerData"]',
			},
			stateClasses: {
				isActive: 'is_active'
			},
			mapStyles: {
				street: 'http://147.86.1.60/res/style-cdn.json',
				D3map: 'http://147.86.1.60/res/style-cdn_osm-liberty.json'
			},
			markerIconProps: {},
			mapProps: {
				zoom: 10,
				container: 'mapbox__map',
				center: [8.211363, 47.481721], // Default Campus
				style: 'http://147.86.1.60/res/style-cdn_osm-liberty.json',
				pitch: 0,
				bearing: 0
			},
		},
		data = {
			maps: [],
			navOptions: [],
			markers: []
		},
		isOneMapOnly = false;



	/**
	* Mobile Viewport settings
	*/
	function isMobileView() {
		return (screen.availWidth ? screen.availWidth : document.documentElement.clientWidth) <= 1023;
	}

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
		 data.navOptions = $(this.options.domSelectors.navOption).toArray();

		 if (!data.navOptions.length) {
			 // Terminate initialization if there are no location data
			 return;
		 }

		 this.options.renderMobileView = isMobileView();
		 // keep track of all map instances
		 this.maps = [];

		 if (this.$element.hasClass('all-locations')) {
			isOneMapOnly = true;
		 }

		 this.renderMaps(this.options.renderMobileView);
		 this.initSlick();

		 //this.resize = _.debounce(this._resize, 50).bind(this);
         //$(window).on('resize', this.resize);
	 };

	// Widget.prototype._resize = function() {
	// 	if (this.options.renderMobileView && !isMobileView()) {
	// 		this.options.renderMobileView = false;
	// 		this.renderMaps(this.options.renderMobileView);
	// 	}
	//
	// 	this.maps.forEach(function(map) {
	// 		google.maps.event.trigger(map, 'resize');
	// 	});
	// };

	Widget.prototype.renderMaps = function(mobileView) {
		if (this.$element.hasClass('all-locations')) {
			isOneMapOnly = true;
		}
		if (!isOneMapOnly) {
			if (!mobileView) {
				// not a mobile resolution - render interactive map as well
				this.initMaps();
			}
			// this.initMapsStatic();
			this.initSlickNav();
		} else {
			if (!mobileView) {
				// not a mobile resolution - render interactive map as well
				this.initMaps();
			}
			this.initMaps();
		}
	};

	/**
	 * Initialize the slick slider
	 */
	Widget.prototype.initSlick = function() {
		this.$element.find(this.options.domSelectors.slider).on('init', function() {
			this._setNavActive(0);
		}.bind(this));

		this.$element.find(this.options.domSelectors.slider).slick({
			arrows: false,
			draggable: false,
			fade: true,
			infinite: false
		});
	};

	/**
	 * initializing the maps
	 * data-slick-index="0"
	 */
	Widget.prototype.initMaps = function() {
		this.$element.find(this.options.domSelectors.map).map(function(index, element) {
			var $mapElement = $(element),
				mapProp = _.assign(this.options.mapProps, {
					style: this.options.mapStyles.street,
					zoom: $mapElement.attr('data-zoomlevel'),
					center: [$(element).attr('data-coordinates-x'), $(element).attr('data-coordinates-y')],
					container: this.options.mapProps.container.split('-')[0] + '-' + index
				}), map = new window.mapboxgl.Map(mapProp);

				// Adding map controls
				Widget.prototype._addControls(map);

				this.maps.push(map);
				data.maps.push(map);

				Widget.prototype._addMarker(element, map);

		}.bind(this));
	};

	Widget.prototype._addMarkers = function() {
		$(".location__marker-temp").each(function(map) {
			var el = document.createElement('div');
			el.className = 'mapboxgl-marker';

			console.log($(this).attr('data-coordinates-x'));

			// Adjusting marker position
			new window.mapboxgl.Marker(el, {offset: [-29, -35]})
			.setLngLat([$(this).attr('data-coordinates-x'), $(this).attr('data-coordinates-y')])
			.addTo(map);
		});
	};

	/**
	* Add marker
	* CSS marker configuration -> see location_slider.scss
	* CSS marker class: mapboxgl-marker
	*/
	Widget.prototype._addMarker = function(element, map) {
		var el = document.createElement('div');
		el.className = 'mapboxgl-marker';

		// Adjusting marker position
		new window.mapboxgl.Marker(el, {offset: [-29, -35]})
		.setLngLat([$(element).attr('data-coordinates-x'), $(element).attr('data-coordinates-y')])
		.addTo(map);
	};

	/**
	 * Add map controls
	 * Zoom, Fullscreen, Rotate
	 */
	Widget.prototype._addControls = function(map) {
		map.addControl(new window.mapboxgl.NavigationControl(), 'bottom-right');
		map.addControl(new window.mapboxgl.FullscreenControl());
	};


	/**
	 * initializing the nav to controll slick
	 */
	Widget.prototype.initSlickNav = function() {
		$(this.options.domSelectors.navOption).map(function(index, element) {
			var $navOption = $(element);

			$navOption.on('click.' + this.uuid, function() {
				this._goTo(index);
			}.bind(this));
		}.bind(this));
	};

	/**
	 * Go to slide
	 * @param index
	 * @private
	 */
	Widget.prototype._goTo = function(index) {
		this._setNavActive(index);

		this._setSlideActive(index);
	};

	/**
	 * Setting the nav item active according to the index
	 * @param index
	 * @private
	 */
	Widget.prototype._setNavActive = function(index) {
		var $navOption = $(data.navOptions[index]);

		this.$element.find(this.options.domSelectors.navOption).removeClass(this.options.stateClasses.isActive);
		$navOption.addClass(this.options.stateClasses.isActive);

		this._moveNavBar($navOption);
	};

	/**
	 * Moving the nav bar to the nav options position and giving their width
	 * @param $navOption
	 * @private
	 */
	Widget.prototype._moveNavBar = function($navOption) {
		var $bar = this.$element.find(this.options.domSelectors.bar),
				offsetLeft = $navOption.offset().left - this.$element.find(this.options.domSelectors.navList).offset().left;

		$bar.css({
			left: offsetLeft,
			width: $navOption.width()
		});
	};

	Widget.prototype._setSlideActive = function(index) {
		this.$element.find(this.options.domSelectors.slider).slick('slickGoTo', index);
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

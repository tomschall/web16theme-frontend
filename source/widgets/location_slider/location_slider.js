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
			mapOptionsDefaults: {
				zoom: 10,
				container: 'mapbox__map',
				center: [8.211363, 47.481721], // Default Campus
				style: 'http://147.86.1.60/res/style-cdn_osm-liberty.json',
				pitch: 30,
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
	};

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
			//this.initSlickNav();
		} else {
			if (isOneMapOnly) {
				// not a mobile resolution - render interactive map as well
				this.initOneMap();
			}
		}
	};

	/**
	 * initializing the maps
	 * data-slick-index="0"
	 */
	Widget.prototype.initOneMap = function() {
		this.$element.find(this.options.domSelectors.map).map(function(index, element) {
			var $mapElement = $(element),
					mapProp = _.assign(this.options.mapProps, {
							style: this.options.mapStyles.D3map,
							zoom: $mapElement.attr('data-zoomlevel'),
							center: [7.5, 47.5],
							container: this.options.mapOptionsDefaults.container + '-' + index, // DIV to placing map
							pitch: this.options.mapOptionsDefaults.pitch,
							bearing: this.options.mapOptionsDefaults.bearing
					}),
					map = new window.mapboxgl.Map(mapProp);
					console.log('ONE MAP RENDERED');

					// Add map controls
					this._addControls(map);

					// Add all markers
					this.addMarker(map);
					this.maps.push(map);
					data.maps.push(map);

		}.bind(this));
	};

	Widget.prototype.addMarker = function(map) {
		// Hide all location__info
		this.$element.find('.location__info').map(function(index, element) {
			console.log('location info -> ' + element.id);
			$(element).hide();
		});

		// Find coordinates of each location
		this.$element.find(this.options.domSelectors.markerData).map(function(index, element) {
			var Xcoordinates = $(element).attr('data-coordinates-x');
			var Ycoordinates = $(element).attr('data-coordinates-y');

			var marker = document.createElement('div');
			marker.className = 'mapboxgl-marker';
			$(marker).animate({ opacity: 0.3 });

			// Add markers to map; adjusting marker position and put marker to map
			new window.mapboxgl.Marker(marker, {offset: [-29, -35]})
			.setLngLat([Xcoordinates, Ycoordinates])
			.addTo(map);

			$(element).on('click', function() {
				$('.mapboxgl-marker').animate({ opacity: 0.3 });
				$('.location__info').fadeOut(1000);
			});

			marker.addEventListener('click', function() {
				$('.mapboxgl-marker').animate({ opacity: 0.3 });
				$('.location__info').fadeOut(1000);

					$(this).animate({ opacity: 0.9 });
					$('#' + element.id).fadeIn(1000);
					map.flyTo({
						center: [Xcoordinates, Ycoordinates],
						zoom: 14,
						bearing: 0,
						pitch: 45
					});
			});
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

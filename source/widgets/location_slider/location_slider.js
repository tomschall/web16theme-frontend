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
				street: 'https://147.86.1.60/res/style-cdn.json',
				D3map: 'https://147.86.1.60/res/style-cdn_osm-liberty.json'
			},
			markerIconProps: {},
			mapOptionsDefaults: {
				zoom: 10,
				container: 'mapbox__map-0',
				center: [8, 47.5], // Default Campus
				style: 'https://147.86.1.60/res/style-cdn_osm-liberty.json',
				pitch: 30,
				bearing: 0,
				offset: [0, 0]
			},
		},
		data = {
			maps: [],
			navOptions: [],
			markers: []
		};
		//isOneMapOnly = false;

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
		this.hideLocationInfos = $(this.options.domSelectors.markerData).hide();
		this.totalLocations = $(this.options.domSelectors.markerData).length;
		this.renderMap();
	};
	
	Widget.prototype.renderMap = function() {
		this.options.renderMobileView = isMobileView();
		this.getCoordinates();

		if (this.options.renderMobileView && this.totalLocations === 1) {
			var Xcoordinates = $(this.options.domSelectors.markerData).attr('data-coordinates-x');
			var Ycoordinates = $(this.options.domSelectors.markerData).attr('data-coordinates-y');
			console.log('X ' + Xcoordinates);

			this.map = new window.mapboxgl.Map({
				zoom: 16,
				container: 'mapbox__map-0',
				center: [Xcoordinates, Ycoordinates],
				style: 'https://147.86.1.60/res/style-cdn_osm-liberty.json',
				pitch: 30,
				bearing: 0,
				offset: [0, 0]
			});
		} else if (this.totalLocations === 1) {
			var _Xcoordinates = $(this.options.domSelectors.markerData).attr('data-coordinates-x');
			var _Ycoordinates = $(this.options.domSelectors.markerData).attr('data-coordinates-y');
			console.log('X ' + _Xcoordinates);

			this.map = new window.mapboxgl.Map({
				zoom: 16,
				container: 'mapbox__map-0',
				center: [_Xcoordinates, _Ycoordinates],
				style: 'https://147.86.1.60/res/style-cdn_osm-liberty.json',
				pitch: 30,
				bearing: 0,
				offset: [0, 0]
			});
		} else {
			this.map = new window.mapboxgl.Map(this.options.mapOptionsDefaults);
		}
		this.navState();
		this.addControls();
		this.addMarker(this.map);
		this.tabNavigation();
		this.setOneLocation();
	};

	Widget.prototype.navState = function() {
		console.log('is mobile? ' + this.options.renderMobileView);

		if (($('.widg_location__nav.nav__state').length)) {
			console.log('navigation should be visibile');
		} else {
			$('.widg_location__nav').hide();
			this.$element.find(this.options.domSelectors.map).css('margin-top', '50px');
		}

		if (this.options.renderMobileView === true) {
			this.options.mapMarkerOffset = '[0, 0]';
			console.log(this.options.mapMarkerOffset);
			$('.widg_location__nav').show();
			this.$element.find(this.options.domSelectors.map).css('margin-top', '0');
		} else {
			this.options.mapMarkerOffset = '[300, 0]';
			console.log(this.options.mapMarkerOffset);
		}
	};

	Widget.prototype.setOneLocation = function() {
		if (this.totalLocations === 1) {
			$(this.options.domSelectors.markerData).show();
			$('.widg_location__nav').find('button').addClass(this.options.stateClasses.isActive);
			$('.mapboxgl-marker').animate({ opacity: 0.9 });
		};
	};

	Widget.prototype.getCoordinates = function() {
		this.$element.find(this.options.domSelectors.markerData).map(function(index, element) {
			this.Xcoordinates = $(element).attr('data-coordinates-x');
			this.Ycoordinates = $(element).attr('data-coordinates-y');
		});
	};

	/**
	 * Find locations an render marker to map
	*/
	Widget.prototype.addMarker = function(map) {
		this.$element.find(this.options.domSelectors.markerData).map(function(index, element) {
			var Xcoordinates = this.Xcoordinates;
			var Ycoordinates = this.Ycoordinates;
			var marker = document.createElement('div');
			marker.className = 'mapboxgl-marker';
			marker.id = 'marker-' + index;
			new window.mapboxgl.Marker(marker, {offset: [-29, -35]})
			.setLngLat([Xcoordinates, Ycoordinates])
			.addTo(map);
			if (this.totalLocations === 1) {  
				this.setOneLocation();
			};

			marker.addEventListener('click', function() {
				var currentMarker = this.id;	
				$('.mapboxgl-marker').animate({ opacity: 0.3 });
				$('.location__info').fadeOut(1000);
				$('nav button#' + index).addClass('is_active');

				map.flyTo({
					center: [Xcoordinates, Ycoordinates],
					zoom: 9,
					bearing: 0,
					pitch: 0
				});
				Widget.prototype.flyToLocation(currentMarker, element, map, Xcoordinates, Ycoordinates);
			});
		});
	};

	Widget.prototype.flyToLocation = function(currentMarker, element, map, Xcoordinates, Ycoordinates) {
		$('.location__info').fadeOut(1000);
		if ($('#' + element.id).is(':hidden')) {
			$('#' + element.id).fadeIn(1000);
			$('#' + currentMarker).animate({ opacity: 0.9 });

			map.flyTo({
				center: [Xcoordinates, Ycoordinates],
				zoom: 16,
				bearing: 45,
				pitch: 45,
				offset: [0, 0]
			});
		} else {
			$('.widg_location__nav button').removeClass('is_active');
		}
	};

	Widget.prototype.tabNavigation = function() {
		$('.widg_location__nav button').on('click', function() {
			$('.widg_location__nav button').removeClass('is_active');
			var currentMarkerId = this.id;
			var currentMarker = '#marker-' + currentMarkerId;
			$(this).toggleClass('is_active');
			console.log('Total nav buttons index ->' + currentMarker);
			$(currentMarker).trigger('click');
		});
	};

	/**
	 * Add map controls
	 * Zoom, Fullscreen, Rotate
	 */
	Widget.prototype.addControls = function() {
		this.map.addControl(new window.mapboxgl.NavigationControl(), 'bottom-right');
		this.map.addControl(new window.mapboxgl.FullscreenControl(), 'bottom-right');
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

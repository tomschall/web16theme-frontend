/*!
 * Location Slider
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
					bar: '[data-' + name + '="bar"]',
					navOption: '[data-' + name + '="nav-option"]',
					navList: '[data-' + name + '="nav-list"]',
					markerData: '[data-' + name + '="markerData"]'
				},
				stateClasses: {
					isActive: 'is_active'
				},
				mapProps: {
					zoom: 16,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					disableDoubleClickZoom: true,
					keyboardShortcuts: false,
					scrollwheel: false
				},
				markerIconProps: {
					url: '',
					size: new google.maps.Size(104, 86),
					scaledSize: new google.maps.Size(104, 86),
					anchor: new google.maps.Point(73, 95)
				},
				mapStyles: [{
					'featureType': 'landscape.man_made',
					'elementType': 'geometry.fill',
					'stylers': [{'lightness': '39'}, {'color': '#f1f1ee'}]
				}, {
					'featureType': 'landscape.natural',
					'elementType': 'geometry.fill',
					'stylers': [{'lightness': '100'}, {'saturation': '-100'}]
				}, {
					'featureType': 'landscape.natural',
					'elementType': 'labels',
					'stylers': [{'visibility': 'off'}]
				}, {
					'featureType': 'poi.attraction',
					'elementType': 'all',
					'stylers': [{'visibility': 'off'}]
				}, {
					'featureType': 'poi.business',
					'elementType': 'all',
					'stylers': [{'visibility': 'off'}]
				}, {
					'featureType': 'poi.government',
					'elementType': 'all',
					'stylers': [{'visibility': 'off'}]
				}, {
					'featureType': 'poi.medical',
					'elementType': 'all',
					'stylers': [{'visibility': 'off'}]
				}, {
					'featureType': 'poi.park',
					'elementType': 'all',
					'stylers': [{'visibility': 'off'}]
				}, {
					'featureType': 'poi.place_of_worship',
					'elementType': 'all',
					'stylers': [{'visibility': 'off'}]
				}, {
					'featureType': 'poi.sports_complex',
					'elementType': 'all',
					'stylers': [{'visibility': 'off'}]
				}, {
					'featureType': 'road.highway',
					'elementType': 'geometry.fill',
					'stylers': [{'color': '#ffffff'}]
				}, {
					'featureType': 'road.highway',
					'elementType': 'geometry.stroke',
					'stylers': [{'color': '#d1d1d1'}]
				}, {
					'featureType': 'road.highway',
					'elementType': 'labels',
					'stylers': [{'visibility': 'off'}]
				}, {
					'featureType': 'road.arterial',
					'elementType': 'geometry.fill',
					'stylers': [{'lightness': '-10'}]
				}, {
					'featureType': 'road.arterial',
					'elementType': 'labels',
					'stylers': [{'visibility': 'off'}]
				}, {
					'featureType': 'road.local',
					'elementType': 'geometry.fill',
					'stylers': [{'lightness': '-10'}]
				}, {
					'featureType': 'road.local',
					'elementType': 'labels',
					'stylers': [{'visibility': 'on'}]
				}, {
					'featureType': 'water',
					'elementType': 'geometry.fill',
					'stylers': [{'saturation': '-9'}, {'lightness': '30'}]
				}, {'featureType': 'water', 'elementType': 'labels', 'stylers': [{'visibility': 'off'}]}]
			},
			data = {
				maps: [],
				navOptions: [],
				markers: []
			},
			isOneMapOnly = false;

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

		this.options.markerIconProps.url = this.$element.data('maps-marker');

		if (this.$element.hasClass('all-locations')) {
			isOneMapOnly = true;
		}

		if (!isOneMapOnly) {
			this.initMaps();
			this.initSlickNav();
		} else {
			this.initAllLocations();
		}

		this.initSlick();
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
	 */
	Widget.prototype.initMaps = function() {
		this.$element.find(this.options.domSelectors.map).map(function(index, element) {
			var $mapElement = $(element),
					mapProp = _.assign({
						center: new google.maps.LatLng(parseFloat($mapElement.data('coordinates-y')), parseFloat($mapElement.data('coordinates-x')) - 0.007),
						styles: this.options.mapStyles
					}, this.options.mapProps),
					map = new google.maps.Map(element, mapProp);

			this.addMarker($mapElement, map);

			data.maps.push(map);
		}.bind(this));
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
	 * Adding the marker to the map
	 * @param $mapElement
	 * @param map
	 */
	Widget.prototype.addMarker = function($mapElement, map) {

		var markerProps = _.assign({
					position: new google.maps.LatLng(parseFloat($mapElement.data('coordinates-y')), parseFloat($mapElement.data('coordinates-x'))),
					icon: this.options.markerIconProps
				}),
				marker = new google.maps.Marker(markerProps);

		marker.setMap(map);
	};

	/**
	 * Initializing the map for all locations including their markers
	 */
	Widget.prototype.initAllLocations = function() {
		this.$element.find(this.options.domSelectors.map).map(function(index, element) {
			var mapProp = _.assign(this.options.mapProps, {
						center: new google.maps.LatLng(47.5, 7.5),
						styles: this.options.mapStyles,
						zoom: 9
					}),
					map = new google.maps.Map(element, mapProp);

			data.maps = map;
		}.bind(this));

		this.$element.find(this.options.domSelectors.markerData).map(function(index, element) {
			var $markerElement = $(element),
					markerProps = {
						position: new google.maps.LatLng(parseFloat($markerElement.data('coordinates-y')), parseFloat($markerElement.data('coordinates-x'))),
						icon: this.options.markerIconProps,
						opacity: 0.5
					},
					marker = new google.maps.Marker(markerProps);

			marker.setMap(data.maps);

			data.markers.push(marker);

			google.maps.event.addListener(marker, 'click', function() {
				this._setMarkerOpacityDefault();

				if (marker.getOpacity() !== 1) {
					marker.set('opacity', 1.0);
					this._showInfo($markerElement);
				}
			}.bind(this));
		}.bind(this));
	};

	/**
	 * Sets the opacity for all markers back to default
	 * @private
	 */
	Widget.prototype._setMarkerOpacityDefault = function() {
		data.markers.forEach(function(marker) {
			marker.set('opacity', 0.5);
		});
	};

	/**
	 * Makes one location visible
	 * @param $marker the span of the marker with the title attribute, so we find the the marker
	 * @private
	 */
	Widget.prototype._showInfo = function($marker) {
		$('.location__info').fadeOut(250);

		var titleAttr = $marker.data('location-title');

		$('.location__info[data-location-target="' + titleAttr + '"]').fadeIn(250);
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

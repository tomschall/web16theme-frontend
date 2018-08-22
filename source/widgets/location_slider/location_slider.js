/* global google */
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
				staticMap: '[data-' + name + '="static-map"]',
				bar: '[data-' + name + '="bar"]',
				navOption: '[data-' + name + '="nav-option"]',
				navList: '[data-' + name + '="nav-list"]',
				markerData: '[data-' + name + '="markerData"]'
			},
			stateClasses: {
				isActive: 'is_active'
			},
			mapProps: {
				zoom: 0,
				mapTypeId: null,
				disableDoubleClickZoom: true,
				keyboardShortcuts: false,
				scrollwheel: false
			},
			markerIconProps: {
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
			}, {'featureType': 'water', 'elementType': 'labels', 'stylers': [{'visibility': 'off'}]}],
			GOOGLE_MAPS_URL: 'https://maps.googleapis.com/maps/api/staticmap'
		},
		data = {
			maps: [],
			navOptions: [],
			markers: []
		},
		isOneMapOnly = false;

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

		if (typeof google !== typeof undefined) {
			this.options.mapProps.mapTypeId = google.maps.MapTypeId.ROADMAP;
			this.options.markerIconProps = {
				anchor: new google.maps.Point(73, 78),
				origin: new google.maps.Point(0, 0),
				url: this.$element.data('maps-marker')
			};

			if (this.$element.hasClass('all-locations')) {
				isOneMapOnly = true;
			}

			this.renderMaps(this.options.renderMobileView);
			this.initSlick();

			this.resize = _.debounce(this._resize, 50).bind(this);
			$(window).on('resize', this.resize);
		}
	};

	Widget.prototype._resize = function() {
		if (this.options.renderMobileView && !isMobileView()) {
			this.options.renderMobileView = false;
			this.renderMaps(this.options.renderMobileView);
		}

		this.maps.forEach(function(map) {
			google.maps.event.trigger(map, 'resize');
		});
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
			this.initMapsStatic();
			this.initSlickNav();
		} else {
			if (!mobileView) {
				// not a mobile resolution - render interactive map as well
				this.initAllLocations();
			}
			this.initAllLocationsStatic();
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
	 */
	Widget.prototype.initMaps = function() {
		this.$element.find(this.options.domSelectors.map).map(function(index, element) {
			var $mapElement = $(element),
				mapProp = _.assign(this.options.mapProps, {
					styles: this.options.mapStyles,
					zoom: parseInt($mapElement.data('zoomlevel'), 10)
				}),
				map = new google.maps.Map(element, mapProp);
			this.maps.push(map);
			this.addMarker($mapElement, map);
			data.maps.push(map);
		}.bind(this));
	};

	/**
	 * Retrieves google maps API key
	 *
	 * This is at the moment parsed out from the <script> tag which loads google
	 * maps api as it is the only place containing this information. Perhaps
	 * candidate to change - as the API key shall not be hardcoded in template
	 *
	 * @returns {=string} API Key if found
	 */
	Widget.prototype.getGoogleMapsAPIKey = function() {
		var url = $('script[src^=https\\:\\/\\/maps\\.googleapis\\.com\\/maps\\/]').attr('src'),
			match = /\?key=([a-z0-9-_]+)/gim.exec(url);
		if (match) {
			return match[1];
		}
		return undefined;
	};

	Widget.prototype.getStaticMapUrl = function(mapProps) {
		function latLng(location) {
			return [location.lat(), location.lng()].join(',');
		}

		var props = {
			size: '375x200', // 310x166 = 1.8674 // iphone width
			scale: 2,
			center: latLng(mapProps.center),
			style: mapProps.styles,
			markers: mapProps.locations,
			zoom: mapProps.zoom,
			key: this.getGoogleMapsAPIKey()
		};

		return this.options.GOOGLE_MAPS_URL + '?' + _.reduce(props, function(acc, value, key) {
			if (key === 'style' && value) {
				// process styles
				value = value.map(function(style) {
					var attrs = [
						'feature:' + style.featureType,
						'element:' + style.elementType
					].concat(style.stylers.map(function(styler) {
						return _.toPairs(styler).map(function(s) {
							return [s[0], s[1].replace(/^#([a-z0-9]{6})$/gim, '0x$1')].join(':');
						}).join('|');
					}));
					return encodeURIComponent(attrs.join('|'));
				}).join('&style=');
			} else if (key === 'markers') {
				value = value.map(function(marker) {
					return encodeURIComponent('color:black|' + latLng(marker));
				}).join('&markers=');
			} else {
				value = encodeURIComponent(value);
			}
			return [acc, '&', key, '=', value].join('');
		}, '');
	};

	Widget.prototype.initMapsStatic = function() {
		// NOTE: this is accessing the sibling element of this widget as the static maps are
		// wrongly placed within the template
		var $images = this.$element.next('.only-phone').find(this.options.domSelectors.staticMap);
		this.$element.find(this.options.domSelectors.map).map(function(index, element) {
			// retrieve the data from map element
			var $mapElement = $(element);
			this.getLocation($mapElement).then(function(location) {
				var mapProps = _.assign(this.options.mapProps, {
					styles: this.options.mapStyles,
					center: location,
					locations: [location],
					zoom: parseInt($mapElement.data('zoomlevel'), 10)
				});

				// assign static image to image element
				$images.eq(index).attr('src', this.getStaticMapUrl(mapProps));
			}.bind(this));
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

	Widget.prototype.getLocation = function($mapElement, map) {
		var deferred = $.Deferred(),
			hasPlaceId = typeof $mapElement.data('placeid') !== typeof undefined;

		if (hasPlaceId) {
			// PlaceService requires DOM node, there is no map element in case of static image
			map = map === undefined ? document.createElement('div') : map;

			var service = new google.maps.places.PlacesService(map),
				placeID = $mapElement.data('placeid');
			service.getDetails({
				placeId: placeID
			}, function(result) {
				deferred.resolve(result.geometry.location);
			});
		} else {
			deferred.resolve(new google.maps.LatLng(parseFloat($mapElement.data('coordinates-y')), parseFloat($mapElement.data('coordinates-x'))));
		}
		return deferred;
	};

	/**
	 * Adding the marker to the map
	 * @param $mapElement
	 * @param map
	 */
	Widget.prototype.addMarker = function($mapElement, map) {
		this.getLocation($mapElement, map).then(function(location) {
			var marker = new google.maps.Marker({
				icon: this.options.markerIconProps,
				position: location
			});
			marker.setMap(map);
			map.setCenter(location);
		}.bind(this));
	};

	/**
	 * Initializing the map for all locations including their markers
	 */
	Widget.prototype.initAllLocations = function() {
		this.$element.find(this.options.domSelectors.map).map(function(index, element) {
			var mapProp = _.assign(this.options.mapProps, {
					center: new google.maps.LatLng(47.5, 7.5),
					styles: this.options.mapStyles,
					zoom: 10
				}),
				map = new google.maps.Map(element, mapProp);
			this.maps.push(map);
			data.maps = map;
		}.bind(this));

		var $mapData = this.$element.find(this.options.domSelectors.markerData),
			locationPromises = $mapData.map(function(i, el) {
				return this.getLocation($(el));
			}.bind(this)).toArray();

		$.when.apply($, locationPromises).done(function(/* ...locations */) {
			$(arguments).map(function(i, position) {
				var $markerElement = $mapData.eq(i),
					markerProps = _.assign(this.options.mapProps, {
						position: position,
						icon: this.options.markerIconProps,
						opacity: 0.5
					}),
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
		}.bind(this));
	};

	Widget.prototype.initAllLocationsStatic = function() {
		var locationPromises = this.$element.find(this.options.domSelectors.markerData).map(function(i, el) {
				return this.getLocation($(el));
			}.bind(this)).toArray(),
			$image = this.$element.next('.only-phone').find(this.options.domSelectors.staticMap);

		$.when.apply($, locationPromises).done(function(/* ...locations */) {
			for (var i = 0; i < arguments.length; i++) {
				var mapProps = _.assign(this.options.mapProps, {
					styles: this.options.mapStyles,
					center: arguments[i],
					locations: [arguments[i]],
					zoom: 16
				});

				// assign static image to image element
				$image.eq(i).attr('src', this.getStaticMapUrl(mapProps));
			}
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
		$(window).off('resize', this.resize);
		this.maps = null;
	};

	// Make the plugin available through jQuery (and the global project namespace)
	estatico.helpers.SuperClass.register(Widget, name, {
		initEvents: ['ready', 'ajaxload'],
		events: events
	});

})(jQuery);

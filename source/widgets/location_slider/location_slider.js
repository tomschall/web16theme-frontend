/*!
 * Mapbox GL
 *
 * @author Roland von Aesch
 * @copyright FHNW - Fachhochschule Nordwestscheiz
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
				isActive: 'is_active',
				mapSelector: 'mapbox__map-0',
				mapNavigationButton: '.widg_location__nav button',
				locationInfoBox: '.location__info'
			},
			mapStyles: {
				street: 'https://maps.fhnw.ch/res/style-cdn.json',
				D3map: 'https://maps.fhnw.ch/res/style-cdn_osm-liberty.json',
				colorMap: 'https://maps.fhnw.ch/res/style-cdn.json'
			},
			markerIconProps: {},
			mapOptionsDefaults: {
				zoom: 9,
				container: 'mapbox__map-0',
				center: [7.9, 47.46], // Default Campus
				style: 'https://maps.fhnw.ch/res/style-cdn.json',
				pitch: 0,
				bearing: 0,
				offset: [-29, -35]
			},
		},
		data = {
			maps: [],
			navOptions: [],
			markers: []
		};

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
		this.mapStyle = this.options.mapStyles.street;
		this.options.renderMobileView = isMobileView(); // true if mobile resolution < 1024
		this.totalLocations = $(this.options.domSelectors.markerData).length;
		this.options.windowSize = $(window).width();

		// Reordering DOM for mobile or desktop view
		if (this.options.renderMobileView === true || this.options.windowSize <= 1024) {
			$(this.options.stateClasses.locationInfoBox).clone().insertAfter('#' + this.options.stateClasses.mapSelector);
			$('#' + this.options.stateClasses.mapSelector + ' ' + this.options.stateClasses.locationInfoBox).remove();
		}

		this.setLocationDataIndex();
		this.renderMap();
		this.mapSettings(this.map);
		this.colorBuilding(this.map);
		this.addMarker(this.map);
		this.addControls(this.map);

		/* Hide tab-navigation on startpage */
		if ($('.startpage-page').length) {
			this.startpage = true;
			$('.widg_location__nav.nav__state').hide();
		}

		this.tabNavigation(this.map);
		this.setFirstLocation(this.map);
	};

	Widget.prototype.mapSettings = function() {
		this.map = new window.mapboxgl.Map({
			zoom: this.zoom,
			container: this.options.stateClasses.mapSelector,
			center: this.center,
			style: this.mapStyle,
			pitch: this.pitch,
			bearing: this.bearing,
			offset: this.offset,
			interactive: this.interactive,
			scrollZoom: this.scrollZoom
			// boxZoom: false,
			// doubleClickZoom : false
		});

		// Compendium of all markers
		this.bounds = new window.mapboxgl.LngLatBounds();

		$(this.options.stateClasses.mapSelector).slideToggle(200, function() {
			this.map.resize();
		});
	};

	Widget.prototype.colorBuilding = function(map) {
		map.on('load', function() {
			var layers = map.getStyle().layers;
      // Find the index of the first symbol layer in the map style
      var firstSymbolId;
      for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol') {
              firstSymbolId = layers[i].id;
              break;
          }
      }

      map.addSource('universities', {
          type: 'geojson',
          data: 'https://maps.fhnw.ch/universities.json'
      });

      map.addLayer({
				'id': 'universitiy-buildings',
        'type': 'fill',
        'source': 'universities',
        'paint': {
            'fill-color': '#FDE70D',
            'fill-opacity': 0.5,
        },
        'filter': ['==', '$type', 'Polygon']
			}, firstSymbolId);

      map.addLayer({
				'id': 'housenumber-labels',
        'type': 'symbol',
        'source': 'universities',
        'minzoom': 15,
        'layout': {
            'text-field': '{Housenumber}',
            'text-justify': 'center',
            'text-font': ['Noto Sans Bold'],
        },
        'paint': {
            'text-color': '#000',
            'text-halo-color': '#fff',
            'text-halo-width': 2
        }
			});
		});
	};

	/**
	* Map settings based on device
	*/
	Widget.prototype.renderMap = function() {
		// Map settings -> mobile view true, one location true
		if (this.options.renderMobileView && this.totalLocations === 1) {
			this.zoom = 18;
			this.center = [data.markers[0].features[0].geometry.coordinates[0], data.markers[0].features[0].geometry.coordinates[1]];
			this.pitch = this.options.mapOptionsDefaults.pitch;
			this.bearing = this.options.mapOptionsDefaults.bearing;
			this.offset = this.options.mapOptionsDefaults.offset;
			this.interactive = false;
		}
		// Map settings -> mobile view true, multiple locations true
		if (this.options.renderMobileView && this.totalLocations > 1) {
			this.zoom = 18;
			this.center = this.options.mapOptionsDefaults.center;
			this.pitch = this.options.mapOptionsDefaults.pitch;
			this.bearing = this.options.mapOptionsDefaults.bearing;
			this.offset = this.options.mapOptionsDefaults.offset;
			this.interactive = false;
		}
		// Map settings -> mobile view false, one locations true
		if (this.options.renderMobileView === false && this.totalLocations === 1) {
			this.zoom = 16;
			this.center = [data.markers[0].features[0].geometry.coordinates[0], data.markers[0].features[0].geometry.coordinates[1]];
			this.pitch = this.options.mapOptionsDefaults.pitch;
			this.bearing = this.options.mapOptionsDefaults.bearing;
			this.offset = this.options.mapOptionsDefaults.offset;
			this.interactive = true;
			this.scrollZoom = false;

		}
		// Map settings -> mobile view false, one locations false
		if (this.options.renderMobileView === false && this.totalLocations > 1) {
			this.zoom = 16;
			this.center = this.options.mapOptionsDefaults.center;
			this.pitch = this.options.mapOptionsDefaults.pitch;
			this.bearing = this.options.mapOptionsDefaults.bearing;
			this.offset = this.options.mapOptionsDefaults.offset;
			this.interactive = true;
			this.scrollZoom = false;
		}
	};

	/**
	* Find locations and push it to map JSON
	*/
	Widget.prototype.setLocationDataIndex = function() {
		this.$element.find(this.options.domSelectors.markerData).map(function(index, element) {
			var xCoord = $(element).attr('data-coordinates-x');
			var yCoord = $(element).attr('data-coordinates-y');
			var locationTitle = $(element).attr('locations-target');
			data.markers.push({
				'type': 'FeatureCollection',
				'features':[{
					'geometry':{
						'type': 'Point',
						'coordinates':[
							xCoord,
							yCoord
					]},
					'type': 'Feature',
					'properties':{
						'description': '',
						'marker-symbol': 'rail-metro',
						'title': locationTitle,
						'url': 'https://www.dev.fhnw.ch/de/weiterbildung/technik/cas-data-science',
						'lines':['Green'],
						'address': 'FHNW - Nordwestschweiz, Campus Brugg'
					}
				}]
			});
		});
	};

	/**
	* Get location x and y coordinates from JSON
	* See setLocationDataIndex
	*/
	Widget.prototype.getCoordinates = function(locationDataIndex) {
		var locationDataIndexCoord = [data.markers[locationDataIndex].features[0].geometry.coordinates[0], data.markers[locationDataIndex].features[0].geometry.coordinates[1]];
		return locationDataIndexCoord;
	};

	/**
	* Find locations and render marker to map
	* Set eventlistener to markers
	*/
	Widget.prototype.addMarker = function(map) {
		var offset = this.offset;
		var bounds = this.bounds;
		var totalLocations = this.totalLocations;
		var navigationButton = this.options.stateClasses.mapNavigationButton;
		var locationInfoBox = $(this.options.stateClasses.locationInfoBox);
		//var center = this.options.mapOptionsDefaults.center;

		data.markers.forEach(function(index, e) {
			var xCoordinates = index.features[0].geometry.coordinates[0];
			var yCoordinates = index.features[0].geometry.coordinates[1];
			var marker = document.createElement('div');

			marker.className = 'mapboxgl-marker';
			marker.id = 'marker-' + e;

			new window.mapboxgl.Marker(marker, { offset: offset })
			.setLngLat([xCoordinates, yCoordinates])
			.addTo(map);

			bounds.extend(index.features[0].geometry.coordinates);

			marker.addEventListener('click', function() {
				marker = this.id;
				$('.mapboxgl-marker').animate({ opacity: 0.3 });
				locationInfoBox.fadeOut(1000);
				$(navigationButton + '#' + e).addClass('is_active');
				if (totalLocations > 1) {
					map.fitBounds(bounds, {padding: 100});
				} else {
					map.flyTo({
						center: [xCoordinates, yCoordinates],
						zoom: 9,
						bearing: 0,
						pitch: 0
					});

				}
				Widget.prototype.flyToLocation(marker, map, e, xCoordinates, yCoordinates);
			});
		});
	};

	/**
	* Fly to location
	*/
	Widget.prototype.flyToLocation = function(marker, map, e, xCoordinates, yCoordinates) {
		$('.location__info').fadeOut(1000);
		if ($('#location__marker-temp-' + e).is(':hidden')) {
			$('#location__marker-temp-' + e).fadeIn(1000);
			$('#' + marker).animate({ opacity: 0.9 });
			$('.widg_location__nav button#' + e).addClass('is_active');

			var mobileView = isMobileView();
			if (mobileView) {
				map.flyTo({
					center: [xCoordinates, yCoordinates],
					zoom: 16,
					bearing: 0,
					pitch: 0,
					offset: [0, 0]
				});
			} else {
				map.flyTo({
					center: [xCoordinates, yCoordinates],
					zoom: 17,
					bearing: 0,
					pitch: 0,
					offset: [100, 0]
				});
			}
		} else {
			$('.widg_location__nav button').removeClass('is_active');
			$('#' + marker).animate({ opacity: 0.3 });
		}
	};

	/**
	* Set first infobox visible
	*/
	Widget.prototype.setFirstLocation = function(map) {
		var xyCoordinates = Widget.prototype.getCoordinates(0);
		var isStartpage = this.startpage;
		var bounds = this.bounds;

		if (!isStartpage) {
			Widget.prototype.flyToLocation('marker-0', map, 0, xyCoordinates[0], xyCoordinates[1]);
			Widget.prototype._moveNavBar(0);
		} else {
			map.fitBounds(bounds, { padding: 100 });
		}
	};

	/**
	* Trigger location marker from navigation tab
	*/
	Widget.prototype.tabNavigation = function(map) {
		var mapDefaults = this.options.mapOptionsDefaults;
		var bounds = this.bounds;
		var totalLocations = this.totalLocations;

		$(this.options.stateClasses.mapNavigationButton).on('click', function() {
			$('.widg_location__nav button').removeClass('is_active');
			$('.mapboxgl-marker').animate({ opacity: 0.3 });
			var locationDataIndex = this.id;
			var marker = 'marker-' + locationDataIndex;
			var xyCoordinates = Widget.prototype.getCoordinates(locationDataIndex);
			Widget.prototype._moveNavBar(locationDataIndex);

			if (totalLocations > 1) {
				map.fitBounds(bounds, { padding: 100 });
			} else {
				map.flyTo({
					center: xyCoordinates,
					zoom: mapDefaults.zoom,
					bearing: mapDefaults.bearing,
					pitch: mapDefaults.pitch
				});

			}
			Widget.prototype.flyToLocation(marker, map, locationDataIndex, xyCoordinates[0], xyCoordinates[1]);
		});
	};

	/**
	 * Moving the nav bar to the nav options position and giving their width
	 * @param $navOption
	 * @private
	 */
	Widget.prototype._moveNavBar = function(locationDataIndex) {
		var $bar = $('.widg_location__nav-bar'),
				offsetLeft = $('nav button#' + locationDataIndex).offset().left - $('#mapnavi').offset().left;
		$bar.css({
			left: offsetLeft,
			width: $('nav button#' + locationDataIndex).width()
		});
	};

	/**
	 * Add map controls
	 * Zoom, Fullscreen, Rotate
	 */
	Widget.prototype.addControls = function(map) {
		map.addControl(new window.mapboxgl.NavigationControl(), 'bottom-right');
		map.addControl(new window.mapboxgl.FullscreenControl(), 'bottom-right');
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

/*!
 * @class       Cookie confirmation
 * @classdesc   Plugin to display and consequently hide cookie confirmations.
 * @author      Florian Süsstrunk, Unic AG
 * Edited By    -
 * @copyright   Unic AG
 */

;(function($, undefined) {
	'use strict';

	var name = 'cookieconfirmation',
		events = {
			reset: 'reset.estatico.' + name
		},
		defaults = {
			domSelectors: {
				accept: '[data-' + name + '="accept"]'
			},
			stateClasses: {
				isVisible: 'is_visible'
			},
			cookie: {
				name: 'estatico_' + name,
				path: '/',
				expires: Infinity
			}
		},
		data = {};

	/**
	 * Create an instance of the module
	 * @constructor
	 * @param {object} element - The DOM element to bind the module
	 * @param {object} options - Options overwriting the defaults
	 */
	function Module(element, options) {
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

	Module.prototype = $.extend(true, {}, estatico.helpers.SuperClass.prototype, Module.prototype);

	/**
	 * Initialize module, bind events.
	 * @method
	 * @public
	 */
	Module.prototype.init = function() {
		if (this._hasCookie(this.options.cookie.name) === false) {
			this.$element
				.addClass(this.options.stateClasses.isVisible)
				.on('click.estatico.' + this.uuid, this.options.domSelectors.accept, function(event) {
					event.preventDefault();

					this._setCookie(this.options.cookie.name, 1, this.options.cookie.expires, this.options.cookie.path);

					this.$element.removeClass(this.options.stateClasses.isVisible);
				}.bind(this));
		}

		// Reset cookie confirmation
		$(document).on(events.reset, function() {
			this._removeCookie(this.options.cookie.name, this.options.cookie.path);
		}.bind(this));
	};

	Module.prototype._hasCookie = function(key) {
		if (!key) {
			return false;
		}

		return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
	};

	Module.prototype._setCookie = function(key, value, expiration, path, domain, secure) {
		var expires;

		if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
			return false;
		}

		expires = '';

		if (expiration) {
			switch (expiration.constructor) {
				case Number:
					expires = expiration === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + expiration;
					break;
				case String:
					expires = '; expires=' + expiration;
					break;
				case Date:
					expires = '; expires=' + expiration.toUTCString();
					break;
			}
		}

		document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '');

		return true;
	};

	Module.prototype._removeCookie = function(key, path, domain) {
		if (!this._hasCookie(key)) {
			return false;
		}

		document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '');

		return true;
	};

	/**
	 * Unbind events, remove data, custom teardown
	 * @method
	 * @public
	 */
	Module.prototype.destroy = function() {
		// Unbind events, remove data
		estatico.helpers.SuperClass.prototype.destroy.apply(this);

		$(document).off(events.reset);
	};

	// Make the plugin available through jQuery (and the global project namespace)
	estatico.helpers.SuperClass.register(Module, name, {
		initEvents: ['ready', 'ajaxload'],
		events: events
	});

})(jQuery);

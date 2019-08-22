/*!
 * SoMe Share
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'so_me_share',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				tweet: '[data-' + name + '="tweet"]',
				mailto: '[data-' + name + '="mailto"]',
				fb: '[data-' + name + '="fb"]',
				print: '[data-' + name + '="print"]',
			},
			stateClasses: {
				// isActive: 'is_active'
			},
			twitterOptions: {
				base: 'https://twitter.com/share?',
				via: 'FHNW',
				related: 'twitterapi%2Ctwitter',
				hashtags: 'fhnw'
			},
			mailtoOptions: {
				base: 'mailto:?Subject='
			},
			facebookOptions: {
				base: 'http://www.facebook.com/sharer/sharer.php?'
			},
			translations: {
				de: 'Drucken',
				en: 'print',
				fr: 'imprimer'
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
		this.initTwitterBtn();

		this.initMailToBtn();

		this.initFacebookBtn();

		this.initPrintBtn();
	};

	Widget.prototype.initTwitterBtn = function() {
		var $twitterButton = $(this.options.domSelectors.tweet),
				hrefString = this.options.twitterOptions.base,
				url = encodeURIComponent(window.location.href),
				customText = $twitterButton.data('share-text');

		hrefString += 'url=' + url + '&related=' + this.options.twitterOptions.related;

		if (this.options.twitterOptions.hashtags) {
			hrefString += '&hashtags=' + this.options.twitterOptions.hashtags;
		}

		if (typeof customText !== typeof undefined) {
			hrefString += '&text=' + encodeURIComponent(customText);
		}

		$twitterButton.attr('href', hrefString);
	};

	Widget.prototype.initMailToBtn = function() {
		var $mailtoButton = $(this.options.domSelectors.mailto),
			hrefString = this.options.mailtoOptions.base,
			subject = encodeURIComponent($mailtoButton.data('share-text')),
			mailbody = '&body=' + encodeURIComponent(window.location.href);

		$mailtoButton.attr('href', hrefString + subject + mailbody);
	};

	Widget.prototype.initFacebookBtn = function() {
		var $fbButton = $(this.options.domSelectors.fb),
			hrefString = this.options.facebookOptions.base,
			url = 'u=' + encodeURIComponent(window.location.href),
			title = '&title=' + encodeURIComponent($fbButton.data('share-text'));

		$fbButton.attr('href', hrefString + url + title);
	};

	Widget.prototype.initPrintBtn = function() {
		var $printButton = $(this.options.domSelectors.print);
		var pathArr = window.location.pathname.split('/');
		var lang = pathArr[1];
		var langStr = (lang === 'de' || lang === 'en' || lang === 'fr') ? lang : 'de';

		if (langStr !== 'de') {
			var translation = '<span class="some-icon"></span><span class="some-text">' + this.options.translations[langStr] + '</span>';
			$printButton[0].innerHTML = translation;
		}

		$printButton.click(function() {
			window.print();
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

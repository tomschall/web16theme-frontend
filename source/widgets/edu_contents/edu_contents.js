/*!
 * Sidebar KeyData
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

(function($, undefined) {
	'use strict';

	var name = 'edu_contents',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				parent: '.widg_edu_contents',
				contact: '.edu__contact',
				application: '#edu__application',
				events: '#edu__events',
				topLink: '.widg_toplink',
				contactAnchor: '.widg_sidebar__content > .widg_edu_contact.widg_sidebar__object',
				eventAnchor: '.widg_edu_events.widg_sidebar__object',
				applicationAnchor: '#edu__application',
				sidebarApplicationAnchor: '.widg_sidebar'
			},
			stateClasses: {},
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
			data: data,
		});
	}

	Widget.prototype = $.extend(true, {}, estatico.helpers.SuperClass.prototype, Widget.prototype);

	/**
	 * Initialize Widget, bind events.
	 * @method
	 * @public
	 */
	Widget.prototype.init = function() {
		var labelApplication = $(this.options.domSelectors.parent).attr('data-nav-application');
		var labelEvents = $(this.options.domSelectors.parent).attr('data-nav-events');
		var labelContact = $(this.options.domSelectors.parent).attr('data-nav-contact');
    var self = this;

		if (window.estatico.mq.query({ to: 'small' })) {
			var e = $('<div><div class="icon icon__application">' + labelApplication +
			'</div><div class="icon icon__info">' + labelEvents +
			'</div><div class="icon icon__contact">' + labelContact +
			'</div></div>');
			$('body').append(e);
			e.attr('id', 'edu__product_nav').hide().fadeIn(1000);
		}

		if ($(this.options.domSelectors.contactAnchor).length) {
			$('.icon.icon__contact, .icon.icon__info, .icon.icon__application').on('click', function() {
        if (this.className.split(' ')[1] === 'icon__contact') {
          // ANCHOR CONTACT
          self.scrollTop(defaults.domSelectors.contactAnchor, 0);
        } else if (this.className.split(' ')[1] === 'icon__info') {
          // ANCHOR EVENTS
					self.scrollTop(defaults.domSelectors.eventAnchor, 10);
        } else if (this.className.split(' ')[1] === 'icon__application') {
          // ANCHOR APPLICATION
					if ($(defaults.domSelectors.applicationAnchor).length) {
						self.scrollTop(defaults.domSelectors.applicationAnchor, 25);
					} else {
						self.scrollTop(defaults.domSelectors.sidebarApplicationAnchor, 15);
					}
        }
			});
		}

		if ($(this.options.domSelectors.contactAnchor).length === 0) {
			$('.icon.icon__contact').css('display', 'none');
		}

		if ($('#edu__events').length === 0 && $('#targetInfoEvents').length === 0) {
			$('.icon.icon__info').css('display', 'none');
		}

		// REPLACING BACK-TO-TOP-LINK
		if ($(this.options.domSelectors.topLink).length) {
			$(this.options.domSelectors.topLink).css('bottom', '90px');
		}
	};

	Widget.prototype.scrollTop = function(selector, param) {
		$('html, body').animate({ scrollTop: $(selector).offset().top - param }, 1000);
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
		events: events,
	});
})(jQuery);
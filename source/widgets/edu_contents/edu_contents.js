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
				eventAnchor: '.widg_info_teaser',
				applicationAnchor: '.widg_application_accordeon',
				sidebarApplicationAnchor: '.align__btn .btn.small_button'
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
			var e = $('<div><a class="icon icon__contact">' + labelContact +
			'</a><a class="icon icon__info">' + labelEvents +
			'</a><a class="icon icon__application">' + labelApplication +
			'</a></div>');
			$('body').append(e);
			e.attr('id', 'edu__product_nav').hide().fadeIn(1000);
			this.iOS();
		}

		// COPY LINK IF EDU-EVENTS NOT EXISTS, BUT EVENT BUTTON HAS LINK REFERENCE
		if ($('#targetInfoEvents').length === 0 && $('.widg_edu_events .btn.small_button').length === 1) {
			var eduInfoLink = $('.widg_edu_events .btn.small_button').attr('href');
			$('.icon.icon__info').attr('href', eduInfoLink);
		}

		if ($(this.options.domSelectors.contactAnchor).length ||
		$(this.options.domSelectors.applicationAnchor).length ||
		$(this.options.domSelectors.eventAnchor)) {
			$('.icon.icon__contact, .icon.icon__info, .icon.icon__application').on('click', function() {
				if (this.className.split(' ')[1] === 'icon__contact') {
					// ANCHOR CONTACT
          self.scrollTop(defaults.domSelectors.contactAnchor, 0);
        } else if (this.className.split(' ')[1] === 'icon__info') {
					// ANCHOR EVENTS
					if ($(defaults.domSelectors.eventAnchor).length) {
						self.scrollTop(defaults.domSelectors.eventAnchor, 10);
					} else {
						self.scrollTop('.widg_edu_events.widg_sidebar__object', 10);
					}
        } else if (this.className.split(' ')[1] === 'icon__application') {
					// ANCHOR APPLICATION
					if ($(defaults.domSelectors.applicationAnchor).length) {
						self.scrollTop(defaults.domSelectors.applicationAnchor, 25);
						if ($('.widg_application_accordeon > .widg_accordeon__entry:first-of-type').length <= 1) {
							if (!$('#targetOnlineApplication .widg_accordeon__entry:first-of-type').hasClass('is_open')) {
								$('#targetOnlineApplication .widg_accordeon__entry:first-of-type .widg_accordeon_item').trigger('click');
								$('#targetOnlineApplication .widg_accordeon__entry:first-of-type .widg_accordeon_item').toggleClass('is_open');
							}
						}
					} else {
						self.scrollTop(defaults.domSelectors.sidebarApplicationAnchor, 25);
					}
        }
			});
		}

		// MOBILE NAVIGATION - HIDE ELEMENT ON CERTAIN CONDITIONS
		if ($(this.options.domSelectors.contactAnchor).length === 0) {
			$('.icon.icon__contact').css('display', 'none');
		}

		// HIDE BUTTON INFO-ANLASS, WHEN BUTTON NOT EXISTS
		if ($('.widg_edu_events').length === 0) {
			$('.icon.icon__info').css('display', 'none');
		}

		// REPLACING BACK-TO-TOP-LINK
		if ($(this.options.domSelectors.topLink).length) {
			$(this.options.domSelectors.topLink).css('bottom', '65px');
		}

		// EDU APPLICATION FULL WIDTH IF EVENTS ARE MISSING
		if ($('.widg_edu_contents .widg_edu_events.widg_sidebar__object').length === 0) {
			$('.widg_edu_application.widg_sidebar__object').css('width', '100%');
		}
	};

	Widget.prototype.iOS = function() {
		var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
		if (iOS === true) {
			$('meta[name=viewport]').remove();
			$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">');
			$('#edu__product_nav').css('padding-bottom', '15px');
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

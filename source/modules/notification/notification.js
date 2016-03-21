/*!
 * @class       Notification
 * @classdesc   Plugin for centralized Notifications. Initialized on <body />.
 * @author      Patrick Lauterburg, Unic AG
 * Edited by    Matthias Meier, Oriol Torrent Florensa, Thomas Jaggi, Unic AG
 * @copyright   Unic AG
 */

;(function($, undefined) {
	'use strict';

	var name = 'notification',
		$document = $(document),
		events = {
			add: 'add.estatico.' + name,
			removeAllMessages: 'removeAllMessages.estatico.' + name,
			destroy: 'destroy.estatico.' + name
		},
		defaults = {
			domSelectors: {
				wrapper: '[data-' + name + '="wrapper"]',
				message: '[data-' + name + '="message"]',
				buttonClose: '[data-' + name + '="dismiss"]'
			},
			template: {
				buttonClose: '<a class="close_button" data-notification=\"dismiss\">Close</a>',
				wrapper: '<div class="mod_notification" data-notification=\"wrapper\" role="alert" />',
				message: '<div class="message" data-notification=\"message\" />'
			},
			message: {
				modal: false,
				timeout: 2000,
				type: 'info' // info, error, success
			},
			stateClasses: {
				info: 'is_info',
				error: 'is_error',
				success: 'is_success',
				expanded: 'is_expanded'
			}
		},
		data = {
			// items: ["Item 1", "Item 2"]
		};

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
		this.$wrapper = null;
		this.messageCounter = 0;
		this.messages = {};
		this.isVisible = false;

		this.$wrapper = $(this.options.template.wrapper).appendTo(this.$element).hide();

		// add notification message
		$document.on(events.add + '.' + this.uuid, $.proxy(function(event, data) {
			this.addMessage(data.message, data.options);
		}, this));

		// remove all the notification messages
		$document.on(events.removeAllMessages + '.' + this.uuid, $.proxy(function() {
			this.removeAllMessages();
		}, this));

		// destroy plugin
		$document.on(events.destroy + '.' + this.uuid, $.proxy(function() {
			this.destroy();
		}, this));

		// click handler for 'close' button if modal is true
		this.$element.on('click.'+ this.uuid, this.options.domSelectors.buttonClose, $.proxy(function(event) {
			var $element = $(event.currentTarget).parents(this.options.domSelectors.message);

			event.preventDefault();

			this.removeMessage($element.data('key'));
		}, this));

		// click handler for notification message when modal is false
		this.$element.on('click.'+ this.uuid, this.options.domSelectors.message, $.proxy(function(event) {
			var $element = $(event.currentTarget);

			if (!$element.find(this.options.domSelectors.buttonClose).length) {
				this.removeMessage($element.data('key'));
			}
		}, this));
	};

	/**
	 * Add notification
	 * @param message Content to display
	 * @param options Custom settings
	 */
	Module.prototype.addMessage = function(message, options) {
		var $message = $(this.options.template.message).append(message),
			settings = $.extend(true, {}, this.options.message, options),
			timeout = null,
			key;

		key = this.messageCounter = this.messageCounter + 1;

		if (!this.isVisible) {
			this._show();
		}

		$message.appendTo(this.$wrapper)
			.addClass(this.options.stateClasses[settings.type] || '')
			.data('key', key);

		// there has to be a delay to trigger transitions initially
		setTimeout($.proxy(function() {
			$message.addClass(this.options.stateClasses.expanded);
		}, this), 1);

		if (settings.modal) {
			// add close button to dom for modal type
			$(this.options.template.buttonClose).prependTo($message);
		} else {
			timeout = setTimeout($.proxy(function() {
				this.removeMessage(key);
			}, this), settings.timeout);

			$message.data('time', timeout);
		}

		this.messages[key] = {
			$element: $message,
			options: settings
		};
	};

	/**
	 * Remove specific notification
	 * @param key Message identifier
	 */
	Module.prototype.removeMessage = function(key) {
		var $element;

		if (typeof this.messages[key] !== 'undefined') {
			$element = this.messages[key].$element;
			$element.removeClass(this.options.stateClasses.expanded);

			// TODO: replace setTimeout with proper helper function from ESTATICO-51
			setTimeout($.proxy(function() {
				clearTimeout($element.data('timeout'));

				$element.remove();
			}, this), 300);

			delete this.messages[key];
		}
	};

	/**
	 * Remove all notifications
	 */
	Module.prototype.removeAllMessages = function() {
		$.each(this.messages, $.proxy(function(key) {
			this.removeMessage(key);
		}, this));
	};

	/**
	 * Show overlay
	 */
	Module.prototype._show = function() {
		this.$wrapper.show();
	};

	/**
	 * Unbind events, remove data, custom teardown
	 * @method
	 * @public
	 */
	Module.prototype.destroy = function() {
		// Unbind events, remove data
		estatico.helpers.SuperClass.prototype.destroy.apply(this);

		this.$element.find(this.options.domSelectors.wrapper).remove();
	};

	// Make the plugin available through jQuery (and the global project namespace)
	estatico.helpers.SuperClass.register(Module, name, {
		initEvents: ['ready', 'ajaxload'],
		events: events
	});

	// Bind the module to particular events and elements
	$document.on('ready ajaxload', function() {
		$.fn[name].apply($('body'), [{
			// Options
		}]);
	});

})(jQuery);

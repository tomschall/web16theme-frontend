/**
 * Widget inspector, outlines Estatico Widgets
 *
 * Start inspection with ctrl+m (same to switch off widget inspection)
 */

;(function(undefined) {
	'use strict';

	estatico.helpers.inspector = {
		mode: null,
		dataAttribute: 'estaticoDev',
		className: 'estatico_dev_overlay',
		classNameVariant: 'var_variant',
		logger: estatico.helpers.log('Inspector'),

		run: function() {
			if (document.documentElement.classList) {
				// Set the mode we're in (1 = show modules, 0 = hide modules)
				if (this.mode === null) {
					this.mode = 1;
				} else {
					this.mode++;
				}

				// Run the current mode
				if (this.mode === 1) {
					this.showWidgets();
				} else {
					this.hideWidgets();
				}
			} else {
				this.logger('Element.classList not supported in this browser');
			}
		},

		// Add class to all modules
		showWidgets: function() {
			[].forEach.call(document.querySelectorAll('[class]'), function(node) {
				var log = '',
					widget = '',
					variations = [];

				node.classList.forEach(function(className) {
					if (className.substring(0, 4) === 'mod_') {
						widget = className.substring(4).replace(/_/g, ' ');
					}

					if (className.substring(0, 4) === 'var_') {
						variations.push(className.substring(4).replace(/_/g, ' '));
					}
				});

				if (widget !== '') {
					log = widget;
				}

				if (variations.length > 0) {
					log += ': ' + variations.join(', ');
				}

				if (log !== '') {
					this.logger([node, log]);

					node.classList.add(this.className);

					if (variations.length > 0) {
						node.classList.add(this.classNameVariant);
					}

					node.dataset[this.dataAttribute] = log;
				}
			}.bind(this));
		},

		// Remove class from modules
		hideWidgets: function() {
			[].forEach.call(document.querySelectorAll('[class]'), function(node) {
				node.classList.remove(this.className);
				node.classList.remove(this.classNameVariant);
			}.bind(this));

			this.mode = 0;
		}
	};

})();

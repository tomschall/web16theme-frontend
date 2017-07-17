(function() {
	window.__PREVENT_INITIALIZATION__ = true;

	/**
	 * Initializes specific estatico module (widget)
	 *
	 * NOTE: does not handle ajaxload event!
	 *
	 * @param {jQuery|HTMLElement} $node Node containing the widget.
	 */
	function initModule($node) {


		var initEvents = estatico.helpers.initEvents || {},
			initPlugins = initEvents.ready,
			plugins = $node.data('init').split(' '),
			i;

		for (i = 0; i < plugins.length; i++) {
			if (initPlugins.indexOf(plugins[i]) !== -1) {
				$.fn[plugins[i]].apply($node);
			}
		}
	}

	/**
	 * Takes given module (widget), injects it into DOM and optionally performs
	 * initialization.
	 *
	 * @param {string} moduleName Name of the module to initialize. E.g. `accordion`
	 * @param {=bool} preventInit If true prevents widget initialization.
	 * @returns {jQuery|HTMLElement} DOM node containing the widget
	 */
	function withModule(moduleName, preventInit) {
		var htmlName = [moduleName, '/', moduleName, '.html'].join(''),
			$node = $(window.__html__[htmlName]);
		$('body').append($node);
		if (!preventInit) {
			initModule($node);
		}
		return $node;
	}

	/**
	 * Cleans up all estatico instances.
	 *
	 */
	function tearDown() {
		for (var moduleName in estatico.widgets) {
			if (!estatico.widgets.hasOwnProperty(moduleName)) {
				continue;
			}
			for (var instance in estatico.widgets[moduleName].instances) {
				if (!estatico.widgets[moduleName].instances.hasOwnProperty(instance)) {
					continue;
				}

				var $el = estatico.widgets[moduleName].instances[instance].$element;
				$el[moduleName]('destroy');

				// if debugging single test - keep this line out to see the widget
				$el.empty().remove();
			}
		}
	}

	window.T = {
		withModule: withModule,
		tearDown: tearDown
	}
})();

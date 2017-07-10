(function() {
	window.__PREVENT_INITIALIZATION__ = true;

	function initModule($node) {
		// NOTE: does not handle ajaxload event!

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

	function withModule(moduleName) {
		var htmlName = [moduleName, '/', moduleName, '.html'].join(''),
			$node = $(window.__html__[htmlName]);
		$('body').append($node);
		initModule($node);
		return $node;
	}

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

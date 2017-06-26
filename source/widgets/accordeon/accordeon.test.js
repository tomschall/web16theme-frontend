'use strict';

var QUnit = require('qunitjs'),
	$ = require('jquery'),
	moduleName = 'slideshow',
	$node = $('.mod_' + moduleName).eq(0),
	instance;

// Setup QUnit module
QUnit.module('slideshow', {
	beforeEach: function() {
		instance = $node.data(moduleName + 'Instance');
	},

	afterEach: function() {
		instance.destroy();
		estatico.helpers.initModule(moduleName, $node);
	}
});

QUnit.test('Test correct plugin registration', function(assert) {
	assert.expect(1);

	assert.equal(typeof instance, 'object', 'Plugin instance is an object');
});

/* global T, describe, expect, it, xit, beforeEach, afterEach, xdescribe */
'use strict';

xdescribe('Easy form', function() {
	var $node;

	beforeEach(function() {
		$node = T.withModule('easy_form', true);
		window.estatico.easyFormValidation.init();
	});

	afterEach(function() {
		T.tearDown();
	});

	it('should have 4 entries', function() {
	});
});

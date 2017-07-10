/* global T, describe, expect, it, xit, beforeEach, afterEach */
'use strict';

describe('Accordeon', function() {
	var $node;

	beforeEach(function() {
		// instantiate accordeon module
		$node = T.withModule('accordeon');
	});

	afterEach(function() {
		// clean up - destroy all modules
		T.tearDown();
	});

	it('should have 4 entries', function() {
		expect($node.find('.widg_accordeon__entry').size()).toBe(4);
	});

	it('should open first node on click', function() {
		var $nodes = $node.find('.widg_accordeon__entry');
		$nodes.eq(0).find('button').click();
		expect($nodes.eq(0)).toContain('.is_open');
	});
});

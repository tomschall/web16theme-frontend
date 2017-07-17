/* global T, describe, expect, it, xit, beforeEach, afterEach, fdescribe, spyOn, fit $ */
'use strict';

describe('Easy form', function() {
	var $node,
		efv;

	function responseMock(test, errorMsg) {
		var response = {
			errmsg: 'FAIL'
		};

		$.getJSON.and.callFake(function(url) {
			if (test !== undefined && test.test(url)) {
				response.errmsg = errorMsg;
			}

			return {
				always: function(cb) {
					cb(response);
				}
			};
		});
	}

	beforeEach(function() {
		$node = T.withModule('easy_form', true);
		efv = window.estatico.easyFormValidation;
		spyOn(efv, 'onSubmit').and.callThrough();

		// initialize easy form with the injected form element
		efv.init($node);
		spyOn($, 'getJSON');
		spyOn(efv, 'validateElement').and.callThrough();
		// default validator response mock
		responseMock();
	});

	afterEach(function() {
		T.tearDown();
		$node.empty().remove();
	});


	it('Should invoke on submit when form is submitted', function() {
		$node.find('#form-buttons-submit').click();
		expect(efv.onSubmit).toHaveBeenCalled();
	});


	describe('text field', function() {
		it('Should display field error if input field is empty', function(done) {
			// submit form
			efv.onSubmit($.Event('submit')).always(function() {
				// validation method was called
				expect(efv.validateElement).toHaveBeenCalled();
				expect($node.find('#formfield-form-widgets-foo')).toContain('.error');
				done();
			});
		});

		it('Should NOT display field error if input field HAS value', function(done) {
			$node.find('#formfield-form-widgets-foo input').val('test').trigger('input');

			responseMock(/test/, '');

			// submit form
			efv.onSubmit($.Event('submit')).always(function() {
				// validation method was called
				expect(efv.validateElement).toHaveBeenCalled();
				expect($node.find('#formfield-form-widgets-foo')).not.toContain('.error');
				done();
			});
		});
	});


	describe('Choice field (radio)', function() {
		it('Should display field error if selection is empty', function(done) {
			// submit form
			efv.onSubmit($.Event('submit')).always(function() {
				// validation method was called
				expect(efv.validateElement).toHaveBeenCalled();
				expect($node.find('#formfield-form-widgets-checkme')).toContain('.error');
				done();
			});
		});

		it('Should NOT display field error if input field HAS value', function(done) {
			$node.find('input#form-widgets-checkme-1').click();
			// submit form
			efv.onSubmit($.Event('submit')).always(function() {
				// validation method was called
				expect(efv.validateElement).toHaveBeenCalled();
				expect($node.find('#formfield-form-widgets-checkme')).not.toContain('.error');
				done();
			});
		});
	});

	describe('Choice field', function() {
		it('Should display field error if selection is empty', function(done) {
			efv.onSubmit($.Event('submit')).always(function() {
				// validation method was called
				expect(efv.validateElement).toHaveBeenCalled();
				expect($node.find('#formfield-form-widgets-choice')).not.toContain('.has-value');
				done();
			});
		});
	});


	describe('checkbox', function() {
		it('Should display field error if AGBs are not selected', function(done) {
			// submit form
			efv.onSubmit($.Event('submit')).always(function() {
				expect($node.find('#formfield-form-widgets-agb')).toContain('.error');
				done();
			});
		});
	});
});

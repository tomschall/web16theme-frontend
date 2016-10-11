'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			tabs: [
				{
					title: 'Vertiefung 1',
					tabContent: '<h3>Lorem ipsum Dolores</h3><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p><p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, ali.</p>'
				},
				{
					title: 'Vertiefung 2',
					tabContent: '<h3>Lorem ipsum Vertiefung</h3><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p><p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, ali.</p>'
				},
				{
					title: 'Vertiefung 3',
					tabContent: '<h3>Lorem ipsum 3. Vertiefung</h3><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p><p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, ali.</p>'
				}
			]
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Tabulatoren | WI_011',
				description: '',
				code: dataHelper.getTemplateCode('tabnavigation.hbs'),
				documentation: dataHelper.getDocumentation('tabnavigation.md'),
				mocks: [{
					description: null,
					data: dataHelper.getFormattedJSON(templateData)
				}]
			}
		}, templateData);

module.exports = data;

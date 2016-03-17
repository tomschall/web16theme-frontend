'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../../../helpers/data.js'),
	defaultData = requireNew('../../../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Demo: Tabs, panel 4',
			jira: 'ESTATICO-72',
			feature: 'Feature Tabs',
			hideFromListing: true,
			code: dataHelper.getTemplateCode('tab3.hbs')
		},
		fields: [
			{
				type: 'radio',
				name: 'dishes',
				value: 'radio1',
				label: 'Deep Dish'
			}, {
				type: 'radio',
				name: 'dishes',
				value: 'radio2',
				label: 'Thick and cheesy'
			}, {
				type: 'radio',
				name: 'dishes',
				value: 'radio3',
				label: 'Thick and spicy'
			}, {
				type: 'radio',
				name: 'dishes',
				value: 'radio4',
				label: 'Thin'
			}
		]
	});

module.exports = data;

'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Breadcrumb | WI_008',
			description: '',
			code: dataHelper.getTemplateCode('breadcrumb.hbs'),
			documentation: dataHelper.getDocumentation('breadcrumb.md')
		},
		items: [
			{
				'url': '#',
				'title': '',
				'extraClasses': 'is_home'
			}, {
				'url': '#',
				'title': 'Weiterbildung',
				'extraClasses': ''
			}, {
				'url': '#',
				'title': 'Wirtschaft',
				'extraClasses': ''
			}
		]
	});

module.exports = data;

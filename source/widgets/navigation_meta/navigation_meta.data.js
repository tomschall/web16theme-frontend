'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Navigation Meta',
			description: '',
			code: dataHelper.getTemplateCode('navigation_meta.hbs'),
			documentation: dataHelper.getDocumentation('navigation_meta.md')
		},
		items: [
			{
				url: '#',
				title: 'Accessibility'
			}, {
				url: '#',
				title: 'Legal notice'
			}, {
				url: '#',
				title: 'Disclaimer'
			}, {
				url: '#',
				title: 'Intranet'
			}, {
				url: '#',
				title: 'Sitemap'
			}
		]
	});

module.exports = data;

'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			entries: [
				{
					url: '#',
					title: 'Cookie Policy'
				}, {
					url: '#',
					title: 'Rechtliches'
				}, {
					url: '#',
					title: 'Impressum'
				}, {
					url: '#',
					title: 'Sitemap'
				}, {
					url: '#',
					title: 'Barrierefreiheit'
				}, {
					url: '#',
					title: 'Login Intranet'
				}
			]
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Footer Meta | WI_042',
				description: '',
				code: dataHelper.getTemplateCode('navigation_meta.hbs'),
				documentation: dataHelper.getDocumentation('navigation_meta.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;

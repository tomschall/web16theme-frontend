'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Breadcrumb',
			description: '',
			code: dataHelper.getTemplateCode('breadcrumb.hbs'),
			documentation: dataHelper.getDocumentation('breadcrumb.md')
		},
		items: [
			{
				'url': '#',
				'title': 'Online-Marketing'
			}, {
				'url': '#',
				'title': 'Wirtschaft'
			}, {
				'url': '#',
				'title': 'CAS Zertifikatslehrgänge'
			}
		]
	});

module.exports = data;

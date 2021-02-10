'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
		entries: [
			{
				'url': '../startpage_prototype/startpage_prototype.html',
				'title': '',
				'extraClasses': 'is_home'
			}, {
				'url': '#',
				'title': 'Weiterbildung',
				'extraClasses': ''
			}, {
				'url': '.#',
				'title': 'Fachbereiche',
				'extraClasses': ''
			},
			{
				'url': '.#',
				'title': 'Lorem ipsum dolor sit amet',
				'extraClasses': ''
			},
			{
				'url': '.#',
				'title': 'At vero eos et accusam et justo duo dolores et ea rebum',
				'extraClasses': ''
			}
		],
		langStrings: {
			extend: 'Breadcrumb erweitern'
		}
	},
	data = _.merge(defaultData, {
		meta: {
			title: 'Breadcrumb-Navigation | WI_008',
			description: '',
			code: dataHelper.getTemplateCode('breadcrumb.hbs'),
			documentation: dataHelper.getDocumentation('breadcrumb.md'),
			mocks: [
				{
					description: null,
					data: dataHelper.getFormattedJSON(templateData)
				}
			]
		}
	}, templateData);

module.exports = data;

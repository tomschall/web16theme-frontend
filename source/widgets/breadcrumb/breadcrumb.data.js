'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
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

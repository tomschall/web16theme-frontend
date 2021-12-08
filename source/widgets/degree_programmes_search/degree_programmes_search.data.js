'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {},
		data = _.merge(defaultData, {
			meta: {
				title: 'Degree Programmes | WI_077',
				description: '',
				code: dataHelper.getTemplateCode('degree_programmes_search.hbs'),
				documentation: dataHelper.getDocumentation('degree_programmes_search.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;

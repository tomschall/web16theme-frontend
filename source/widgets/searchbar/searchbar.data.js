'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	langStrings: {
		allResults: 'Alle Suchergebnisse'
	}
}, data = _.assign(defaultData, {
		meta: {
			title: 'Globales Suchfeld | WI_005',
			description: '',
			code: dataHelper.getTemplateCode('searchbar.hbs'),
			documentation: dataHelper.getDocumentation('searchbar.md'),
			mocks: [
				{
					data: dataHelper.getFormattedJSON(templateData),
					description: null
				}
			]
		}
	}, templateData);

module.exports = data;

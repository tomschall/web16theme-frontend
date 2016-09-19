'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			langStrings: {
				allResults: 'Alle Suchergebnisse für',
				all: 'Alle',
				advancedStudiesFoundPlural: 'Weiterbildungsangebote gefunden',
				advancedStudiesFoundSingular: 'Weiterbildungsangebot gefunden',
				more: 'Mehr Informationen'
			},
			jsonURL: '/mocks/widgets/searchpage/searchpage.category.json'
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Suchseite Formular | WI_061',
				description: '',
				code: dataHelper.getTemplateCode('searchpage.hbs'),
				documentation: dataHelper.getDocumentation('searchpage.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;

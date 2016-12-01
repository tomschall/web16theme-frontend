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
				more: 'Mehr Informationen',
				toProfile: 'Zum Profil',
				email: 'E-Mail',
				phoneDirect: 'T Direkt',
				phoneCentral: 'T Zentrale'
			},
			jsonURL: '/mocks/widgets/searchpage/searchpage.category.json',
			filterURL: '/mocks/widgets/searchpage/searchpage.updateFilter.mock.json'
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

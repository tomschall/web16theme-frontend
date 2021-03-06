'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			langStrings: {
				allResults: 'Alle Suchergebnisse für',
				all: 'Alle',
				resultsFoundPlural: 'Weiterbildungsangebote gefunden',
				resultsFoundSingular: 'Weiterbildungsangebot gefunden',
				noResultsFound: 'Keine Ergebnisse gefunden',
				more: 'Mehr Informationen',
				toProfile: 'Zum Profil',
				email: 'E-Mail',
				phoneDirect: 'T Direkt',
				phoneCentral: 'T Zentrale',
				furtherOccasions: 'Weitere Durchführungen',
        onRequest: 'Auf Anfrage',
        moreResultsGetLoaded: 'Weitere Resultate werden geladen…'
			},

			jsonURL: '/mocks/widgets/searchpage/searchpage.category.json',
			filterURL: '/mocks/widgets/searchpage/searchpage.updateFilter.json'
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

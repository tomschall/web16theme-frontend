'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Suchen sie nach einem berufsbegleitenden Studium?',
			infoBoxContent: '<p>Möchten sie neben Ihrem Beruf noch ein Studium in Angriff nehmen, um sich professionell weiterzuentwickeln?</p><p>Wir bieten unsere Bachelor-Studiengänge auch berufsbegleitend an.</p>',
			button: {
				url: '#',
				label: 'Mehr Erfahren'
			}
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Infobox | WI_060',
				description: '',
				code: dataHelper.getTemplateCode('infobox.hbs'),
				documentation: dataHelper.getDocumentation('infobox.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;

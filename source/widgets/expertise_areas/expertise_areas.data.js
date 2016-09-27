'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Kompetenzgebiete',
			text: 'Hier finden Sie unsere Kompetenzgebiete lorem ipsum dolor vanitas carpe diem memento mori alea iacta est.',
			link: {
				url: '#',
				title: 'Alle ansehen'
			},
			landingpageURL: '/pages/ppp/ppp.html'
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Kompetenz Auswahl | WI_062',
				description: '',
				code: dataHelper.getTemplateCode('expertise_areas.hbs'),
				documentation: dataHelper.getDocumentation('expertise_areas.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;

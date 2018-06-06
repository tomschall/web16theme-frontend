'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	title: 'Some title',
	description: 'And some description Die FHNW ist eine der führenden Fachhochschulen in der Schweiz und ist mit ihren neun Hochschulen in Lehre, Forschung, Weiterbildung und Dienstleistung tätig – innovativ und praxisorientiert. Ihr breites Angebot an Studiengängen, ihre Nähe zur Praxis, ihre anwendungsorientierte und innovationsstarke Forschung sowie ihre weltweite',
	links: [
		{
			title: 'Die neun Hochschulen der FHNW',
			description: 'Die Fachhochschule Nordwestschweiz FHNW umfasst neun Hochschulen, die auf die Hauptstandorte Aarau, Basel, Brugg/Windisch, Muttenz und Olten konzentriert sind.',
			url: '../universities_overview/universities_overview.html'
		}, {
			title: 'Bibliotheken der FHNW',
			description: 'Die Fachhochschule Nordwestschweiz FHNW verfügt an ihren verschiedenen Standorten über zahlreiche Bibliotheken',
			url: '../library_overview/library_overview.html',
					news_detail: {
					    news_date: '27.06.2017',
					    university: 'Hochschule für angewandte Psychologie'
					},
		}
	],
	moreButton: {
		url: '#',
		label: 'Alle Ansehen'
	}
},
	data = _.merge(defaultData, {
		meta: {
			title: 'Link-Liste | WI_017',
			description: '',
			code: dataHelper.getTemplateCode('extendedlinks.hbs'),
			documentation: dataHelper.getDocumentation('extendedlinks.md'),
			mocks: [
				{
					description: null,
					data: dataHelper.getFormattedJSON(templateData)
				}
			]
		}
	}, templateData);

module.exports = data;

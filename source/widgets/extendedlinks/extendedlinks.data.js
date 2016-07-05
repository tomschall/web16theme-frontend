'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	links: [
		{
			title: 'Die neun Hochschulen der FHNW',
			description: 'Die Fachhochschule Nordwestschweiz FHNW umfasst neun Hochschulen, die auf die Hauptstandorte Aarau, Basel, Brugg/Windisch, Muttenz und Olten konzentriert sind.',
			url: '../universities_overview/universities_overview.html'
		}, {
			title: 'Bibliotheken der FHNW',
			description: 'Die Fachhochschule Nordwestschweiz FHNW verfügt an ihren verschiedenen Standorten über zahlreiche Bibliotheken',
			url: '../library_overview/library_overview.html'
		}
	]
},
	data = _.merge(defaultData, {
		meta: {
			title: 'Extended Links',
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

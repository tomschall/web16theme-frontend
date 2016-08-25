'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			img: {
				src: '/assets/media/img/info_events_example.png',
				alt: 'Symbolbild Infoveranstaltungen'
			},
			text: '<p>Die Hochschule für Soziale Arbeit FHNW führt regelmässig Informationsveranstaltungen an beiden Standorten durch, in denen ausführlich über das Bachelor-Studium in Sozialer Arbeit informiert wird.</p><p>Für alle Bewerberinnen und Bewerber wird der Besuch einer Informationsveranstaltung vorausgesetzt. Die Anmeldung ist erforderlich, hier geht es zum Anmeldeformular.</p>',
			events: [
				{
					date: 'Mittwoch, 14.09.2016',
					time: '17.15 - 19.15 Uhr',
					location: 'Olten',
					url: '#'
				},
				{
					date: 'Mittwoch, 12.10.2016',
					time: '17.15 - 19.15 Uhr',
					location: 'Basel',
					url: '#'
				},
				{
					date: 'Mittwoch, 14.11.2016',
					time: '17.15 - 19.15 Uhr',
					location: 'Windisch',
					url: '#'
				}
			],
			allURL: '#',
			roomInfo: 'Raum: beachten sie bitte die elektronische Anzeigetafel im Eingangsbereich'
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Infoveranstaltungen | WI_056',
				description: '',
				code: dataHelper.getTemplateCode('info_teaser.hbs'),
				documentation: dataHelper.getDocumentation('info_teaser.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;

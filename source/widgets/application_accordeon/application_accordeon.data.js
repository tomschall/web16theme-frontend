'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Anmeldung',
			description: 'Lorem ipsum dolores sit <a href="http://help.fhnw.ch/">Help</a> amet:',
			entries: [
				{
					uid: '1',
					eventStart: 'Basel, 19.09.2016 test',
					eventLocation: 'InfoTag im Rahmen von Next generation 2017',
					availableSeats: 3,
					availabilityState: 'state-red',
					informationEntries: [
						{
							label: 'Start- und Endtermin',
							text: '01.01.2016 - 15.05.2016',
							iCalURL: '#'
						},
						{
							label: 'Dauer',
							text: '6 Monate'
						},
						{
							label: 'ECTS-Punkte',
							text: '15 Credits'
						},
						{
							label: 'Durchführungsort(e)',
							text: 'HS Soziale Arbeit FHNW, Von Roll Str 10, 4600 Olten'
						},
						{
							label: 'Freie Plätze',
							text: '12'
						},
						{
							label: 'Anzahl Teilnehmer',
							text: '6 - 18'
						},
						{
							label: 'Nummer',
							text: 'X0.12345'
						}
					],
					additionalInformation: 'Wichtige Informationen zur Anmeldung Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
					btnUrl: '#',
					applyLabel: 'Anmelden long button text',
					applicationIsActive: true
				},
				{
					uid: '2',
					eventStart: 'Basel, 13.05.2017',
					eventLocation: 'Infotag zum OPEN HOUSE 2018',
					availableSeats: 12,
					availabilityState: 'state-green',
					informationEntries: [
						{
							label: 'Start- und Endtermin',
							text: '01.01.2016 - 15.05.2016',
							iCalURL: '#'
						},
						{
							label: 'Dauer',
							text: '6 Monate'
						},
						{
							label: 'ECTS-Punkte',
							text: '15 Credits'
						},
						{
							label: 'Durchführungsort(e)',
							text: 'HS Soziale Arbeit FHNW, Von Roll Str 10, 4600 Olten'
						},
						{
							label: 'Freie Plätze',
							text: '12'
						},
						{
							label: 'Anzahl Teilnehmer',
							text: '6 - 18'
						},
						{
							label: 'Nummer',
							text: 'X0.12345'
						}
					],
					additionalInformation: 'Wichtige Informationen zur Anmeldung Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
					btnUrl: '#',
					iCalURL: '#',
					applyLabel: 'Anmelden',
					applicationIsActive: false
				},
				{
					uid: '3',
					eventStart: 'Windisch, 17.09.2017',
					eventLocation: 'Infotag zum OPEN HOUSE 2018',
					availableSeats: 12,
					availabilityState: 'state-green',
					informationEntries: [
						{
							label: 'Start- und Endtermin',
							text: '01.01.2016 - 15.05.2016',
							iCalURL: '#'
						},
						{
							label: 'Dauer',
							text: '6 Monate'
						},
						{
							label: 'ECTS-Punkte',
							text: '15 Credits'
						},
						{
							label: 'Durchführungsort(e)',
							text: 'HS Soziale Arbeit FHNW, Von Roll Str 10, 4600 Olten'
						},
						{
							label: 'Freie Plätze',
							text: '12'
						},
						{
							label: 'Anzahl Teilnehmer',
							text: '6 - 18'
						},
						{
							label: 'Nummer',
							text: 'X0.12345'
						}
					],
					additionalInformation: 'Wichtige Informationen zur Anmeldung Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
					btnUrl: '#',
					iCalURL: '#',
					applyLabel: 'Warteliste',
					applicationIsActive: true
				},
				{
					uid: '4',
					eventStart: '17.09.2017',
					eventLocation: 'Superextremlanger Titel mit vielen einzelnen Worten und langem Text',
					availableSeats: 12,
					availabilityState: 'state-green',
					informationEntries: [
						{
							label: 'Start- und Endtermin',
							text: '01.01.2016 - 15.05.2016',
							iCalURL: '#'
						},
						{
							label: 'Dauer',
							text: '6 Monate'
						},
						{
							label: 'ECTS-Punkte',
							text: '15 Credits'
						},
						{
							label: 'Durchführungsort(e)',
							text: 'HS Soziale Arbeit FHNW, Von Roll Str 10, 4600 Olten'
						},
						{
							label: 'Freie Plätze',
							text: '12'
						},
						{
							label: 'Anzahl Teilnehmer',
							text: '6 - 18'
						},
						{
							label: 'Nummer',
							text: 'X0.12345'
						}
					],
					additionalInformation: 'Wichtige Informationen zur Anmeldung Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
					btnUrl: '#',
					iCalURL: '#',
					applyLabel: 'Warteliste',
					applicationIsActive: true
				},
			],
			langStrings: {
				moreInformation: 'mehr Informationen',
				eventStart: 'Durchführungsbeginn',
				eventLocation: 'Veranstaltungsort',
				availableSeats: 'Freie Plätze',
				applyOnline: 'Online Anmelden'
			}
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Application Accordeon | WI_058',
				description: '',
				code: dataHelper.getTemplateCode('application_accordeon.hbs'),
				documentation: dataHelper.getDocumentation('application_accordeon.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;

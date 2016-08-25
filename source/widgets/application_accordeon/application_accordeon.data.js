'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			entries: [
				{
					uid: '1',
					eventStart: '19.09.2016',
					eventLocation: 'Basel',
					availableSeats: 3,
					availabilityState: 'state-red',
					informationEntries: [
						{
							label: 'Start- und Endtermin',
							text: '01.01.2016 - 15.05.2016'
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
					btnUrl: '#'
				},
				{
					uid: '2',
					eventStart: '13.05.2017',
					eventLocation: 'Basel',
					availableSeats: 12,
					availabilityState: 'state-green',
					informationEntries: [
						{
							label: 'Start- und Endtermin',
							text: '01.01.2016 - 15.05.2016'
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
					btnUrl: '#'
				},
				{
					uid: '3',
					eventStart: '17.09.2017',
					eventLocation: 'Basel',
					availableSeats: 12,
					availabilityState: 'state-green',
					informationEntries: [
						{
							label: 'Start- und Endtermin',
							text: '01.01.2016 - 15.05.2016'
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
					btnUrl: '#'
				}
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
				title: 'Application Accordeon',
				description: '',
				code: dataHelper.getTemplateCode('application_accordeon.hbs'),
				documentation: dataHelper.getDocumentation('application_accordeon.md')
			}
		}, templateData);

module.exports = data;

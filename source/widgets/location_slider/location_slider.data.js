'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			entries: [
				{
					type: 'location',
					title: 'Campus Olten',
					navTitle: 'Standort Olten',
					address: {
						name: 'Fachhochschule Nordwestschweiz FHNW',
						department: 'Campus-Bibliothek Olten 6.1C',
						street: 'Bahnhofstrasse 6',
						zipCity: '5200 Olten'
					},
					contactData: {
						telephone: '+41 56 202 77 70',
						email: 'bibliothek.windisch@fhnw.ch'
					},
					locationPageURL: '/pages/location_brugg/location_brugg.html',
					routeURL: 'https://maps.google.ch',
					coordinates: {
						x: '7.907837',
						y: '47.347906'
					}
				},
				{
					type: 'location',
					title: 'Campus Brugg-Windisch',
					navTitle: 'Standort Brugg',
					address: {
						name: 'Fachhochschule Nordwestschweiz FHNW',
						department: 'Campus-Bibliothek Brugg-Windisch 6.1C',
						street: 'Bahnhofstrasse 6',
						zipCity: '5210 Windisch'
					},
					contactData: {
						telephone: '+41 56 202 77 70',
						email: 'bibliothek.windisch@fhnw.ch'
					},
					locationPageURL: '/pages/location_brugg/location_brugg.html',
					routeURL: 'https://maps.google.ch',
					coordinates: {
						x: '7.907837',
						y: '47.347906'
					}
				}
			]
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Location Slider | WI_057',
				description: '',
				code: dataHelper.getTemplateCode('location_slider.hbs'),
				documentation: dataHelper.getDocumentation('location_slider.md')
			}
		}, templateData);

module.exports = data;

'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	title: 'Kontakt',
	persons: [
		{
			fullname: 'Prof. Dr. Maria Muster',
			contactPageURL: '#',
			jobDescription: 'Institutsleitung',
			phone: '+41 62 957 24 26',
			phone_2: '+41 62 957 24 00',
			phone_addon: 'DIREKT',
			phone_addon_2: 'EMPFANG',
			email: 'maria.muster@fhnw.ch',
			img: {
				src: '/assets/media/img/img_contact_woman.png',
				alt: 'Prof. Dr. Maria Muster'
			}
		},
		{
			fullname: 'Prof. Dr. Felix Specimen',
			contactPageURL: '#',
			jobDescription: 'Wissenschaftlicher Assistent, Institut für Wirtschaftsinformatik',
			phone: '+41 62 957 24 26',
			phone_2: '+41 62 957 24 00',
			phone_addon: 'DIREKT',
			phone_addon_2: 'ZENTRALE',
			email: 'adrian.schwaninger@fhnw.ch',
			img: {
				src: '/assets/media/img/img_contact_sidebar.png',
				alt: 'Prof. Dr. Adrian Schwaninger'
			}
		}
	],
	langStrings: {
		telephone: 'Telefon',
		email: 'E-Mail'
	}
},

data = _.merge(defaultData, {
		meta: {
			title: 'Kontaktprofil | WI_009',
			description: '',
			code: dataHelper.getTemplateCode('contact.hbs'),
			documentation: dataHelper.getDocumentation('contact.md'),
			mocks: [{
				description: null,
				data: dataHelper.getFormattedJSON(templateData)
			}]
		}
	}, templateData);

module.exports = data;

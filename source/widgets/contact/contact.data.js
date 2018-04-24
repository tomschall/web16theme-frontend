'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	title: 'Kontakt',
	persons: [
		{
			fullname: 'Prof. Dr. Adrian Schwaninger',
			contactPageURL: '#',
			jobDescription: 'Institutsleitung',
			phone: '+41 62 957 24 26',
			email: 'dmljdG9yLmZlcm5hbmRlejJAdXBjbmV0LmVz',
			img: {
				src: '/assets/media/img/img_contact_sidebar.png',
				alt: 'Prof. Dr. Adrian Schwaninger'
			}
		},
		{
			fullname: 'Prof. Dr. Maria Muster',
			contactPageURL: '#',
			jobDescription: 'Institutsleitung',
			phone: '+41 62 957 24 26',
			email: 'bcOpQG1lLmNvbSB0byBnZW9tYWlsdG86YmNPcFFHMWxMbU52YlE9PQ==',
			img: {
				src: '/assets/media/img/img_contact_woman.png',
				alt: 'Prof. Dr. Maria Muster'
			}
		},
		{
			fullname: 'Prof. Dr. Maria Muster',
			contactPageURL: '#',
			jobDescription: 'Institutsleitung',
			phone: '+41 62 957 24 26',
			email: 'bWVAbWUuY29tIHRvIGdlb21haWx0bzpiV1ZBYldVdVkyOXQ=',
			img: {
				src: '/assets/media/img/img_contact_woman.png',
				alt: 'Prof. Dr. Maria Muster'
			}
		},
		{
			fullname: 'Prof. Dr. Maria Muster',
			contactPageURL: '#',
			jobDescription: 'Institutsleitung',
			phone: '+41 62 957 24 26',
			email: 'bWVAbWUuY29tP3N1YmplY3Q9VGVzdCB0byBnZW9tYWlsdG86YldWQWJXVXVZMjl0UDNOMVltcGxZM1E5VkdWemRBPT0=',
			img: {
				src: '/assets/media/img/img_contact_woman.png',
				alt: 'Prof. Dr. Maria Muster'
			}
		},
		{
			fullname: 'Prof. Dr. Maria Muster',
			contactPageURL: '#',
			jobDescription: 'Institutsleitung',
			phone: '+41 62 957 24 26',
			email: 'bWVAbWUuY29tP3N1YmplY3Q9VGVzdCZib2R5PVRlc3QgdG8gZ2VvbWFpbHRvOmJXVkFiV1V1WTI5dFAzTjFZbXBsWTNROVZHVnpkQ1ppYjJSNVBWUmxjM1E9',
			img: {
				src: '/assets/media/img/img_contact_woman.png',
				alt: 'Prof. Dr. Maria Muster'
			}
		},
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

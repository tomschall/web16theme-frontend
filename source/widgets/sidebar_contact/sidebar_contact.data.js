'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Kontakt',
			contacts: [
				{
					img: {
						src: '/assets/media/img/portrait_foto/foto_1.png',
						alt: 'Portrait Prof. Dr. Hans Muster'
					},
					name: 'Prof. Dr. Hans Muster',
					url: '#',
					jobDescr: 'Leitung',
					email: 'hans.muster@fhnw.ch',
					telephone: '+41 62 957 00 00',
					telephone_addon: 'DIREKT',
					telephone_2: '+41 62 957 11 22',
					telephone_addon_2: 'ZENTRALE',
					room: '1.045'
				},
				{
					img: {
						src: '/assets/media/img/portrait_foto/foto_2.png',
						alt: 'Portrait Prof. Dr. Hans Muster'
					},
					name: 'Prof. Dr. Hans Muster',
					url: '#',
					jobDescr: 'Leitung',
					email: 'hans.muster@fhnw.ch',
					telephone: '+41 62 957 24 00',
					telephone_addon: 'DIREKT',
					telephone_2: '+41 62 957 00 00',
					telephone_addon_2: 'ZENTRALE'
				}
			],
			langStrings: {
				telephone: 'Telefon',
				email: 'E-Mail',
				location: 'Standort',
				room: 'Raum'
			}
		},
		data = _.assign(defaultData, {
			meta: {
				title: 'Sidebar Kontakt | WI_053',
				description: '',
				code: dataHelper.getTemplateCode('sidebar_contact.hbs'),
				documentation: dataHelper.getDocumentation('sidebar_contact.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;

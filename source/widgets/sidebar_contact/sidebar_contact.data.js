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
					email: 'aGFucy5tdXN0ZXJAZmhudy5jaA==',
					telephone: '+41 62 957 24 26'
				},
				{
					img: {
						src: '/assets/media/img/portrait_foto/foto_2.png',
						alt: 'Portrait Prof. Dr. Hans Muster'
					},
					name: 'Prof. Dr. Hans Muster',
					url: '#',
					jobDescr: 'Leitung',
					email: 'aGFucy5tdXN0ZXJAZmhudy5jaA==',
					telephone: '+41 62 957 24 26'
				}
			],
			langStrings: {
				telephone: 'Telefon',
				email: 'E-Mail',
				location: 'Standort'
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

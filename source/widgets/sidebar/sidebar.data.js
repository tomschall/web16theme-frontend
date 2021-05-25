'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Sidebar | WI_051',
		description: '',
		code: dataHelper.getTemplateCode('sidebar.hbs'),
		documentation: dataHelper.getDocumentation('sidebar.md'),
	},
	widgets: {
		application: _.assign(
			requireNew('../edu_application/edu_application.data.js')
		),
		events: _.assign(requireNew('../edu_events/edu_events.data.js')),
		keydata: _.assign(
			requireNew('../edu_key_data/edu_key_data.data.js')
		),
		contact: [
			{
				title: 'Kontakt',
				contacts: [
					{
						img: {
							src: '/assets/media/img/portrait_foto/foto_1.png',
							alt: 'Portrait Prof. Dr. Hans Muster',
						},
						name: 'Prof. Dr. Hans Nötig',
						url: '#',
						telephone: '044 444 44 44',
						telephone_addon: 'Direkt',
						telephone_2: '052 256 56 67',
						telephone_addon_2: 'Mobil',
						jobDescr: null,
						location: 'sdfsds',
						email: 'laure.polexe@fhnw.ch',
						room: '6.4A7',
					},
				],
				langStrings: {
					telephone: 'Telefon',
					email: 'E-Mail',
					location: 'Standort',
					room: 'Raum',
				},
			},
			{
				title: 'Sekretariat',
				contacts: [
					{
						img: {
							src: '/assets/media/img/portrait_foto/foto_1.png',
							alt: 'Portrait Prof. Dr. Hans Muster',
						},
						name: 'Prof. Dr. Felix Muster',
						title: 'Sekretariat',
						url: '#',
						telephone: '044 444 44 44',
						jobDescr: null,
						location: 'sdfsds',
						email: 'laure.polexe@fhnw.ch',
					},
				],
				langStrings: {
					telephone: 'Telefon',
					email: 'E-Mail',
					location: 'Standort',
					room: 'Raum',
				},
			},
		],
	},
});

module.exports = data;

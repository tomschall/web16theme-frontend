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
			documentation: dataHelper.getDocumentation('sidebar.md')
		},
		widgets: {
			application: _.assign(requireNew('../sidebar_application/sidebar_application.data.js')),
			events: _.assign(requireNew('../sidebar_events/sidebar_events.data.js')),
			keydata: _.assign(requireNew('../sidebar_key_data/sidebar_key_data.data.js')),
			contact: [
				{title:'Kontakt',
				 contacts: [{
				 	name: 'Laura Polexe',
					title: 'Sekretariat',
					url: 'http://localhost:8180/Plone/de/personen/laura-polexe',
					telephone: '044 444 44 44',
					jobDescr: null,
					location: 'sdfsds',
					email: 'laure.polexe@fhnw.ch'
				}]},
				{title: 'Sekretariat',
				 contacts: [{
					name: 'Laura Polexe',
					title: 'Sekretariat',
					url: 'http://localhost:8180/Plone/de/personen/laura-polexe',
					telephone: '044 444 44 44',
					jobDescr: null,
					location: 'sdfsds',
					email: 'laure.polexe@fhnw.ch'
				}]}
			],
		}
	});

module.exports = data;

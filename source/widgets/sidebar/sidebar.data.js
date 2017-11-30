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
			contact: _.assign(requireNew('../sidebar_contact/sidebar_contact.data.js')),
			secretariat: _.assign(requireNew('../sidebar_contact/sidebar_contact.data.js'), {
				title: 'Sekretariat',
				contacts: [{
					name: 'Laura Polexe',
					title: 'Sekretariat',
					url: 'http://localhost:8180/Plone/de/personen/laura-polexe',
					telephone: '044 444 44 44',
					jobDescr: null,
					location: 'sdfsds',
					email: 'bGF1cmUucG9sZXhlQGZobncuY2g='
				}]
			}),
			degreeleadership: _.assign(requireNew('../sidebar_contact/sidebar_contact.data.js'), {
				title: 'Degreeleadership',
				contacts: [{
					name: 'kontaktperson',
					title: 'Degreeleadership',
					url: 'http://localhost:8180/Plone/de/personen/kontaktperson',
					telephone: '05555555',
					location: 'Bahnhofstrasse 6\r\n5210 Windisch',
					email: 'Y2hyaXN0aW5hLmNvcnNvQGZobncuY2g='
				}]
			}),
			leadership: _.assign(requireNew('../sidebar_contact/sidebar_contact.data.js'), {
				title: 'Leadership',
				contacts: [{
					name: 'kontaktperson',
					title: 'Leadership',
					url: 'http://localhost:8180/Plone/de/personen/kontaktperson',
					telephone: '0564620000',
					location: 'Bahnhofstrasse 6\r\n5210 Windisch',
					email: 'Y2hyaXN0aW5hLmNvcnNvQGZobncuY2g='
				}]
			})
		}
	});

module.exports = data;

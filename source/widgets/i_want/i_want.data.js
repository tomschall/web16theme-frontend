'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	img: {
		src: '/assets/media/img/bg_i_want_1.jpg'
	},
	title: 'Ich möchte studieren:',
	defaultText: 'Studienrichtung wählen ...',
	options: [
		{
			text: 'Angewandte Psychologie',
			url: '/pages/alumni/alumni.html'
		},
		{
			text: 'Architektur, Bau und Geomatik',
			url: '/pages/bachelor_social_work/bachelor_social_work.html'
		},
		{
			text: 'Gestaltung und Kunst',
			url: '/pages/cas_eingliederungsmanagement/cas_eingliederungsmanagement.html'
		}
	]
}, data = _.merge(defaultData, {
		meta: {
			title: 'I want',
			description: '',
			code: dataHelper.getTemplateCode('i_want.hbs'),
			documentation: dataHelper.getDocumentation('i_want.md'),
			mocks: [
				{
					description: null,
					data: dataHelper.getFormattedJSON(templateData)
				}
			]
		}
	}, templateData);

module.exports = data;

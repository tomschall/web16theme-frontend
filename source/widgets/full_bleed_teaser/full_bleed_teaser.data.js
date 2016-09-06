'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			img: {
				src: '/assets/media/img/full_bleed_emagazin.png',
				alt: 'Das neue E-Magazin'
			},
			title: 'Nachwuchsförderung',
			description: 'Der wissenschaftliche Nachwuchs wird an der FHNW unter spezieller Berücksichtigung von Gleichstellungsaspekten gefördert.',
			url: '#',
			linkText: 'Mehr Erfahren'
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Full Bleed Teaser',
				description: '',
				code: dataHelper.getTemplateCode('full_bleed_teaser.hbs'),
				documentation: dataHelper.getDocumentation('full_bleed_teaser.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;

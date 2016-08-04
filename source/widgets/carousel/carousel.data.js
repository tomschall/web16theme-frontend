'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	slides: [
		{
			title: 'Campus in Muttenz öffnet im Jahre 2018 die Tore',
			category: 'Neuer Standort',
			link: '#',
			image: '/assets/media/img/bg_home_02.jpg'
		},
		{
			title: 'FHNW bei Studierenden weiterhin beliebt',
			category: 'Neuer Jahresbericht',
			link: '#',
			image: '/assets/media/img/bg_home_03.jpg'
		},
		{
			title: 'Kommunikation und Online-Marketing',
			category: 'Infoabend',
			link: '#',
			image: '/assets/media/img/bg_home_01.jpg'
		},
		{
			title: 'Video',
			category: 'Test',
			link: '#',
			video: '/assets/media/video/video_test.mp4'
		}
	]
},
data = _.merge(defaultData, {
	meta: {
		title: 'Startseite Carousel mit Text | WI_041',
		description: '',
		code: dataHelper.getTemplateCode('carousel.hbs'),
		documentation: dataHelper.getDocumentation('carousel.md'),
		mocks: [
			{
				description: null,
				data: dataHelper.getFormattedJSON(templateData)
			}
		]
	},
	widgets: {
		teaser: requireNew('../teaser/teaser.data.js')
	}
}, templateData);

module.exports = data;

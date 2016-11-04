'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js'),
	teaserData = requireNew('../teaser/teaser.data.js');

var templateData = {
		slides: [
			{
				title: 'Video',
				category: 'Test',
				url: '/pages/about_us/about_us.html',
				video: '/assets/media/video/video_test.mp4'
			},
			{
				title: 'Campus in Muttenz öffnet im Jahre 2018 die Tore',
				category: 'Neuer Standort',
				url: '/pages/about_us/about_us.html',
				image: '/assets/media/img/bg_home_02.jpg'
			},
			{
				title: 'FHNW bei Studierenden weiterhin beliebt',
				category: 'Neuer Jahresbericht',
				url: '/pages/about_us/about_us.html',
				image: '/assets/media/img/bg_home_03.jpg'
			},
			{
				title: 'Kommunikation und Online-Marketing',
				category: 'Infoabend',
				url: '/pages/about_us/about_us.html',
				image: '/assets/media/img/bg_home_01.jpg'
			}
		],
		widgets: {
			teaser: {
				teasers: teaserData.teasers
			}
		}
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
		}
	}, templateData);

module.exports = data;

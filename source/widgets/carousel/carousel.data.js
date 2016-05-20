'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Carousel',
		description: '',
		code: dataHelper.getTemplateCode('carousel.hbs'),
		documentation: dataHelper.getDocumentation('carousel.md')
	},
	slides: [
		{
			title: 'Campus in Muttenz öffnet im Jahre 2018 die Tore',
			category: 'Neuer Standort',
			link: '#',
			image: 'bg-home-02.png'
		},
		{
			title: 'FHNW bei Studierenden weiterhin beliebt',
			category: 'Neuer Jahresbericht',
			link: '#',
			image: 'bg-home-03.png'
		},
		{
			title: 'Kommunikation und Online-Marketing',
			category: 'Infoabend',
			link: '#',
			image: 'bg-home-01.png'
		}
	],
	widgets: {
		teaser: requireNew('../teaser/teaser.data.js')
	}
});

module.exports = data;

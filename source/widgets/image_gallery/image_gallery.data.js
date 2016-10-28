'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			slides: [
				{
					img: {
						src: '/assets/media/img/campus_brugg.png',
						alt: 'Beispielbield'
					},
					legend: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et'
				},
				{
					img: {
						src: '/assets/media/img/campus_brugg.png',
						alt: 'Beispielbield'
					},
					legend: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et'
				},
				{
					img: {
						src: '/assets/media/img/campus_brugg.png',
						alt: 'Beispielbield'
					},
					legend: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et'
				}
			]
		},
		data = _.merge(defaultData, {
		meta: {
			title: 'Image Gallery',
			description: '',
			code: dataHelper.getTemplateCode('image_gallery.hbs'),
			documentation: dataHelper.getDocumentation('image_gallery.md')
		}
	}, templateData);

module.exports = data;

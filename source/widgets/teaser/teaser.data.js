'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	teasers: [
		{
			title: 'Campus Dreispitz (Basel)',
			link: '#',
			img: {
				src: '/assets/media/img/campus_dreispitz.png',
				alt: 'Campus Dreispitz'
			}
		},
		{
			title: 'Campus Brugg-Windisch',
			link: '#',
			img: {
				src: '/assets/media/img/campus_brugg.png',
				alt: 'Campus Brugg-Windisch'
			}
		},
		{
			title: 'Campus Muttenz',
			link: '#',
			img: {
				src: '/assets/media/img/campus_muttenz.png',
				alt: 'Campus Muttenz'
			}
		},
		{
			title: 'Campus Olten',
			link: '#',
			img: {
				src: '/assets/media/img/campus_olten.png',
				alt: 'Campus Olten'
			}
		}
	],
	langStrings: {
		toLinkTarget: 'zu',
		projectTime: 'Projektdauer'
	}
},
data = _.merge(defaultData, {
		meta: {
			title: 'Teaser (halb, voll, 1/3, 1/4) | WI_028',
			code: dataHelper.getTemplateCode('teaser.hbs')
		},
		mocks: [
			{
				description: null,
				data: dataHelper.getFormattedJSON(templateData)
			}
		]

	}, templateData);

module.exports = data;

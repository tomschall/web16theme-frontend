'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
		title: 'Das ist ein Teaser',
		teasers: [
			{
				dateline: 'CAS',
				title: 'Campus Dreispitz (Basel)',
				url: '#',
				img: {
					src: '/assets/media/img/campus_dreispitz.png',
					alt: 'Campus Dreispitz',
				},
			},
			{
				dateline: 'MAS',
				title: 'Campus Brugg-Windisch',
				url: '#',
				img: {
					src: '/assets/media/img/campus_brugg.png',
					alt: 'Campus Brugg-Windisch',
				},
			},
			{
				dateline: 'Bachelor of Science',
				title: 'Campus Muttenz',
				url: '#',
				img: {
					src: '/assets/media/img/campus_muttenz.png',
					alt: 'Campus Muttenz',
				},
			},
			{
				dateline: 'Bachelor of Science',
				title: 'Campus Olten',
				url: '#',
				img: {
					src: '/assets/media/img/campus_olten.png',
					alt: 'Campus Olten',
				},
			},
		],
		moreButton: {
			label: 'Alle ansehen',
			url: '#',
		},
		isOnStartpage: false,
		langStrings: {
			toLinkTarget: 'zu',
			projectTime: 'Projektdauer',
		},
	},
	data = _.merge(
		defaultData,
		{
			meta: {
				title: 'Teaser (halb, voll, 1/3, 1/4) | WI_028',
				code: dataHelper.getTemplateCode('teaser.hbs'),
				documentation: dataHelper.getDocumentation('teaser.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData),
					},
				],
			},
		},
		templateData
	);

module.exports = data;

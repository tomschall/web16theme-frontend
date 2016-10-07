'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			img: {
				src: '/assets/media/img/10-jahre.png',
				alt: '10 Jahre FHNW'
			},
			text: 'Am <b>1. Januar 2006</b> fiel der Startschuss.',
			buttonText: 'Mehr Informationen',
			url: '#'
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Promo-Teaser | WI_037',
				description: '',
				code: dataHelper.getTemplateCode('promoteaser.hbs'),
				documentation: dataHelper.getDocumentation('promoteaser.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;

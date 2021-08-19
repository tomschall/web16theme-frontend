'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			twitter: {
				text: 'Dies ist eine Seite der FHNW',
				action: 'Twittern'
			},
			mail: {
				text: 'Dies ist eine Seite der FHNW',
				action: 'Versenden'
			},
			linkedin: {
				text: 'Dies ist eine Seite der FHNW',
				action: 'Versenden'
			},
			facebook: {
				text: 'Eine coole Seite der FHNW die ich hier share',
				action: 'Empfehlen'
			},
			print: {
				text: 'Diese Seite drucken',
				action: 'Drucken'
			},
			langStrings: {
				sharePage: 'Diese Seite teilen:'
			}
		},
		data = _.merge(defaultData, {
		meta: {
			title: 'Tell-a-Friend / Share this Site | WI_021',
			description: '',
			code: dataHelper.getTemplateCode('so_me_share.hbs'),
			documentation: dataHelper.getDocumentation('so_me_share.md'),
			mocks: [
				{
					description: null,
					data: dataHelper.getFormattedJSON(templateData)
				}
			]
		}
	}, templateData);

module.exports = data;

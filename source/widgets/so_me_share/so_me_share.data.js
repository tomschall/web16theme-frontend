'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			twitter: {
				text: 'Dies ist eine Seite der FHNW'
			},
			mail: {
				text: 'Dies ist eine Seite der FHNW'
			},
			facebook: {
				text: 'Eine coole Seite der FHNW die ich hier share'
			}
		},
		data = _.merge(defaultData, {
		meta: {
			title: 'SoMe Share',
			description: '',
			code: dataHelper.getTemplateCode('so_me_share.hbs'),
			documentation: dataHelper.getDocumentation('so_me_share.md')
		}
	}, templateData);

module.exports = data;

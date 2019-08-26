'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
		logo_img: '/assets/media/img/fachhochschule-nordwestschweiz-fhnw-logo.svg',
		logo_url: '/',
		logo_alt: 'Fachhochschule Nordwestschweiz'
	},
	data = _.merge(defaultData, {
		meta: {
			title: 'LogoWechsler | WI_033',
			description: '',
			code: dataHelper.getTemplateCode('logo.hbs'),
			documentation: dataHelper.getDocumentation('logo.md')
		}
	}, templateData);

module.exports = data;

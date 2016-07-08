'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	address: 'Fachhochschule Nordwestschweiz FHNW<br />Campus Brugg-Windisch<br />Bahnhofstrasse 6<br />5210 Windisch<br />T +41 56 202 77 00',
	email: 'empfang.windisch@fhnw.ch'
},
data = _.merge(defaultData, {
		meta: {
			title: 'Location',
			description: '',
			code: dataHelper.getTemplateCode('location.hbs'),
			documentation: dataHelper.getDocumentation('location.md'),
			mocks: {
				documentation: null,
				data: dataHelper.getFormattedJSON(templateData)
			}
		}
	}, templateData);

module.exports = data;

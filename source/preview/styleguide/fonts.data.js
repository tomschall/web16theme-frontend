'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Fonts',
	},
	fonts: [{
		family: 'Raleway',
		font: [{
			weight: [300, 400, 500, 600, 700, 800],
			style: ['normal'],
			size: [16]
		}]
	}, {
		family: 'Egyptienne F LT W01_56 Italic',
		font: [{
			weight: [500],
			style: ['italic'],
			size: [12, 16, 22]
		}]
	}],
	additionalLayoutClass: 'sg_fonts'
});

module.exports = data;

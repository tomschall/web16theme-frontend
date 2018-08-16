'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Easy form Elements'
		},
		additionalLayoutClass: 'sg_forms'
	});

module.exports = data;

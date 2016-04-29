'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Startpage'
		},
		title: 'University of Applied Sciences and Arts Northwestern Switzerland FHNW',
		modules: {
			header: requireNew('../../modules/header/header.data.js'),
			navigation: requireNew('../../modules/navigation/navigation.data.js'),
      footer: requireNew('../../modules/footer/footer.data.js')
    }
	});

module.exports = data;

'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Basic template'
		},
		title: 'University of Applied Sciences and Arts Northwestern Switzerland FHNW',
		sectionTitle: 'Section header',
		text: 'Bulbasaur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ivysaur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venusaur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Charmander Lorem ipsum dolor sit amet, consectetur adipiscing elit. Charmeleon Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		modules: {
			navigation: requireNew('../../modules/navigation/navigation.data.js')
		}
	});

module.exports = data;

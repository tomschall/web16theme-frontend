'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Teaser',
			code: dataHelper.getTemplateCode('teaser.hbs')
		},
		teasers: [
			{
				title: 'Ringvorlesung 2016 «Diversity»',
				category: 'Aktuell',
				head: 'Lorem',
				link: '#',
				variant: 'widg_teaser__startpage'
			},
			{
				title: 'Aller Anfang ist schwer: So gelingt der Einstieg ins Studium',
				category: 'Lorem Ipsum',
				head: 'Story',
				link: '#',
				variant: 'widg_teaser__startpage'
			}
		]
	});

module.exports = data;

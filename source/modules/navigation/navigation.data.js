'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Navigation',
			description: '',
			code: dataHelper.getTemplateCode('navigation.hbs'),
			documentation: dataHelper.getDocumentation('navigation.md')
		},
		list: {
			level: 0,
			items: [
				{
					title: 'Studium',
					link: '#',
					list: {
						level: 1,
						items: [
							{
								title: 'Some section',
								link: '#'
							},
							{
								title: 'Another one',
								link: '#'
							}
						]
					}
				},
				{
					title: 'Weiterbildung',
					link: '#',
					list: {
						level: 1,
						items: [
							{
								title: 'Pokemon',
								link: '#',
								list: {
									level: 2,
									items: [
										{
											title: 'Pichu',
											link: '#'
										},
										{
											title: 'Pikachu',
											link: '#'
										},
										{
											title: 'Raichu',
											link: '#'
										}
									]
								}
							}
						]
					}
				},
				{
					title: 'Forschung & Praxis',
					link: '#',
					list: {
						level: 1,
						items: [
							{
								title: 'Section again',
								link: '#'
							},
							{
								title: 'Some other stuff',
								link: '#'
							},
							{
								title: 'Another one',
								link: '#'
							}
						]
					}
				},
				{
					title: 'Die FHNW',
					link: '#'
				}
			]
		}
	});

module.exports = data;

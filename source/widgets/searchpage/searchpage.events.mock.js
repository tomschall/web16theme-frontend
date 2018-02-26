'use strict';

var data = {
	'@id': '#',
	'category': 'events',
	'items': [
		{
			title: 'Titel mehrzeilig lorem ipsum dolor vanitas 1',
			description: 'Copy lorem ipsum dolor vanitas carpe diem memento mori alea iacta est dolorum.',
			date: '23. Januar 2017',
			'@id': '#',
			getIcon: true
		},
		{
			title: 'Titel mehrzeilig lorem ipsum dolor vanitas 2',
			date: '23. Januar 2017',
			description: 'Copy lorem ipsum dolor vanitas carpe diem memento mori alea iacta est dolorum.',
			'@id': '#',
			getIcon: true
		},
		{
			title: 'Titel mehrzeilig lorem ipsum dolor vanitas 3',
			date: '23. Januar 2017',
			description: 'Copy lorem ipsum dolor vanitas carpe diem memento mori alea iacta est dolorum. 3',
			'@id': '#',
			getIcon: false
		},
		{
			title: 'Titel mehrzeilig lorem ipsum dolor vanitas 4',
			date: '23. Januar 2017',
			description: 'Copy lorem ipsum dolor vanitas carpe diem memento mori alea iacta est dolorum. 4',
			'@id': '#',
			getIcon: true
		}
	],
	'facets': [
		{
			field: 'location',
			enable: [
				'basel'
			]
		},
		{
			field: 'study_type',
			enable: [
				'cas'
			]
		},
		{
			field: 'topic',
			enable: [
				'7200',
				'7203'
			]
		}
	],
	'items_total': 5
};

module.exports = data;

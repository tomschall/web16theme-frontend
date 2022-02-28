'use strict';

var _ = require('lodash'),
  requireNew = require('require-new'),
  defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
  meta: {
    title: 'Svelte: Education Search',
  },
  leadTitle: 'Education Search',
  leadText:
    'Im Mittelpunkt steht sowohl die berufliche Integration, als auch die soziale und gesundheitliche Integration von ' +
    'erwerbstätigen Personen, die auf Grund von Krankheit oder Unfall in ihrer Leistungserbringung verändert oder ' +
    'beeinträchtigt sind; und erwerbsfähigen Personen mit erschwerten Zugängen bei der Erst- und Reintegration in den ' +
    'Arbeitsmarkt; hierzu gehören unter anderem Personen, die erwerbslos sind, Personen mit Migrationshintergrund, ' +
    'junge Personen mit gesundheitlichen Belastungen, Personen mit Beeinträchtigungen und Behinderungen.',
  title: 'Studiengänge',
  description: 'Hier können sie nach Studiengängen stöbern.',
  widgetData: JSON.stringify({
    filterSubjectArea: true,
    filterDateLine: true,
    filterLocation: true,
    subjectAreaOptions: [
      {
        optionValue: '1000',
        optionLabel: 'Architektur, Bau & Geomatik',
        selected: false,
      },
      {
        optionValue: '1001',
        optionLabel: 'Gestaltung & Kunst',
        selected: false,
      },
      {
        optionValue: '1002',
        optionLabel: 'Informatik',
        selected: false,
      },
      {
        optionValue: '1003',
        optionLabel: 'International Studies',
        selected: false,
      },
      {
        optionValue: '1004',
        optionLabel: 'Life Sciences',
        selected: false,
      },
      {
        optionValue: '1005',
        optionLabel: 'Musik',
        selected: false,
      },
      {
        optionValue: '1006',
        optionLabel: 'Pädagogik',
        selected: false,
      },
      {
        optionValue: '1007',
        optionLabel: 'Psychologie',
        selected: false,
      },
      {
        optionValue: '1008',
        optionLabel: 'Soziale Arbeit',
        selected: false,
      },
      {
        optionValue: '1009',
        optionLabel: 'Technik',
        selected: false,
      },
      {
        optionValue: '1010',
        optionLabel: 'Wirtschaft',
        selected: false,
      },
    ],
    dateLineOptions: [
      {
        optionValue: '2000',
        optionLabel: 'CAS',
        selected: false,
      },
      {
        optionValue: '2001',
        optionLabel: 'DAS',
        selected: false,
      },
      {
        optionValue: '5d0fqcxtfd',
        optionLabel: 'Fachseminar',
        selected: false,
      },
      {
        optionValue: '2006',
        optionLabel: 'Fachtagung',
        selected: false,
      },
      {
        optionValue: '2007',
        optionLabel: 'Kurs',
        selected: false,
      },
      {
        optionValue: '2008',
        optionLabel: 'MAS',
        selected: false,
      },
      {
        optionValue: 'pqowmis6ev',
        optionLabel: 'MBA',
        selected: false,
      },
      {
        optionValue: '2013',
        optionLabel: 'Seminar',
        selected: false,
      },
      {
        optionValue: '2016',
        optionLabel: 'Summer School',
        selected: false,
      },
      {
        optionValue: '2018',
        optionLabel: 'Tagung',
        selected: false,
      },
      {
        optionValue: '2025',
        optionLabel: 'Winter School',
        selected: false,
      },
    ],
    locationOptions: [
      {
        optionValue: 'muttenz',
        optionLabel: 'Muttenz',
        selected: false,
      },
      {
        optionValue: 'basel',
        optionLabel: 'Basel',
        selected: false,
      },
      {
        optionValue: 'brugg-windisch',
        optionLabel: 'Brugg-Windisch',
        selected: false,
      },
      {
        optionValue: 'solothurn',
        optionLabel: 'Solothurn',
        selected: false,
      },
      {
        optionValue: 'crrsav5xc4',
        optionLabel: 'Andere',
        selected: false,
      },
    ],
    subject: [],
    jsonURL: 'http://localhost:8000/Plone/de/searchbar.json',
    filterURL: 'http://localhost:8000/Plone/de/searchbar.json',
  }),
  widgets: {
    projectTeasers: _.assign(
      requireNew('../../widgets/teaser/teaser.data.js'),
      {
        title: false,
        teasers: [
          {
            title: 'Mensch-Maschine-Interaktion im Betrieb SBB:',
            projectTime: '31.12.2018',
            variant: 'wide___third',
            text: 'Automatisierung in den Betriebszentralen der Zukunft',
            url: '#',
            img: {
              src: '/assets/media/img/miks_project_1.png',
              alt: 'MiKS Projekt 1',
            },
          },
          {
            title: 'Indirekte Steuerung und Selbstgefährdung',
            projectTime: '31.12.2018',
            variant: 'wide___third',
            text: 'Neue Herausforderungen für das betriebliche Gesundheitsmanagement: Umgang mit indirekter Steuerung und Selbstgefährdung in Betrieben',
            url: '#',
            img: {
              src: '/assets/media/img/miks_project_2.png',
              alt: 'MiKS Projekt 2',
            },
          },
          {
            title: 'Entrepreneur-Check',
            projectTime: '31.12.2018',
            variant: 'wide___third',
            text: 'Persönlichkeit & Gesundheit von Unternehmerinnen und Unternehmern',
            url: '#',
            img: {
              src: '/assets/media/img/miks_project_3.png',
              alt: 'MiKS Projekt 3',
            },
          },
        ],
        moreButton: false,
      }
    ),
    header: _.assign(
      {
        hasPromoTeaser: false,
        isCollapsible: false,
      },
      requireNew('../../widgets/header/header.data.js')
    ),
    hero: _.assign(
      {
        heroImage: '/assets/media/img/panorama.jpg',
        heroAlt: 'Symbolbild',
        breadcrumb: {
          entries: [
            {
              url: '../startpage_prototype/startpage_prototype.html',
              title: '',
              extraClasses: 'is_home',
            },
            {
              url: '#',
              title: 'Die FHNW',
              extraClasses: '',
            },
            {
              url: '#',
              title: 'Suche',
              extraClasses: '',
            },
          ],
        },
      },
      requireNew('../../widgets/hero/hero.data.js')
    ),
    navigation: requireNew('../../widgets/navigation/navigation.data.js'),
    footer: requireNew('../../widgets/footer/footer.data.js'),
    actionbuttons: requireNew(
      '../../widgets/actionbuttons/actionbuttons.data.js'
    ),
  },
});

module.exports = data;

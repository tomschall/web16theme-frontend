'use strict';

var _ = require('lodash'),
  requireNew = require('require-new'),
  defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
  meta: {
    title: 'Svelte: Education Search',
  },
  title: 'InContent Search',
  leadText:
    'Im Mittelpunkt steht sowohl die berufliche Integration, als auch die soziale und gesundheitliche Integration von ' +
    'erwerbstätigen Personen, die auf Grund von Krankheit oder Unfall in ihrer Leistungserbringung verändert oder ' +
    'beeinträchtigt sind; und erwerbsfähigen Personen mit erschwerten Zugängen bei der Erst- und Reintegration in den ' +
    'Arbeitsmarkt; hierzu gehören unter anderem Personen, die erwerbslos sind, Personen mit Migrationshintergrund, ' +
    'junge Personen mit gesundheitlichen Belastungen, Personen mit Beeinträchtigungen und Behinderungen.',
  langStrings: {
    title: 'Studiengänge',
    description: 'Hier können sie nach Studiengängen stöbern.',
  },
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
    subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
      title: 'Die FHNW',
      subtitle: 'Suchen',
      titleUrl: '#',
      entries: [
        {
          title: 'Studium suchen',
          url: '#',
          isBack: false,
        },
        {
          title: 'Weiterbildungen und Kurse suchen',
          url: '#',
          isBack: false,
        },
        {
          title: 'Personen suchen',
          url: '#',
          isBack: false,
        },
        {
          title: 'Veranstaltungen suchen',
          url: '#',
          isBack: false,
        },
        {
          title: 'News suchen',
          url: '#',
          isBack: false,
        },
        {
          title: 'Startseite',
          url: '#',
          isBack: true,
        },
      ],
    }),
    actionbuttons: requireNew(
      '../../widgets/actionbuttons/actionbuttons.data.js'
    ),
    facultyOptions: [
      {
        optionLabel: 'Architektur, Bau & Geomatik',
        optionValue: '1000',
      },
      {
        optionLabel: 'International Studies',
        optionValue: '1003',
      },
      {
        optionLabel: 'Life Sciences',
        optionValue: '1004',
      },
      {
        optionLabel: 'Musik',
        optionValue: '1005',
      },
    ],
    locationOptions: [
      {
        optionLabel: 'Basel',
        optionValue: 'basel',
      },
      {
        optionLabel: 'Muttenz',
        optionValue: 'mtz',
      },
      {
        optionLabel: 'Brugg-Windisch',
        optionValue: 'brg',
      },
      {
        optionLabel: 'Olten',
        optionValue: 'olt',
      },
      {
        optionLabel: 'Solothurn',
        optionValue: 'slt',
      },
    ],
    competenceOptions: [
      {
        optionLabel: '',
        optionValue: '',
      },
      {
        optionLabel: 'Akustik',
        optionValue: '7192',
      },
      {
        optionLabel: 'Andragogik',
        optionValue: '7191',
      },
      {
        optionLabel: 'Architektur',
        optionValue: '7193',
      },
      {
        optionLabel: 'Audiodesign',
        optionValue: '8335',
      },
      {
        optionLabel: 'Automation',
        optionValue: '7194',
      },
      {
        optionLabel: 'Banking/Finance/Controlling',
        optionValue: '7206',
      },
      {
        optionLabel: 'Bau',
        optionValue: '7195',
      },
      {
        optionLabel: 'Bauleitung',
        optionValue: '8080',
      },
      {
        optionLabel: 'Begabungs-/Begabtenförderung',
        optionValue: '7196',
      },
      {
        optionLabel: 'Behinderung/Integration',
        optionValue: '7197',
      },
      {
        optionLabel: 'Beratung/Coaching',
        optionValue: '7198',
      },
      {
        optionLabel: 'Berufsrolle',
        optionValue: '7199',
      },
      {
        optionLabel: 'Bildung - Schule - Unterricht',
        optionValue: '8092',
      },
      {
        optionLabel: 'Change Management',
        optionValue: '7200',
      },
      {
        optionLabel: 'Dirigieren',
        optionValue: '8336',
      },
      {
        optionLabel: 'Disziplin/Partizipation',
        optionValue: '7202',
      },
      {
        optionLabel: 'Eingliederungsmanagement',
        optionValue: '8026',
      },
      {
        optionLabel: 'Einkauf/Beschaffung',
        optionValue: '8096',
      },
      {
        optionLabel: 'Elektronik',
        optionValue: '7203',
      },
      {
        optionLabel: 'Energie',
        optionValue: '7204',
      },
      {
        optionLabel: 'Ethik',
        optionValue: '7205',
      },
      {
        optionLabel: 'Forschung',
        optionValue: '7207',
      },
      {
        optionLabel: 'Geomatik',
        optionValue: '7208',
      },
      {
        optionLabel: 'Gestalten - Musik - Bewegung',
        optionValue: '8095',
      },
      {
        optionLabel: 'Gesundheit',
        optionValue: '7209',
      },
      {
        optionLabel: 'Graphic Design and Typography',
        optionValue: '8347',
      },
      {
        optionLabel: 'Heterogenität',
        optionValue: '7210',
      },
      {
        optionLabel: 'Human Resource Management',
        optionValue: '7211',
      },
      {
        optionLabel: 'Improvisation',
        optionValue: '8337',
      },
      {
        optionLabel: 'Informatik',
        optionValue: '7212',
      },
      {
        optionLabel: 'Integration',
        optionValue: '7213',
      },
      {
        optionLabel: 'Jazz',
        optionValue: '8338',
      },
      {
        optionLabel: 'Kinder und Jugendhilfe',
        optionValue: '8377',
      },
      {
        optionLabel: 'Kinder/Jugendliche',
        optionValue: '7215',
      },
      {
        optionLabel: 'Komposition',
        optionValue: '8339',
      },
      {
        optionLabel: 'Kulturmanagement',
        optionValue: '7216',
      },
      {
        optionLabel: 'Kunststofftechnik',
        optionValue: '7217',
      },
      {
        optionLabel: 'Lerncoaching',
        optionValue: '7218',
      },
      {
        optionLabel: 'Logistik',
        optionValue: '7219',
      },
      {
        optionLabel: 'Management/Führung',
        optionValue: '7220',
      },
      {
        optionLabel: 'Maschinenbau',
        optionValue: '7221',
      },
      {
        optionLabel: 'Methoden',
        optionValue: '7223',
      },
      {
        optionLabel: 'Migration',
        optionValue: '7629',
      },
      {
        optionLabel: 'Mikrotechnologie',
        optionValue: '7224',
      },
      {
        optionLabel: 'Musik',
        optionValue: '8340',
      },
      {
        optionLabel: 'Musik und Bewegung',
        optionValue: '8341',
      },
      {
        optionLabel: 'Musikpädagogik',
        optionValue: '8343',
      },
      {
        optionLabel: 'Musikvermittlung',
        optionValue: '8344',
      },
      {
        optionLabel: 'Nachhaltigkeit',
        optionValue: '8184',
      },
      {
        optionLabel: 'Natur - Gesellschaft - Technik',
        optionValue: '8094',
      },
      {
        optionLabel: 'Nonprofit Management',
        optionValue: '7226',
      },
      {
        optionLabel: 'Ökologie',
        optionValue: '8183',
      },
      {
        optionLabel: 'Online-Marketing',
        optionValue: '7850',
      },
      {
        optionLabel: 'Pädagogischer ICT-Support',
        optionValue: '7227',
      },
      {
        optionLabel: 'Performance',
        optionValue: '8345',
      },
      {
        optionLabel: 'Praxisausbildende Soz.Arbeit',
        optionValue: '7228',
      },
      {
        optionLabel: 'Public Management',
        optionValue: '7879',
      },
      {
        optionLabel: 'Qualitätsmanagement',
        optionValue: '7231',
      },
      {
        optionLabel: 'Recht',
        optionValue: '7229',
      },
      {
        optionLabel: 'Schulleitung',
        optionValue: '7230',
      },
      {
        optionLabel: 'Schulmusik',
        optionValue: '8346',
      },
      {
        optionLabel: 'Sicherheitsmanagement',
        optionValue: '7232',
      },
      {
        optionLabel: 'Sozialmanagement',
        optionValue: '7233',
      },
      {
        optionLabel: 'Sozialplanung',
        optionValue: '8155',
      },
      {
        optionLabel: 'Sport',
        optionValue: '8385',
      },
      {
        optionLabel: 'Sprachen - Mathematik - Medien',
        optionValue: '8093',
      },
      {
        optionLabel: 'Stadtentwicklung',
        optionValue: '7819',
      },
      {
        optionLabel: 'Train-the-Trainers',
        optionValue: '7235',
      },
      {
        optionLabel: 'Umwelt',
        optionValue: '7239',
      },
      {
        optionLabel: 'Umweltmanagement',
        optionValue: '7237',
      },
      {
        optionLabel: 'Umweltrecht',
        optionValue: '8185',
      },
      {
        optionLabel: 'Umweltschutz',
        optionValue: '7238',
      },
      {
        optionLabel: 'Umwelttechnik',
        optionValue: '7236',
      },
      {
        optionLabel: 'Unternehmenskommunikation',
        optionValue: '7241',
      },
      {
        optionLabel: 'Usability/User Experience',
        optionValue: '8307',
      },
      {
        optionLabel: 'Weiterbildung im Bildungsraum',
        optionValue: '8145',
      },
      {
        optionLabel: 'Wirtschaftsinformatik/E-Business',
        optionValue: '7243',
      },
      {
        optionLabel: 'Zusammenarbeit',
        optionValue: '7244',
      },
    ],
  },
});

module.exports = data;

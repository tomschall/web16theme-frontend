export const testData = {
  '@id':
    'http://localhost:8000/Plone/de/@@searchbar.json?category=continuing_education&q=1848&taxonomy_datelines%5B%5D=infoanlass',
  items_total: 1,
  items: [
    {
      taxonomy_subjectarea: null,
      review_state: null,
      city: ['muttenz'],
      portal_type: 'EduProduct',
      UID: '77e1b8aa439645acb63a680adacef5db',
      taxonomy_datelines: ['2000'],
      description: '',
      img: {
        src: 'http://localhost:8000/Plone/de/++resource++fhnw.web16theme/img/fhnw_social_media_sharing.jpg',
        alt: '1848 - Testprodukt 1',
      },
      '@id':
        'http://localhost:8000/Plone/de/sandkasten/tests-adrian/1848-incontent-live-search-wb/1848-testprodukt-1',
      title: '1848 - Testprodukt 1',
      Description: '',
      start_continuing_education: '23.02.2022',
      '@type': 'EduProduct',
      path_string:
        '/Plone/de/sandkasten/tests-adrian/1848-incontent-live-search-wb/1848-testprodukt-1',
      Title: '1848 - Testprodukt 1',
    },
    {
      taxonomy_subjectarea: null,
      review_state: null,
      city: ['muttenz'],
      portal_type: 'EduProduct',
      UID: '77e1b8aa439645acb63a680adacef5db',
      taxonomy_datelines: ['2001'],
      description: '',
      img: {
        src: 'http://localhost:8000/Plone/de/++resource++fhnw.web16theme/img/fhnw_social_media_sharing.jpg',
        alt: '1848 - Testprodukt 2',
      },
      '@id':
        'http://localhost:8000/Plone/de/sandkasten/tests-adrian/1848-incontent-live-search-wb/1848-testprodukt-1',
      title: '1848 - Testprodukt 2',
      Description: '',
      start_continuing_education: '23.02.2022',
      '@type': 'EduProduct',
      path_string:
        '/Plone/de/sandkasten/tests-adrian/1848-incontent-live-search-wb/1848-testprodukt-1',
      Title: '1848 - Testprodukt 1',
    },
    {
      taxonomy_subjectarea: null,
      review_state: null,
      city: ['muttenz'],
      portal_type: 'EduProduct',
      UID: '77e1b8aa439645acb63a680adacef5db',
      taxonomy_datelines: ['2006'],
      description: '',
      img: {
        src: 'http://localhost:8000/Plone/de/++resource++fhnw.web16theme/img/fhnw_social_media_sharing.jpg',
        alt: '1848 - Testprodukt 3',
      },
      '@id':
        'http://localhost:8000/Plone/de/sandkasten/tests-adrian/1848-incontent-live-search-wb/1848-testprodukt-1',
      title: '1848 - Testprodukt 3',
      Description: '',
      start_continuing_education: '23.02.2022',
      '@type': 'EduProduct',
      path_string:
        '/Plone/de/sandkasten/tests-adrian/1848-incontent-live-search-wb/1848-testprodukt-1',
      Title: '1848 - Testprodukt 1',
    },
  ],
  category: 'continuing_education',
  template: 'livesearch',
  categoryTitle: 'Weiterbildung',
  categoryUrl: 'http://localhost:8000/Plone/search_filter#q=1848',
  categoryUrlText: 'Mehr anzeigen (1)',
  fieldHeaders: {
    title: 'Titel',
    study_type: 'Typ',
    faculty: 'Fachbereich',
    location: 'Standort',
    path_string: '',
    start_string_title: 'Nächste Durchführung',
  },
  facets: [
    {
      field: 'faculty[]',
      enable: [],
    },
    {
      field: 'taxonomy_datelines[]',
      enable: ['infoanlass'],
    },
    {
      field: 'location[]',
      enable: ['muttenz'],
    },
    {
      field: 'topic[]',
      enable: [],
    },
  ],
  highlighting: {
    '77e1b8aa439645acb63a680adacef5db': {
      Title: ['**1848** - Testprodukt 1'],
    },
  },
};

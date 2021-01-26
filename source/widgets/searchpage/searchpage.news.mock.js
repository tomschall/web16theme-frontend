'use strict';

var data = {
  '@id': '#',
  category: 'news',
  items: [
    {
      title: 'Seit 20 Jahren: Inspiration vor Ort bei Solothurner Filmtagen',
      entryText:
        'Solothurn – der Ort, der dem Schweizer Filmschaffen eine Bühne bietet – ist auch der kleinste Standort der PH FHNW.' +
        'Im Januar bieten die Filmtage ausgewählte Filmblöcke an, die von Studierenden und Lehrenden gerne besucht werden – ' +
        'dieses Jahr macht dabei keine Ausnahme.',
      url: '#',
      isExternal: false,
      news_detail: {
        news_date: '20.01.2021',
        university: 'Pädagogische Hochschule',
      },
    },
    {
      title: 'Nationales Netzwerk MINT-Bildung wird weitergeführt und ausgeweitet',
      entryText:
        'Mitte Dezember hat das Staatssekretariat für Bildung, Forschung und Innovation (SBFI) entschieden, das von der ' +
        'Hochschule für Technik FHNW und der Pädagogischen Hochschule FHNW geleitete Programm zur Schaffung bzw. Ausweitung ' +
        'eines Nationalen Netzwerks MINT-Bildung für vier weitere Jahre zu fördern.',
      url: '#',
      isExternal: false,
      news_detail: {
        news_date: '14.01.2021',
        university: 'Pädagogische Hochschule',
      },
    },
    {
      title: 'In Windisch kann man seit 40 Jahren Informatik studieren',
      entryText:
        '1980 begannen 29 Studenten ihr Informatik-Vollzeitstudium an der damaligen HTL Brugg-Windisch. Sie waren die ersten ' +
        'Informatik-Studierenden in der Schweiz.',
      url: '#',
      isExternal: true,
      news_detail: {
        news_date: '14.01.2021',
        university: 'Hochschule für Technik',
      },
    },
    {
      title: 'Coronavirus: Informationen zum Schutzkonzept der FHNW',
      entryText:
        'Diese organisatorischen und räumlichen Massnahmen trifft die' +
        'FHNW zum Schutz ihrer Mitarbeitenden, Studierenden und Weiterbildungsteilnehmenden.',
      url: '#',
      isExternal: true,
      news_detail: {
        news_date: '14.01.2021',
        university: 'Fachhochschule Nordwestschweiz',
      },
    },
    {
      title: 'Die Schweizer Unternehmerlandschaft wird weiblicher',
      entryText:
        'Eine Studie der Fachhochschule Nordwestschweiz FHNW untersuchte, wer die neuen Selbständigen in der Schweiz sind ' +
        'und analysierte ihre Motive und Herausforderungen, sowie den Erfolg und die Zukunftsaussichten. Die Daten stammen ' +
        'aus einer Umfrage unter neuen Unternehmen, die zwischen 2014 und 2019 gegründet wurden.',
      url: '#',
      isExternal: true,
      news_detail: {
        news_date: '14.01.2021',
        university: 'Hochschule für Wirtschaft',
      },
    },
  ],
  facets: [
    {
      field: 'school',
      enable: ['1000'],
    },
  ],
  items_total: 5,
};

module.exports = data;

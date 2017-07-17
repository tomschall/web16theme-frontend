module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine-jquery', 'jasmine'],

		files: [
			'./build/assets/css/main.css',
			'./testHelpers.js',
			'./build/assets/js/head.js',
			'./build/assets/js/main.js',

			// tests and widget templates
			'./source/**/*.test.js',
			'./.test/**/*.html' // generated test files
		],

		// list of files to exclude
		exclude: [],

		preprocessors: {
			'**/*.html': ['html2js']
		},

		html2JsPreprocessor: {
			stripPrefix: '.test/'
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		//logLevel: config.LOG_INFO,
		logLevel: config.LOG_DEBUG,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		browsers: ['PhantomJS'],
		//browsers: ['Chrome'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	})
};

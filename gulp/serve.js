'use strict';

/**
 * @function `gulp serve`
 * @desc Serve build directory on port 9000 (using `connect`).
 */

var gulp = require('gulp');

var taskName = 'serve',
	taskConfig = {
		src: './build/'
	};

gulp.task(taskName, function() {
	var connect = require('connect'),
		connectLivereload = require('connect-livereload'),
		connectServeStatic = require('serve-static'),
		proxy = require('http-proxy-middleware'),
		url = require('url'),
		http = require('http'),

		// exec = require('child_process').exec,
		open = require('open');

	var app = connect()
		//.use(proxy('/de/searchbar.json', {target: 'https://www.dev.fhnw.ch', secure: false}))
		//.use(proxy('/de/searchbar.json', {target: 'https://www0.fhnw.ch', secure: false}))
		//.use(proxy('/de/searchbar.json', {target: 'https://www0.test.fhnw.ch', secure: false, changeOrigin: true}))
		//.use(proxy('/de/searchbar.json', {target: 'https://www.fhnw.ch', secure: false, changeOrigin: true}))
		.use(proxy('/Plone/de', {target: 'https://localhost:8008', secure: false}))

		/*.use(connectLivereload())*/
		.use(function(req, res, next) {
			var parts = url.parse(req.url, true),
				delay = parts.query.delay;

			if (delay) {
				// Respond to optional 'delay' parameter
				// Example: http://localhost:9000/mocks/demo/modules/slideshow/modules.json?delay=5000
				setTimeout(function() {
					next();
				}, delay);
			} else {
				next();
			}
		})
		.use(connectServeStatic(taskConfig.src)),
	server = http.createServer(app).listen(9000);

	server.on('listening', function() {
		open('http://localhost:9000');
	});

	// Clean on exit
	// process.on('SIGINT', function() {
	// 	exec('gulp clean', function() {
	// 		process.exit(0);
	// 	});
	// });
});

module.exports = {
	taskName: taskName,
	taskConfig: taskConfig
};

const proxy = require('http-proxy-middleware');

// Configure proxys to comunicate frontend with backend.
module.exports = function(app) {
	app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
	app.use(proxy('/user', { target: 'http://localhost:5000' }));
	app.use(proxy('/user/logout', { target: 'http://localhost:5000' }));
	app.use(proxy('/devices', { target: 'http://localhost:5000' }));
	app.use(proxy('/devices/*', { target: 'http://localhost:5000' }));
	app.use(proxy('/google/devices', { target: 'http://localhost:5000' }));
	app.use(proxy('/add', { target: 'http://localhost:5000' }));
};

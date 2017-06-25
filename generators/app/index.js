'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var globby = require('globby');

module.exports = yeoman.Base.extend({
	init: function () {
		var cb = this.async();

		this.sourceRoot(path.join(__dirname, 'templates'));

		this.directory('css');
		this.directory('scss');
		this.directory('img');
		this.directory('js');

		globby.sync('*', {
			cwd: this.sourceRoot(),
			dot: true,
			nodir: true
		}).forEach(function (x) {
			this.copy(x);
		}, this);

		cb();
	}
});

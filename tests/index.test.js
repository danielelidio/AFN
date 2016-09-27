require('./test-helper');

var Index = require('../index');
var AFN = require('../app/AFN');

describe('Index Loading Class', function() {
	it('Should export an AFN class', function() {
		expect(new Index).to.be.an.instanceof(AFN);
	});
});
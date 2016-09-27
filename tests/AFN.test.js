require('./test-helper');

var AFN = require('../app/AFN');


describe('AFN Class', function() {
	describe('Phone Numbers', function() {
		var transictions = [
			{
				fromState: 's1',
				reading: /[0-9]{2,2}/,
				toState: 's2',
				write: function(regexResult) {
					return '+' + regexResult + ' ';
				}
			},
			{
				fromState: 's2',
				reading: /[0-9]{2,2}/,
				toState: 's3',
				write: function(regexResult) {
					return '(' + regexResult + ') ';
				}
			},
			{
				fromState: 's3',
				reading: /[0-9]{5,5}/,
				toState: 's4',
				write: function(regexResult) {
					return '' + regexResult + '';
				}
			},
			{
				fromState: 's4',
				reading: /[0-9]{4,4}/,
				//toState: 's4',
				write: function(regexResult) {
					return '-' + regexResult + '';
				}
			},

		];

		it('Should format in Brazilian Phone Number Format...', function() {
			var output = (new AFN(transictions)).transduce("5535988859698");
			expect(output).to.equal("+55 (35) 98885-9698");

			var output = (new AFN(transictions)).transduce("5535988888888");
			expect(output).to.equal("+55 (35) 98888-8888");
		});
	});


	describe('Dates', function() {
		transictions = [
			{
				fromState: 's1',
				reading: /[0-9]{2,2}/,
				toState: 's2',
				write: function(regexResult) {
					return regexResult + '/';
				}
			},
			{
				fromState: 's2',
				reading: /[0-9]{2,2}/,
				toState: 's3',
				write: function(regexResult) {
					return regexResult + '/';
				}
			},
			{
				fromState: 's3',
				reading: /[0-9]{4,4}/,
				//toState: 's4',
				write: function(regexResult) {
					return regexResult;
				}
			},
		];

		it('Should format in Brazilian Date Format...', function() {
			var output = (new AFN(transictions)).transduce("25091992");
			expect(output).to.equal("25/09/1992");

			var output = (new AFN(transictions)).transduce("0101/1987");
			expect(output).to.equal("01/01/1987");
		});
	});
});



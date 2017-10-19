require('./test-helper');

var AFN = require('../app/AFN');


describe('AFN Class', function() {
	describe('Invalid Inputs', function() {
		var transictions = [
			{
				fromState: 's1',
				reading: /[0-9]{3,3}/,
				write: function(regexResult) {
					return regexResult;
				}
			}
		];

		it('Should throw and error when input does not match with the automata definition...', function() {
			var output;

			output = (new AFN(transictions)).transduce("999");
			expect(output).to.equal("999");

			expect((function() {
				output = (new AFN(transictions)).transduce("a99");
			})).to.throw();

			expect((function() {
				output = (new AFN(transictions)).transduce("9a9");
			})).to.throw();

			expect((function() {
				output = (new AFN(transictions)).transduce("99a");
			})).to.throw();
		});
	});


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
				write: function(regexResult) {
					return '-' + regexResult + '';
				}
			},
		];

		it('Should format into Brazilian Phone Number Format...', function() {
			var output;
			output = (new AFN(transictions)).transduce("5531988859698");
			expect(output).to.equal("+55 (31) 98885-9698");

			output = (new AFN(transictions)).transduce("5535988888888");
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
				write: function(regexResult) {
					return regexResult;
				}
			},
		];

		it('Should format into Brazilian Date Format...', function() {
			var output = (new AFN(transictions)).transduce("25091992");
			expect(output).to.equal("25/09/1992");
		});
	});
});



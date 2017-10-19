var Transiction = require('./Transiction');

class AFN {
	// transiction = [s1, a] -> [s2, b]
	constructor(transictions) {
		var self = this;
		this.transictionTable = [];

		if(typeof transictions !== 'undefined') {
			transictions.forEach(function(val, index) {
				if(typeof self.transictionTable[val.fromState] === 'undefined')
					self.transictionTable[val.fromState] = [];

				self.transictionTable[val.fromState].push(new Transiction(val));
			});
		}
	}

	transduce(input) {
		var self = this;

		var output = [];

		var transictions = this.transictionTable[Object.keys(this.transictionTable)[0]];
		var inputCutIndex = 0;

		var actualTransiction = null;
		
		do {
			input = input.substring(inputCutIndex);

			var i = 0;
			transictions.every(function(transiction, index) {

				if(transiction.getReading() == null) {
					output.push(transiction.getWrite());
					actualTransiction = transiction;
					transictions = self.transictionTable[transiction.getToState()];

					return false;
				}
				else {
					var reading = transiction.getReading();
					if(i == 0) {
						reading = reading.toString().substring(1, reading.toString().length - 1);
						reading = (reading.substring(0, 1) != '^') ? ('^' + reading) : reading
						reading = new RegExp(reading);
					}

					var regexResult = reading.exec(input);

					if(regexResult != null) {
						var write = "";
						if(typeof transiction.getWrite() === 'function') {
							var writeFunc = transiction.getWrite();
							write = writeFunc(regexResult);
						}
						else {
							write = transiction.getWrite();
						}


						output.push(write);
						actualTransiction = transiction;
						transictions = self.transictionTable[transiction.getToState()];
						inputCutIndex = regexResult.toString().length;
						return false;
					}
					else {
						throw 'Invalid input format!';
					}
				}

				i++;
			});
			
		} while(actualTransiction.getToState() != null);


		output = output.join("");
		return output;
	}
}

module.exports = AFN;
class Transiction {
	constructor(transictionDef) {
		this.definition = null;

		if(typeof transictionDef === 'object' && transictionDef.constructor == Object) {
			this.setDefinitionFromObject(transictionDef);
		}
		else if(Array.isArray(transictionDef)) {
			this.setDefinitionFromArray(transictionDef);
		}
	}

	setDefinitionFromObject(transictionDef) {
		this.definition = transictionDef;
	}

	setDefinitionFromArray(transictionDef) {
		this.definition = {
			fromState: transictionDef[0],
			reading: transictionDef[1],
			toState: (transictionDef[2] != null) ? transictionDef[2] : null,
			write: transictionDef[3],
		};
	}

	getFromState() {
		return this.definition.fromState;
	}

	getReading() {
		return this.definition.reading;
	}

	getToState() {
		return this.definition.toState;
	}

	getWrite() {
		return this.definition.write;
	}
}

module.exports = Transiction;
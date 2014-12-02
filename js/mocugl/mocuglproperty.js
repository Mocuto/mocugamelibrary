(function() {

	/**
	* This class represents a glsl attribute within a WebGL shader program. It is a convenience class
	* for rendering purposes as well as extending the default rendering program
	*
	* @constructor 
	* @param {String} name - The name of the property
	* @param {String} glslName - The name of the corresponding variable in the shader program
	* @param {Number} components - The number of components (x,y,z,etc) for the given attribute
	* @param {Boolean} hasChanged - whether 
	*/
	MocuGame.MocuGlProperty = function(name, glslName, components, hasChanged) {
		this.name = name;
		this.glslName = glslName;
		this.components = components;
		this.values = [];
		this.hasChanged  = hasChanged;
	}

	MocuGame.MocuGlProperty.prototype.update = function(valueArray, startIndex, endIndex) {
	    while(this.values.length < endIndex) {
	        this.values.push(null);
	    }
	    for(var i = startIndex; i < endIndex; i++) {
	        this.values[i] = valueArray[(i - startIndex) % valueArray.length];
	    }
	}

	MocuGame.MocuGlProperty.prototype.getLength = function(primitives) {
		return MocuGame.VERTICES_PER_OBJECT * this.components * primitives;
	}
})();
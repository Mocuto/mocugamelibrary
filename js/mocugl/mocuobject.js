(function() {
	MocuGame.MocuObject.oldConstructor = MocuGame.MocuObject;
	MocuGame.MocuObject = function(point, size) {
		MocuGame.MocuObject.oldConstructor.call(this, point, size);
		this.hasTexCoordChanged = true;
	}


	MocuGame.MocuObject.prototype.composeProperty = function(propertyName, typeName, constructorFunc, hasChangedFunc) {
		var property = {};
		property["type"] = typeName;
		property["value"] = constructorFunc.call(this);
		property["hasChanged"] = hasChangedFunc.call(this);

		return property;
	}

	MocuGame.MocuObject.prototype.composePositionProperty = function() {
		return this.composeProperty(
			"position", 
			"attribute", 
			MocuGame.MocuObject.prototype.getCoordinateArray, 
			function() {
				return (this.lastGlWidth != this.width || this.height != this.lastGlHeight) 
			}
		);
	}

	MocuGame.MocuObject.prototype.composeTranslationProperty = function() {
		return this.composeProperty(
			"translation",
			"attribute",
			function() {
				return [
					(this.x + this.width / 2) + (-MocuGame.camera.x * scrollRate.x),
					(this.y + this.height / 2) + (-MocuGame.camera.y * scrollRate.y)
				]
			}, function() {
				return (this.lastGlX != this.x || this.lastGlY != this.y)
			}
		)
	}

	MocuGame.MocuObject.prototype.composeRotationProperty = function() {
		return this.composeProperty(
			"rotation",
			"attribute",
			function() {
				return [
			        rotation.push(Math.cos(MocuGame.deg2rad(this.angle))),
        			rotation.push(Math.sin(MocuGame.deg2rad(this.angle)))
				]
			}, function() {
				return (this.lastGlRotation != this.angle)
			}
		)
	}

	MocuGame.MocuObject.prototype.composeScaleProperty = function() {
		return this.composeProperty(
			"scale",
			"attribute",
			function() {
		        return [
			       	this.scale.x * MocuGame.camera.zoom,
	        		this.scale.y * MocuGame.camera.zoom
        		]
			}, function() {
				return (this.lastGlScaleX != this.scale.x || this.lastGlScaleY != this.scale.y)
			}
		)
	}

	MocuGame.MocuObject.prototype.composeFadeProperty = function() {
		return this.composeProperty(
			"fade",
			"attribute",
			function() {
		        return [
			        this.fade.r,
			        this.fade.g,
			        this.fade.b,
			        this.fade.a
        		]
			}, function() {
				return (this.lastGlScaleX != this.scale.x || this.lastGlScaleY != this.scale.y)
			}
		)
	}

	MocuGame.MocuObject.prototype.composeAlphaProperty = function() {
		return this.composeProperty(
			"alpha",
			"attribute",
			function() {
		        return [this.alpha]
			}, function() {
				return (this.lastGlScaleX != this.scale.x || this.lastGlScaleY != this.scale.y)
			}
		)
	}

	MocuGame.MocuObject.prototype.composeTextureCoordinateProperty = function() {
		return this.composeProperty(
			"texCoord", 
			"attribute", 
			MocuGame.MocuObject.prototype.getCoordinateArray, 
			function() {
				var hasChanged = this.hasTexCoordChanged;
				this.hasTexCoordChanged = false;
				return hasChanged; 
			}
		)
	}

	MocuGame.MocuObject.prototype.getGlProperties = function() {
		
	};
})();
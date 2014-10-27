(function() {

	MocuGame.MocuObject.EXTENSION_METHODS.push(function() {
		if(typeof MocuGame.renderer === "undefined") {
			return;
		}
        this.primitives = 1;
        var gl = MocuGame.renderer.gl;
        this.texture = null;
        this.effects = [];
        this.lastGlParent = null;
        this.lastGlParentIndex = -1;

        this.lastGlWidth = null;
        this.lastGlHeight = null;
        this.lastGlX = null;
        this.lastGlY = null;
        this.lastGlAngle = null;
        this.lastGlScaleX = null;
        this.lastGlScaleY = null;
        this.lastGlFadeR = null;
        this.lastGlFadeG = null
        this.lastGlFadeB = null
        this.lastGlFadeA = null
        this.lastGlAlpha = {};
	})

	if(typeof MocuGame.MocuObject.old === "undefined") {
		MocuGame.MocuObject.old = {};
		MocuGame.MocuObject.old.constructor = MocuGame.MocuObject.constructor;
		MocuGame.MocuObject.old.prototype = MocuGame.MocuObject.prototype;
	}

	MocuGame.MocuObject.prototype.composeProperty = function(constructorFunc, hasChangedFunc) {
		var property = {};
		property["value"] = constructorFunc.call(this);
		property["hasChanged"] = hasChangedFunc.call(this);

		return property;
	}

	MocuGame.MocuObject.prototype.composePositionProperty = function() {
		return this.composeProperty(
			MocuGame.MocuObject.prototype.getCoordinateArray, 
			function() {
				var hasChanged = (this.lastGlWidth != this.width || this.height != this.lastGlHeight) ;
				this.lastGlWidth = this.width;
				this.lastGlHeight = this.height;
				return hasChanged;
			}
		);
	}

	MocuGame.MocuObject.prototype.composeTranslationProperty = function() {
		return this.composeProperty(
			function() {
				return [
					(this.x + this.width / 2) + (-MocuGame.camera.x * scrollRate.x),
					(this.y + this.height / 2) + (-MocuGame.camera.y * scrollRate.y)
				]
			}, function() {
				var hasChanged = (this.lastGlX != this.x || this.lastGlY != this.y);
				this.lastGlX = this.x;
				this.lastGlY = this.y;
				return hasChanged;
			}
		)
	}

	MocuGame.MocuObject.prototype.composeRotationProperty = function() {
		return this.composeProperty(
			function() {
				return [
			        rotation.push(Math.cos(MocuGame.deg2rad(this.angle))),
        			rotation.push(Math.sin(MocuGame.deg2rad(this.angle)))
				]
			}, function() {
				var hasChanged = (this.lastGlRotation != this.angle)
				this.lastGlRotation = this.angle;
				return hasChanged;
			}
		)
	}

	MocuGame.MocuObject.prototype.composeScaleProperty = function() {
		return this.composeProperty(
			function() {
		        return [
			       	this.scale.x * MocuGame.camera.zoom,
	        		this.scale.y * MocuGame.camera.zoom
        		]
			}, function() {
				var hasChanged = (this.lastGlScaleX != this.scale.x || this.lastGlScaleY != this.scale.y)
				this.lastGlScaleX = this.scale.x;
				this.lastGlScaleY = this.scale.y;
				return hasChanged;
			}
		)
	}

	MocuGame.MocuObject.prototype.composeFadeProperty = function() {
		return this.composeProperty(
			function() {
		        return [
			        this.fade.r,
			        this.fade.g,
			        this.fade.b,
			        this.fade.a
        		]
			}, function() {
				var hasChanged = (
					this.fade.r != this.lastGlFadeR || 
					this.fade.g != this.lastGlFadeG || 
					this.fade.b != this.lastGLFadeB || 
					this.fade.a != this.lastGlFadeA
				)

				this.lastGlFadeR = this.fade.r;
				this.lastGlFadeG = this.fade.g;
				this.lastGlFadeB = this.fade.b;
				this.lastGlFadeA = this.fade.a;

				return hasChanged;
			}
		)
	}

	MocuGame.MocuObject.prototype.composeAlphaProperty = function() {
		return this.composeProperty(
			function() {
		        return [this.alpha]
			}, function() {
				var hasChanged = (this.alpha != this.lastGlAlpha)
				this.lastGlAlpha = this.alpha;
				return hasChanged
			}
		)
	}

	MocuGame.MocuObject.prototype.composeTextureCoordinateProperty = function() {
		return this.composeProperty(
			MocuGame.MocuObject.prototype.getCoordinateArray, 
			function() {
		        var hasChanged = this.hasTexCoordChanged
        		this.hasTexCoordChanged = false;
				return hasChanged; 
			}
		)		
	}

	MocuGame.MocuSprite.prototype.composeTextureCoordinateProperty = function() {
		return this.composeProperty(
			MocuGame.MocuObject.prototype.getCoordinateArray, 
			function() {
		        var hasChanged = (
		        	this.lastTexCoordWidth != this.width || 
		        	this.lastTexCoordHeight != this.height ||
            		this.lastTexCoordFrameY != this.frame.y || 
            		this.lastTexCoordFrameX != this.frame.x
        		);

        		this.lastTexCoordWidth = this.width;
        		this.lastTexCoordHeight = this.height;
        		this.lastTexCoordFrameX = this.frame.x;
        		this.lastTexCoordFrameY = this.frame.y;
				var hasChanged = this.hasTexCoordChanged;
				return hasChanged; 
			}
		)
	}

	MocuGame.MocuObject.prototype.getGlProperties = function() {

		return {
            "position" : this.composePositionProperty(),
            "translation": this.composeTranslationProperty(),
            "rotation": this.composeRotationProperty(),
            "scale": this.composeScaleProperty(),
            "fade": this.composeFadeProperty(),
            "alpha": this.composeAlphaProperty(),
            "texCoord": this.composeTextureCoordinateProperty()
            }
		
	};
})();
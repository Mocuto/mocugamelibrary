(function() {
	MocuGame.MocuBackground.EXTENSION_METHODS.push(function() {
	    this.numOfTiles = new MocuGame.Point(this.width / this.spriteSize.x, this.height / this.spriteSize.y);

	    this.primitives = Math.ceil(this.numOfTiles.x) * Math.ceil(this.numOfTiles.y) * 4;

	    this.lastScrollPositionX = null;
	    this.lastScrollPositionY = null; 
	};

    MocuGame.MocuBackground.prototype.getCoordinateArray = function () {

        var numOfTiles = this.numOfTiles;

        var coords = [];


        for (var x = 0; x < this.width; x += this.spriteSize.x) {
            for (var y = 0; y < this.height; y += this.spriteSize.y) {
                //var primStartX = (numOfTiles.x / -2 * this.spriteSize.x) + x;
                //var primStartY = (numOfTiles.y / -2 * this.spriteSize.y) + y;
                //var primWidth = (x + this.scrollPosition.x > this.width) ? (this.width - x) : this.width -  this.scrollPosition.x;
                //var primHeight = (y + this.scrollPosition.y > this.height) ? (this.height - y) : this.height - this.scrollPosition.y;
                //var primEndX = primStartX + primWidth;
                //var primEndY = primStartY + primHeight;

                //var absWidth = (x + this.spriteSize.x > this.width) ? ((this.width - x)) * MocuGame.uniscale : this.spriteSize.x * MocuGame.uniscale
                //var absHeight = (y + this.spriteSize.y > this.height) ? ((this.height - y)) * MocuGame.uniscale : this.spriteSize.y * MocuGame.uniscale

                //var secondStartX = primEndX;
                //var secondStartY = primEndY;
                //var secondEndX = primStartX + absWidth;
                //var secondEndY = primStartY + absHeight;
                var startX = (numOfTiles.x / -2 * this.spriteSize.x) + x;
                var startY = (numOfTiles.y / -2 * this.spriteSize.y) + y;

                var quad14X = startX + this.scrollPosition.x;
                var quad14Width = this.spriteSize.x - this.scrollPosition.x;

                var quad12Y = startY;
                var quad12YHeight = this.spriteSize.y - this.scrollPosition.y;

                var quad23X = startX;
                var quad23Width = this.scrollPosition.x;

                var quad34Y = quad12Y + quad12YHeight;
                var quad34YHeight = this.scrollPosition.y;

                //Quadrant I
                coords = coords.concat([
                    quad14X,                 quad12Y,
                    quad14X + quad14Width,   quad12Y,
                    quad14X,                 quad12Y + quad12YHeight,
                    quad14X,                 quad12Y + quad12YHeight,
                    quad14X + quad14Width,   quad12Y,
                    quad14X + quad14Width,   quad12Y + quad12YHeight
                ]);

                //Quadrant II
                coords = coords.concat([
                    quad23X,                 quad12Y,
                    quad23X + quad23Width,   quad12Y,
                    quad23X,                 quad12Y + quad12YHeight,
                    quad23X,                 quad12Y + quad12YHeight,
                    quad23X + quad23Width,   quad12Y,
                    quad23X + quad23Width,   quad12Y + quad12YHeight
                ]);

                //Quadrant III
                coords = coords.concat([
                    quad23X,                 quad34Y,
                    quad23X + quad23Width,   quad34Y,
                    quad23X,                 quad34Y + quad34YHeight,
                    quad23X,                 quad34Y + quad34YHeight,
                    quad23X + quad23Width,   quad34Y,
                    quad23X + quad23Width,   quad34Y + quad34YHeight
                ]);

                //Quadrant IV
                coords = coords.concat([
                    quad14X,                 quad34Y,
                    quad14X + quad14Width,   quad34Y,
                    quad14X,                 quad34Y + quad34YHeight,
                    quad14X,                 quad34Y + quad34YHeight,
                    quad14X + quad14Width,   quad34Y,
                    quad14X + quad14Width,   quad34Y + quad34YHeight
                ]);
            }
        }
        return new Float32Array(coords);
    }

    MocuGame.MocuBackground.prototype.getTextureCoordinateArray = function () {
        var coords = [];

        for (var x = 0; x < this.width; x += this.spriteSize.x) {
            for (var y = 0; y < this.height; y += this.spriteSize.y) {


                //Quadrant I
                var texStartX = 0;
                var texStartY = 0;
                var texWidth = (this.spriteSize.x - this.scrollPosition.x) / this.spriteSize.x;
                var texHeight = (this.spriteSize.y - this.scrollPosition.y) / this.spriteSize.y;

                coords = coords.concat([
                    texStartX,              texStartY,
                    texStartX + texWidth,   texStartY,
                    texStartX,              texStartY + texHeight,
                    texStartX,              texStartY + texHeight,
                    texStartX + texWidth,   texStartY,
                    texStartX + texWidth,   texStartY + texHeight
                ])

                //Quadrant II
                texStartX = (this.spriteSize.x - this.scrollPosition.x) / this.spriteSize.x;
                texStartY = 0;
                texWidth = 1 - texStartX;
                texHeight = (this.spriteSize.y - this.scrollPosition.y) / this.spriteSize.y;

                coords = coords.concat([
                    texStartX, texStartY,
                    texStartX + texWidth, texStartY,
                    texStartX, texStartY + texHeight,
                    texStartX, texStartY + texHeight,
                    texStartX + texWidth, texStartY,
                    texStartX + texWidth, texStartY + texHeight

                ])

                //Quadrant III
                texStartX = (this.spriteSize.x - this.scrollPosition.x) / this.spriteSize.x;
                texStartY = (this.spriteSize.y - this.scrollPosition.y) / this.spriteSize.y;
                texWidth = 1 - texStartX;
                texHeight = 1 - texStartY;

                coords = coords.concat([
                    texStartX, texStartY,
                    texStartX + texWidth, texStartY,
                    texStartX, texStartY + texHeight,
                    texStartX, texStartY + texHeight,
                    texStartX + texWidth, texStartY,
                    texStartX + texWidth, texStartY + texHeight

                ])

                //Quadrant IV
                texStartX = 0;
                texStartY = (this.spriteSize.y - this.scrollPosition.y) / this.spriteSize.y;
                texWidth = (this.spriteSize.x - this.scrollPosition.x) / this.spriteSize.x;
                texHeight = 1 - texStartY;

                coords = coords.concat([
                    texStartX, texStartY,
                    texStartX + texWidth, texStartY,
                    texStartX, texStartY + texHeight,
                    texStartX, texStartY + texHeight,
                    texStartX + texWidth, texStartY,
                    texStartX + texWidth, texStartY + texHeight

                ])

            }

        }

        return new Float32Array(coords);
    }

	MocuGame.MocuBackground.prototype.composePositionProperty = function() {
		return this.composeProperty(
            "position",
            "a_position",
            2,
			MocuGame.MocuObject.prototype.getCoordinateArray, 
			function() {
				var hasChanged = (this.lastGlWidth != this.width || this.height != this.lastGlHeight ||
                    this.lastScrollPositionX != this.scrollPosition.x || this.lastScrollPositionY != this.scrollPosition.y);
				this.lastGlWidth = this.width;
				this.lastGlHeight = this.height;
				return hasChanged;
			}
		);
	}

	MocuGame.MocuBackground.prototype.composeTranslationProperty = function() {
        var displacement = (MocuGame.MocuObject.prototype.isPrototypeOf(this.parent) == false) ? new MocuGame.Point(0,0) :
            this.parent.getWorldPoint();
		return this.composeProperty(
            "translation", //TODO:Redefine this as constants
            "a_translation",
            2,
			function() {
				var scrollRate = (this.cameraTraits == null) ? new MocuGame.Point(1, 1) : this.cameraTraits.scrollRate;
				return [
					displacement.x + (this.x + this.width / 2) + (-MocuGame.camera.x * scrollRate.x),
					displacement.y + (this.y + this.height / 2) + (-MocuGame.camera.y * scrollRate.y)
				]
			}, function() {
				var hasChanged = (this.lastGlX != this.getWorldPoint().x || this.lastGlY != this.getWorldPoint().y);
				this.lastGlX = this.getWorldPoint().x;
				this.lastGlY = this.getWorldPoint().y;
				return hasChanged;
			}
		)
	}

	MocuGame.MocuBackground.prototype.composeRotationProperty = function() {
		return this.composeProperty(
            "rotation",
            "a_rotation",
            2,
			function() {
				return [
			        Math.cos(MocuGame.deg2rad(this.angle)),
        			Math.sin(MocuGame.deg2rad(this.angle))
				]
			}, function() {
				var hasChanged = (this.lastGlRotation != this.angle)
				this.lastGlRotation = this.angle;
				return hasChanged;
			}
		)
	}

	MocuGame.MocuBackground.prototype.composeScaleProperty = function() {
		return this.composeProperty(
            "scale",
            "a_scale",
            2,
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

	MocuGame.MocuBackground.prototype.composeFadeProperty = function() {
		return this.composeProperty(
            "fade",
            "a_fade",
            4,
			function() {
				var fade = [];

				for(var i = 0; i < this.primitives; i++) {
					fade.push(this.fade.r);
					fade.push(this.fade.g);
					fade.push(this.fade.b);
					fade.push(this.fade.a);
				}
		        return fade;
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

	MocuGame.MocuBackground.prototype.composeAlphaProperty = function() {
		return this.composeProperty(
            "alpha",
            "a_alpha",
            1,
			function() {
				var alpha = [];
				for(var i = 0; i < this.primitives; i++) {
					alpha.push(this.alpha);
				}
		        return alpha;
			}, function() {
				var hasChanged = (this.alpha != this.lastGlAlpha)
				this.lastGlAlpha = this.alpha;
				return hasChanged
			}
		)
	}

	MocuGame.MocuBackground.prototype.composeTextureCoordinateProperty = function() {
		return this.composeProperty(
            "texCoord",
            "a_texCoord",
            2,
			MocuGame.MocuBackground.prototype.getCoordinateArray, 
			function() {
		        var hasChanged = this.lastTexCoordWidth != this.width || this.lastTexCoordHeight != this.height ||
            		this.lastTexCoordFrameY != this.frame.y || this.lastTexCoordFrameX != this.frame.x ||
                    this.lastScrollPositionX != this.scrollPosition.x || this.lastScrollPositionY != this.scrollPosition.y);
        		this.hasTexCoordChanged = false;
				return hasChanged; 
			}
		)		
	}

    /*MocuGame.MocuBackground.prototype.getGlProperties = function () {
        var position = this.getCoordinateArray();
        var texCoordHasChanged = (this.lastTexCoordWidth != this.width || this.lastTexCoordHeight != this.height ||
            this.lastTexCoordFrameY != this.frame.y || this.lastTexCoordFrameX != this.frame.x ||
                    this.lastScrollPositionX != this.scrollPosition.x || this.lastScrollPositionY != this.scrollPosition.y);
        var texCoords = this.getTextureCoordinateArray();
        var translation = [];
        var rotation = [];
        var scale = [];
        var cameraTranslation = [];
        var cameraZoom = [];
        var fade = [];
        var alpha = [];

        var scrollRate = new MocuGame.Point(0.0, 0.0);

        if (this.cameraTraits != null) {
            scrollRate = this.cameraTraits.scrollRate
        }

        else if (typeof this.parent !== "undefined") {
            if (this.parent.cameraTraits != null) {
                scrollRate = this.cameraTraits.scrollRate;
            }
        }

        for (var i = 0; i < this.primitives; i++) {
            translation.push((this.x + this.width / 2) + (-MocuGame.camera.x * scrollRate.x));
            translation.push((this.y + this.height / 2) + (-MocuGame.camera.y * scrollRate.y));

            rotation.push(Math.cos(MocuGame.deg2rad(this.angle)));
            rotation.push(Math.sin(MocuGame.deg2rad(this.angle)));

            scale.push(this.scale.x * MocuGame.camera.zoom);
            scale.push(this.scale.y * MocuGame.camera.zoom);

            fade.push(this.fade.r);
            fade.push(this.fade.g);
            fade.push(this.fade.b);
            fade.push(this.fade.a);

            alpha.push(this.alpha);
        }

        var result = {
            "position": {
                type: "attribute", value: position,
                hasChanged: (this.lastGlWidth != this.width || this.height != this.lastGlHeight ||
                    this.lastScrollPositionX != this.scrollPosition.x || this.lastScrollPositionY != this.scrollPosition.y)
            },
            "translation": {
                type: "attribute", value: translation,
                hasChanged: (this.lastGlX != this.x || this.lastGlY != this.y)
            },
            "rotation": {
                type: "attribute", value: rotation,
                hasChanged: (this.lastGlRotation != this.angle)
            },
            "scale": {
                type: "attribute", value: scale,
                hasChanged: (this.lastGlScaleX != this.scale.x || this.lastGlScaleY != this.scale.y)
            },
            "fade": {
                type: "attribute", value: fade,
                hasChanged: (this.lastGlFadeR != this.fade.r || this.lastGlFadeG != this.fade.g ||
                this.lastGlFadeB != this.fade.b || this.lastGlFadeA != this.fade.a)
            },
            "alpha": {
                type: "attribute", value: alpha,
                hasChanged: (this.lastGlAlpha != this.alpha)
            },
            "texCoord": {
                type: "attribute", value: texCoords,
                hasChanged: texCoordHasChanged
            }
        }
        this.lastGlWidth = this.width;
        this.lastGlHeight = this.height;
        this.lastGlX = this.x;
        this.lastGlY = this.y;
        this.lastGlRotation = this.angle;
        this.lastGlScaleX = this.scale.x;
        this.lastGlScaleY = this.scale.y;
        this.lastGlFadeR = this.scale.r;
        this.lastGlFadeG = this.scale.g;
        this.lastGlFadeB = this.scale.b;
        this.lastGlFadeA = this.scale.a;
        this.lastGlAlpha = this.alpha;
        this.lastScrollPositionX = this.scrollPosition.x;
        this.lastScrollPositionY = this.scrollPosition.y;

        return result;

    }*/
})();
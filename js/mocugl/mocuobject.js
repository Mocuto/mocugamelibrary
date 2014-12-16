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
        this.lastGlBatchIndex = -1;

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

	    MocuGame.MocuObject.prototype.getRenderingSize = function () {
        return new MocuGame.Point(this.width * this.scale.x * MocuGame.uniscale, this.height * this.scale.y * MocuGame.uniscale);
    }

    MocuGame.MocuObject.prototype.getCoordinateArray = function () {
        var absWidth = (this.width / 2) * MocuGame.uniscale;
        var absHeight = (this.height / 2) * MocuGame.uniscale;

        return [
                                -absWidth, -absHeight,
                                 absWidth, -absHeight,
                                -absWidth, absHeight,
                                -absWidth, absHeight,
                                absWidth, -absHeight,
                                absWidth, absHeight];
    };

    MocuGame.MocuObject.prototype.setPositionAttribute = function (gl, program, coordinateArray) {
        if (typeof coordinateArray === "undefined") {
            coordinateArray = this.getCoordinateArray();
        }


        var positionLocation = gl.getAttribLocation(program, "a_position");

        var positionBuffer = this.lastPositionBuffer;
        if (this.lastCoordinateArray != coordinateArray[0]) {


            // Provide position coordinates for the rectangle
            positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

            //Create a buffer and set it to use the array buffer
            gl.bufferData(gl.ARRAY_BUFFER, coordinateArray, gl.STREAM_DRAW)

            this.lastPositionBuffer = positionBuffer;
            this.lastCoordinateArray = coordinateArray[0];
        }
        else {
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        }

        //Activate the vertex attributes in the GPU program
        gl.enableVertexAttribArray(positionLocation);

        //Set the format of the positionLocation array
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    };

    MocuGame.MocuObject.prototype.setResolutionUniform = function (gl, program, resolution) {
        var resolutionLocation = (typeof this.resolutionLocation == "undefined") ? gl.getUniformLocation(program, "u_resolution") : this.resolutionLocation;
        this.resolutionLocation = resolutionLocation;

        MocuGame.renderer.resolution = resolution;
        if (MocuGame.renderer.lastResolution != resolution)
        {
            gl.uniform2fv(resolutionLocation, new Float32Array([resolution.x, resolution.y]));
            MocuGame.renderer.lastResolution = resolution;
        }
    }

    MocuGame.MocuObject.prototype.setScaleUniform = function (gl, program) {
        //Provide location of the scale uniform
        var scaleLocation = (typeof this.scaleLocation == "undefined") ? gl.getUniformLocation(program, "u_scale") : this.scaleLocation;
        this.scaleLocation = scaleLocation;
        gl.uniform2fv(scaleLocation, new Float32Array([this.scale.x, this.scale.y])); //Set the scake uniform
    }

    MocuGame.MocuObject.prototype.setRotationUniform = function (gl, program) {
        //Provide locaiton of the rotation uniform
        var rotateLocation = (typeof this.rotateLocation == "undefined") ? gl.getUniformLocation(program, "u_rotate") : this.rotateLocation;
        this.rotateLocation = rotateLocation;

        if (MocuGame.renderer.currentRotation != this.angle) {
            gl.uniform2fv(rotateLocation, new Float32Array([
                Math.cos(MocuGame.deg2rad(this.angle)), Math.sin(MocuGame.deg2rad(this.angle)) //Set the rotation uniform
            ]))
            MocuGame.renderer.currentRotation = this.angle;
        }
    }

    MocuGame.MocuObject.prototype.setTranslationUniform = function (gl, program, displacement) {
        //Provide location of the translate uniform
        if (this.__proto__.__proto__ == null) {
            return;
        }
        var translateLocation = (typeof this.translateLocation == "undefined") ? gl.getUniformLocation(program, "u_translate") : this.translateLocation;
        this.translateLocation = translateLocation;
        var translate = new Float32Array([
            ((this.x + displacement.x) + (this.width / 2)) * MocuGame.uniscale, ((this.y + displacement.y) + (this.height / 2)) * MocuGame.uniscale
        ]);
        gl.uniform2fv(translateLocation, translate); //Set the translate uniform
    };

    MocuGame.MocuObject.prototype.setAlphaUniform = function (gl, program) {
        var alphaLocation = (typeof this.alphaLocation == "undefined") ? gl.getUniformLocation(program, "u_alpha") : this.alphaLocation;
        this.alphaLocaiton = alphaLocation;

        gl.uniform1f(alphaLocation, this.alpha);
    };

    MocuGame.MocuObject.prototype.setCameraTranslationUniform = function (gl, program) {
        var scrollRate = new MocuGame.Point(0.0, 0.0);
        if (this.cameraTraits != null) {
            scrollRate = this.cameraTraits.scrollRate
        }

        else if (typeof this.parent !== "undefined") {
            if (this.parent.cameraTraits != null) {
                scrollRate = this.cameraTraits.scrollRate;
            }
        }

        var cameraTranslateLocation = (typeof this.cameraTranslateLocation == "undefined") ? gl.getUniformLocation(program, "u_cameraTranslate") : this.cameraTranslateLocation;
        this.cameraTranslateLocation = cameraTranslateLocation;
        if (MocuGame.renderer.currentCameraTranslate != new MocuGame.Point(-MocuGame.camera.x * scrollRate.x, -MocuGame.camera.y * scrollRate.y)) {
            var cameraTranslate = new Float32Array([
                -MocuGame.camera.x * scrollRate.x, -MocuGame.camera.y * scrollRate.y
            ]);
            gl.uniform2fv(cameraTranslateLocation, cameraTranslate);
        }
    };

    MocuGame.MocuObject.prototype.setCameraZoomUniform = function (gl, program) {
        var cameraZoomLocation = (typeof this.cameraZoomLocation == "undefined") ? gl.getUniformLocation(program, "u_cameraZoom") : this.cameraZoomLocation;
        this.cameraZoomLocation = cameraZoomLocation;
        gl.uniform1f(cameraZoomLocation, MocuGame.camera.zoom);
    };

    MocuGame.MocuObject.prototype.getTextureCoordinateArray = function () {
        var texWidth = 1.0;
        var texHeight = 1.0;

        return new Float32Array([
            0, 0,
            texWidth, 0,
            0, texHeight,
            0, texHeight,
            texWidth, 0,
            texWidth, texHeight
        ]);
    };

    MocuGame.MocuObject.prototype.getTexture = function(gl) {
        return MocuGame.renderer.getCachedTexture(gl, {src : MocuGame.OBJECT_TEXTURE_SRC})
    }

    MocuGame.MocuObject.prototype.prepareTexture = function (gl, texture, program, textureCoordinateArray) {
        // provide texture coordinates for the rectangle.
        if (typeof textureCoordinateArray === "undefined") {
            textureCoordinateArray = this.getTextureCoordinateArray();
        }
        var texCoordLocation = this.texCoordLocation;

        if (texCoordLocation == null) {
            var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
        }

        var texCoordBuffer = MocuGame.renderer.getCachedTextureBuffer(gl, textureCoordinateArray);

        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

        gl.bindTexture(gl.TEXTURE_2D, texture);

        this.setTextureParameters(gl);

        return texture;
    };

    MocuGame.MocuObject.prototype.setTextureParameters = function (gl) {
        //Set the parameters so we can render any size image.
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    };

    MocuGame.MocuObject.prototype.preDrawGl = function (gl, displacement) {
        //Extend in child classes

        var localProgram = this.program;
        if (this.useParentEffects == true) {
            if(this.parent != null)
            {
                if (this.parent.program != null && typeof this.parent.program !== "undefined") {
                    localProgram = this.parent.program;
                }
            }
        }

        var program = (localProgram == null) ? MocuGame.renderer.defaultProgram : localProgram;
        MocuGame.renderer.useProgram(program);

        /*this.setTranslationUniform(gl, program, displacement);

        this.setCameraTranslationUniform(gl, program, displacement);
        
        this.setCameraZoomUniform(gl, program, displacement);

        this.setRotationUniform(gl, program);

        this.setScaleUniform(gl, program)

        this.setAlphaUniform(gl, program);

        this.setPositionAttribute(gl, program);*/

        return program;
    };

    MocuGame.MocuObject.prototype.drawGl = function (gl, displacement) {

        if (typeof displacement == null || typeof displacement == 'undefined') {
            displacement = new MocuGame.Point(0, 0);
        }

        var program = this.preDrawGl(gl, displacement);

        var texture = gl.createTexture();
        this.prepareTexture(gl, texture, program);

        var colorLocation = gl.getUniformLocation(program, "u_color");
        var colorArray = new Float32Array([this.fade.r, this.fade.g, this.fade.b, this.alpha])
        gl.uniform4fv(colorLocation, colorArray);

        texture = this.applyEffects(gl, texture);

        MocuGame.renderer.useProgram(program);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

	MocuGame.MocuObject.prototype.composeProperty = function(name, glslName, components, constructorFunc, hasChangedFunc) {
		//var property = {};
		//property["value"] = constructorFunc.call(this);
		//property["hasChanged"] = hasChangedFunc.call(this);
        var values = constructorFunc.call(this);
        var property = new MocuGame.MocuGlProperty(name, glslName, components, hasChangedFunc.call(this));
        property.values = values;

		return property;
	}

	MocuGame.MocuObject.prototype.composePositionProperty = function() {
		return this.composeProperty(
            "position",
            "a_position",
            2,
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

	MocuGame.MocuObject.prototype.composeRotationProperty = function() {
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

	MocuGame.MocuObject.prototype.composeScaleProperty = function() {
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

	MocuGame.MocuObject.prototype.composeFadeProperty = function() {
		return this.composeProperty(
            "fade",
            "a_fade",
            4,
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
            "alpha",
            "a_alpha",
            1,
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
            "texCoord",
            "a_texCoord",
            2,
			MocuGame.MocuObject.prototype.getCoordinateArray, 
			function() {
		        var hasChanged = this.hasTexCoordChanged
        		this.hasTexCoordChanged = false;
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
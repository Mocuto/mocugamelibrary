(function() {
	mocu.Text.EXTENSION_METHODS.push(function() {
		this.lastGlText = null;
		this.lastGlAlign = null;
		this.lastGlFont = null;
		this.texture = null;
		this.textureSrc = null;
		this.needsNewTexture = true;
	})

    mocu.Text.prototype.getNumberOfLines = function () {

        //Set the font and color and alignment
        mocu.blankContext.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")";
        mocu.blankContext.strokeStyle = "rgb( " + Math.ceil(this.strokeColor.r * 255) + ", " + Math.ceil(this.strokeColor.g * 255) + ", " + Math.ceil(this.strokeColor.b * 255) + ")";
        mocu.blankContext.lineWidth = this.strokeWidth;
        mocu.blankContext.font = this.font;
        mocu.blankContext.textAlign = this.align;

        var currentLine = '';
        var words = this.text.split(' ');
        var testLine = '';
        var numberOfLines = 1;
        for (var i = 0; i < words.length; i += 1) {
            testLine = (currentLine.length > 0 ? (currentLine + ' ') : '') + words[i] + ' ';
            if (mocu.blankContext.measureText(testLine).width >= this.width) {
                currentLine = words[i] + ' ';
                numberOfLines++;
            }
            else {
                currentLine = testLine;
            }
        }
        return numberOfLines
    }

	mocu.Text.prototype.getTextureCoordinateArray = mocu.MocuObject.prototype.getTextureCoordinateArray;

	mocu.Text.prototype.getTexture = function(gl) {
		if(this.needsNewTexture == true) {
	        var program = mocu.renderer.defaultProgram

	        var blankCanvas = mocu.blankCanvas;
	        var blankContext = mocu.blankContext;

	        var texture = mocu.renderer.createAndSetupTexture(gl);

	        blankCanvas.width = this.width * mocu.uniscale;
	        blankCanvas.height = this.height * mocu.uniscale * this.getNumberOfLines();

	        blankContext.scale(this.flip.x * (mocu.uniscale), this.flip.y * (mocu.uniscale));

	        //Set the font and color and alignment
	        blankContext.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")";
	        blankContext.strokeStyle = "rgb( " + Math.ceil(this.strokeColor.r * 255) + ", " + Math.ceil(this.strokeColor.g * 255) + ", " + Math.ceil(this.strokeColor.b * 255) + ")";
	        blankContext.lineWidth = this.strokeWidth;
	        blankContext.font = this.font;
	        blankContext.textAlign = this.align;
	        blankContext.textBaseline = "top"

	        //Draw text
	        var currentLine = '';
	        var words = this.text.split(' ');
	        var testLine = '';
	        var height = 0;
	        this.numberOfLines = 1;

	        var textStartX = 0;

	        if (this.align === "center")
	        {
	        	textStartX = this.width / 2;
	        }

	        for (var i = 0; i < words.length; i += 1) {
	            testLine = (currentLine.length > 0 ? (currentLine + ' ') : '') + words[i] + ' ';
	            var measuredWidth = blankContext.measureText(testLine).width;
	            if (measuredWidth >= this.width) {

	            	if (this.align === "right") {
	            		textStartX = this.width - measuredWidth;
	            	}

	                blankContext.fillText(currentLine, textStartX, height);
	                if (this.doesStroke && this.strokeColor != null) {
	                    blankContext.strokeText(currentLine, textStartX, height);
	                }
	                currentLine = words[i] + ' ';
	                height += this.height;
	                this.numberOfLines++;
	            }
	            else {
	                currentLine = testLine;
	            }
	        }

	        var measuredWidth = blankContext.measureText(testLine).width;
        	if (this.align === "right") {
        		textStartX = this.width - measuredWidth;
        	}

	        blankContext.fillText(currentLine, textStartX, height);
	        if (this.doesStroke && this.strokeColor != null) {
	            blankContext.strokeText(currentLine, textStartX, height);
	        }

	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, blankCanvas);

	        blankContext.scale(this.flip.x / (mocu.uniscale), this.flip.y / (mocu.uniscale));
	        blankContext.clearRect(0, 0, this.width * mocu.uniscale, this.height * mocu.uniscale * this.getNumberOfLines());
	        this.texture = texture;
	        this.textureSrc = this.text + " " + this.font + " " + this.align;

	        mocu.renderer.cacheTextTexture(this.texture, this.textureSrc);
	        this.needsNewTexture = false;
    	}
    	return this.texture;
	}

	mocu.Text.prototype.getHasChanged = function() {
		var test = this.lastGlText !== this.text ;
		var hasChanged = (test || this.lastGlFont !== this.lastGlFont || this.lastGlAlign !== this.align)
		if(hasChanged == true) {
			this.needsNewTexture = true;
		}
		
		return hasChanged;
	}

	mocu.Text.prototype.composePositionProperty = function() {
		return this.composeProperty(
            "position",
            "a_position",
            2,
			mocu.MocuObject.prototype.getCoordinateArray, 
			function() {
				return this.getHasChanged();
			}
		);
	}

	mocu.Text.prototype.composeTextureCoordinateProperty = function() {
		return this.composeProperty(
            "texCoord",
            "a_texCoord",
            2,
			mocu.MocuObject.prototype.getTextureCoordinateArray, 
			function() {
				return this.getHasChanged(); 
			}
		)
	}

	mocu.Text.prototype.composeTranslationProperty = function() {
		return this.composeProperty(
            "translation",
            "a_translation",
            2,
			function() {
				var scrollRate = (this.cameraTraits == null) ? new mocu.Point(1, 1) : this.cameraTraits.scrollRate;
				return [
					(this.x + this.width / 2) + (-mocu.camera.x * scrollRate.x),
					(this.y + (this.height * this.getNumberOfLines()) / 2) + (-mocu.camera.y * scrollRate.y)
				]
			}, function() {
				return this.getHasChanged();
			}
		)
	}


    mocu.Text.prototype.getCoordinateArray = function () {
        var absWidth = (this.width / 2) * mocu.uniscale;
        var absHeight = ((this.height * this.getNumberOfLines()) / 2) * mocu.uniscale;

        return new Float32Array([
                                -absWidth, -absHeight,
                                 absWidth, -absHeight,
                                -absWidth, absHeight,
                                -absWidth, absHeight,
                                absWidth, -absHeight,
                                absWidth, absHeight]);
    };

    mocu.Text.prototype.setTranslationUniform = function (gl, program, displacement) {
        //Provide location of the translate uniform
        var translateLocation = gl.getUniformLocation(program, "u_translate");
        var translate = new Float32Array([
            ((this.x + displacement.x) + (this.width / 2)) * mocu.uniscale, (this.y + (this.height * this.getNumberOfLines() / 2)) * mocu.uniscale
        ]);
        gl.uniform2fv(translateLocation, translate); //Set the translate uniform
    };

    mocu.Text.prototype.getGlProperties = function(gl) {
    	var properties = mocu.MocuObject.prototype.getGlProperties.call(this, gl);
    	this.lastGlText = this.text;
		this.lastGlFont = this.font
		this.lastGlAlign = this.align;
		return properties;
    }

    mocu.Text.prototype.preDrawGl = function (gl, displacement) {
        var program = mocu.MocuObject.prototype.preDrawGl.call(this, gl, displacement);

/*        this.setTranslationUniform(gl, program, displacement);

        this.setRotationUniform(gl, program);

        this.setScaleUniform(gl, program)

        this.setAlphaUniform(gl, program);

        this.setPositionAttribute(gl, program);*/

        return program;
    }

    mocu.Text.prototype.drawGl = function (gl, displacement) {

        if (typeof displacement == null || typeof displacement == 'undefined') {
            displacement = new mocu.Point(0, 0);
        }

        var program = this.preDrawGl(gl, displacement);

        var blankCanvas = mocu.blankCanvas;
        var blankContext = mocu.blankContext;

        var texture = gl.createTexture();
        this.prepareTexture(gl, texture, program);

        blankCanvas.width = this.width * mocu.uniscale;
        blankCanvas.height = this.height * mocu.uniscale * this.getNumberOfLines();

        blankContext.scale(this.flip.x * (mocu.uniscale), this.flip.y * (mocu.uniscale));

        //Set the font and color and alignment
        blankContext.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")";
        blankContext.strokeStyle = "rgb( " + Math.ceil(this.strokeColor.r * 255) + ", " + Math.ceil(this.strokeColor.g * 255) + ", " + Math.ceil(this.strokeColor.b * 255) + ")";
        blankContext.lineWidth = this.strokeWidth;
        blankContext.font = this.font;
        blankContext.textAlign = this.align;
        blankContext.textBaseline = "top"

        //Draw text
        var currentLine = '';
        var words = this.text.split(' ');
        var testLine = '';
        var height = 0;
        this.numberOfLines = 1;
        for (var i = 0; i < words.length; i += 1) {
            testLine = (currentLine.length > 0 ? (currentLine + ' ') : '') + words[i] + ' ';
            if (blankContext.measureText(testLine).width >= this.width) {
                blankContext.fillText(currentLine, 0, height);
                if (this.doesStroke && this.strokeColor != null) {
                    blankContext.strokeText(currentLine, 0, height);
                }
                currentLine = words[i] + ' ';
                height += this.height;
                this.numberOfLines++;
            }
            else {
                currentLine = testLine;
            }
        }
        blankContext.fillText(currentLine, 0, height);
        if (this.doesStroke && this.strokeColor != null) {
            blankContext.strokeText(currentLine, 0, height);
        }

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, blankCanvas);

        blankContext.scale(this.flip.x / (mocu.uniscale), this.flip.y / (mocu.uniscale));
        blankContext.clearRect(0, 0, this.width * mocu.uniscale, this.height * mocu.uniscale * this.getNumberOfLines());

        texture = this.applyEffects(gl, texture);

        mocu.renderer.useProgram(program);

        //TODO: Use framebuffers and multiple shaders here
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
})();
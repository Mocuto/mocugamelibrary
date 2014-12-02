(function() {
	MocuGame.MocuText.EXTENSION_METHODS.push(function() {
		this.lastGlText = null;
		this.lastGlAlign = null;
		this.lastGlFont = null;
		this.texture = null;
		this.textureSrc = null;
		this.needsNewTexture = true;
	})

    MocuGame.MocuText.prototype.getNumberOfLines = function () {

        //Set the font and color and alignment
        MocuGame.blankContext.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")";
        MocuGame.blankContext.strokeStyle = "rgb( " + Math.ceil(this.strokeColor.r * 255) + ", " + Math.ceil(this.strokeColor.g * 255) + ", " + Math.ceil(this.strokeColor.b * 255) + ")";
        MocuGame.blankContext.lineWidth = this.strokeWidth;
        MocuGame.blankContext.font = this.font;
        MocuGame.blankContext.textAlign = this.align;

        var currentLine = '';
        var words = this.text.split(' ');
        var testLine = '';
        var numberOfLines = 1;
        for (var i = 0; i < words.length; i += 1) {
            testLine = (currentLine.length > 0 ? (currentLine + ' ') : '') + words[i] + ' ';
            if (MocuGame.blankContext.measureText(testLine).width >= this.width) {
                currentLine = words[i] + ' ';
                numberOfLines++;
            }
            else {
                currentLine = testLine;
            }
        }
        return numberOfLines
    }

	MocuGame.MocuText.prototype.getTextureCoordinateArray = MocuGame.MocuObject.prototype.getTextureCoordinateArray;

	MocuGame.MocuText.prototype.getTexture = function(gl) {
		if(this.needsNewTexture == true) {
	        var program = MocuGame.renderer.defaultProgram

	        var blankCanvas = MocuGame.blankCanvas;
	        var blankContext = MocuGame.blankContext;

	        var texture = MocuGame.renderer.createAndSetupTexture(gl);

	        blankCanvas.width = this.width * MocuGame.uniscale;
	        blankCanvas.height = this.height * MocuGame.uniscale * this.getNumberOfLines();

	        blankContext.scale(this.flip.x * (MocuGame.uniscale), this.flip.y * (MocuGame.uniscale));

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

	        blankContext.scale(this.flip.x / (MocuGame.uniscale), this.flip.y / (MocuGame.uniscale));
	        blankContext.clearRect(0, 0, this.width * MocuGame.uniscale, this.height * MocuGame.uniscale * this.getNumberOfLines());
	        this.texture = texture;
	        this.textureSrc = this.text + " " + this.font + " " + this.align;

	        MocuGame.renderer.cacheTextTexture(this.texture, this.textureSrc);
	        this.needsNewTexture = false;
    	}
    	return this.texture;
	}

	MocuGame.MocuText.prototype.getHasChanged = function() {
		var test = this.lastGlText !== this.text ;
		var hasChanged = (test || this.lastGlFont !== this.lastGlFont || this.lastGlAlign !== this.align)
		if(hasChanged == true) {
			this.needsNewTexture = true;
		}
		
		return hasChanged;
	}

	MocuGame.MocuText.prototype.composePositionProperty = function() {
		return this.composeProperty(
			MocuGame.MocuObject.prototype.getCoordinateArray, 
			function() {
				return this.getHasChanged();
			}
		);
	}

	MocuGame.MocuText.prototype.composeTextureCoordinateProperty = function() {
		return this.composeProperty(
			MocuGame.MocuObject.prototype.getTextureCoordinateArray, 
			function() {
				return this.getHasChanged(); 
			}
		)
	}

	MocuGame.MocuText.prototype.composeTranslationProperty = function() {
		return this.composeProperty(
			function() {
				var scrollRate = (this.cameraTraits == null) ? new MocuGame.Point(1, 1) : this.cameraTraits.scrollRate;
				return [
					(this.x + this.width / 2) + (-MocuGame.camera.x * scrollRate.x),
					(this.y + (this.height * this.getNumberOfLines()) / 2) + (-MocuGame.camera.y * scrollRate.y)
				]
			}, function() {
				return this.getHasChanged();
			}
		)
	}


    MocuGame.MocuText.prototype.getCoordinateArray = function () {
        var absWidth = (this.width / 2) * MocuGame.uniscale;
        var absHeight = ((this.height * this.getNumberOfLines()) / 2) * MocuGame.uniscale;

        return new Float32Array([
                                -absWidth, -absHeight,
                                 absWidth, -absHeight,
                                -absWidth, absHeight,
                                -absWidth, absHeight,
                                absWidth, -absHeight,
                                absWidth, absHeight]);
    };

    MocuGame.MocuText.prototype.setTranslationUniform = function (gl, program, displacement) {
        //Provide location of the translate uniform
        var translateLocation = gl.getUniformLocation(program, "u_translate");
        var translate = new Float32Array([
            ((this.x + displacement.x) + (this.width / 2)) * MocuGame.uniscale, (this.y + (this.height * this.getNumberOfLines() / 2)) * MocuGame.uniscale
        ]);
        gl.uniform2fv(translateLocation, translate); //Set the translate uniform
    };

    MocuGame.MocuText.prototype.getGlProperties = function(gl) {
    	var properties = MocuGame.MocuObject.prototype.getGlProperties.call(this, gl);
    	this.lastGlText = this.text;
		this.lastGlFont = this.font
		this.lastGlAlign = this.align;
		return properties;
    }

    MocuGame.MocuText.prototype.preDrawGl = function (gl, displacement) {
        var program = MocuGame.MocuObject.prototype.preDrawGl.call(this, gl, displacement);

/*        this.setTranslationUniform(gl, program, displacement);

        this.setRotationUniform(gl, program);

        this.setScaleUniform(gl, program)

        this.setAlphaUniform(gl, program);

        this.setPositionAttribute(gl, program);*/

        return program;
    }

    MocuGame.MocuText.prototype.drawGl = function (gl, displacement) {

        if (typeof displacement == null || typeof displacement == 'undefined') {
            displacement = new MocuGame.Point(0, 0);
        }

        var program = this.preDrawGl(gl, displacement);

        var blankCanvas = MocuGame.blankCanvas;
        var blankContext = MocuGame.blankContext;

        var texture = gl.createTexture();
        this.prepareTexture(gl, texture, program);

        blankCanvas.width = this.width * MocuGame.uniscale;
        blankCanvas.height = this.height * MocuGame.uniscale * this.getNumberOfLines();

        blankContext.scale(this.flip.x * (MocuGame.uniscale), this.flip.y * (MocuGame.uniscale));

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

        blankContext.scale(this.flip.x / (MocuGame.uniscale), this.flip.y / (MocuGame.uniscale));
        blankContext.clearRect(0, 0, this.width * MocuGame.uniscale, this.height * MocuGame.uniscale * this.getNumberOfLines());

        texture = this.applyEffects(gl, texture);

        MocuGame.renderer.useProgram(program);

        //TODO: Use framebuffers and multiple shaders here
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
})();
(function() {
	MocuGame.MocuSprite.prototype.composeTextureCoordinateProperty = function() {
		return this.composeProperty(
			MocuGame.MocuSprite.prototype.getTextureCoordinateArray, 
			function() {
		        var hasChanged = (
		        	this.lastTexCoordWidth !== this.width || 
		        	this.lastTexCoordHeight !== this.height ||
            		this.lastTexCoordFrameY !== this.frame.y || 
            		this.lastTexCoordFrameX !== this.frame.x
        		);

        		this.lastTexCoordWidth = this.width;
        		this.lastTexCoordHeight = this.height;
        		this.lastTexCoordFrameX = this.frame.x;
        		this.lastTexCoordFrameY = this.frame.y;
				return hasChanged; 
			}
		)
	}

   MocuGame.MocuSprite.prototype.getTextureCoordinateArray = function () {
        if (this.lastTexCoordWidth != this.width || this.lastTexCoordHeight != this.height ||
            this.lastTexCoordFrameY != this.frame.y || this.lastTexCoordFrameX != this.frame.x) 
        {
            var texStartX = (this.frame.x * this.width) / this.img.naturalWidth;
            var texStartY = (this.frame.y * this.height) / this.img.naturalHeight;
            var texWidth = this.width / this.img.naturalWidth;
            var texHeight = this.height / this.img.naturalHeight;

            this.lastTexCoordArray = [
                texStartX, texStartY,
                texStartX + texWidth, texStartY,
                texStartX, texStartY + texHeight,
                texStartX, texStartY + texHeight,
                texStartX + texWidth, texStartY,
                texStartX + texWidth, texStartY + texHeight
            ];
        }

        return this.lastTexCoordArray;
    };


    /*MocuGame.MocuSprite.prototype.getGlProperties = function () {
        var position = this.getCoordinateArray();
        var texCoordHasChanged = (this.lastTexCoordWidth != this.width || this.lastTexCoordHeight != this.height ||
            this.lastTexCoordFrameY != this.frame.y || this.lastTexCoordFrameX != this.frame.x);
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

        var result = {
            "position" : { type: "attribute", value: position,
                hasChanged: (this.lastGlWidth != this.width || this.height != this.lastGlHeight) },
            "translation": { type: "attribute", value: translation,
                hasChanged: (this.lastGlX != this.x || this.lastGlY != this.y) },
            "rotation": { type: "attribute", value: rotation,
                hasChanged: (this.lastGlRotation != this.angle) },
            "scale": { type: "attribute", value: scale,
                hasChanged: (this.lastGlScaleX != this.scale.x || this.lastGlScaleY != this.scale.y) },
            "fade": { type: "attribute", value: fade,
                hasChanged: (this.lastGlFadeR != this.fade.r || this.lastGlFadeG != this.fade.g ||
                this.lastGlFadeB != this.fade.b || this.lastGlFadeA != this.fade.a) },
            "alpha": {type: "attribute", value:alpha,
                hasChanged: (this.lastGlAlpha != this.alpha)},
            "texCoord": { type: "attribute", value: texCoords,
                hasChanged: texCoordHasChanged }
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

        return result;

    }*/

    MocuGame.MocuSprite.prototype.getTexture = function (gl) {
        if (this.img.complete == true && this.texture == null) {
            this.texture = MocuGame.renderer.getCachedTexture(gl, this.img);
        }

        return this.texture;
    }

    MocuGame.MocuSprite.prototype.preDrawGl = function (gl, displacement) {
        var program = MocuGame.MocuObject.prototype.preDrawGl.call(this, gl, displacement);

        if (this.texture == null || typeof this.texture === "undefined")
        {
            if (this.img.complete == true) {
                this.texture = MocuGame.renderer.getCachedTexture(gl, this.img);
            }
        }

        return program;
    };

    MocuGame.MocuSprite.prototype.drawGl = function (gl, displacement) {

        if (this.animates) {
            this.animate(deltaT);
        }

        if (this.isOnScreen() == false) {
            return;
        }
        
        var program = this.preDrawGl(gl, displacement);

        var texture = this.texture;

        if (texture == null) {
            return;
        }

        this.prepareTexture(gl, this.texture, program);

        /*var blankCanvas = MocuGame.blankCanvas;
        var blankContext = MocuGame.blankContext;


        blankContext.globalCompositeOperation = "source-over";

        blankCanvas.width = this.width;
        blankCanvas.height = this.height;

        blankContext.drawImage(this.img, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height,
            0,
            0,
            this.width,
            this.height);

        if (this.fade.a != 0) {
            blankContext.globalCompositeOperation = "source-atop";
            blankContext.globalAlpha = this.fade.a;
            blankContext.beginPath();
            blankContext.rect(0, 0, this.width, this.height);
            blankContext.closePath();
            blankContext.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")"
            //console.log("FS is: " + "rgb( " + (this.fade.r * 255) + ", " + (this.fade.g * 255) + ", " + (this.fade.b * 255) + ")");
            blankContext.fill();
        }

        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, blankCanvas);


        blankContext.clearRect(0, 0, this.width, this.height);*/

        texture = this.applyEffects(gl, texture);

        MocuGame.renderer.useProgram(program);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
})();
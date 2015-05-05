(function () {
    mocu.Patch = function (pos, size, spritePath,  spriteSize, centerPatchPosition, centerPatchSize) {
        mocu.Sprite.call(this, pos, size, spritePath);
        this.centerPatchPosition = centerPatchPosition;
        this.centerPatchSize = centerPatchSize;
        this.spritePath = spritePath;
        this.spriteSize = spriteSize;
        
    };
    mocu.Patch.prototype = new mocu.Sprite(new mocu.Point, new mocu.Point);
    mocu.Patch.constructor = mocu.Patch;


    mocu.Patch.EXTENSION_METHODS = [];


    mocu.Patch.prototype.runExtensionMethods = function() {
        mocu.Sprite.prototype.runExtensionMethods.call(this);
        for(var i = 0; i < mocu.Patch.EXTENSION_METHODS.length; i++)
        {
            mocu.Patch.EXTENSION_METHODS[i].call(this);
        }
    }

    mocu.Patch.prototype.blankCanvasDraw = function () {
        var blankCanvas = mocu.blankCanvas;
        var blankContext = mocu.blankContext;
        blankCanvas.width = this.width;
        blankCanvas.height = this.height;
        blankContext.globalCompositeOperation = "source-over";
        blankContext.globalAlpha = 1;

        blankContext.save();
        blankContext.beginPath();
        blankContext.rect(0, 0, this.width, this.height);
        blankContext.closePath();
        blankContext.clip();

        var tempval = (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))


        //Draw center
        var endCentX = this.width - (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x));
        var endCentY = this.height - (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y));

        for (var x = this.centerPatchPosition.x; x < endCentX; x += this.centerPatchSize.x) {
            for (var y = this.centerPatchPosition.y; y < endCentY; y += this.centerPatchSize.y) {
                blankContext.drawImage(this.img,
                    this.centerPatchPosition.x, this.centerPatchPosition.y,
                    this.centerPatchSize.x, this.centerPatchSize.y,
                    x, y,
                    Math.min(endCentX - x, this.centerPatchSize.x), Math.min(endCentY - y, this.centerPatchSize.y));
            }
        }

        //Draw top and bottom sides
        for (var i = 0; i < this.width; i += this.centerPatchSize.x) {
            blankContext.drawImage(this.img,
                this.centerPatchPosition.x, 0,
                this.centerPatchSize.x, this.centerPatchPosition.y,
                i + this.centerPatchPosition.x, 0,
                this.centerPatchSize.x, this.centerPatchPosition.y); //Top

            blankContext.drawImage(this.img,
                this.centerPatchPosition.x, (this.centerPatchPosition.y + this.centerPatchSize.y),
                this.centerPatchSize.x, (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y)),
                i + this.centerPatchPosition.x, (this.height - (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))),
                this.centerPatchSize.x, (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))); //Bottom
        }

        //Draw left and right sides
        for (var i = 0; i < this.height; i += this.centerPatchSize.y) {
            blankContext.drawImage(this.img,
                0, this.centerPatchPosition.y,
                this.centerPatchPosition.x, this.centerPatchSize.y,
                0, i + this.centerPatchPosition.y,
                this.centerPatchPosition.x, this.centerPatchSize.y); //Left

            blankContext.drawImage(this.img,
                (this.centerPatchPosition.x + this.centerPatchSize.x), this.centerPatchPosition.y,
                (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)), this.centerPatchSize.y,
                (this.width - (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x))), i + this.centerPatchPosition.y,
                (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)), this.centerPatchSize.y); //Right
        }

        blankContext.drawImage(this.img, 0, 0, this.centerPatchPosition.x, this.centerPatchPosition.y,
            0,
            0,
            this.centerPatchPosition.x,
            this.centerPatchPosition.y); //Top Left

        blankContext.drawImage(this.img,
            this.centerPatchPosition.x + this.centerPatchSize.x, 0,
            (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)), this.centerPatchPosition.y,
            endCentX, 0,
            (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)), this.centerPatchPosition.y); //Top Right

        //Draw Bottom corners
        blankContext.drawImage(this.img, 0, (this.centerPatchPosition.y + this.centerPatchSize.y),
            this.centerPatchPosition.x, (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y)),
            0, (this.height - (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))),
            this.centerPatchPosition.x, (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))); //Bottom Left

        blankContext.drawImage(this.img,
            this.centerPatchPosition.x + this.centerPatchSize.x, (this.centerPatchPosition.y + this.centerPatchSize.y),
            (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)), this.centerPatchPosition.y,
            endCentX, endCentY,
            (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)), (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))); //Bottom Right

        blankContext.restore();

        //Do the fade code
        if (this.fade.a != 0) {
            blankContext.globalCompositeOperation = "source-atop";
            blankContext.globalAlpha = this.fade.a;
            blankContext.beginPath();
            blankContext.rect(0, 0, this.width, this.height);
            blankContext.closePath();
            blankContext.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")"
            blankContext.fill();
        }
    }

    mocu.Patch.prototype.colorEffect = function (context, displacement) {
        this.blankCanvasDraw();

        var blankCanvas = mocu.blankCanvas;
        var blankContext = mocu.blankContext;

        context.globalAlpha = this.alpha;
        context.globalCompositeOperation = this.drawmode;
        context.drawImage(blankCanvas, 0, 0, (this.width > blankCanvas.width) ? blankCanvas.width : this.width, (this.height > blankCanvas.height) ? blankCanvas.height : this.height,
                 (-(this.width / 2) * this.scale.x) * mocu.uniscale,
                (-(this.height / 2) * this.scale.y) * mocu.uniscale,
                ((this.width) * this.scale.x) * mocu.uniscale,
                ((this.height) * this.scale.y) * mocu.uniscale);
        blankContext.clearRect(0, 0, blankCanvas.width, blankCanvas.height);
    }

    mocu.Patch.prototype.drawGl = function (gl, displacement) {
        this.blankCanvasDraw();

        var program = this.preDrawGl(gl, displacement);

        var blankCanvas = mocu.blankCanvas;
        var blankContext = mocu.blankContext;

        var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

        var texture = gl.createTexture();
        this.prepareTexture(gl, texture, program);


        //// provide texture coordinates for the rectangle.
        //var texCoordBuffer = gl.createBuffer();
        //gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);

        //var texWidth = 1.0;
        //var texHeight = 1.0;
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        //    0, 0,
        //    texWidth, 0,
        //    0, texHeight,
        //    0, texHeight,
        //    texWidth, 0,
        //    texWidth, texHeight]), gl.STATIC_DRAW);
        //gl.enableVertexAttribArray(texCoordLocation);
        //gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

        //var texture = gl.createTexture();
        //gl.bindTexture(gl.TEXTURE_2D, texture);

        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, blankCanvas);

        ////Set the parameters so we can render any size image.
        //gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        //gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        //gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        //gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, blankCanvas);

        blankContext.clearRect(0, 0, this.width, this.height);

        texture = this.applyEffects(gl, texture);

        mocu.renderer.useProgram(program);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    mocu.Patch.prototype.draw = function (context, displacement) {
        if (typeof displacement == null || typeof displacement == 'undefined')
            displacement = new mocu.Point(0, 0);

        if (mocu.isWindows81) {
            this.drawGl(context, displacement);
            this.draw = this.drawGl;
            return;
        }

        if (this.isOnScreen() == false) {
            return;
        }

        context.translate(((this.x + displacement.x) + (this.width / 2)) * mocu.uniscale, ((this.y + this.height / 2) + displacement.y) * mocu.uniscale);
        context.scale(this.flip.x, this.flip.y);
        context.rotate((this.angle * 3.14159265359) / 180);

        context.globalCompositeOperation = this.drawmode;
        context.globalAlpha = this.alpha;

        this.colorEffect(context, displacement);

        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.scale(this.flip.x, this.flip.y);

        context.translate((-((this.x + this.width / 2) + displacement.x)) * mocu.uniscale, (-((this.y + this.height / 2) + displacement.y)) * mocu.uniscale);
        context.globalCompositeOperation = "source-over";
        //Draw top edge

        //Draw sides
        //Draw bottom edge
    };
})();
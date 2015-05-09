(function() {
	mocu.Patch.EXTENSION_METHODS.push(function() {
		this.primitives = 4;

		this.lastGlCenterPatchX = null;
		this.lastGlCenterPatchY = null;
		this.lastGlCenterPatchWidth = null;
		this.lastGlCenterPatchHeight = null;
		this.lastGlCoordinateArray = null;
	})

	mocu.Patch.prototype.getCoordinateArray = function() {
		if( this.lastGlCenterPatchX != this.centerPatchPosition.x || this.lastGlCenterPatchY != this.centerPatchPosition.y ||
			this.lastGlCenterPatchWidth != this.centerPatchSize.x || this.lastGlCenterPatchHeight != this.centerPatchSize.y ||
			this.lastGlWidth != this.width || this.lastGlHeight != this.height) {
	        
	        var absWidth = (this.width / 2) * mocu.uniscale;
        	var absHeight = (this.height / 2) * mocu.uniscale;

        	var left,right,top,bottom;
			
			var centerCoords = [];

			var leftCenterCoords = [];
			var rightCenterCoords = [];

			var topCenterCoords = [];
			var bottomCenterCoords = [];

           	//Center
           	var startX = -absWidth + this.centerPatchPosition.x;
           	var endX = absWidth - (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x));

           	var startY = -absHeight + this.centerPatchPosition.y;
           	var endY = absHeight - (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y));

           	var drawnSides = false;

           	for(var x = startX; x < endX; x += this.centerPatchSize.x) {
           		//Top Center
           		left = x;
           		right = Math.min(x + this.centerPatchSize.x, endX);

           		top = -absHeight;
           		bottom = top + this.centerPatchPosition.y;

           		topCenterCoords = topCenterCoords.concat(mocu.renderer.generateCoordinateSquare(left, right, top, bottom));

           		//Bottom Center
           		left = x;
           		right = Math.min(x + this.centerPatchSize.x, endX);

           		top = endY;
           		bottom = absHeight;

           		bottomCenterCoords = bottomCenterCoords.concat(mocu.renderer.generateCoordinateSquare(left, right, top, bottom));

           		for(var y = startY; y < endY; y += this.centerPatchSize.y) {

           			if(drawnSides == false) {
	           			//Center Left
	           			left = -absWidth;
	           			right = -absWidth + this.centerPatchPosition.x;

	           			top = y;
	           			bottom = Math.min(y + this.centerPatchSize.y, endY);

	           			leftCenterCoords = leftCenterCoords.concat(mocu.renderer.generateCoordinateSquare(left, right, top, bottom));

	           			//Center Right
	          			left = endX;
	           			right = absWidth;

	           			top = y;
	           			bottom = Math.min(y + this.centerPatchSize.y, endY);

	           			rightCenterCoords = rightCenterCoords.concat(mocu.renderer.generateCoordinateSquare(left, right, top, bottom));
           			}

           			//Center
           			left = x;
           			right = Math.min(x + this.centerPatchSize.x, endX);

           			top = y;
           			bottom = Math.min(y + this.centerPatchSize.y, endY);

           			var coords = mocu.renderer.generateCoordinateSquare(left, right, top, bottom);
           			centerCoords = centerCoords.concat(coords);
           		}
           		drawnSides = true;
           	}

			//Top left corner
			left = -absWidth;
			right = left + this.centerPatchPosition.x;

			top = -absHeight;
			bottom = top + this.centerPatchPosition.y;

			var topLeftCoords = mocu.renderer.generateCoordinateSquare(left, right, top, bottom);


           	//Top right corner
           	left = absWidth - (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x));
           	right = absWidth;

           	top = -absHeight;
           	bottom = top + this.centerPatchPosition.y;

           	var topRightCoords = mocu.renderer.generateCoordinateSquare(left, right, top, bottom);


           	//Bottom left corner
           	left = -absWidth;
           	right = left + this.centerPatchPosition.x;

           	top = absHeight - (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y));
           	bottom = absHeight;

           	var bottomLeftCoords = mocu.renderer.generateCoordinateSquare(left, right, top, bottom);


           	//Bottom right corner
           	left = absWidth - (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x));
           	right = absWidth;

           	top = absHeight - (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y));
           	bottom = absHeight;

           	var bottomRightCoords = mocu.renderer.generateCoordinateSquare(left, right, top, bottom);

           	this.lastGlCoordinateArray = centerCoords
           		.concat(topCenterCoords)
           		.concat(bottomCenterCoords)
           		.concat(leftCenterCoords)
           		.concat(rightCenterCoords)
           		.concat(topLeftCoords)
           		.concat(topRightCoords)
           		.concat(bottomLeftCoords)
           		.concat(bottomRightCoords)

		}

		return this.lastGlCoordinateArray;
	}

	mocu.Patch.prototype.getTextureCoordinateArray = function() {
		if( this.lastGlCenterPatchX != this.centerPatchPosition.x || this.lastGlCenterPatchY != this.centerPatchPosition.y ||
			this.lastGlCenterPatchWidth != this.centerPatchSize.x || this.lastGlCenterPatchHeight != this.centerPatchSize.y ||
			this.lastGlWidth != this.width || this.lastGlHeight != this.height) {

        	var left,right,top,bottom;
			
			var centerCoords = [];

			var leftCenterCoords = [];
			var rightCenterCoords = [];

			var topCenterCoords = [];
			var bottomCenterCoords = [];

           	//Center
           	var startX = this.centerPatchPosition.x / this.spriteSize.x;
           	var endX = 1.0 - ((this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)) / this.spriteSize.x);

           	var startY = this.centerPatchPosition.y / this.spriteSize.y;
           	var endY = 1.0 - ((this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y)) / this.spriteSize.y) ;

           	var loopWidth = this.width - (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x))
           	var loopHeight = this.height - (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))

           	var drawnSides = false;

           	for(var loopX = this.centerPatchPosition.x; loopX < loopWidth; loopX += this.centerPatchSize.x) 
           	{
           		//Top Center
           		left = startX;
           		right = left + Math.min((loopWidth - loopX), this.centerPatchSize.x) / this.spriteSize.x;

           		top = 0;
           		bottom = this.centerPatchPosition.y / this.spriteSize.y;

           		topCenterCoords = topCenterCoords.concat(mocu.renderer.generateCoordinateSquare(left, right, top, bottom));

           		//Bottom Center
           		left = startX;
           		right = left + Math.min((loopWidth - loopX), this.centerPatchSize.x) / this.spriteSize.x;

           		top = endY;
           		bottom = 1;

           		bottomCenterCoords = bottomCenterCoords.concat(mocu.renderer.generateCoordinateSquare(left, right, top, bottom));

           		for(var loopY = this.centerPatchPosition.y; loopY < loopHeight; loopY += this.centerPatchSize.y) 
           		{

           			if(drawnSides == false) {
	           			//Center Left
	           			left = 0;
	           			right = this.centerPatchPosition.x / this.spriteSize.x;

	           			top = startY;
	           			bottom = top + Math.min((loopHeight - loopY), this.centerPatchSize.y) / this.spriteSize.y;

	           			leftCenterCoords = leftCenterCoords.concat(mocu.renderer.generateCoordinateSquare(left, right, top, bottom));

	           			//Center Right
	          			left = endX;
	           			right = 1;

	           			top = startY;
	           			bottom = top + Math.min((loopHeight - loopY), this.centerPatchSize.y) / this.spriteSize.y;

	           			rightCenterCoords = rightCenterCoords.concat(mocu.renderer.generateCoordinateSquare(left, right, top, bottom));
           			}

           			//Center
           			left = startX;
           			right = left + Math.min((loopWidth - loopX), this.centerPatchSize.x) / this.spriteSize.x;

           			top = startY;
           			bottom = top + Math.min((loopHeight - loopY), this.centerPatchSize.y) / this.spriteSize.y;

           			var coords = mocu.renderer.generateCoordinateSquare(left, right, top, bottom);
           			centerCoords = centerCoords.concat(coords);

           			console.log("RUN!");
           		}
       			drawnSides = true;
           	}

			//Top left corner
			left = 0;
			right = this.centerPatchPosition.x / this.spriteSize.x;

			top = 0;
			bottom = this.centerPatchPosition.y / this.spriteSize.y;

			var topLeftCoords = mocu.renderer.generateCoordinateSquare(left, right, top, bottom);


           	//Top right corner
           	left = (this.centerPatchPosition.x + this.centerPatchSize.x) / this.spriteSize.x;
           	right = 1.0;

           	top = 0;
           	bottom = this.centerPatchPosition.y / this.spriteSize.y;

           	var topRightCoords = mocu.renderer.generateCoordinateSquare(left, right, top, bottom);


           	//Bottom left corner
           	left = 0;
           	right = this.centerPatchPosition.x / this.spriteSize.x;

           	top = (this.centerPatchPosition.y + this.centerPatchSize.y) / this.spriteSize.x;
           	bottom = 1;

           	var bottomLeftCoords = mocu.renderer.generateCoordinateSquare(left, right, top, bottom);


           	//Bottom right corner
           	left = (this.centerPatchPosition.x + this.centerPatchSize.x) / this.spriteSize.x;
           	right = 1;

           	top = (this.centerPatchPosition.y + this.centerPatchSize.y) / this.spriteSize.x;
           	bottom = 1;

           	var bottomRightCoords = mocu.renderer.generateCoordinateSquare(left, right, top, bottom);

           	this.lastGlTextureCoordinateArray = centerCoords
           		.concat(topCenterCoords)
           		.concat(bottomCenterCoords)
           		.concat(leftCenterCoords)
           		.concat(rightCenterCoords)
           		.concat(topLeftCoords)
           		.concat(topRightCoords)
           		.concat(bottomLeftCoords)
           		.concat(bottomRightCoords)

		}
		return this.lastGlTextureCoordinateArray;
	}

	mocu.Patch.prototype.composeTextureCoordinateProperty = function() {
		return this.composeProperty(
			"texCoord",
			"a_texCoord",
			2,
			mocu.Patch.prototype.getTextureCoordinateArray,
			function() {
				var hasChanged = 
					(
						this.lastGlCenterPatchX != this.centerPatchPosition.x || this.lastGlCenterPatchY != this.centerPatchPosition.y ||
						this.lastGlCenterPatchWidth != this.centerPatchSize.x || this.lastGlCenterPatchHeight != this.centerPatchSize.y ||
						this.lastGlWidth != this.width || this.lastGlHeight != this.height
					)

				return hasChanged;
			}
		);
	}

	mocu.Patch.prototype.composePositionProperty = function() {
		return this.composeProperty(
			"position",
			"a_position",
			2,
			mocu.Patch.prototype.getCoordinateArray,
			function() {
				var hasChanged = 
					(
						this.lastGlCenterPatchX != this.centerPatchPosition.x || this.lastGlCenterPatchY != this.centerPatchPosition.y ||
						this.lastGlCenterPatchWidth != this.centerPatchSize.x || this.lastGlCenterPatchHeight != this.centerPatchSize.y ||
						this.lastGlWidth != this.width || this.lastGlHeight != this.height
					)

				return hasChanged;
			}
		);
	};

	mocu.Patch.prototype.composeTranslationProperty = mocu.MocuBackground.prototype.composeTranslationProperty;

	mocu.Patch.prototype.composeRotationProperty = mocu.MocuBackground.prototype.composeRotationProperty;

	mocu.Patch.prototype.composeScaleProperty = mocu.MocuBackground.prototype.composeScaleProperty;

	mocu.Patch.prototype.composeFadeProperty = mocu.MocuBackground.prototype.composeFadeProperty;

	mocu.Patch.prototype.composeAlphaProperty = mocu.MocuBackground.prototype.composeAlphaProperty;

	mocu.Patch.prototype.getGlProperties = function() {

		var middleWidth = this.width - (this.centerPatchPosition.x + (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)));
		var middleVerticalPrimitives = Math.ceil(middleWidth / this.centerPatchSize.x);

		var middleHeight = this.height - (this.centerPatchPosition.y + (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y)));
		var middleHorizontalPrimitives = Math.ceil(middleHeight / this.centerPatchSize.y);

		var centerPrimitives = Math.ceil((middleWidth * middleHeight) / (this.centerPatchSize.x * this.centerPatchSize.y))

		this.primitives =  centerPrimitives + (2 *(middleVerticalPrimitives + middleHorizontalPrimitives)) + 4;

		var properties = mocu.MocuSprite.prototype.getGlProperties.call(this);

		this.lastGlCenterPatchX = this.centerPatchPosition.x;
		this.lastGlCenterPatchY = this.centerPatchPosition.y;
		this.lastGlCenterPatchWidth = this.centerPatchSize.x;
		this.lastGlCenterPatchHeight = this.centerPatchSize.y;
		this.lastGlWidth = this.width;
		this.lastGlHeight = this.height;
		
		return properties;
	}
})();
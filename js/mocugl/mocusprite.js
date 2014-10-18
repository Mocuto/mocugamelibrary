(function() {
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
})();
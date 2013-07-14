(function () {
    MocuGame.MocuText = function (point, size, text) {
        MocuGame.MocuSprite.call(this,point, size);
        this.text = text;
        this.font = "30px Cubos";
        this.fade.r = 0;
        this.fade.g = 0;
        this.fade.b = 0;
        this.align = "left";
        this.doesStroke = false;
        this.strokeColor = new MocuGame.RGBA(0, 0, 0, 0);
        this.strokeWidth = 1;
    }
    MocuGame.MocuText.prototype = new MocuGame.MocuSprite(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuText.constructor = MocuGame.MocuText;
    MocuGame.MocuText.prototype.draw = function (context, displacement) {
        //MocuGame.MocuObject.prototype.draw.call(this, context, displacement);
        if (typeof displacement == null || typeof displacement == 'undefined')
            displacement = new MocuGame.Point(0, 0);

        
        context.translate(((this.x + displacement.x)) * MocuGame.uniscale, ((this.y + this.height/2) + displacement.y) * MocuGame.uniscale);
        if (this.align == "center" || this.align == "start")
            context.translate((this.width / 2) * MocuGame.uniscale, 0);

        context.scale(this.flip.x * this.scale.x * (MocuGame.uniscale * 2), this.flip.y * this.scale.y * (MocuGame.uniscale * 2));
        context.rotate((this.angle * 3.14159265359) / 180);

        context.globalCompositeOperation = this.drawmode;
        context.globalAlpha = this.alpha;

        //Set the font and color and alignment
        context.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")";
        context.strokeStyle = "rgb( " + Math.ceil(this.strokeColor.r * 255) + ", " + Math.ceil(this.strokeColor.g * 255) + ", " + Math.ceil(this.strokeColor.b * 255) + ")";
        context.strokeWidth = this.strokeWidth;
        context.font = this.font;
        context.textAlign = this.align;

        //Draw that text
        var currentLine = '';
        var words = this.text.split(' ');
        var testLine = '';
        var height = 0;
        for (var i = 0; i < words.length; i += 1) {
            testLine = currentLine + ' ' + words[i] + ' ';
            if (context.measureText(testLine).width > this.width) {
                context.fillText(currentLine, 0, height);
                if (this.doesStroke && this.strokeColor != null)
                    context.strokeText(currentLine, 0, height);
                currentLine = words[i] + ' ';
                height += this.height;
            }
            else {
                currentLine = testLine;
            }
        }
        context.fillText(currentLine, 0, height);
        if (this.doesStroke && this.strokeColor != null)
            context.strokeText(currentLine, 0, height);
 

        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.scale(this.flip.x / this.scale.x / (MocuGame.uniscale * 2), this.flip.y / this.scale.y / (MocuGame.uniscale * 2));
        //console.log(this.img.src + "/" + this.frame.x + "/" + this.frame.y);
        context.translate((-((this.x) + displacement.x)) * MocuGame.uniscale, (-((this.y + this.height/2) + displacement.y)) * MocuGame.uniscale);
        if (this.align == "center" || this.align == "start")
            context.translate(-(this.width / 2) * MocuGame.uniscale, 0);
        context.globalCompositeOperation = "source-over";
    }
    MocuGame.MocuText.prototype.animate = function () {
        //Do nothing
    }
})()
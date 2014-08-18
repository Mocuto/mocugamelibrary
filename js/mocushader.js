(function () {
    MocuGame.MocuShader = function(shaderLocation, type, dontPreload)
    {
        this.src = shaderLocation;
        this.type = type;

        if (typeof dontPreload == "undefined") {
            dontPreload = false;
        }

        if (typeof shaderLocation != "undefined") {
            this.file = MocuGame.preload.getResult(shaderLocation);
            if (dontPreload || this.file == null) {
                this.file = MocuGame.loadServerFile(shaderLocation);
                
            }
        }

        this.isCompiled = false;
        this.compiledObject = null;
    }

    MocuGame.MocuShader.prototype.getText = function () {
        if (typeof this.file =="undefined")
        {
            return "";
        }
        return this.file.responseText;
    }
})()
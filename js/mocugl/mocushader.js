(function () {
    mocu.Shader = function(shaderLocation, type, dontPreload)
    {
        this.src = shaderLocation;
        this.type = type;

        if (typeof dontPreload == "undefined") {
            dontPreload = false;
        }

        if (typeof shaderLocation != "undefined") {
            this.file = mocu.preload.getResult(shaderLocation);
            if (dontPreload || this.file == null) {
                this.file = mocu.loadServerFile(shaderLocation);
                
            }
        }

        this.isCompiled = false;
        this.compiledObject = null;
    }

    mocu.Shader.prototype.getText = function () {
        if (typeof this.file =="undefined")
        {
            return "";
        }
        return this.file.responseText;
    }
})()
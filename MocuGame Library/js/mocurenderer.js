(function () {
    MocuGame.MocuRenderer = function (gl) {
        this.gl = gl;
        this.translate = new MocuGame.Point(0, 0);

        this.programCache = {};

        this.defaultProgram = this.loadProgram(gl, MocuGame.DEFAULT_VERTEX_SHADER, MocuGame.DEFAULT_FRAGMENT_SHADER);

        this.useProgram(this.defaultProgram);

        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);

        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.viewport(0, 0, MocuGame.resolution.x + 1, MocuGame.resolution.y + 1);

    };
    MocuGame.MocuRenderer.constructor = MocuGame.MocuRenderer;

    MocuGame.MocuRenderer.prototype.isProgramCached = function (gl, mocuVertexShader, mocuFragmentShader) {
        if (this.programCache.hasOwnProperty([mocuVertexShader.src, mocuFragmentShader.src])) {
            return true;
        }
        return false;
    }

    MocuGame.MocuRenderer.prototype.loadProgram = function (gl, mocuVertexShader, mocuFragmentShader) {
        //Check to make sure teh program isn't already chached
        if (this.isProgramCached(gl, mocuVertexShader, mocuFragmentShader)) {
            var program = this.programCache[[mocuVertexShader.src, mocuFragmentShader.src]];
            return program;
        }

        //Create a program object
        var program = gl.createProgram();
      
        var vertexShader = this.compileShader(gl, mocuVertexShader);

        var fragmentShader = this.compileShader(gl, mocuFragmentShader);

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);

        //Check the link status
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {

            //An error occured while linking
            var lastError = gl.getProgramInfoLog(program);
            console.warn("Error in program linking: " + lastError);

            gl.deleteProgram(program);
            return null;
        }

        this.programCache[[mocuVertexShader.src, mocuFragmentShader.src]] = program;

        return program;
    };

    MocuGame.MocuRenderer.prototype.useProgram = function (program) {
        if (this.program == program)
        {
            return;
        }
        var gl = this.gl;
        gl.useProgram(program);
        this.program = program;

        var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        gl.uniform2fv(resolutionLocation, new Float32Array([MocuGame.resolution.x, MocuGame.resolution.y]));

        var globalTranslateLocation = gl.getUniformLocation(program, "u_globalTranslate");
        gl.uniform2fv(globalTranslateLocation, new Float32Array([this.translate.x, this.translate.y]));
    }

    MocuGame.MocuRenderer.prototype.compileShader = function (gl, mocuShader) {

        if (mocuShader.isCompiled === true) {
            return mocuShader.compiledObject;
        }

        var shaderType = mocuShader.type;
        var shader = null;

        if(shaderType == MocuGame.SHADER_TYPE_FRAGMENT) //Create approriate shader based off of type
        {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }
        else if (shaderType == MocuGame.SHADER_TYPE_VERTEX)
        {
            shader = gl.createShader(gl.VERTEX_SHADER);
        }
        else {
            console.warn("Shader type specified could not be identified.");
            return null;
        }

        var shaderContent = mocuShader.getText();

        gl.shaderSource(shader, shaderContent); //Add shader source to the shader object
        gl.compileShader(shader); //Compile the shader

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.warn("Error compiling shader: ");
            console.warn(gl.getShaderInfoLog(shader));

            return null;
        }

        mocuShader.isCompiled = true;
        mocuShader.compiledObject = shader;

        return shader;
    }


    MocuGame.MocuRenderer.prototype.drawImage = function (gl, object) {
        var displacement = new MocuGame.Point(0, 0);
        var resolutionLocation = gl.getUniformLocation(this.program, "u_resolution");
        gl.uniform2fv(resolutionLocation, new Float32Array([MocuGame.resolution.x, MocuGame.resolution.y]));

        var translateLocation = gl.getUniformLocation(this.program, "u_translate");
        var translate = new Float32Array([
            ((object.x + displacement.x) + (object.width / 2)) * MocuGame.uniscale, ((object.y + object.height / 2) + displacement.y) * MocuGame.uniscale
        ]);

        gl.uniform2fv(translateLocation, translate);

        var textureCoordinateLocation = gl.getAttribLocation(this.program, "a_position");

        // Provide texture coordinates for the rectangle
        var textureCoordinateBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinateBuffer);

        //Create a buffer and set it to use the array buffer
        gl.bufferData(gl.ARRAY_BUFFER, this.getCoordinateArrayForObject(object), gl.STATIC_DRAW);

        //Activate the vertex attributes in the GPU program
        gl.enableVertexAttribArray(textureCoordinateLocation);

        //Set the format of the textureCoordinateLocation array
        gl.vertexAttribPointer(textureCoordinateLocation, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

})()
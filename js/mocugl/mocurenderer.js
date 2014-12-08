(function () {
    MocuGame.MocuRenderer = function (gl) {
        this.gl = gl;
        this.ext = gl.getExtension("ANGLE_instanced_arrays"); 
        this.translate = new MocuGame.Point(0, 0);

        this.programCache = {};
        this.textureCache = {};
        this.textureBufferCache = {};

        this.locationCache = {};
        this.uniformLocationCache = {};

        this.defaultProgram = this.loadProgram(gl, MocuGame.DEFAULT_VERTEX_SHADER, MocuGame.DEFAULT_FRAGMENT_SHADER);

        this.useProgram(this.defaultProgram);

        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);

        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        gl.viewport(0, 0, MocuGame.resolution.x + 1, MocuGame.resolution.y + 1);

        this.framebuffers = [];
        this.framebufferTextures = [];

        this.setupFramebuffers(gl);

        this.framebufferIndex = 0;
        this.framebufferTextureIndex = 0;

        this.verticesForProperties = {
            "position" : 2,
            "texCoord" : 2,
            "scale" : 2,
            "rotation" : 2,
            "fade" : 4,
            "alpha" : 1
        };

        this.properties = [
            new MocuGame.MocuGlProperty("position", "a_position", 2, false),
            new MocuGame.MocuGlProperty("translation", "a_translation", 2, false),
            new MocuGame.MocuGlProperty("texCoord", "a_texCoord", 2, false),
            new MocuGame.MocuGlProperty("scale", "a_scale", 2, false),
            new MocuGame.MocuGlProperty("rotation", "a_rotation", 2, false),
            new MocuGame.MocuGlProperty("fade", "a_fade", 4, false),
            new MocuGame.MocuGlProperty("alpha", "a_alpha", 1, false)
        ]

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
        if (this.isProgramCached(gl, mocuVertexShader, mocuFragmentShader) == true) {
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


    MocuGame.MocuRenderer.prototype.setupFramebuffers = function (gl) {

        for (var i = 0; i < 2; i++) {

            var framebuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

            //Create the texture and bind it
            var texture = this.createAndSetupTexture(gl);

            //Set the texture to a temporary with and height
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            // Attach a texture to the frame buffer
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

            //Add the framebuffers and textures to a list for later reference
            this.framebuffers.push(framebuffer);
            this.framebufferTextures.push(texture);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };

    MocuGame.MocuRenderer.prototype.createAndSetupTexture = function (gl) {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Set up texture so we can render any size image and so we are
        // working with pixels.
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        return texture;
    };

    MocuGame.MocuRenderer.prototype.setupObjectTexture = function (gl) {
        var texture = this.createAndSetupTexture(gl);
                var blankCanvas = MocuGame.blankCanvas;
        var blankContext = MocuGame.blankContext;

        var texture = gl.createTexture();
        this.prepareTexture(gl, texture, program);

        blankCanvas.width = 1;
        blankCanvas.height = 1;

        blankContext.rect(0,0,1,1);
        blankContext.fillStyle="white"
        blankContext.fill();

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, blankCanvas);

        this.textureCache[MocuGame.OBJECT_TEXTURE_SRC] = texture;
    }

    MocuGame.MocuRenderer.prototype.getSourceForTexture = function (texture) {
        for (imageSrc in this.textureCache) {
            if (this.textureCache[imageSrc] == texture) {
                return imageSrc;
            }
        }
        return null;
    }

    MocuGame.MocuRenderer.prototype.getCachedTexture = function (gl, image) {
        if ((image.src in this.textureCache) == false)
        {
            var texture = this.createAndSetupTexture(gl);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            this.textureCache[image.src] = texture;
        }

        return this.textureCache[image.src];
    }

    MocuGame.MocuRenderer.prototype.cacheTextTexture = function(texture, textureSrc) {
        this.textureCache[textureSrc] = texture;
    }

    MocuGame.MocuRenderer.prototype.getCachedLocation = function (gl, program, name) {
        if ((name in this.locationCache) == false) {
            this.locationCache[name] = gl.getAttribLocation(program, name);
        }
        return this.locationCache[name];
    }

    MocuGame.MocuRenderer.prototype.getCachedUniformLocation = function (gl, program, name) {
        if ((name in this.uniformLocationCache) == false) {
            this.uniformLocationCache[name] = gl.getUniformLocation(program, name);
        }
        return this.uniformLocationCache[name];
    }

    MocuGame.MocuRenderer.prototype.setAttribute = function (gl, program, attributeName, attributeValue, componentsPerAttribute) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        var location = this.getCachedLocation(gl, program, attributeName);

        //Create a buffer and set it to use the array buffer
        gl.bufferData(gl.ARRAY_BUFFER, attributeValue, gl.STATIC_DRAW)


        //Activate the vertex attributes in the GPU program
        gl.enableVertexAttribArray(location);

        //Set the format of the positionLocation array
        gl.vertexAttribPointer(location, componentsPerAttribute, gl.FLOAT, false, 0, 0);
    }

    MocuGame.MocuRenderer.prototype.setAttributeInstanced = function(gl, program, attributeName, attributeValue, componentsPerAttribute, divisor) {
        this.setAttribute(gl, program, attributeName, attributeValue, componentsPerAttribute);
        var location = this.getCachedLocation(gl, program, attributeName);

        this.ext.vertexAttribDivisorANGLE(location, divisor);
    }

    MocuGame.MocuRenderer.prototype.setResolutionUniform = function (gl, program, resolution) {
        var location = this.getCachedUniformLocation(gl, program, "u_resolution");

        if (this.lastResolution != resolution) {
            gl.uniform2fv(location, new Float32Array([resolution.x, resolution.y]));
            this.lastResolution = resolution;
        }
    }

    MocuGame.MocuRenderer.prototype.getCachedTextureBuffer = function (gl, textureCoordinateArray) {
        var key = Array.prototype.map.call(textureCoordinateArray, function (item) {
            return String(item);
        }).join();

        if ((key in this.textureBufferCache) == false) {
            texCoordBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, textureCoordinateArray, gl.STREAM_DRAW);

            this.textureBufferCache[key] = texCoordBuffer;
        }
        else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBufferCache[key]);
        }
        return this.textureBufferCache[key];
    }

    MocuGame.MocuRenderer.prototype.setFramebufferForObject = function(gl, oldTexture, width, height)
    {
        var framebuffer = this.framebuffers[this.framebufferIndex];
        var texture = this.framebufferTextures[this.framebufferIndex];

        // make this the framebuffer we are rendering to.
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

        gl.bindTexture(gl.TEXTURE_2D, texture);

        //Make the texture the same size as the object
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        // Attach a texture to the frame buffer
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

        // Tell webgl the viewport setting needed for framebuffer.
        gl.viewport(0, 0, width, height);


        this.framebufferIndex = (this.framebufferIndex + 1) % 2;

        gl.bindTexture(gl.TEXTURE_2D, oldTexture);

        return framebuffer;
    }


    MocuGame.MocuRenderer.prototype.advanceFramebufferTexture = function (gl) {
        var textureIndex = this.framebufferIndex == 0 ? 1 : 0
        var texture = this.framebufferTextures[textureIndex];

        gl.bindTexture(gl.TEXTURE_2D, texture);

        return texture;
    };

    MocuGame.MocuRenderer.prototype.finishFramebufferEffects = function (gl) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, MocuGame.resolution.x + 1, MocuGame.resolution.y + 1);
        this.framebufferIndex = 0;
    };

    MocuGame.MocuRenderer.prototype.generateBatchKey = function(textureSrc) {
        return textureSrc;
    }

    MocuGame.MocuRenderer.prototype.generatePropertySet = function() {
        var result = [];
        for (var i = 0; i < this.properties.length; i ++) {
            var prop = this.properties[i];
            var clone = MocuGame.cloneObject(prop);
            result.push(clone);
        }
        return result;
    }

    MocuGame.MocuRenderer.prototype.draw = function(gl) {
        var program = this.preDrawGl(gl, displacement);
        var objectsForTexture = {};
        var positionsForTexture = {};
        var translationsForTexture = {};
        var texCoordsForTexture = {};
        var rotationsForTexture = {};
        var scalesForTexture = {};
        var cameraTranslationsForTexture = {};
        var cameraZoomsForTexture = {};
        var fadesForTexture = {};
        var alphasForTexture = {};
        var texture = null;
        var groupsToDraw = [];

        var ownProperties = this.getGlProperties();
        var startPosition = new MocuGame.Point(displacement.x + this.x, displacement.y + this.y)

        function updateProperty(property, valueArray, startIndex, endIndex) {
            if(property == null) {
                return;
            }
            while(property.length < endIndex) {
                property.push(null);
            }
            for(var i = startIndex; i < endIndex; i++) {
                property[i] = valueArray[(i - startIndex) % valueArray.length];
            }
        }

        function getPropertyStartIndex(index, components, primitives) {
            return index * MocuGame.VERTICES_PER_OBJECT * components * primitives;
        }

        function getPropertyEndIndex(index, components, primitives) {
            return getPropertyStartIndex(index, components, primitives) + (MocuGame.VERTICES_PER_OBJECT * components * primitives);
        }

        for (var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            if (MocuGame.MocuGroup.prototype.isPrototypeOf(object)) {
                groupsToDraw.push(object);
            }
            else if (MocuGame.MocuSprite.prototype.isPrototypeOf(object)) {
                var sprite = object;
                texture = sprite.getTexture(gl);
                var textureSrc = MocuGame.renderer.getSourceForTexture(texture);

                if(sprite.animates) {
                    sprite.animate();
                }
                

                var properties = sprite.getGlProperties();
                var updateAllProperties = (sprite.glLastParentIndex != i ||
                    sprite.glLastParent != this || 
                    ownProperties["translation"].hasChanged || 
                    sprite.lastTextureSrc != textureSrc);

                sprite.lastTextureSrc = textureSrc;

                var propertyStartIndex1 = getPropertyStartIndex(i, 1, sprite.primitives);
                var propertyEndIndex1 = getPropertyEndIndex(i, 1, sprite.primitives);

                var propertyStartIndex2 = getPropertyStartIndex(i, 2, sprite.primitives);
                var propertyEndIndex2 = getPropertyEndIndex(i, 2, sprite.primitives);

                var propertyStartIndex4 = getPropertyStartIndex(i, 4, sprite.primitives);
                var propertyEndIndex4 = getPropertyEndIndex(i, 4, sprite.primitives);

                if (texture == null || sprite.visible == false || sprite.exists == false || sprite.isOnScreen() == false) {
                    if(sprite.glLastParentIndex != -1 && textureSrc != null) {
                        for(property in this.verticesForProperties) {
                            updateProperty(
                                this.positionsForTexture[textureSrc], 
                                [null],
                                propertyStartIndex2, 
                                propertyStartIndex2 + 12 * sprite.primitives
                            )
                            updateProperty(
                                this.texCoordsForTexture[textureSrc], 
                                [null], 
                                propertyStartIndex2, 
                                propertyEndIndex2
                            )
                            updateProperty(
                                this.translationsForTexture[textureSrc], 
                                [null],
                                propertyStartIndex2, 
                                propertyEndIndex2
                            );
                            updateProperty(
                                this.scalesForTexture[textureSrc], 
                                [null], 
                                propertyStartIndex2, 
                                propertyEndIndex2
                            );
                            updateProperty(
                                this.rotationsForTexture[textureSrc], 
                                [null], 
                                propertyStartIndex2, 
                                propertyEndIndex2
                            )
                            updateProperty(
                                this.fadesForTexture[textureSrc], 
                                [null], 
                                propertyStartIndex4, 
                                propertyEndIndex4
                            );

                            updateProperty(
                                this.alphasForTexture[textureSrc], 
                                [null], 
                                propertyStartIndex1, 
                                propertyEndIndex1
                            );

 
                        }
                        i--;
                        updateAllProperties = true;
                    }
                    sprite.glLastParentIndex = -1;

                    continue;
                }
                if ((textureSrc in objectsForTexture) == false) {

                    objectsForTexture[textureSrc] = [];
                }
                if ((textureSrc in this.objectsForTexture) == false) {
                    this.objectsForTexture[textureSrc] = [];
                    this.positionsForTexture[textureSrc] = [];
                    this.texCoordsForTexture[textureSrc] = [];
                    this.translationsForTexture[textureSrc] = [];
                    this.scalesForTexture[textureSrc] = [];
                    this.rotationsForTexture[textureSrc] = [];
                    this.fadesForTexture[textureSrc] = [];
                    this.alphasForTexture[textureSrc] = [];
                }

                if (properties["position"].hasChanged || updateAllProperties) {
                    updateProperty(this.positionsForTexture[textureSrc], properties["position"].value,
                     propertyStartIndex2, propertyStartIndex2 + 12 * sprite.primitives)
                }

                if(properties["texCoord"].hasChanged || updateAllProperties) {
                    updateProperty(this.texCoordsForTexture[textureSrc], properties["texCoord"].value, propertyStartIndex2, propertyEndIndex2)
                }

                if(properties["translation"].hasChanged || updateAllProperties) {
                    updateProperty(this.translationsForTexture[textureSrc], properties["translation"], propertyStartIndex2, propertyEndIndex2);
                }

                if(properties["scale"].hasChanged || updateAllProperties) {
                    updateProperty(this.scalesForTexture[textureSrc], properties["scale"].value, propertyStartIndex2, propertyEndIndex2);
                }

                if(properties["rotation"].hasChanged || updateAllProperties) {
                    updateProperty(this.rotationsForTexture[textureSrc], properties["rotation"].value, propertyStartIndex2, propertyEndIndex2)
                }

                if(properties["fade"].hasChanged || updateAllProperties) {
                    updateProperty(this.fadesForTexture[textureSrc], properties["fade"].value, propertyStartIndex4, propertyEndIndex4);
                }

                if(properties["alpha"].hasChanged || updateAllProperties) {
                    updateProperty(this.alphasForTexture[textureSrc], properties["alpha"].value, propertyStartIndex1, propertyEndIndex1);
                }
                //UpdateProperties
                sprite.glLastParentIndex = i;
                sprite.glLastParent = this;

                objectsForTexture[textureSrc].push(sprite);
            }
        }
        

        for (textureSrc in objectsForTexture)
        {
            var texture = MocuGame.renderer.textureCache[textureSrc]
            gl.bindTexture(gl.TEXTURE_2D, texture);

            this.setTextureParameters(gl);

            if (typeof this.objectsForTexture[textureSrc] === "undefined") {
                //Fix array lengths
            }
            else if (this.objectsForTexture[textureSrc].length > objectsForTexture[textureSrc]) {
                //Fix array lengths;
            }
            //Here, load all of the properties
            //TODO: Find way to open up this code to external shader properties
            var ext = MocuGame.renderer.ext;

            MocuGame.renderer.setAttribute(gl, program, "a_texCoord", new Float32Array(this.texCoordsForTexture[textureSrc]), 2);
            MocuGame.renderer.setAttribute(gl, program, "a_position", new Float32Array(this.positionsForTexture[textureSrc]), 2);
            MocuGame.renderer.setAttribute(gl, program, "a_translation", new Float32Array(this.translationsForTexture[textureSrc]), 2);
            MocuGame.renderer.setAttribute(gl, program, "a_rotation", new Float32Array(this.rotationsForTexture[textureSrc]), 2);
            MocuGame.renderer.setAttribute(gl, program, "a_scale", new Float32Array(this.scalesForTexture[textureSrc]), 2);
            MocuGame.renderer.setAttribute(gl, program, "a_fade", new Float32Array(this.fadesForTexture[textureSrc]), 4);
            MocuGame.renderer.setAttribute(gl, program, "a_alpha", new Float32Array(this.alphasForTexture[textureSrc]), 1);

            MocuGame.renderer.setResolutionUniform(gl, program, MocuGame.resolution);

            var numberOfObjects = objectsForTexture[textureSrc].length;

            gl.drawArrays(gl.TRIANGLES, 0, MocuGame.VERTICES_PER_OBJECT * (this.alphasForTexture[textureSrc].length / 6));
        }
        for(var i = 0; i < groupsToDraw.length; i++) {
            groupsToDraw[i].drawGl(gl, startPosition);
        }
        this.objectsForTexture = objectsForTexture;
    };
})()
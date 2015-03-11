(function() {

	mocu.Group.EXTENSION_METHODS.push(function() {
		if(typeof mocu.renderer === "undefined") {
			return;
		}
        this.program = mocu.renderer.loadProgram(mocu.renderer.gl, mocu.DEFAULT_SPRITE_VERTEX_SHADER, mocu.DEFAULT_SPRITE_FRAGMENT_SHADER);
        this.objectsForTexture = {};
        this.positionsForTexture = {};
        this.translationsForTexture = {};
        this.texCoordsForTexture = {};
        this.rotationsForTexture = {};
        this.scalesForTexture = {};
        this.cameraTranslationsForTexture = {};
        this.cameraZoomsForTexture = {};
        this.fadesForTexture = {};
        this.alphasForTexture = {};

        this.lastBatches = [];
	})

	if(typeof mocu.Group.old === "undefined") {
		mocu.Group.old = {};
		mocu.Group.old.constructor = mocu.Group.constructor;
		mocu.Group.old.prototype = mocu.Group.prototype;
	}
    mocu.Group.prototype.applyEffectsToObject = function (object, gl, texture)
    {
        var effectedTexture = texture;
        for (var i = 0; i < this.effects.length; i++) {
            var effect = this.effects[i];

            //Have the MocuRenderer set and enable the next framebuffer and texture
            var renderingSize = object.getRenderingSize();
            mocu.renderer.setFramebufferForObject(gl, effectedTexture, renderingSize.x, renderingSize.y);
            

            //Here load the shaders and run the callback contained withiin the effect object
            var program = effect.apply(gl, object);
            mocu.renderer.useProgram(program);

            this.prepareTexture(gl, effectedTexture, program, mocu.MocuObject.prototype.getTextureCoordinateArray.call(object));


            //Draw the triangles to the framebuffer
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            effectedTexture = mocu.renderer.advanceFramebufferTexture(gl);
        }
        return effectedTexture;
    }

    mocu.Group.prototype.drawGl = function (gl, displacement) {
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

        var batches = [];
        var lastBatch = null;
        var lastBatchKey = null;

		var ownProperties = this.getGlProperties();
        var startPosition = new mocu.Point(displacement.x + this.x, displacement.y + this.y)

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
            return index * mocu.VERTICES_PER_OBJECT * components * primitives;
        }

        function getPropertyEndIndex(index, components, primitives) {
            return getPropertyStartIndex(index, components, primitives) + mocu.VERTICES_PER_OBJECT * components * primitives;
        }
        var depth = 0;
        var numberOfObjectsAtDepth = [this.objects.length];
        var objectArrayAtDepth = [this.objects];
        var indexAtDepth = [0];
        var batchIndex = 0;
        var indexInBatch = 0;
        var newBatch = false;
        //for (var i = 0; i < this.objects.length; i++) {
        while(depth >= 0)
        {
            //var object = this.objects[i];
            var i  = indexAtDepth[depth]
            var object = objectArrayAtDepth[depth][i];
            if (mocu.Group.prototype.isPrototypeOf(object)) {
            	//groupsToDraw.push(object);
                var group = object;

                depth++
                while(numberOfObjectsAtDepth.length <= depth) {
                    numberOfObjectsAtDepth.push(null);
                    objectArrayAtDepth.push(null);
                    indexAtDepth.push(0);
                }
                numberOfObjectsAtDepth[depth] = group.objects.length;
                objectArrayAtDepth[depth] = group.objects;
            }
            else if (mocu.MocuObject.prototype.isPrototypeOf(object)) {
                indexAtDepth[depth]++;

                var sprite = object;
                texture = sprite.getTexture(gl);
                var textureSrc = mocu.renderer.getSourceForTexture(texture);
                

                if (texture == null || sprite.visible == false || sprite.exists == false || sprite.isOnScreen() == false) {
                    if(sprite.glLastParentIndex != -1 && textureSrc != null) {
                        i--;
                        updateAllProperties = true;
                    }
                    sprite.glLastParentIndex = -1;
                    sprite.glLastBatchIndex = -1;
                    continue;
                }

                var batchKey = mocu.renderer.generateBatchKey(textureSrc);

                if (batchIndex >= this.lastBatches.length || batchKey != this.lastBatches[batchIndex].key) {
                    if(batchKey !== lastBatchKey) 
                    {
                        lastBatch = new mocu.MocuGlBatch(batchKey, mocu.renderer.generatePropertySet());
                        lastBatchKey = batchKey
                        batches.push(lastBatch);
                        indexInBatch = 0;
                        newBatch = true;
                    }
                }
                else {
                    if(batchKey != lastBatchKey) {
                        lastBatch = this.lastBatches[batchIndex];
                        lastBatchKey = batchKey;
                        batches.push(lastBatch)
                        lastBatch.primitivesRendered = 0;
                        newBatch = false;
                    }
                }

                /*if(batchKey != lastBatchKey) {
                    lastBatch = new mocu.MocuGlBatch(batchKey, mocu.renderer.generatePropertySet());
                    lastBatchKey = batchKey
                    batches.push(lastBatch);
                }*/

                var batch = lastBatch;
                batchIndex = batches.length - 1;

                if(sprite.animates) {
                    sprite.animate();
                }

                var properties = sprite.getGlProperties();
                var additionalProperties = sprite.getAdditionalGlProperties();

                for(propertyName in additionalProperties) {
                    properties[propertyName] = additionalProperties[propertyName];
                }

                var updateAllProperties = (
                    newBatch == true ||
                    sprite.glLastParentIndex != indexInBatch ||
                    sprite.glLastBatchIndex != batchIndex ||
                    //sprite.glLastParent != this || 
                    sprite.lastTextureSrc != textureSrc
                );

                sprite.lastTextureSrc = textureSrc;

                /*var propertyStartIndex1 = getPropertyStartIndex(i, 1, sprite.primitives);
                var propertyEndIndex1 = getPropertyEndIndex(i, 1, sprite.primitives);

                var propertyStartIndex2 = getPropertyStartIndex(i, 2, sprite.primitives);
                var propertyEndIndex2 = getPropertyEndIndex(i, 2, sprite.primitives);

                var propertyStartIndex4 = getPropertyStartIndex(i, 4, sprite.primitives);
                var propertyEndIndex4 = getPropertyEndIndex(i, 4, sprite.primitives);*/

                /*if (texture == null || sprite.visible == false || sprite.exists == false || sprite.isOnScreen() == false) {
                    if(sprite.glLastParentIndex != -1 && textureSrc != null) {
                        for(property in properties) {
                            batch.updateProperty(property, [null], propertyStartIndex2, propertyStartIndex2 + 12 * sprite.primitives)
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
                }*/
                /*if ((textureSrc in objectsForTexture) == false) 
                {

                    objectsForTexture[textureSrc] = [];
                }
                if ((textureSrc in this.objectsForTexture) == false)
                {
                    this.objectsForTexture[textureSrc] = [];
                    this.positionsForTexture[textureSrc] = [];
                    this.texCoordsForTexture[textureSrc] = [];
                    this.translationsForTexture[textureSrc] = [];
                    this.scalesForTexture[textureSrc] = [];
                	this.rotationsForTexture[textureSrc] = [];
                	this.fadesForTexture[textureSrc] = [];
                	this.alphasForTexture[textureSrc] = [];
                }*/

                //*** Batch rendering rewrite code!! ***//
                for (propertyName in properties) 
                {
                    var glProperty = properties[propertyName];
                    var batchProperty = batch.getPropertyWithName(propertyName);
                    if (glProperty.hasChanged == true || updateAllProperties) {
                        batch.updateProperty(propertyName, glProperty.values,
                            glProperty.getLength(batch.primitivesRendered), glProperty.getLength(sprite.primitives))
                    }
                }

                sprite.glLastParentIndex = indexInBatch;
                sprite.glLastBatchIndex = batchIndex;

                indexInBatch++;
                batch.primitivesRendered += sprite.primitives;

                //**                                ***//

                /*if (properties["position"].hasChanged || updateAllProperties) {
                    updateProperty(this.positionsForTexture[textureSrc], properties["position"].value,
                	 propertyStartIndex2, propertyStartIndex2 + 12 * sprite.primitives)
                }

                if(properties["texCoord"].hasChanged || updateAllProperties) {
                    updateProperty(this.texCoordsForTexture[textureSrc], properties["texCoord"].value, propertyStartIndex2, propertyEndIndex2)
                }

                if(properties["translation"].hasChanged || updateAllProperties) {
                    updateProperty(this.translationsForTexture[textureSrc], 
                        [
                            startPosition.x + properties["translation"].value[0],
                            startPosition.y + properties["translation"].value[1]
                        ], 
                        propertyStartIndex2, propertyEndIndex2);
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

                objectsForTexture[textureSrc].push(sprite);*/
            }

            if(indexAtDepth[depth] >= numberOfObjectsAtDepth[depth]) {
                indexAtDepth[depth] = 0;
                depth--;
                if(depth >= 0) {
                    indexAtDepth[depth]++;
                }
            }
        }
    	
        for(batchKey in batches) {
            var batch = batches[batchKey];
            var texture = mocu.renderer.textureCache[batch.textureSrc]

            if(texture == null) {
                continue;
            }

            gl.bindTexture(gl.TEXTURE_2D, texture);

            this.setTextureParameters(gl);

            for(var i = 0; i < batch.properties.length; i++) 
            {
                var property = batch.properties[i];
                mocu.renderer.setAttribute(gl, program, property.glslName, new Float32Array(property.values), property.components);
            }

            mocu.renderer.setResolutionUniform(gl, program, mocu.resolution);
            gl.drawArrays(gl.TRIANGLES, 0, mocu.VERTICES_PER_OBJECT * batch.primitivesRendered);
        }

        /*for (textureSrc in objectsForTexture)
        {
            var texture = mocu.renderer.textureCache[textureSrc]
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
            var ext = mocu.renderer.ext;

            mocu.renderer.setAttribute(gl, program, "a_texCoord", new Float32Array(this.texCoordsForTexture[textureSrc]), 2);
            mocu.renderer.setAttribute(gl, program, "a_position", new Float32Array(this.positionsForTexture[textureSrc]), 2);
            mocu.renderer.setAttribute(gl, program, "a_translation", new Float32Array(this.translationsForTexture[textureSrc]), 2);
            mocu.renderer.setAttribute(gl, program, "a_rotation", new Float32Array(this.rotationsForTexture[textureSrc]), 2);
            mocu.renderer.setAttribute(gl, program, "a_scale", new Float32Array(this.scalesForTexture[textureSrc]), 2);
            mocu.renderer.setAttribute(gl, program, "a_fade", new Float32Array(this.fadesForTexture[textureSrc]), 4);
            mocu.renderer.setAttribute(gl, program, "a_alpha", new Float32Array(this.alphasForTexture[textureSrc]), 1);

            mocu.renderer.setResolutionUniform(gl, program, mocu.resolution);

            var numberOfObjects = objectsForTexture[textureSrc].length;

            //.ext.drawArraysInstancedANGLE(gl.TRIANGLES, 0, mocu.VERTICES_PER_OBJECT * numberOfObjects, numberOfObjects);
            gl.drawArrays(gl.TRIANGLES, 0, mocu.VERTICES_PER_OBJECT * (this.alphasForTexture[textureSrc].length / 6));
        }*/
      	//for(var i = 0; i < groupsToDraw.length; i++)
        {
      		//groupsToDraw[i].drawGl(gl, startPosition);
      	}
        this.lastBatches = batches;
        //this.objectsForTexture = objectsForTexture;
    }
})();
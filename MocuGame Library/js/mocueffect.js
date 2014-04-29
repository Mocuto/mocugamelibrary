(function () {
    MocuGame.MocuEffect = function (vertexShader, fragmentShader, callback, callbackObject) {
        if (typeof vertexShader === "undefined") {
            vertexShader = new MocuGame.MocuShader("js/mocugame-sprite-slim-vertex.shader", MocuGame.SHADER_TYPE_VERTEX);
        }

        if (typeof fragmentShader === "undefined") {
            fragmentShader = new MocuGame.MocuShader("js/mocugame-spriter-fragment.shader", MocuGame.SHADER_TYPE_FRAGMENT)
        }

        this.scale = new MocuGame.Point(1, 1);

        this.fragmentShader = fragmentShader;
        this.vertexShader = vertexShader;

        this.onShaderUsed = callback;
        this.callbackObject = callbackObject;

        this.uniformProperties = {};
        this.attributeProperties = {};
    };

    MocuGame.MocuEffect.prototype.apply = function (gl, effectedObject) {
        var program = MocuGame.renderer.loadProgram(gl, this.vertexShader, this.fragmentShader);
        MocuGame.renderer.useProgram(program);

        effectedObject.setPositionAttribute(gl, program);

        effectedObject.setResolutionUniform(gl, program, new MocuGame.Point(effectedObject.width * this.scale.x, effectedObject.height * this.scale.y));

        if (typeof this.callback !== "undefined") {
            this.callback.call(effectedObject, this, this.callbackObject);
        }

        for (var uniformName in this.uniformProperties)
        {
            var uniformValue = this.uniformProperties[uniformName];
            var uniformLocation = gl.getUniformLocation(program, uniformName);


            if (typeof uniformValue === "number")
            {
                gl.uniform1f(uniformLocation, uniformValue)
            }

            else if (typeof uniformValue === "object")
            {
                switch(uniformValue.length)
                {
                    case 2:
                        gl.uniform2fv(uniformLocation, uniformValue);
                        break;
                    case 3:
                        gl.uniform3fv(uniformLocation, uniformValue);
                        break;
                    case 4:
                        gl.uniformf4v(uniformLocation, uniformValue);
                    case 1:
                    default:
                        gl.uniform1fv(uniformLocation, uniformValue);
                        break;
                }
                if (uniformValue.length == 2)
                {
                    gl.uniform2fv(uniformLocation, uniformValue);
                }
                else if(uniformValue.length == 3)
                {
                    gl.uniform3fv(uniformLocation, uniformValue);
                }


            }
        }

        for (var attributeName in this.attributeProperties)
        {
            var attributeValue = this.attributeProperties[attributeName];
            var attributeLocation = gl.getAttributeLocation(program, attributeName);

            var buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY, attributeValue);

            gl.enableVertexAttribArray(attributeLocation);

            if (attributeValue.length > 1) {
                gl.vertexAttribPointer(attributeLocation, attributeValue.length, gl.FLOAT, false, 0, 0);
            }
            else {
                gl.vertexAttribPointer(attributeLocation, 1, gl.FLOAT, false, 0, 0);
            }
        }

        return program;
    }
})();
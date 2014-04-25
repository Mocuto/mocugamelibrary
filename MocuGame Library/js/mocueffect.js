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

        for (var uniformName in Object.keys(this.uniformProperties))
        {

        }

        for (var attributeName in Object.keys(this.attributeProperties))
        {

        }

        return program;
    }
})();
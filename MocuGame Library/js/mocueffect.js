(function () {
    MocuGame.MocuEffect = function (vertexShader, fragmentShader, callback, callbackObject) {
        this.fragmentShader = fragmentShader;
        this.vertexShader = vertexShader;

        this.onShaderUsed = callback;
        this.callbackObject = callbackObject;

        this.uniformProperties = {};
        this.attributeProperties = {};
    };
})();
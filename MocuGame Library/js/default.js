// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                //Call MocuGame.prepareCanvasForWindows8(canvasId, gameBounds, resolution) here
                //Overload MocuGame.onLoaded here
                //Call MocuGame.init(state, imageManifest, musicManifest, soundManifest) here

                MocuGame.targetResolutionWidth = window.innerWidth;
                MocuGame.prepareCanvasForWindows8("myCanvas", new MocuGame.Point(640, 480),
                    new MocuGame.Point(window.innerWidth, window.innerHeight));

    //            var tilemap = new MocuGame.MocuTilemap(new MocuGame.Point(0, 240), new MocuGame.Point(64, 64), new MocuGame.Point(32, 32),
    //"(5 1 2 3 0),(5 0 1 2 3),(5 2 3 0 1),(5 3 0 1 2)", "images/sampletile.png", new MocuGame.Point(64,64));

                var state = new MocuGame.MocuState(60);
                state.add(new MocuGame.MocuText(new MocuGame.Point(0, 0), new MocuGame.Point(100, 100), "Hello MocuGame!"));


                //state.add(tilemap);

                MocuGame.init(state);

            } else {
                // TODO: This application has been reactivated from suspension.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
        
    };
    app.start();
})();

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
                // TODO: This application has been newly launched. Initialize
                // your application here.
                //MocuGame.preloader = html5Preloader('sounds/ShrioShoot1.mp3');
                //MocuGame.preloader.addFiles('sounds/EnemyDie1.mp3');
                //MocuGame.preloader.addFiles('sounds/EnemyHit1.mp3');
                //MocuGame.preloader.loadFiles();
                var canvas = document.getElementById('myCanvas');
                var blankCanvas = document.getElementById('blankCanvas');
                var context = canvas.getContext('2d');
                MocuGame.gameWidth = 2732;
                MocuGame.gameHeight = 1536;
                //console.log("Client resolution is: " + window.innerWidth);
                context.canvas.width = window.innerWidth;
                context.canvas.height = window.innerHeight;
                blankCanvas.width = context.canvas.width;
                blankCanvas.height = context.canvas.height;
                if (window.innerWidth == 1024)
                    MocuGame.uniscalex = 0.5;
                else {
                    MocuGame.uniscalex = window.innerWidth / MocuGame.gameWidth;
                    MocuGame.uniscaley = window.innerHeight / MocuGame.gameHeight;
                    //console.log("Uniscalex is: " + MocuGame.uniscalex);
                }
                //console.log("File test: " + preloader.getFile())
                MocuGame.init();
                MocuGame.animate();
                //MocuGame.preloader.on('finish', function () { MocuGame.init(); MocuGame.animate(); });
                //MocuGame.preloader.on('error', function (e) { console.error("Error " + e.currentTarget); });
                //MocuGame.animate();
                //alert("Hur JS");
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
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

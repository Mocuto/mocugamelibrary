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
                var canvas = document.getElementById('myCanvas');
                var blankCanvas = document.getElementById('blankCanvas');
                var body = document.getElementById("myBody");
                var context = canvas.getContext('2d');
                MocuGame.gameWidth = 2732;
                MocuGame.gameHeight = 1536;
                MocuGame.touchenabled = false;
                MocuGame.isWindows8 = true;
                if (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1) {
                    MocuGame.touchenabled = true;
                    body.addEventListener("MSPointerDown", MocuGame.onPointerDown, false);
                    body.addEventListener("MSPointerUp", MocuGame.onPointerUp, false);
                    body.addEventListener("MSPointerMove", MocuGame.onPointerMove, false);
                }
                context.canvas.width = window.innerWidth;
                context.canvas.height = window.innerHeight;
                blankCanvas.width = context.canvas.width;
                blankCanvas.height = context.canvas.height;
                if (window.innerWidth == 1024)
                    MocuGame.uniscalex = 0.5;
                else {
                    MocuGame.uniscalex = Math.ceil((window.innerWidth / MocuGame.gameWidth)*100)/100;
                    MocuGame.uniscaley = Math.ceil((window.innerHeight / MocuGame.gameHeight)*100)/100;
                    console.log("Uniscalex is: " + MocuGame.uniscalex);
                }
                MocuGame.switchState(new ShrioGame.ShrioLoadState(60));
                MocuGame.onLoaded = function () {
                    MocuGame.fadeTo(new MocuGame.RGBA(0,0,0,1), 180, function() {                      
                        MocuGame.loadLocalData("shrioData.txt", ShrioGame.onStateLoaded);
                        }, null)
                    }
                MocuGame.init();
                MocuGame.animate();
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

/*
    mocucamera.js
    Camera object. Acts as a singleton to control the viewpoint of the game.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        MocuCamera constructor. Initializes the object with its position.

        Parameters:
        position (Point) - The position the camera starts at.
    */
    MocuGame.MocuCamera = function (position) {
        MocuGame.MocuGroup.call(this, position, new MocuGame.Point(1, 1));
        this.centerMarker = new MocuGame.MocuObject(new MocuGame.Point(MocuGame.resolution.x / 2, MocuGame.resolution.y / 2),
            new MocuGame.Point(1, 1));

        this.add(this.centerMarker);
        this.zoom = 1.0;

        this.angle = 0;

        this.flip = new MocuGame.Point(1, 1);

        this.fadeRect = new MocuGame.MocuObject(new MocuGame.Point(0, 0), new MocuGame.Point(1, 1));
        this.fadeRect.usesFade = true;

        this.trackingObject = null;
        this.trackingMargins = 0.1;
        this.trackingOffset = new MocuGame.Point(0, 0);
        this.tracksVertical = true;
        this.tracksHorizontal = true;

        this.lastDistance = 0;
    };
    MocuGame.MocuCamera.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuCamera.constructor = MocuGame.MocuCamera;

    /*
        preDraw is a function which does the predrawing translation for each object based off its cameraTraits

        Parameters:
        context (Context) - The context that the objects will be drawn on
        displacement (Point) - The displacement that the camera is drawn off
        cameraTraits (MocuCameraTrait) - The traits that should be applied to the camera's transformations
    */
    MocuGame.MocuCamera.prototype.preDraw = function (context, displacement, cameraTraits) {
        context.translate(((-(this.x * cameraTraits.scrollRate.x) + displacement.x)),
            ((-(this.y * cameraTraits.scrollRate.y) + displacement.y)));
        if (cameraTraits.doesZoom) {
            context.scale(this.flip.x * this.zoom, this.flip.y * this.zoom);
        }
        if (cameraTraits.doesRotate) {
            context.rotate((this.angle * 3.14159265359) / 180);
        }
    };

    /*
        postDraw is a function which resets the transformation of the context back to it's original state, based off the cameraTraits of
        the object

        Parameters:
        context (Context) - The context that the object has been drawn on
        displacement (Point) - the displacement that teh camera is drawn off
        cameraTraits (MocuCameraTrait) - The trait that has been applied to the camera's transformations
    */
    MocuGame.MocuCamera.prototype.postDraw = function (context, displacement, cameraTraits) {
        if (cameraTraits.doesRotate) {
            context.rotate(-((this.angle * 3.14159265359) / 180));
        }
        if (cameraTraits.doesZoom) {
            context.scale(this.flip.x / this.zoom, this.flip.y / this.zoom);
        }
        context.translate(-((-(this.x * cameraTraits.scrollRate.x) + displacement.x)),
    -((-(this.y * cameraTraits.scrollRate.y) + displacement.y)));

    };

    /*
        chaseTacker is a function which sets the camera to view the object it's tracking, based on which directions in scrolls in.

        deltaT (Number) - The amount of time since the last run
    */
    MocuGame.MocuCamera.prototype.chaseTracker = function (deltaT) {
        if (this.tracksHorizontal) {
            this.x = (this.trackingObject.getWorldPoint().x + (this.trackingObject.width / 2) + this.trackingOffset.x) - this.centerMarker.x;
        }
        if (this.tracksVertical) {
            this.y = (this.trackingObject.getWorldPoint().y + (this.trackingObject.height/2) + this.trackingOffset.y) - this.centerMarker.y;
        }
    };

    /*
        update is a function which updates the MocuCamera's properties based off its current state.

        Parameters:
        deltaT (Number) - The amount of time since the last update call.
    */
    MocuGame.MocuCamera.prototype.update = function (deltaT) {
        MocuGame.MocuGroup.prototype.update.call(this, deltaT);
        if (this.trackingObject != null) {
            this.chaseTracker(deltaT);
        }
        
    };

    /*
        viewPoint is a function which sets the MocuCamera object to position itself such that the center of the viewpoint is on the point
        specified

        Parameters:
        point (Point) - the point specified
    */
    MocuGame.MocuCamera.prototype.viewPoint = function (point) {
        this.x = point.x - this.centerMarker.x;
        this.y = point.y - this.centerMarker.y;
    };

})();
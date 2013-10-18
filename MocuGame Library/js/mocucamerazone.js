(function () {
    MocuGame.MocuCameraZone = function (position, size, tracksHorizontal, tracksVertical, snapPoint) {
        MocuGame.MocuZone.call(this, position, size);
        this.tracksHorizontal = tracksHorizontal;
        this.tracksVertical = tracksVertical;

        this.lastCamera = null;

        this.lastCameraTracksHorizontal = true;
        this.lastCameraTracksVertical = true;
        this.isZoningCamera = false;

        this.snapPoint = snapPoint;
    }
    MocuGame.MocuCameraZone.prototype = new MocuGame.MocuZone(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuCameraZone.constructor = MocuGame.MocuCameraZone;

    MocuGame.MocuCameraZone.prototype.onObjectEntered = function (object) {
        this.lastCameraTracksHorizontal = MocuGame.camera.tracksHorizontal;
        this.lastCameraTracksVertical = MocuGame.camera.tracksVertical;

        MocuGame.camera.tracksHorizontal = this.tracksHorizontal;
        MocuGame.camera.tracksVertical = this.tracksVertical;

        this.lastCamera = MocuGame.camera;;

        if (this.snapPoint != null) {
            this.lastCamera.viewPoint(this.snapPoint);
        }
    };

    MocuGame.MocuCameraZone.prototype.onObjectExited = function (object, direction) {
        MocuGame.camera.tracksHorizontal = this.lastCameraTracksHorizontal;
        MocuGame.camera.tracksVertical = this.lastCameraTracksVertical;
    };

    MocuGame.MocuCameraZone.prototype.kill = function () {
        if (this.lastCamera != null) {
            this.onObjectExited(this.lastCamera);
        }
        MocuGame.MocuObject.prototype.kill.call(this);
    }

    MocuGame.MocuCameraZone.prototype.update = function (deltaT) {
        if (!this.isZoningCamera && MocuGame.camera.trackingObject != null) {
            this.isZoningCamera = true;
            this.zoneObject(MocuGame.camera.trackingObject);
        }
        MocuGame.MocuZone.prototype.update.call(this, deltaT);
    }
})();
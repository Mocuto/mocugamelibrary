(function () {
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
        this.maxTrackingSpeed = 3.0;
        this.currentTrackingSpeed = 0.0;
        this.trackingAcceleration = 1.0;
        this.trackingMargins = 0.1;
        this.trackingOffset = new MocuGame.Point(0, 0);
        this.chasingTracker = false;

        
        //this.flip.x = -1;
        //this.x = 1371 / 2;
        //this.y = 771 / 2;
    };
    MocuGame.MocuCamera.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuCamera.constructor = MocuGame.MocuCamera;

    MocuGame.MocuCamera.prototype.preDraw = function (context, displacement, cameraTraits) {
        context.translate((/*(MocuGame.resolution.x / 2)*/ +(-(this.x * cameraTraits.scrollRate.x) + displacement.x)),
            (/*(MocuGame.resolution.y / 2)*/ +(-(this.y * cameraTraits.scrollRate.y) + displacement.y)));
        if (cameraTraits.doesZoom) {
            context.scale(this.flip.x * this.zoom, this.flip.y * this.zoom);
        }
        if (cameraTraits.doesRotate) {
            context.rotate((this.angle * 3.14159265359) / 180);
        }
    };

    MocuGame.MocuCamera.prototype.postDraw = function (context, displacement, cameraTraits) {
        if (cameraTraits.doesRotate) {
            context.rotate(-((this.angle * 3.14159265359) / 180));
        }
        if (cameraTraits.doesZoom) {
            context.scale(this.flip.x / this.zoom, this.flip.y / this.zoom);
        }
        context.translate(-(/*(MocuGame.resolution.x / 2)*/ +(-(this.x * cameraTraits.scrollRate.x) + displacement.x)),
    -(/*(MocuGame.resolution.y / 2)*/ +(-(this.y * cameraTraits.scrollRate.y) + displacement.y)));

    };

    MocuGame.MocuCamera.prototype.checkTracker = function (deltaT) {
        var pos = this.centerMarker.getWorldPoint();
        var trackerPos = this.trackingObject.getWorldPoint();
        //trackerPos.x -= this.trackingObject.width / 2;
        //trackerPos.y -= this.trackingObject.height / 2;

        var trackingPoint = new MocuGame.Point((this.trackingObject.x + (this.trackingObject.width / 2)) + this.trackingOffset.x,
            (this.trackingObject.y + (this.trackingObject.height / 2)) + this.trackingOffset.y);
        var distance = Math.sqrt(Math.pow(trackerPos.y - pos.y, 2) + Math.pow(trackerPos.x - pos.x, 2));

        this.chasingTracker = (distance > (this.trackingMargins + this.maxTrackingSpeed));
        console.log("pos: " + pos.x + ", " + pos.y + " this: " + this.x + ", " + this.y + "distance: " + distance);
    };

    MocuGame.MocuCamera.prototype.chaseTracker = function (deltaT) {
        var pos = this.centerMarker.getWorldPoint();
        var trackerPos = this.trackingObject.getWorldPoint();
        //trackerPos.x -= this.trackingObject.width / 2;
        //trackerPos.y -= this.trackingObject.height / 2;

        this.currentTrackingSpeed = Math.min(this.currentTrackingSpeed + this.trackingAcceleration, this.maxTrackingSpeed);
        this.velocity.setPolar(this.currentTrackingSpeed);
        var angleTo = MocuGame.rad2deg(Math.atan2(trackerPos.y - pos.y, trackerPos.x - pos.x));

        this.velocity.setPolar(this.currentTrackingSpeed, angleTo);

        console.log("pos: " + pos.x + ", " + pos.y + " this: " + this.x + ", " + this.y);
    };

    MocuGame.MocuCamera.prototype.update = function (deltaT) {
        if (this.trackingObject != null) {
            this.checkTracker(deltaT);

            if (this.chasingTracker) {
                this.chaseTracker(deltaT);
            }
            else {
                this.velocity.setPolar(0, 0);
            }
        }
        MocuGame.MocuGroup.prototype.update.call(this, deltaT);
    };

})();
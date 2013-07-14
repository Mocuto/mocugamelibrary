(function () {
    MocuGame.MocuEmitter = function (point, particle) {
        MocuGame.MocuGroup.call(this, point, new MocuGame.Point(500, 500));

        this.subEmitters = new MocuGame.MocuGroup();
        this.add(this.subEmitters);
        this.rangedVelocityAngle = false;
        this.velocityRange = new Array(0, 1);
        this.angleRange = new Array(0, 1);
        this.maxSpawn = 10;
        this.currentSpawn = this.maxSpawn;
        this.particle = particle;
        this.particleLife = 70;
        this.addGroup = this;
        this.dispAdd = true;
        this.amountToAdd = 10;
    }
    MocuGame.MocuEmitter.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuEmitter.constructor = MocuGame.MocuEmitter;
    MocuGame.MocuEmitter.prototype.update = function () {
        MocuGame.MocuGroup.prototype.update.call(this);

        this.currentSpawn -= 1;
        //var clone = jQuery.extend(true, {}, this.particle);
        //this.add(clone);
        if (this.currentSpawn <= 0) {
 
            //console.log("Spawn!" + this.objects.length);
            this.currentSpawn = this.maxSpawn;
            var clone = MocuGame.cloneObj(this.particle);
            for (var i = 0; i < this.particle.timeline.slots.length; i += 1)
            {
                var slot = this.particle.timeline.slots[i];
                for (var n = 0; n < slot.events.length; n += 1) {
                    var event = slot.events[n];
                    clone.timeline.slots[i].addEvent(new MocuGame.Event(clone, event.original_varname, event.startval, event.endval, event.operation_time));
                }
            }
            this.addGroup.add(clone);
            
            var velMag = (Math.random() * this.velocityRange[1]) + this.velocityRange[0];
            var ang = (Math.random() * this.angleRange[1]) + this.angleRange[0];
            if (this.dispAdd) {
                clone.x += this.getWorldPoint().x;
                clone.y += this.getWorldPoint().y;
            }
            clone.velocity.setPolar(velMag, ang);
            clone.life = this.particleLife;
            //console.log("Size is: " + this.addGroup.objects.length);
        }
    }
})();
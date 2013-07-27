/*
    mocuemitter.js

    Object inherited from MocuGroup that emmits a given particle using a set of properties and a timeline. Ideally used for particle effects.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        MocuEmitter constructor. Initializes the object with it's spawn point, the particle it emits, the properties applied to the particle,
        a of randomized properties, and the timeline to be applied to the object.

        Parameters:
        point (Point)
        - The object's coordinates
        particle (MocuSprite)
        - The particle to be cloned.
        particleProperties (Array) (optional)
        - An array of properties to be copied from the particle to each clone.
        randomizedProperties (Dictionary) (optional)
        - A dictionary indexed by strings with a value of a two dimensional array.
        - Each key is a field of the clone to be randomized.
        - index 0 of the array is the lowest value in the randomized range.
        - index 1 of the array is the highest value in the randomized range.
        particleTimeline (Timeline)
        - The timeline to be applied to each clone.
    */

    MocuGame.MocuEmitter = function (point, particle, particleProperties, randomizedProperties, particleTimeline) {
        MocuGame.MocuGroup.call(this, point, new MocuGame.Point(500, 500));
        this.particle = particle;
        this.particleProperties = particleProperties;
        this.randomizedProperties = randomizedProperties;
        this.particleTimeline = particleTimeline;

        this.subEmitters = new MocuGame.MocuGroup();
        this.add(this.subEmitters);

        this.maxSpawn = 10;
        this.currentSpawn = this.maxSpawn;

        this.addGroup = MocuGame.currentState;

        this.particleLife = 0;
        this.amountToAdd = 10;
        this.dispAdd = true;

        this.particleProperties.push.apply(this.particleProperties, MocuGame.MocuEmitter.defaultProperties);
    }
    MocuGame.MocuEmitter.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuEmitter.constructor = MocuGame.MocuEmitter;
    MocuGame.MocuEmitter.defaultProperties = ["x", "y", "velocity", "acceleration", "img"];


    /*
        generateClone is a function which creates a clone object, based of the particleProperties, particleTimeline, and randomizedProperties

        Returns:
        (MocuSprite) generated Clone;
    */

    MocuGame.MocuEmitter.prototype.generateClone = function () {
        var clone = this.particle.constructor();
        if (typeof this.particleProperties != "undefined") {

            for (var i = 0; i < this.particleProperties; i++) {
                clone[i] == this.particle[i];
            }
        }
        if (typeof this.particleTimeline != "undefined") {
            clone.timeline.slots.push.apply(clone.timeline.slots, this.particleTimeline);
            for (var i = 0; i < clone.timeline.slots.length; i++) {
                var slot = clone.timeline.slots[i];
                for (var n = 0; n < slot.events.length; n++) {
                    slot.events[n].object = clone;
                }
            }
        }
        if (typeof this.randomizedProperties != "undefined") {
            for (var key in this.randomizedProperties) {
                clone[key] = this.randomizedProperties[key][0] + (Math.random() * this.randomizedProperties[key][1]);
            }
        }
        return clone;
    }

    /*
        update is a function which is inherited from MocuGroup. Spawns an enemy based off a timer.

        Parameters:
        deltaT (Number)
        - Time elapsed since last update call.
    */

    MocuGame.MocuEmitter.prototype.update = function (deltaT) {
        MocuGame.MocuGroup.prototype.update.call(this);

        this.currentSpawn -= 1 * deltaT;

        if (this.currentSpawn <= 0) {
            this.currentSpawn = this.maxSpawn;
            var clone = this.generateClone();
            this.addGroup.add(clone);
            
            if (this.dispAdd) {
                clone.x += this.getWorldPoint().x;
                clone.y += this.getWorldPoint().y;
            }
            clone.life = this.particleLife;
        }
    }
})();
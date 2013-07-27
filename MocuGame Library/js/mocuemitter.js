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

    MocuGame.MocuEmitter = function (point, particle, speed, particleProperties, randomizedProperties, particleTimeline) {
        MocuGame.MocuGroup.call(this, point, new MocuGame.Point(500, 500));
        this.particle = particle;
        this.speed = speed;
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

        this.timer = null;

        this.start();
    }
    MocuGame.MocuEmitter.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuEmitter.constructor = MocuGame.MocuEmitter;
    MocuGame.MocuEmitter.defaultProperties = ["x", "y", "width", "height", "velocity.x", "velocity.y", "acceleration.x", "acceleration.y", "img"];


    /*
        generateClone is a function which creates a clone object, based of the particleProperties, particleTimeline, and randomizedProperties

        Returns:
        (MocuSprite) generated Clone;
    */

    MocuGame.MocuEmitter.prototype.generateClone = function () {
        var clone = new this.particle.constructor();
        clone.visible = true;
        if (typeof this.particleProperties != "undefined") {

            for (var i = 0; i < this.particleProperties.length; i++) {


                var splitarray = this.particleProperties[i].split(".");

                if (splitarray.length > 1) {
                    var object = this.particle;
                    var variableName = splitarray[0];
                    if (typeof object[variableName] == "object") {
                        if (typeof clone[variableName] == "undefined") {
                            clone[variableName] = new object[variableName].constructor();
                        }
                    }
                    else {
                        clone[variableName] = object[variableName];
                    }
                    var cloneobj = clone[variableName];
                    var index = 0;
                    do {
                        object = object[splitarray[index]];
                        cloneobj = clone[splitarray[index]];

                        variableName = splitarray[index + 1];
                        

                        if (typeof object[variableName] == "object") {
                            cloneobj[variableName] = new object[variableName].constructor();
                        }
                        else {
                            cloneobj[variableName] = object[variableName];
                        }

                        index++;
                    } while (index < splitarray.length - 1);

                }
                else {
                    if ((this.particle[this.particleProperties[i]] != null) &&
                        (typeof this.particle[this.particleProperties[i]] != "undefined")) {
                        clone[this.particleProperties[i]] = this.particle[this.particleProperties[i]];
                    }
                }
            }
        }
        if (typeof this.particleTimeline != "undefined") {
            for (var i = 0; i < this.particleTimeline.slots.length; i++) {
                var oSlot = this.particleTimeline.slots[i];
                var slot = new MocuGame.TimeSlot(oSlot.time);
                for (var n = 0; n < this.particleTimeline.slots[i].events.length; n++) {
                    slot.addEvent(new MocuGame.Event(clone, oSlot.events[n].originalVariableName,
                        oSlot.events[n].startValue, oSlot.events[n].endValue, oSlot.events[n].operationTime, oSlot.events[n].interp));
                    console.log(slot);
                }
                clone.timeline.addSlot(slot);
            }
        }
        if (typeof this.randomizedProperties != "undefined") {
            for (var key in this.randomizedProperties) {
                var splitarray = key.split(".");
                if (splitarray.length > 1) {
                    var object = clone;
                    var variableName = splitarray[0];
                    var index = 0;
                    do {
                        object = object[splitarray[index]];
                        variableName = splitarray[index + 1];
                        index++;
                    } while (index < splitarray.length - 1);
                    object[variableName] = this.randomizedProperties[key][0] + (Math.random() * this.randomizedProperties[key][1]);

                }
                else {
                    clone[key] = this.randomizedProperties[key][0] + (Math.random() * this.randomizedProperties[key][1]);
                }
            }
        }
        return clone;
    }

    /*
        onParticleAdded is a callback called when a particle is added to the addGroup. Should be overriden.

        Parameters:
        clone (MocuObject)
        - The clone that was added to the addGroup.
    */

    MocuGame.MocuEmitter.prototype.onParticleAdded = function (clone) {
    }

    /*
        start is a function which triggers the emitter to start emitting particles.
    */

    MocuGame.MocuEmitter.prototype.start = function () {
        this.timer = window.setInterval((function () {
            for (var i = 0; i < Math.ceil(this.speed / 60) ; i++) {
                this.addParticle();
            }
        }).bind(this), 1000 / this.speed);
    }

    /*
        stop is a function which ends the emission of particles.
    */

    MocuGame.MocuEmitter.prototype.stop = function () {
        window.clearInterval(this.timer);
    }

    /*
        addParticle is a function which adds a particle to the addGroup.
    */
    
    MocuGame.MocuEmitter.prototype.addParticle = function () {

        this.addGroup = MocuGame.currentState;

        this.currentSpawn = this.maxSpawn;
        var clone = this.generateClone();
        this.addGroup.add(clone);

        if (this.dispAdd) {
            clone.x += this.getWorldPoint().x;
            clone.y += this.getWorldPoint().y;
        }
        clone.life = this.particleLife;

        this.onParticleAdded(clone);
    }

    /*
        kill is a function overriden from MocuObject which stops the timer when called, then does its inherited behavior.
    */

    MocuGame.MocuEmitter.prototype.kill = function () {
        this.stop();
        MocuGame.MocuObject.prototype.kill.call(this);
    }
})();
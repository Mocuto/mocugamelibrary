/*
    timeslot.js
    Object that store Events. Handles the animation of values.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        TimeSlot constructor. Initializes the slot with the time it should begin updating its Events.

        Parameters:
        time (Number)
        - The time it should begin updating its events.
    */

    MocuGame.TimeSlot = function (time) {
        this.events = new Array();
        this.time = time;
        this.nextTimeSlot = null;
        this.finished = false;
    }

    /*
        isFinished is a function which returns whether all of the events within the slot have reached their endValue.

        Returns
        Boolean - Whether all events within the slot have reached their endValue.
    */

    MocuGame.TimeSlot.prototype.isFinished = function () {
        var finished = true;
        for (var i = 0; i < this.events.length; i++) {
            if (!this.events[i].elapsed) {
                finished = false;
                break;
            }
        }
        return finished;
    }

    /*
        update is a function which updates all of the events in the slot.

        Parameters:
        currentTime (Number)
        - The current time that the parent timeline is at.
        deltaT (Number)
        - The time elapsed since the last update call.
    */

    MocuGame.TimeSlot.prototype.update = function (currentTime, deltaT) {
         for (var i = 0; i < this.events.length; i += 1) {
            if (currentTime >= this.time) {
            
                this.events[i].update(currentTime, deltaT);
            }
            else  {
                this.events[i].elapsed = false;
                this.events[i].lastval = null;
                this.events[i].started = false;
                this.events[i].currentTime = 0;
            }
        }
       
    }

    /*
        restart is a function which restarts all of the events in the slot.
    */

    MocuGame.TimeSlot.prototype.restart = function () {
        for (var i = 0; i < this.events.length; i += 1) {
            this.events[i].elapsed = false;
            this.events[i].lastValue = null;
            this.events[i].started = false;
            this.events[i].currentTime = 0;
        }
    }

    /*
        addEvent is a function which adds an event object to the slot.

        Parameters:
        event (Event)
        - The event to be added.
    */

    MocuGame.TimeSlot.prototype.addEvent = function (event) {
        this.events.push(event);
    }

    /*
        getEvent is a function which gets an event with the given variableName and object.

        Parameters:
        object (Object)
        - The object the event should correspond to.
        varname (String)
        - The variable name that the event should correspond to.
    */

    MocuGame.TimeSlot.prototype.getEvent = function (object, varname) {
        for (var i = 0; i < this.events.length; i += 1) {
            if (this.events[i].object == object && this.events[i].variableName == varname)
                return this.events[i];
        }
        return null;
    }
})();
/*
    timeline.js
    Object that store TimeSlots. Handles the animation of values.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        TimeLine constructor. 
    */

    MocuGame.Timeline = function () {
        this.slots = new Array();
        this.currentTime = 0;
    }

    /*
        update is a function which updates the Timeline's slots.

        Parameters:
        deltaT (Number)
        - The time elapsed since the last update call.
    */

    MocuGame.Timeline.prototype.update = function (deltaT) {
        this.currentTime += 1 * deltaT;
        for(var i = 0; i < this.slots.length; i += 1)
        {
            this.slots[i].update(this.currentTime, deltaT);
        }
    }

    /*
        addSlot is a function which adds a TimeSlot to the Timeline.

        Parameters:
        slot (TimeSlot)
        - The slot to be added to the timeline.
        repeat (Number)
        - The amount of times this slot will be repeated.
        repeatInterval (Number)
        - The time interval between each repeat of the slot.
    */

    MocuGame.Timeline.prototype.addSlot = function (slot, repeat, repeatInterval) {
        this.slots.push(slot);
        repeat = (typeof repeat == 'undefined') ? 0 : repeat;
        repeatInterval = (typeof repeatInterval == 'undefined') ? 0 : repeatInterval;
        for (var i = 0; i < repeat; i += 1) {
            var newslot = new MocuGame.TimeSlot(slot.time + repeatInterval * (i + 1));

            for (var n = 0; n < slot.events.length; n += 1) {
                var event = slot.events[n];
                if (MocuGame.Action.prototype.isPrototypeOf(event))
                    newslot.addEvent(new MocuGame.Action(event.callback, event.obj));
                else
                    newslot.addEvent(new MocuGame.Event(event.object, event.original_varname, event.startval, event.endval, event.operation_time));
            }
            this.slots.push(newslot);
        }
    }

    /*
        restart is a function which restarts the Timeline and its respective slots.
    */

    MocuGame.Timeline.prototype.restart = function () {
        for (var i = 0; i < this.slots.length; i += 1) {
            this.slots[i].restart();
        }
        this.currentTime = 0;
    }
})();
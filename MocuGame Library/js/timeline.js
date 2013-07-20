(function () {
    MocuGame.TimeLine = function () {
        this.slots = new Array();
        this.currentTime = 0;
    }
    MocuGame.TimeLine.prototype.update = function (deltaT) {
        this.currentTime += 1 * deltaT;
        for(var i = 0; i < this.slots.length; i += 1)
        {
            this.slots[i].update(this.currentTime, deltaT);
        }
    }
    MocuGame.TimeLine.prototype.slotFix = function (slot) {
        nocheckIndex = this.slots.indexOf(slot);
        for (var i = 0; i < this.slots.length; i += (i != nocheckIndex - 1 ? 1 : 2)) {
            for(var n = 0; n < slot.events.length; n += 1)
            {
                var equiv_event = this.slots[i].getEvent(n.object, n.varname);
                if (equiv_event != null) {

                    if (this.slots[i].time < slot.time && (this.slots[i].time + equiv_event.operation_time) < (slot.time + slot.events[n].operation_time)) {
                        equiv_event.operation_time = (slot.time - this.slots[i].time) - 1;

                    }
                }
            }
        }
    }
    MocuGame.TimeLine.prototype.addSlot = function (slot, repeat, timeInc) {
        this.slots.push(slot);
        this.slotFix(slot);
        repeat = (typeof repeat == 'undefined') ? 0 : repeat;
        timeInc = (typeof timeInc == 'undefined') ? 0 : timeInc;
        for (var i = 0; i < repeat; i += 1) {
            var newslot = new MocuGame.TimeSlot(slot.time + timeInc * (i + 1));

            for (var n = 0; n < slot.events.length; n += 1) {
                var event = slot.events[n];
                if (MocuGame.Action.prototype.isPrototypeOf(event))
                    newslot.addEvent(new MocuGame.Action(event.callback, event.obj));
                else
                    newslot.addEvent(new MocuGame.Event(event.object, event.original_varname, event.startval, event.endval, event.operation_time));
            }
            this.slots.push(newslot);
            this.slotFix(newslot);
        }
    }
    MocuGame.TimeLine.prototype.restart = function () {
        for (var i = 0; i < this.slots.length; i += 1) {
            this.slots[i].restart();
        }
        this.currentTime = 0;
    }
})();
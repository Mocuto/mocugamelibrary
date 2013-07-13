(function () {
    MocuGame.TimeSlot = function (time) {
        this.events = new Array();
        this.time = time;
        this.nextTimeSlot = null;
        this.finished = false;
    }
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
    MocuGame.TimeSlot.prototype.update = function (current_time, deltaT) {
         for (var i = 0; i < this.events.length; i += 1) {
            if (current_time >= this.time) {
            
                this.events[i].update(current_time, deltaT);
            }
            else  {
                this.events[i].elapsed = false;
                this.events[i].lastval = null;
                this.events[i].started = false;
                this.events[i].current_time = 0;
            }
        }
       
    }
    MocuGame.TimeSlot.prototype.restart = function () {
        for (var i = 0; i < this.events.length; i += 1) {
            this.events[i].elapsed = false;
            this.events[i].lastval = null;
            this.events[i].started = false;
            this.events[i].current_time = 0;
        }
    }
    MocuGame.TimeSlot.prototype.addEvent = function (event) {
        this.events.push(event);
    }
    MocuGame.TimeSlot.prototype.getEvent = function (object, varname) {
        for (var i = 0; i < this.events.length; i += 1) {
            if (this.events[i].object == object && this.events[i].varname == varname)
                return this.events[i];
        }
        return null;
    }
})();
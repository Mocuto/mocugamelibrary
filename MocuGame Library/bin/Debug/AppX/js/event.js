/*
    event.js
    Component of the Timeline System. Transitions a set variable from a start value to an end value
    over a given duration.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        Event constructor. Initializes the Event object with its reference object, the variable name,
        starting value, ending value, duration, and interpolation method.

        Paramaters:
        object (MocuObject)
        - Object containing the variable that is transitioned.
        variableName (String)
        - Name of the variable that is to be transitioned.
        startValue 
        - The value that the variable will start at.
        endValue
        - The value that the variable will end at.
        time (Number)
        - The duration in frames the transition will take.
        interp (String)
        - The method used to interpolate between values.
    */

    MocuGame.Event = function (object, variableName, startValue, endValue, time, interp) {5
        variableName = (typeof variableName == 'undefined' || typeof variableName == null) ? "empty" : variableName;
        startValue = (typeof startValue == 'undefined' || typeof startValue == null) ? 1 : startValue;
        endValue = (typeof endValue == 'undefined' || typeof endValue == null) ? 1 : endValue;
        time = (typeof time == 'undefined' || typeof time == null) ? 1 : time;
        interp = (typeof interp == 'undefined' || typeof interp == null) ? "linear" : interp;

        this.object = object;

        this.original_variableName = variableName;
        var splitarray = variableName.split(".");
        if (splitarray.length > 1) {
            this.object = object[splitarray[0]];
            this.variableName = splitarray[1];
        }
        else
            this.variableName = variableName;

        this.actualStartValue = startValue;
        this.startValue = (startValue == "current") ? this.object[this.variableName] : startValue;
        this.endValue = endValue;

        if (typeof this.endValue != "number") {
            this.type = "nonnumerical";
        }
        else
            this.type = "numerical";

        this.elapsed = false;

        this.operationTime = time;

        this.interp = interp;

        this.currentTime = 0;
        this.startTime = 0;

        this.rate = (this.endValue - this.startValue) / time;

        this.lastValue = null;
        this.isStarted = false;
    }
    /*
        start is a function with assignsthe startValue based off of whether actualStartValue is equal to
        "current" or a variable.
    */
    MocuGame.Event.prototype.start = function () {
        this.startValue = (this.actualStartValue == "current") ? this.object[this.variableName] : this.actualStartValue;
    }

    /*
        update is a function which updates the variable's value based on the currentTime. If the
        currentTime surpasses the operationTime, the variable's value is automatically set to the
        specified endValue and the event is considered complete.

        Parameters:
        currentTime (Number)
        - The current time of operation in reference to the start value.
        deltaT (Number)
        - The amount of time in frames since the last update call.
    */

    MocuGame.Event.prototype.update = function (currentTime, deltaT) {
        if (!this.elapsed) {
            switch (this.interp) {
                case "linear":
                    this.rate = (this.endValue - this.startValue) / this.operationTime;
                    break;
                case "cubic":
                    this.rate = 3 * Math.pow(this.currentTime, 2) * ((this.endValue - this.startValue) / Math.pow(this.operationTime, 3));
                    break;
                case "log":
                    this.rate = 3 * Math.pow(this.operationTime - this.currentTime, 2) * ((this.endValue - this.startValue) / Math.pow(this.operationTime, 3));
                    break;
            }
            if (!this.isStarted) {
                this.start();
                this.object[this.variableName] = this.startValue;
                this.isStarted = true;
            }
            if (this.type == "numerical") {
                if (this.lastValue != null)
                    this.object[this.variableName] = this.lastValue;
                this.object[this.variableName] += this.rate * deltaT;
                this.lastValue = this.object[this.variableName];
                
            }
            this.currentTime += 1 * deltaT;
            if (this.currentTime >= this.operationTime) {
                if (!this.elapsed) {
                    this.object[this.variableName] = this.endValue;
                }
                this.elapsed = true;
            }
        }
        else {
            
        }
    }
})();
(function () {
    MocuGame.Event = function (object, varname, startval, endval, time, interp) {5
        varname = (typeof varname == 'undefined' || typeof varname == null) ? "empty" : varname;
        startval = (typeof startval == 'undefined' || typeof startval == null) ? 1 : startval;
        endval = (typeof endval == 'undefined' || typeof endval == null) ? 1 : endval;
        time = (typeof time == 'undefined' || typeof time == null) ? 1 : time;
        interp = (typeof interp == 'undefined' || typeof interp == null) ? "linear" : interp;
        this.original_varname = varname;
        this.object = object;
        var splitarray = varname.split(".");
        if (splitarray.length > 1) {
            this.object = object[splitarray[0]];
            this.varname = splitarray[1];
        }
        else
            this.varname = varname;
        this.elapsed = false;
        this.actual_startval = startval;
        this.startval = (startval == "current") ? this.object[this.varname] : startval;
        this.endval = endval;
        
        if (typeof this.endval != "number") {
            this.type = "nonnumerical";
            //console.log("NON NUMBER");
        }
        else
            this.type = "numerical";
        this.operation_time = time;
        this.current_time = 0;
        this.start_time = 0;
        this.rate = (this.endval - this.startval) / time;
        this.lastval = null;
        //console.log("Rate is: " + this.rate);
        this.started = false;
        this.interp = interp;
        //console.log("cloning event in event: " + this.operation_time + " " + this.startval + " " + this.endval + " " + this.object);
    }
    MocuGame.Event.prototype.start = function () {
        this.startval = (this.actual_startval == "current") ? this.object[this.varname] : this.actual_startval;
    }
    MocuGame.Event.prototype.update = function (Current_time, deltaT) {
        //console.log("Got here YES??");

        if (!this.elapsed) {
            switch (this.interp) {
                case "linear":
                    this.rate = (this.endval - this.startval) / this.operation_time;
                    break;
                case "cubic":
                    this.rate = 3 * Math.pow(this.current_time, 2) * ((this.endval - this.startval) / Math.pow(this.operation_time, 3));
                    break;
                case "log":
                    //this.rate = (1 / (this.current_time + 1)) * ((this.endval - this.startval) / Math.log(this.operation_time + 1));
                    this.rate = 3 * Math.pow(this.operation_time - this.current_time, 2) * ((this.endval - this.startval) / Math.pow(this.operation_time, 3));
                    break;
            }
            if (!this.started) {
                this.start();
                this.object[this.varname] = this.startval;
                this.started = true;
            }
            if (this.type == "numerical") {
                if (this.lastval != null)
                    this.object[this.varname] = this.lastval;
                this.object[this.varname] += this.rate * deltaT;
                this.lastval = this.object[this.varname];
                
            }
            this.current_time += 1 * deltaT;
            if (this.current_time >= this.operation_time) {
                if (!this.elapsed)
                    this.object[this.varname] = this.endval;
                this.elapsed = true;
            }
        }
        else {
            //if (this.type != "numerical")
                //this.object[this.varname] = this.endval;
        }
    }
})();
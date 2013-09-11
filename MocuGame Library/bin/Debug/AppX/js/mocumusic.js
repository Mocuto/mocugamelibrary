/*
    mocumusic.js

    An object that allows for easily playing background music.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        MocuMusic constructor. Initializes the object with the path to the audio file,
        and other fields.

        Parameters
        location (String)
        - The path of the audio which will be played.
        loop (Boolean) (optional)
        - Whether the music loops. Default is true.
        autoplay (Boolean) (optional)
        - Whether the music plays automatically. Default is true.
        loopStart (Number) (optional)
        - Where music should loop back to, in seconds, default is the beginning of the audio file.
        loopEnd (Number) (optional)
        - Where the musical loop ends, in seconds.
        - Default is the end of the audio file.
    */

    MocuGame.MocuMusic = function (loc, loop, autoplay, loopStart, loopEnd) {
        this.audio = MocuGame.preload.getResult(loc);

        if (this.audio == null) {
            this.audio = new Audio(loc);
        }

        this.audio.volume = 0.8;

        this.audio.loop = (typeof loop == "undefined") ? true : loop;

        this.loopStart = (typeof loopStart == "undefined") ? 0 : loopStart;
        this.loopEnd = (typeof loopEnd == "undefined") ? this.audio.duration : loopEnd;

        this.audio.autoplay = (typeof autoplayer == "undefined") ? true :  autoplay;
        this.loop = loop;

        this.isPlaying = false;
        this.canFade = false;
    }
    MocuGame.MocuMusic.DEFAULT_VOLUME = 0.8;

    /*
        play is a function which plays the MocuMusic object.

        Parameters:
        overlap (Boolean) (optional)
        - Whether the MocuMusic object should overlap with the currently playing music or cut it off.
        - Default true.
    */
    MocuGame.MocuMusic.prototype.play = function (overlap) {
        if (typeof overlap == "undefined")
            overlap = false;
        if (MocuGame.currentMusic != null && !overlap) MocuGame.currentMusic.stop();
        this.audio.play();
        MocuGame.currentMusic = this;
        if (MocuGame.currentState != null) {
            MocuGame.currentState.currentMusic = this;
            this.canFade = true;
        }
        this.isPlaying = true;
    }

    /*
        stop is a function which stops the MocuMusic object's audio.
    */

    MocuGame.MocuMusic.prototype.stop = function () {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    /*
        pause is a function which pauses the MocuMusic object's audio.
    */

    MocuGame.MocuMusic.prototype.pause = function () {
        this.audio.pause();
    }

    /*
        checkLoop is a function called by MocuGame which enforces the object's loop, based off
        its loopEnd and loopStart values.
    */

    MocuGame.MocuMusic.prototype.checkLoop = function () {
        if (!this.loop)
            return;
        if (this.audio.currentTime >= this.loopEnd)
            this.audio.currentTime = this.loopStart;
    }

    /*
        fadeOut is a function which fades out the MocuMusic object

        Parameters:
        duration (Number)
        - The amount of time in seconds the fade will take.
        callback (Function) (optional)
        - The function to call when the fade operation is complete.
        caller (Object) (optional)
        - The "this" object of the callback function.
    */

    MocuGame.MocuMusic.prototype.fadeOut = function (duration, callback, caller) {
        if ((this.isPlaying == false) || (this.canFade == false)) {
            return;
        }
        var slot = new MocuGame.TimeSlot(MocuGame.currentState.timeline.currentTime + 1);
        slot.addEvent(new MocuGame.Event(this, "audio.volume", "current", 0.005, duration));


        var slot2 = new MocuGame.TimeSlot(MocuGame.currentState.timeline.currentTime + duration + 1);
        slot2.addEvent(new MocuGame.Action(MocuGame.MocuMusic.prototype.stop, this));

        if (callback != null) {
            slot.addEvent(new MocuGame.Action(callback, caller));
        }
        

        MocuGame.currentState.timeline.addSlot(slot);
        MocuGame.currentState.timeline.addSlot(slot2);
    }

    /*
        fadeIn is a function which fades in the MocuMusic object

        Parameters:
        duration (Number)
        - The amount of time in seconds the fade will take.
        callback (Function) (optional)
        - The function to call when the fade operation is complete.
        caller (Object) (optional)
        - The "this" object of the callback function.
    */

    MocuGame.MocuMusic.prototype.fadeIn = function (duration, callback, caller) {
        if (this.isPlaying == false) {
            this.play(true);
        }

        if (this.canFade == false) {
            return;
        }

        var slot = new MocuGame.TimeSlot(MocuGame.currentState.timeline.currentTime + 1);
        slot.addEvent(new MocuGame.Event(this, "audio.volume", 0, MocuGame.MocuMusic.DEFAULT_VOLUME, duration));

        var slot2 = new MocuGame.TimeSlot(MocuGame.currentState.timeline.currentTime + duration + 1);
        if (callback != null) {
            slot.addEvent(new MocuGame.Action(callback, caller));
        }

        MocuGame.currentState.timeline.addSlot(slot);
        MocuGame.currentState.timeline.addSlot(slot2);
    }
})();
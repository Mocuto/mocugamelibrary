(function () {
    MocuGame.MocuMusic = function (loc, loopStart, loopEnd, autoplay, loop) {
        this.audio = MocuGame.preload.getResult(loc);
        this.audio.volume = 0.8;
        this.audio.loop = (typeof loop == "undefined") ? true : loop;

        this.loopStart = (typeof loopStart == "undefined") ? 0 : loopStart;
        this.loopEnd = (typeof loopEnd == "undefined") ? this.audio.duration : loopEnd;

        this.audio.autoplay = (typeof autoplayer == "undefined") ? true :  autoplay;
        this.loop = loop;
    }
    MocuGame.MocuMusic.prototype.play = function (overlap) {
        if (typeof overlap == "undefined")
            overlap = false;
        if (MocuGame.currentMusic != null && !overlap) MocuGame.currentMusic.stop();
        this.audio.play();
        MocuGame.currentMusic = this;
    }
    MocuGame.MocuMusic.prototype.stop = function () {
        this.audio.pause();
        this.audio.currentTime = 0;
    }
    MocuGame.MocuMusic.prototype.pause = function () {
        this.audio.pause();
    }
    MocuGame.MocuMusic.prototype.checkLoop = function () {
        if (!this.loop)
            return;
        if (this.audio.currentTime >= this.loopEnd)
            this.audio.currentTime = this.loopStart;
    }
})();
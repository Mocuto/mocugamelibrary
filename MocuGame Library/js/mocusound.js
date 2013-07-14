(function () {
    MocuGame.MocuSound = function (loc, vol) {
        vol = (typeof vol == 'undefined' || typeof vol == null) ? 1 : vol;
        this.src = loc;
        this.vol = vol;
        this.audio = AudioFX(loc, { formats: ['mp3'], pool: 1, volume: vol});
    }
    MocuGame.MocuSound.prototype.play = function () {
        this.audio.play();
        if (this.audio.audio.currentTime > 0) {
            this.audio.audio.pause();
            this.audio.audio.currentTime = 0;
            this.audio.audio.play();
        }
    }
})();
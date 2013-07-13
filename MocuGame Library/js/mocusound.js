(function () {
    MocuGame.MocuSound = function (loc, vol) {
        vol = (typeof vol == 'undefined' || typeof vol == null) ? 1 : vol;
        this.src = loc;
        this.vol = vol;
        this.audio = AudioFX(loc, { formats: ['mp3'], pool: 1, volume: vol});
        //this.audio.audio.volume = 0;
        //this.audio.audio.autoplay = true;
        //this.audio.play();
        //this.audio.audio.volume = vol;
    }
    MocuGame.MocuSound.prototype.play = function () {
        this.audio.play();
        //console.log("Current TIme: " + this.audio.audio.readyState + " " + this.audio.audio.currentTime);
        if (this.audio.audio.currentTime > 0) {
            this.audio.audio.pause();
            this.audio.audio.currentTime = 0;
            this.audio.audio.play();
        }
        //if(this.src != "sounds/ShrioShoot1")
        //console.log("Play sound effect: " + this.src);

    }
})();
/*
    mocusound.js
    Sound effect object.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        MocuSound constructor. Initializes the object with its audio data and volume.

        Parameters:
        location (String)
        - Path to the audio file
        volume (Number)
    */
    MocuGame.MocuSound = function (location, volume) {
        volume = (typeof volume == 'undefined' || typeof volume == null) ? 1 : volume;
        this.src = location;
        this.volume = volume;
        this.audio = AudioFX(location, { formats: ['mp3'], pool: 1, volumeume: volume});
    };
    /*
        play is a function which plays the MocuSound's audio data
    */
    MocuGame.MocuSound.prototype.play = function () {
        this.audio.play();
        if (this.audio.audio.currentTime > 0) {
            this.audio.audio.pause();
            this.audio.audio.currentTime = 0;
            this.audio.audio.play();
        }
    };
})();
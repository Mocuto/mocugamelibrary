(function () {
    MocuGame.Notification = function (point, size, text, delay) {
        MocuGame.MocuText.call(this, point, size, "");
        this.max_delay = delay;
        this.fulltext = text;
        this.showtext = "";
        this.delay = this.max_delay;
        this.charloc = 0;
    }
    MocuGame.Notification.prototype = new MocuGame.MocuText(new MocuGame.Point, new MocuGame.Point);
    MocuGame.Notification.constructor = MocuGame.Notification;
    MocuGame.Notification.prototype.update = function (deltaT) {
        MocuGame.MocuText.prototype.update.call(this, deltaT);
        if (this.charloc <= this.fulltext.length) {
            this.delay -= 1*deltaT;
            if (this.delay <= 0) {
                this.delay = this.max_delay;
                this.showtext = this.fulltext.substring(0, this.charloc);
                this.charloc += 1;
            }
        }
        this.text = this.showtext;
    }
    MocuGame.Notification.prototype.restart = function (text) {
        this.charloc = 0;
        this.fulltext = text;
        this.showtext = "";
        this.text = "";
    }
})();
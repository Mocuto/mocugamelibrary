/*
    notification.js
    Object derived from MocuText. Renders scrolling text onto the screen.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        Notification constructor. Initializes the object with its location, size, text, and delay.

        Paramaters:
        point (Point)
        - Location the Notification is created at
        size (Point)
        - Dimensions of the notification.
        text (String)
        - Textual context of the notification.
        delay (Number)
        - Delay before adding next character to scrolling text.
    */

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

    /*
        update is a function inherited from MocuText, which updates the scrolling text and adds characters.

        Parameters:
        deltaT (Number)
        - Time elapsed since last update call.
    */

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

    /*
        restart is a function which restarts the notification with the given text.

        Parameters:
        text (String)
        - The text the notification will scroll to
    */

    MocuGame.Notification.prototype.restart = function (text) {
        this.charloc = 0;
        this.fulltext = text;
        this.showtext = "";
        this.text = "";
    }
})();
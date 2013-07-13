(function () {
    MocuGame.Shrio = function (point) {
        MocuGame.MocuGroup.call(this, point);
        this.bodySprite = new MocuGame.MocuSprite(new MocuGame.Point(0, 0), new MocuGame.Point(276*2, 276*2), "images/ShrioSheet.png");
        this.fanSprite = new MocuGame.MocuSprite(new MocuGame.Point(0, 0), new MocuGame.Point(276*2, 276*2), "images/ShrioSheet.png");
        this.bodySprite.addAnimation("Idle", "0,0", 20, true);
        this.bodySprite.addAnimation("Hurt", "1,0|2,0", 20, true);
        this.maxhp = 5;
        this.hp = this.maxhp;
        this.lives = 3;
        this.alive = true;
        this.invince_frames = 0;
        this.maxhit_frames = 30;
        this.hit_frames = 0;
        this.fanSprite.addAnimation("Idle", "0,1", 30, true);
        this.bodySprite.play("Idle");
        this.fanSprite.play("Idle");
        this.hitbox = new MocuGame.MocuObject(new MocuGame.Point(194, 194), new MocuGame.Point(214, 214));
        this.hitbox.density = true;
        this.add(this.fanSprite);
        this.add(this.bodySprite);
        this.add(this.hitbox);

        this.move_left = false;
        this.move_right = false;
        this.move_up = false;
        this.move_down = false;

        this.norm_speed = 12;
        this.boost_speed = 26;
        this.move_speed = this.norm_speed;

        this.shoot_down = false;
        this.max_deflect_time = 20;
        this.deflect_time = this.max_deflect_time;
        this.max_deflect_wait = 20;
        this.deflect_wait = 0;
        this.deflecting = false;

        
    }
    MocuGame.Shrio.prototype = new MocuGame.MocuGroup();
    MocuGame.Shrio.constructor = MocuGame.Shrio;
    MocuGame.Shrio.prototype.hurt = function (damage) {
        if (this.hit_frames <= 0 && this.invince_frames <= 0 && this.alive) {
            this.bodySprite.play("Hurt");
            //console.log("HURT");
            this.hit_frames = this.maxhit_frames;
            this.invince_frames = 10;
            this.hp -= 1;
            if (this.hp <= 0) {
                this.kill();
                this.hp = 0;
            }
        }
    }
    MocuGame.Shrio.prototype.shoot = function () {
        var sb = new MocuGame.ShrioBullet(new MocuGame.Point(this.x+this.bodySprite.width - 200, this.y + (this.bodySprite.height/2)-32));
        this.parent.add(sb);
        this.shoot_down = true;
        MocuGame.SS.shrioshoot1.play();
    }
    MocuGame.Shrio.prototype.keyHandle = function () {
        if (Key.isDown(Key.SHIFT))
            this.move_speed = this.boost_speed;
        else
            this.move_speed = this.norm_speed;
        if (Key.isDown(Key.LEFT)) {
            this.move_left = true;
            this.move_right = false;
        }
        else if (Key.isDown(Key.RIGHT)) {
            this.move_right = true;
            this.move_left = false;
        }
        else {
            this.move_left = false;
            this.move_right = false;
        }
        if (Key.isDown(Key.UP)) {
            this.move_up = true;
            this.move_down = false;
        }
        else if (Key.isDown(Key.DOWN)) {
            this.move_down = true;
            this.move_up = false;
        }
        else {
            this.move_up = false;
            this.move_down = false;
        }
        if (Key.isDown(90) && !this.shoot_down)
            this.shoot();
        else if (!Key.isDown(90))
            this.shoot_down = false;
        if (Key.isDown(88) && !this.deflecting && this.deflect_wait <= 0) {
            this.deflecting = true;
            this.defelect_time = this.max_deflect_time;
            
        }
        if (Key.isDown(Key.ENTER)) {
            while (MocuGame.EnemyBulletGroup.objects.length > 0)
                MocuGame.EnemyBulletGroup.objects.shift();
            //while (MocuGame.EnemyGroup.objects.length > 0)
                //MocuGame.EnemyGroup.objects.shift();
        }
    }
    MocuGame.Shrio.prototype.update = function () {
        if (this.deflecting)
            this.fanSprite.angle += 20;
        else
            this.fanSprite.angle += 1;
        MocuGame.MocuGroup.prototype.update.call(this);
        //MocuGame.MocuSprite.update.call(this);
        if(this.alive)
            this.keyHandle();
        if (this.move_left == true) {
            this.velocity.x = -this.move_speed;
        }
        else if (this.move_right == true) {
            this.velocity.x = this.move_speed;
        }
        else
            this.velocity.x = 0;
        if (this.move_up)
            this.velocity.y = -this.move_speed;
        else if (this.move_down)
            this.velocity.y = this.move_speed;
        else
            this.velocity.y = 0;
        if (this.x + this.bodySprite.width > MocuGame.gameWidth)
            this.x = MocuGame.gameWidth - this.bodySprite.width;
        if (this.x < 0)
            this.x = 0;
        if (this.y + this.bodySprite.height > MocuGame.gameHeight)
            this.y = MocuGame.gameHeight - this.bodySprite.height;
        if (this.y < 0)
            this.y = 0;
        if (this.hit_frames > 0) {
            this.hit_frames -= 1;
            if (this.hit_frames <= 0)
                this.bodySprite.play("Idle");
        }
        else if (this.invince_frames > 0) {
            this.invince_frames -= 1;
            this.bodySprite.alpha = this.invince_frames % 2;
            this.fanSprite.alpha = this.invince_frames % 2;
            if (this.invince_frames == 0) {
                this.bodySprite.alpha = 1;
                this.fanSprite.alpha = 1;
            }
        }
        if (this.deflecting) {
            this.deflect_time -= 1;
            if (this.deflect_time <= 0) {
                this.deflecting = false;
                this.deflect_time = this.max_deflect_time;
                this.deflect_wait = this.max_deflect_wait;
            }
            var returngroup = this.fanSprite.overlaps(MocuGame.EnemyBulletGroup);
            for (var i = 0; i < returngroup.objects.length; i += 1) {
                var ydist = (((returngroup.objects[i].y) + (returngroup.objects[i].height / 2) - (this.y + (this.bodySprite.height / 2))));
                var xdist = (((returngroup.objects[i].x) + (returngroup.objects[i].width / 2) - (this.x + (this.bodySprite.width / 2))));
                //console.log("Bullet position is: " + returngroup.objects[i].x + " " + returngroup.objects[i].y);
                var angle = Math.atan2(ydist, xdist);
                var vel = new MocuGame.Point(20 * Math.cos(angle), 40 * Math.sin(angle));
                returngroup.objects[i].velocity.x = vel.x;
                returngroup.objects[i].velocity.y = vel.y;
            }
        }
        if (this.deflect_wait >= 0)
            this.deflect_wait -= 1;
        if (this.hitbox.overlaps(MocuGame.EnemyGroup).objects.length > 0) {
            this.hurt(1);
        }
    }
    MocuGame.Shrio.prototype.kill = function () {
        this.alive = false;
        this.visible = false;
        if (this.lives > 0) {
            var event = new MocuGame.Event(this, "visible", true, true, 1);
            var event2 = new MocuGame.Event(this, "alive", true, true, 1);
            var event3 = new MocuGame.Event(this, "x", -1, 0, 1);
            var event4 = new MocuGame.Event(this, "y", 0, 255, 1);
            var event5 = new MocuGame.Event(this, "hp", 0, this.maxhp, 1);
            var slot = new MocuGame.TimeSlot(this.timeline.currenttime + 120);
            slot.addEvent(event); slot.addEvent(event2); slot.addEvent(event3); slot.addEvent(event4); slot.addEvent(event5);
            this.timeline.addSlot(slot);
            this.lives -= 1;
        }
        else {
            MocuGame.GameOver.visible = true;
            this.alive = false;
            this.exists = false;
        }
    }
})();


(function () {

    MocuGame.gameWidth = 2732*1.5;
    MocuGame.gameHeight = 1536*1.5;
    MocuGame.objects = new Array();
    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
    MocuGame.add = function (object) {
        MocuGame.objects.push(object)
        object.parent = this;
    }
    MocuGame.cloneObj = function (object) {
        if (object == null || typeof object != 'object') {
            return object;
        }
        var temp = new object.constructor(); // give temp the original obj's constructor
        for (var key in object) {
            try {
                switch(key)
                {
                    //if (key != "img" && key != "events")
                    case "img":
                    {
                        temp.img = object.img;
                    }
                    break;
                    case "events":
                        //temp.events = new Array();
                        break;
                    default:
                    {
                        temp[key] = MocuGame.cloneObj(object[key]);
                       
                    }
                    break;
                }
            }
            catch (err) {
                console.log("Error caught: " + err.message);
                console.log("Key is: " + key);
            }
            
            //temp["img"] = MocuGame.cloneObj(object["img"]);
        }
        return temp;
        
    }

    MocuGame.init = function () {
        MocuGame.SS = new MocuGame.ShrioSounds();
        MocuGame.BG = new MocuGame.MocuBackground(new MocuGame.Point(640, 400), new MocuGame.Point(MocuGame.gameWidth, MocuGame.gameHeight), 'images/Background.png');
        MocuGame.add(MocuGame.BG);
        MocuGame.MasterQuad = new MocuGame.MocuQuad(new MocuGame.Point(0, 0), new MocuGame.Point(MocuGame.gameWidth, MocuGame.gameHeight), 2, 0, null);
        MocuGame.PlayerBulletGroup = new MocuGame.MocuGroup();
        MocuGame.EnemyBulletGroup = new MocuGame.MocuGroup();
        MocuGame.EnemyGroup = new MocuGame.MocuGroup();
        MocuGame.killCount = 0;
        MocuGame.Shrio = new MocuGame.Shrio(new MocuGame.Point(0, MocuGame.gameHeight / 2 - 255));
        TextObj = new MocuGame.MocuText(new MocuGame.Point(250, 240), new MocuGame.Point(600, 50), "Kills: ");
        TextObj.fade.r = 0;
        TextObj.fade.g = 0;
        TextObj.fade.b = 0;
        TextObj.scale.x = 2;
        TextObj.scale.y = 2;
        MocuGame.GameOver = new MocuGame.MocuText(new MocuGame.Point(750, 250), new MocuGame.Point(100, 40), "Game Over");
        MocuGame.GameOver.font = "30px Cubos";
        MocuGame.GameOver.scale.x = 5;
        MocuGame.GameOver.scale.y = 5;
        MocuGame.GameOver.visible = false;

        HUD = new MocuGame.PlayerHUD(new MocuGame.Point(140, 140), new MocuGame.Point(200, 200), MocuGame.Shrio);
        var level = new MocuGame.Canvas1();
        //level.copyContentsTo(MocuGame.EnemyGroup);
        var Obj = new MocuGame.Dilo(new MocuGame.Point(1500, 500), 30);
        var Obj2 = new MocuGame.Spinfodder(new MocuGame.Point(1500, 700), 3);
        //console.log(MocuGame.gameWidth);
        MocuGame.add(MocuGame.Shrio);
        MocuGame.add(MocuGame.EnemyGroup);
        MocuGame.add(MocuGame.EnemyBulletGroup);
        MocuGame.spawntimer = 180;
        MocuGame.add(TextObj);
        MocuGame.add(HUD);
        MocuGame.add(MocuGame.GameOver);
        MocuGame.EnemyGroup.add(Obj);
        //MocuGame.EnemyGroup.add(Obj2);
        var particle = new MocuGame.MocuSprite(new MocuGame.Point(0, 0), new MocuGame.Point(100, 100), "images/Fire.png");
        //particle.drawmode = 'add';
        particle.velocity.x = 2;
        particle.angularVelocity = 10;
        //particle.life = 60;
        var event1 = new MocuGame.Event(particle, 'alpha', 1, 0, 60);
        var event2 = new MocuGame.Event(particle, 'scale.x', 1, 2, 60);
        var event3 = new MocuGame.Event(particle, 'scale.y', 1, 2, 60);
        var slot = new MocuGame.TimeSlot(10);
        slot.addEvent(event1);
        slot.addEvent(event2);
        slot.addEvent(event3);
        particle.timeline.addSlot(slot);
        var emitter = new MocuGame.MocuEmitter(new MocuGame.Point(400, 400), particle);
        emitter.angleRange[0] = 0;
        emitter.angleRange[1] = 360;
        emitter.rangedVelocityAngle = true;
        emitter.maxSpawn = 10;
        emitter.velocityRange[1] = 2;
        //MocuGame.add(emitter);
    }
    MocuGame.animate = function () {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        
        // update
        MocuGame.spawntimer -= (MocuGame.killCount/8) + 1;
        if (MocuGame.spawntimer <= 0) {
            //MocuGame.spawntimer = 380;
            var Enem = new MocuGame.Enemy(new MocuGame.Point(Math.random() * ((MocuGame.gameWidth/2)-100) + (MocuGame.gameWidth/2), Math.random() * (MocuGame.gameHeight-600)+200), new MocuGame.Point(255, 255), (Math.random() * 5) + 1);
            ////MocuGame.EnemyGroup.add(Enem);
            //MocuGame.Sound.play();

        }
        for (var i = 0; i < MocuGame.objects.length; i += 1) {
            
            if (MocuGame.objects[i].exists && MocuGame.objects[i].active) {
                
                MocuGame.objects[i].update();
                
                
            }
            
        }
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        // render
        TextObj.text = "Kills: " + MocuGame.killCount;
        for (var i = 0; i < MocuGame.objects.length; i++) {
            if (MocuGame.objects[i].visible && MocuGame.objects[i].exists) {
                MocuGame.objects[i].draw(context, new MocuGame.Point(0,0));
                //console.log("Is it working?");
            }
        }
        /*Herder.draw(context);
        Derpy.draw(context);
        if (Herder.isColliding(Derpy)) {
            context.beginPath();
            context.rect(188, 50, 200, 100);
            context.fillStyle = 'yellow';
            context.fill();
            context.lineWidth = 7;
            context.strokeStyle = 'black';
            context.stroke();
        }*/
        // request new frame
        requestAnimFrame(function () {
            MocuGame.animate();
        });
    }
}
)();
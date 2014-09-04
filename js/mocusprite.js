﻿/*
    mocuobject.js

    Object derived from MocuObject, contains an image to be drawn

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        MocuSprite constructor. Initializes the object with its location, size, and sprite image

        Parameters:
        point (Point) 
        - Location for the object to be initialized at.
        size (Point)
        - Dimensions of the object.
        spriteLocation (String)
        - The path to the sprite file.
    */

    MocuGame.MocuSprite = function (point, size, spriteLocation, dontPreload) {
        MocuGame.MocuObject.call(this, point, size);

        if (typeof dontPreload == "undefined") {
            dontPreload = false;
        }

        this.animations = new Array();

        if (typeof spriteLocation != "undefined") {
            this.img = MocuGame.preload.getResult(spriteLocation);
            if (dontPreload || this.img == null) {
                this.img = new Image();
                this.img.src = spriteLocation;
            }
        }

        this.frame = new MocuGame.Point(0, 0);

        this.anim = new MocuGame.MocuAnimation("Default", "0,0", 20, true);
        this.animations.push(this.anim);

        this.flip = new MocuGame.Point(1, 1);

        this.drawmode = "source-over";
        
        this.tint = new MocuGame.RGBA(0, 0, 0, 0);

        //this.fade.a = 1;
        this.visible = true;

        this.scale.x = 1;
        this.scale.y = 1;

        this.animates = true;

        if (MocuGame.isWindows81) {
            this.primitives = 1;
            var gl = MocuGame.renderer.gl;
            this.texture = null;
            this.effects = [];
            this.lastGlParent = null;
            this.lastGlParentIndex = -1;

            this.lastGlWidth = null;
            this.lastGlHeight = null;
            this.lastGlX = null;
            this.lastGlY = null;
            this.lastGlAngle = null;
            this.lastGlScaleX = null;
            this.lastGlScaleY = null;
            this.lastGlFadeR = null;
            this.lastGlFadeG = null
            this.lastGlFadeB = null
            this.lastGlFadeA = null
            this.lastGlAlpha = {};
        }

        this.addsom = 0;
    }
    MocuGame.MocuSprite.prototype = new MocuGame.MocuObject(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuSprite.constructor = MocuGame.MocuSprite;
    MocuGame.MocuSprite.prototype.constructor = MocuGame.MocuSprite.constructor;

    /*
        addAnimation is a function which adds a new animation to the MocuSprite's set of animations

        Parameters:
        name (String)
        - The name the animation will be identified.
        coords (String)
        - The coordinates of each frame in the animations, in MocuGame Animation Notation
        speed (Number)
        - The speed of the animation
        loop (Boolean)
        - Whether the animation loops.
    */

    MocuGame.MocuSprite.prototype.addAnimation = function (name, coords, speed, loop, reverse) {
        var newanim = new MocuGame.MocuAnimation(name, coords, speed, loop, reverse);
        this.animations.push(newanim);
    }

    /*
        play is a function which plays the animation with the given name.

        Parameters:
        name (String)
        - The name of the animation to be played.

    */

    MocuGame.MocuSprite.prototype.play = function (name, forceRestart) {
        forceRestart = (typeof forceRestart == "undefined") ? false : forceRestart;
        if (typeof this.anim != "undefined") {
            if (this.anim.name === name && forceRestart || this.anim.name !== name)
            {
                this.anim.stop();
            }
            else 
            {
                return;
            }

        }
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name == name) {
                this.anim = this.animations[i];
                this.anim.start();
                break;
            }
        }
    }


    /*
        hasAnimationName is a function which returns true if the MocuSprite contains an animation with the specified name

        Parameters:
        name (String)
        - The animation name to search for
    */

    MocuGame.MocuSprite.prototype.hasAnimationNamed = function (name, forceRestart) {

        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name == name) {
                return true;
            }
        }
        return false;
    }

    /*
        animate is a function which updates the MocuSprite's displayed frame based on its current
        animation

        Parameters:
        deltaT (Number)
        - Time elapsed since the last update call.
    */

    MocuGame.MocuSprite.prototype.animate = function (deltaT) {
        this.frame.x = this.anim.coordinates[this.anim.frame].x;
        this.frame.y = this.anim.coordinates[this.anim.frame].y;
    }
    
    /*
        update is a function derived from MocuObject which updates the properties of the caller
        based on its current state.

        Paramaters:
        deltaT (Number)
        - Time elapsed since the last update call.
    */

    MocuGame.MocuSprite.prototype.update = function (deltaT) {
        MocuGame.MocuObject.prototype.update.call(this, deltaT);
    }

    /*
        colorEffect is an internal function used to colorize the sprite data with its given fade,
        prerendering.

        Parameters:
        context (Object)
        - The canvas context on which the object will be drawn
        displacement (Point)
        - The offset given the the object's drawing.
    */

    MocuGame.MocuSprite.prototype.colorEffect = function (context, displacement) {
        var blankCanvas = MocuGame.blankCanvas;
        var blankContext = MocuGame.blankContext;
        blankCanvas.width = this.width;
        blankCanvas.height = this.height;
        blankContext.globalCompositeOperation = "source-over";
        blankContext.globalAlpha = 1;
        blankContext.drawImage(this.img, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height,
           0,
            0,
            this.width,
            this.height);
        //Do the fade code
        if (this.fade.a != 0 ) {
            blankContext.globalCompositeOperation = "source-atop";
            blankContext.globalAlpha = this.fade.a;
            blankContext.beginPath();
            blankContext.rect(0, 0, this.width, this.height);
            blankContext.closePath();
            blankContext.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")"
            //console.log("FS is: " + "rgb( " + (this.fade.r * 255) + ", " + (this.fade.g * 255) + ", " + (this.fade.b * 255) + ")");
            blankContext.fill();
        }
        context.globalAlpha = this.alpha;
        context.globalCompositeOperation = this.drawmode;
        context.drawImage(blankCanvas, 0, 0, (this.width > blankCanvas.width) ? blankCanvas.width : this.width, (this.height > blankCanvas.height) ? blankCanvas.height : this.height,
                 (-(this.width / 2) * this.scale.x) * MocuGame.uniscale,
                (-(this.height / 2) * this.scale.y) * MocuGame.uniscale,
                ((this.width) * this.scale.x) * MocuGame.uniscale,
                ((this.height) * this.scale.y) * MocuGame.uniscale);
        blankContext.clearRect(0, 0, blankCanvas.width, blankCanvas.height);
        
    }

    MocuGame.MocuSprite.prototype.getTextureCoordinateArray = function () {
        if (this.lastTexCoordWidth != this.width || this.lastTexCoordHeight != this.height ||
            this.lastTexCoordFrameY != this.frame.y || this.lastTexCoordFrameX != this.frame.x) {
            var texStartX = (this.frame.x * this.width) / this.img.naturalWidth;
            var texStartY = (this.frame.y * this.height) / this.img.naturalHeight;
            var texWidth = this.width / this.img.naturalWidth;
            var texHeight = this.height / this.img.naturalHeight;

            this.lastTexCoordFrameX = this.frame.x;
            this.lastTexCoordFrameY = this.frame.y;
            this.lastTexCoordWidth = this.width;
            this.lastTexCoordHeight = this.height;
            this.lastTexCoordArray = [
                texStartX, texStartY,
                texStartX + texWidth, texStartY,
                texStartX, texStartY + texHeight,
                texStartX, texStartY + texHeight,
                texStartX + texWidth, texStartY,
                texStartX + texWidth, texStartY + texHeight
            ];
        }

        return this.lastTexCoordArray;
    };

    MocuGame.MocuSprite.prototype.getGlProperties = function () {
        var position = this.getCoordinateArray();
        var texCoordHasChanged = (this.lastTexCoordWidth != this.width || this.lastTexCoordHeight != this.height ||
            this.lastTexCoordFrameY != this.frame.y || this.lastTexCoordFrameX != this.frame.x);
        var texCoords = this.getTextureCoordinateArray();
        var translation = [];
        var rotation = [];
        var scale = [];
        var cameraTranslation = [];
        var cameraZoom = [];
        var fade = [];
        var alpha = [];

        var scrollRate = new MocuGame.Point(0.0, 0.0);
        if (this.cameraTraits != null) {
            scrollRate = this.cameraTraits.scrollRate
        }
        else if (typeof this.parent !== "undefined") {
            if (this.parent.cameraTraits != null) {
                scrollRate = this.cameraTraits.scrollRate;
            }
        }

        translation.push((this.x + this.width / 2) + (-MocuGame.camera.x * scrollRate.x));
        translation.push((this.y + this.height / 2) + (-MocuGame.camera.y * scrollRate.y));

        rotation.push(Math.cos(MocuGame.deg2rad(this.angle)));
        rotation.push(Math.sin(MocuGame.deg2rad(this.angle)));

        scale.push(this.scale.x * MocuGame.camera.zoom);
        scale.push(this.scale.y * MocuGame.camera.zoom);

        fade.push(this.fade.r);
        fade.push(this.fade.g);
        fade.push(this.fade.b);
        fade.push(this.fade.a);

        alpha.push(this.alpha);

        var result = {
            "position" : { type: "attribute", value: position,
                hasChanged: (this.lastGlWidth != this.width || this.height != this.lastGlHeight) },
            "translation": { type: "attribute", value: translation,
                hasChanged: (this.lastGlX != this.x || this.lastGlY != this.y) },
            "rotation": { type: "attribute", value: rotation,
                hasChanged: (this.lastGlRotation != this.angle) },
            "scale": { type: "attribute", value: scale,
                hasChanged: (this.lastGlScaleX != this.scale.x || this.lastGlScaleY != this.scale.y) },
            "fade": { type: "attribute", value: fade,
                hasChanged: (this.lastGlFadeR != this.fade.r || this.lastGlFadeG != this.fade.g ||
                this.lastGlFadeB != this.fade.b || this.lastGlFadeA != this.fade.a) },
            "alpha": {type: "attribute", value:alpha,
                hasChanged: (this.lastGlAlpha != this.alpha)},
            "texCoord": { type: "attribute", value: texCoords,
                hasChanged: texCoordHasChanged }
            }
        this.lastGlWidth = this.width;
        this.lastGlHeight = this.height;
        this.lastGlX = this.x;
        this.lastGlY = this.y;
        this.lastGlRotation = this.angle;
        this.lastGlScaleX = this.scale.x;
        this.lastGlScaleY = this.scale.y;
        this.lastGlFadeR = this.scale.r;
        this.lastGlFadeG = this.scale.g;
        this.lastGlFadeB = this.scale.b;
        this.lastGlFadeA = this.scale.a;
        this.lastGlAlpha = this.alpha;

        return result;

    }

    MocuGame.MocuSprite.prototype.getTexture = function (gl) {
        if (this.img.complete == true && this.texture == null) {
            this.texture = MocuGame.renderer.getCachedTexture(gl, this.img);
        }

        return this.texture;
    }

    MocuGame.MocuSprite.prototype.preDrawGl = function (gl, displacement) {
        var program = MocuGame.MocuObject.prototype.preDrawGl.call(this, gl, displacement);

        if (this.texture == null || typeof this.texture === "undefined")
        {
            if (this.img.complete == true) {
                this.texture = MocuGame.renderer.getCachedTexture(gl, this.img);
                //this.texture = gl.createTexture();
                //this.prepareTexture(gl, this.texture, program);
                //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.img);
            }
        }

        return program;
    };

    MocuGame.MocuSprite.prototype.drawGl = function (gl, displacement) {

        if (this.animates) {
            this.animate(deltaT);
        }

        if (this.isOnScreen() == false) {
            return;
        }
        
        var program = this.preDrawGl(gl, displacement);

        var texture = this.texture;

        if (texture == null) {
            return;
        }

        this.prepareTexture(gl, this.texture, program);

        /*var blankCanvas = MocuGame.blankCanvas;
        var blankContext = MocuGame.blankContext;


        blankContext.globalCompositeOperation = "source-over";

        blankCanvas.width = this.width;
        blankCanvas.height = this.height;

        blankContext.drawImage(this.img, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height,
            0,
            0,
            this.width,
            this.height);

        if (this.fade.a != 0) {
            blankContext.globalCompositeOperation = "source-atop";
            blankContext.globalAlpha = this.fade.a;
            blankContext.beginPath();
            blankContext.rect(0, 0, this.width, this.height);
            blankContext.closePath();
            blankContext.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")"
            //console.log("FS is: " + "rgb( " + (this.fade.r * 255) + ", " + (this.fade.g * 255) + ", " + (this.fade.b * 255) + ")");
            blankContext.fill();
        }

        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, blankCanvas);


        blankContext.clearRect(0, 0, this.width, this.height);*/

        texture = this.applyEffects(gl, texture);

        MocuGame.renderer.useProgram(program);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    /*
        draw is a function derived from MocuObject which renders the object on to the given canvas.

        Parameters:
        context (Object)
        - The canvas context on which the object will be drawn
        displacement (Point)
        - The offset given the the object's drawing.
    */

    MocuGame.MocuSprite.prototype.draw = function (context, displacement) {

        if (this.animates) {
            this.animate(deltaT);
        }

        if (MocuGame.isWindows81) {
            this.drawGl(context, displacement);
            this.draw = this.drawGl;
            return;
        }

        if (typeof displacement == null || typeof displacement == 'undefined')
            displacement = new MocuGame.Point(0, 0);

        if (this.isOnScreen() == false) {
            return;
        }
        
        context.translate(Math.round(((this.x + displacement.x) + (this.width / 2)) * MocuGame.uniscale), Math.round(((this.y + this.height / 2) + displacement.y) * MocuGame.uniscale));
        context.scale(this.flip.x, this.flip.y);
        context.rotate((this.angle * 3.14159265359) / 180);
        
        context.globalCompositeOperation = this.drawmode;
        context.globalAlpha = this.alpha;
        if (this.tint.a != 0 || this.fade.a != 0)
            this.colorEffect(context, displacement);
        else {
            context.drawImage(this.img, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height,
                Math.round((-(this.width / 2) * this.scale.x) * MocuGame.uniscale),
                Math.round((-(this.height / 2) * this.scale.y) * MocuGame.uniscale),
                Math.round(((this.width) * this.scale.x) * MocuGame.uniscale),
                Math.round(((this.height) * this.scale.y) * MocuGame.uniscale));
        }
        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.scale(this.flip.x, this.flip.y);

        context.translate(-Math.round((((this.x + this.width / 2) + displacement.x))*MocuGame.uniscale), -Math.round((((this.y + this.height / 2) + displacement.y))*MocuGame.uniscale));
        context.globalCompositeOperation = "source-over";
    }
})();
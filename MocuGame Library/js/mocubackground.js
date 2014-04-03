﻿/*
    mocubackground.js

    Object inherited from MocuSprite that repeats an image over a specified area. Has support for
    vertical and horizontal scrolling.

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
        MocuBackground constructor. Initializes the object with the dimensions of the sprite which
        will be drawn, the size of which the background will be rendered in the game, and the path
        to the sprites location on the server.

        Parameters:
        point (Point)
        - The location of the background on the screen
        spriteSize (Point)
        - the dimensions of the sprite.
        actualSize (Point)
        - the dimensions of the background on screen.
        spritePath (String)
        - Location of the sprite image on the server.
    */

    MocuGame.MocuBackground = function (point, spriteSize, actualSize, spritePath) {
        MocuGame.MocuSprite.call(this, point, actualSize, spritePath);
        this.spriteSize = spriteSize;
        this.scrollVelocity = new MocuGame.Point(0, 0);
        this.scrollPosition = new MocuGame.Point(0, 0);

        if (MocuGame.isWindows81) {
            this.program = MocuGame.renderer.loadProgram(MocuGame.renderer.gl, MocuGame.DEFAULT_SPRITE_VERTEX_SHADER, MocuGame.DEFAULT_BACKGROUND_FRAGMENT_SHADER);
        }
    }
    MocuGame.MocuBackground.prototype = new MocuGame.MocuSprite(new MocuGame.Point, MocuGame.Point);
    MocuGame.MocuBackground.constructor = MocuGame.MocuBackground;

    /*
        update is a function inherited from MocuSprite which updates the scrollPosition of the
        background based off the scrollVelocity variable.

        Parameters:
        deltaT (Number)
        - The amount of time elapsed since the last update call.
    */

    MocuGame.MocuBackground.prototype.update = function (deltaT) {
        MocuGame.MocuSprite.prototype.update.call(this, deltaT);
        this.scrollPosition.x += this.scrollVelocity.x * deltaT;
        this.scrollPosition.y += this.scrollVelocity.y * deltaT;
        while (this.scrollPosition.x > this.spriteSize.x)
            this.scrollPosition.x -= this.spriteSize.x;
        while (this.scrollPosition.y > this.spriteSize.y)
            this.scrollPosition.y -= this.spriteSize.y;
        while (this.scrollPosition.x < 0)
            this.scrollPosition.x += this.spriteSize.x;
        while (this.scrollPosition.y < 0)
            this.scrollPosition.y += this.spriteSize.y;
    }

    MocuGame.MocuBackground.prototype.preDrawGl = function(gl, displacement) {
        var program = MocuGame.MocuSprite.prototype.preDrawGl.call(this,gl ,displacement);

        var scrollPositionLocation = gl.getUniformLocation(program, "u_scrollPosition");
        
        var absScrollPosition = new MocuGame.Point(this.scrollPosition.x / this.spriteSize.x, this.scrollPosition.y / this.spriteSize.y);
        gl.uniform2fv(scrollPositionLocation, new Float32Array([absScrollPosition.x, absScrollPosition.y]));

        return program;
    }

    MocuGame.MocuBackground.prototype.drawGl = function (gl, displacement) {
        var program = this.preDrawGl(gl, displacement);
        
        var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

        // provide texture coordinates for the rectangle.
        var texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);


        var texWidth = this.width  / this.spriteSize.x;
        var texHeight = this.height / this.spriteSize.y;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0, 0,
            texWidth, 0,
            0, texHeight ,
            0, texHeight,
            texWidth, 0,
            texWidth, texHeight]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

        var texture = gl.createTexture();

        var blankCanvas = MocuGame.blankCanvas;
        var blankContext = MocuGame.blankContext;

        blankContext.globalCompositeOperation = "source-over";

        blankCanvas.width = this.spriteSize.x;
        blankCanvas.height = this.spriteSize.y;

        blankContext.clearRect(0, 0, this.spriteSize.x, this.spriteSize.y);

        blankContext.drawImage(this.img, 0, 0, this.spriteSize.x, this.spriteSize.y,
           0,
            0,
            this.spriteSize.x,
            this.spriteSize.y);

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

        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, blankCanvas);

        //Set the parameters so we can render any size image.
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    /*
        draw is a function inherited from MocuSprite which draws the MocuBackground on to the game
        canvas, using a displacement based off its parent object.

        Parameters:
        context (Object)
        - The context through which the background will be drawn.
        displacement (Point)
        - The displacement the background will have from its own position.
    */

    MocuGame.MocuBackground.prototype.draw = function (context, displacement) {

        if (MocuGame.isWindows81) {
            this.drawGl(context, displacement);
            this.draw = this.drawGl;
            return;
        }

        context.translate((this.x + displacement.x) * MocuGame.uniscale, (this.y + displacement.y) * MocuGame.uniscale);
        context.globalAlpha = 1;
        primBlitSize = new MocuGame.Point(this.spriteSize.x - this.scrollPosition.x,
            this.spriteSize.y - this.scrollPosition.y);
        secondBlitSize = new MocuGame.Point(this.spriteSize.x - primBlitSize.x, this.spriteSize.y - primBlitSize.y);
        context.scale(this.flip.x*this.scale.x*MocuGame.uniscale, this.flip.y*this.scale.y*MocuGame.uniscale);
        context.rotate((this.angle * 3.14159265359) / 180);

        //Apply Clipping
        context.save();
        context.beginPath();
        context.rect(0, 0, this.width, this.height);
        context.closePath();
        context.clip();
        for (var i = 0; i < this.width; i += this.spriteSize.x) {
            for (var j = 0; j < this.height; j += this.spriteSize.y) {
                //Quadrant II Blit   
                if (primBlitSize.x != 0 && primBlitSize.y != 0)
                context.drawImage(this.img, this.scrollPosition.x, this.scrollPosition.y, primBlitSize.x, primBlitSize.y, i, j, primBlitSize.x + 1, primBlitSize.y + 1);
                //Quadrant I Blit
                if(secondBlitSize.x != 0 && primBlitSize.y != 0)
                    context.drawImage(this.img, 0, this.scrollPosition.y, secondBlitSize.x, primBlitSize.y, i + primBlitSize.x, j, secondBlitSize.x + 1, primBlitSize.y+1);
                //Quadrant III Blit
                if (secondBlitSize.y != 0 && primBlitSize.x != 0)
                    context.drawImage(this.img, this.scrollPosition.x, 0, primBlitSize.x, secondBlitSize.y, i, j + primBlitSize.y, primBlitSize.x+1, secondBlitSize.y+1);
                //Quadrant IV Blit
                if(secondBlitSize.x != 0 && secondBlitSize.y != 0)
                    context.drawImage(this.img, 0, 0, secondBlitSize.x, secondBlitSize.y, i + primBlitSize.x, j + primBlitSize.y, secondBlitSize.x+1, secondBlitSize.y+1);
            }
        }
        //Restore previous settings
        context.restore();
        context.scale(this.flip.x / this.scale.x / MocuGame.uniscale, this.flip.y / this.scale.y / MocuGame.uniscale);
        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.translate(-(this.x + displacement.x) * MocuGame.uniscale, -(this.y + displacement.y) * MocuGame.uniscale);
    }
})();
//player and the enemy class
class Sprite {
    //position and velocity is an object
    constructor({ position, imageSrc, scale = 1, frame = 1, offset = {x: 0,y:  0} }) {
        this.position = position;
        this.height = 150;
        this.width = 35;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.maxFrame = frame;
        this.currentFrame = 0;
        this.frameElapsed = 0;
        this.frameHold = 10;
        this.offset = offset; //reposition the sprite if there are spaces around it
    }
    
    //draw the default img
    draw() {
        //draw Image with args (image , the crop.x , ..y, .. width, ..height, image.x, image y
        //                         .. width, ..height) what a powerful method for image resizing!
        c.drawImage(this.image,
            // upon on increasing the currentFrame, the x pos of the crop is also updated
            this.currentFrame * (this.image.width / this.maxFrame),
            0,
            this.image.width / this.maxFrame,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.maxFrame) * this.scale,
            this.image.height * this.scale);
    }
    //draw the flipped img
    drawFlip() {
        c.save();
        c.scale(-1,1);
        c.drawImage(this.image,
            // upon on increasing the currentFrame, the x pos of the crop is also updated
            this.currentFrame * (this.image.width / this.maxFrame),
            0,
            this.image.width / this.maxFrame,
            this.image.height,
            -(this.position.x - this.offset.x) - ((this.image.width / this.maxFrame) * this.scale), // instead of x now we draw -x-width
            this.position.y - this.offset.y,
            (this.image.width / this.maxFrame) * this.scale,
            this.image.height * this.scale);
        c.setTransform(1,0,0,1,0,0);
    }
    animation() {
        this.frameElapsed++;
        if (this.frameElapsed % this.frameHold === 0) {
            //because currentFrame starts with 0 so we - 1 
            if (this.currentFrame < this.maxFrame - 1) {
                this.currentFrame++;
            } else {
                this.currentFrame = 0;
            }

        }
    }
    update() {
        this.draw();
        this.animation();
    }
}
class Fighter extends Sprite {
    //position and velocity is an object
    constructor({ 
            position,  
            velocity, 
            hitBoxOffset, 
            looking, 
            imageSrc, 
            scale = 1, 
            frame = 1,
            offset = {x: 0, y: 0},
            sprites //decide sprite for the character
        }) {
        super({
            position,
            imageSrc,
            scale,
            frame,
            offset
        }); // call the constructor of the parent class
        //animatiion
        this.currentFrame = 0;
        this.frameElapsed = 0;
        this.frameHold = 10;
        //player properties
        this.velocity = velocity;
        this.lastKey; //for smoother movement
        this.height = 150;
        this.width = 35;
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            hitBoxOffset,
            width: 80,
            height: 30
        }
        //facing 
        this.facing = {
            position: {
                x: this.position.x,
                y: this.position.y + 30,
            },
        },
        this.looking = looking;
        
        //fighter varibles
        this.doubleJump = false;
        this.isAttacking = false;
        this.onGround = true;
        this.health = 100;
        this.damage;
        //sprites and update image using the current sprite (run, idle, etc)
        this.sprites = sprites
        //loop through sprites
        for(const sprite in sprites) {
            //loop through sprite object 
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }    
    }
    drawHitBox() {
        c.fillStyle = 'red';
        c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
    }
    //update animation
    checkCollision() {
        if (this.position.y + this.height + this.velocity.yVec >= ground) {
            this.velocity.yVec = 0;
            this.position.y = 318; //set y position to hit the ground
        } else {
            this.velocity.yVec += gravity; //add gravity for acceleration
        }
    }
    move() {
        this.position.y += this.velocity.yVec;
        this.position.x += this.velocity.xVec;
        this.facing.position.x += this.velocity.xVec;
        this.facing.position.y += this.velocity.yVec;
    }
    jump() {
        if (this.doubleJump === false && this.onGround) // the value double is current false
        {
            this.velocity.yVec = -10;
            this.doubleJump = true;
        }
        else if (this.doubleJump && !this.onGround) //now its true
        {
            this.velocity.yVec = -15;
            this.doubleJump = false;
        }
        setTimeout(() => {
            this.doubleJump = false;
        }, 340);        
    }
    attack() {
        //change to attack sprites
        this.switchSprites('attack1');
        //setAttacking
        this.isAttacking = true;
        //attack for a period of time
        setTimeout(() => {
            this.isAttacking = false;
        }, 50);
    }
    updateHitBoxPos() {
        if(this.isAttacking) {
            this.hitBox.position.x = this.position.x + this.hitBox.hitBoxOffset.x;
            this.hitBox.position.y = this.position.y + this.hitBox.hitBoxOffset.y;

        }
    }
    //flip the hitboxes
    updateHitBoxFacing() {
        if (this.looking === 'right') {
            this.hitBox.hitBoxOffset.x = 155; // will be more or less depend on player's atributes
        }
        if (this.looking === 'left') {
            this.hitBox.hitBoxOffset.x = -195;
        }
    }
    switchSprites(sprite) {  
        //if attacking, then no longer call changing sprites in order to prevent weird animations
        if(this.image === this.sprites.attack1.image 
            && this.currentFrame < this.sprites.attack1.frame - 1) {
                // console.log(this.sprites.attack1.image)
                return;     
            }
                
        switch(sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image; 
                    this.maxFrame = this.sprites.idle.frame;
                    //set current frame back to 0
                    this.currentFrame = 0;
                    this.frameHold = this.sprites.idle.frameHold;
                }
                break;
            case 'move':
                if(this.image !== this.sprites.move.image) {
                    this.image = this.sprites.move.image;
                    this.maxFrame = this.sprites.move.frame;
                    this.currentFrame = 0;
                    this.frameHold = this.sprites.move.frameHold;
                }
                break;
            case 'jump': 
                if(this.image !== this.sprites.jump.image) {
                    this.currentFrame = 0;
                    this.image = this.sprites.jump.image; 
                    this.maxFrame = this.sprites.jump.frame;   
                    this.frameHold = this.sprites.jump.frameHold;                 
                }
                break;
            case 'fall':
                if(this.image !== this.sprites.fall.image) {
                    this.currentFrame = 0;
                    this.image = this.sprites.fall.image;
                    this.maxFrame = this.sprites.fall.frame;              
                    this.frameHold = this.sprites.fall.frameHold;
                }
                break;
            case 'attack1':
                if(this.image !== this.sprites.attack1.image) {
                    this.currentFrame = 0;
                    this.image = this.sprites.attack1.image; 
                    this.maxFrame = this.sprites.attack1.frame;
                    this.frameHold = this.sprites.attack1.frameHold;
                    this.damage = this.sprites.attack1.damage;
                }
                break;
        }
    }
    drawFighter() {
        //draw the image base on the looking
        if(this.looking === 'right') {
            this.draw();
        }
        else if (this.looking === 'left') {
            this.drawFlip();
        }
    }
    
    update() {
        this.drawHitBox();
        this.updateHitBoxFacing();
        this.checkCollision();
        this.drawFighter ();
        this.animation();
        this.move();
        this.updateHitBoxPos();
    }
}


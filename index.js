
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//resize canvas
canvas.width = 1024;
canvas.height = 497;

//set background color
c.fillRect(0, 0, canvas.width, canvas.height);
//gravity
const gravity = 0.6;
const ground = canvas.height - 29;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/bg.png"
});

const shop = new Sprite({
    position: {
        x: 700,
        y: canvas.height - 220
    },
    imageSrc: "./img/shop.png",
    scale: 1.5,
    frame: 6,
});

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        xVec: 0,
        yVec: 0
    },
    attackBoxOffset: {
        x: 155,
        y: 40
    },
    looking: 'right',
    imageSrc: './img/EvilWizard/Sprites/Idle.png',
    frame: 8,
    scale: 2,
    offset: {
        x: 220,
        y: 184
    },
    sprites: {
        idle: {
            imageSrc: './img/EvilWizard/Sprites/Idle.png',
            frame: 8,
            frameHold: 10
        },
        move: {
            imageSrc: './img/EvilWizard/Sprites/Run.png',
            frame: 8,
            frameHold: 10
        },
        jump: {
            imageSrc: './img/EvilWizard/Sprites/Jump.png',
            frame: 2,
            frameHold: 10
        },
        fall: {
            imageSrc: './img/EvilWizard/Sprites/Fall.png',
            frame: 2,
            frameHold: 10
        },
        attack1: {
            imageSrc: './img/EvilWizard/Sprites/Attack1.png',
            frame: 8,
            frameHold: 7,
            damage: 7.5,
            attackDelay: 500, //ms
        },
        takeHit: {
            imageSrc: './img/EvilWizard/Sprites/Take Hit.png',
            frame: 3,
            frameHold: 10
        },
        death: {
            imageSrc: './img/EvilWizard/Sprites/Death.png',
            frame: 7,
            frameHold: 10
        }
    },
    attackBox: {
        offset: {
            x: 0,
            y: -65
        },
        width: 200,
        height: 170
    },
    hitBox: {
        offset: {
            x: 0,
            y: 50
        },
        width: 50,
        height: 100
    }
});

const enemy = new Fighter({
    position: {
        x: canvas.width - 30,
        y: 0
    },
    velocity: {
        xVec: 0,
        yVec: 0
    },
    looking: 'left',
    imageSrc: './img/MedievalKing/Sprites/Idle.png',
    frame: 8,
    scale: 2,
    offset: {
        x: 130,
        y: 59
    },
    sprites: {
        idle: {
            imageSrc: './img/MedievalKing/Sprites/Idle.png',
            frame: 8,
            frameHold: 10
        },
        move: {
            imageSrc: './img/MedievalKing/Sprites/Run.png',
            frame: 8,
            frameHold: 5
        },
        jump: {
            imageSrc: './img/MedievalKing/Sprites/Jump.png',
            frame: 2,
            frameHold: 10
        },
        fall: {
            imageSrc: './img/MedievalKing/Sprites/Fall.png',
            frame: 2,
            frameHold: 10
        },
        attack1: {
            imageSrc: './img/MedievalKing/Sprites/Attack1.png',
            frame: 4,
            frameHold: 7,
            damage: 5,
            attackDelay: 500 * (3 / 4)
        },
        takeHit: {
            imageSrc: './img/MedievalKing/Sprites/Take Hit.png',
            frame: 4,
            frameHold: 10
        },
        death: {
            imageSrc: './img/MedievalKing/Sprites/Death.png',
            frame: 6,
            frameHold: 10
        }
    },
    attackBox: {
        offset: {
            x: 0,
            y: 60
        },
        width: 110,
        height: 80
    },
    hitBox: {
        offset: {
            x: 0,
            y: 50
        },
        width: 50,
        height: 100
    }
});

//for smoother movement because keyup event can stop player's movement
//create key object
const key = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    }
}

decreasingTimer();

//animation loop
function animationLoop() {
    window.requestAnimationFrame(animationLoop);
    //redraw the background
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    //draw background
    background.update();
    //draw shop
    shop.update();
    c.fillStyle = 'rgba(255, 255, 255, 0.14)'
    c.fillRect(0, 0, canvas.width, canvas.height);
    //update animation
    player.update();
    enemy.update();
    //move left or right and check what is the current key is pressed for precise animation
    player.velocity.xVec = 0;
    enemy.velocity.xVec = 0;
    movement();
    detectCollision();
    checkOnGround();
    idleState();
    jumpMovement();

    function checkOnGround() {
        if (player.position.y + player.height >= ground) {
            player.onGround = true;
        }
        if (player.position.y + player.height < ground) {
            player.onGround = false;
        }
        if (enemy.position.y + enemy.height >= ground) {
            enemy.onGround = true;
        }
        if (enemy.position.y + enemy.height < ground) {
            enemy.onGround = false;
        }
    }
    //detecting when player is acellerating up or down
    function jumpMovement() {
        if (player.velocity.yVec > 0) {
            player.switchSprites('fall');
        }
        if (player.velocity.yVec < 0) {
            player.switchSprites('jump');
        }
        if (enemy.velocity.yVec > 0) {
            enemy.switchSprites('fall');

        }
        if (enemy.velocity.yVec < 0) {
            enemy.switchSprites('jump');
        }
    }
    function idleState() {
        if (player.velocity.yVec === 0
            && key.a.pressed === false
            && key.d.pressed === false
            && player.isAttacking === false
            && player.health > 0) {
            player.switchSprites('idle');
        }
        if (enemy.velocity.yVec === 0
            && key.ArrowRight.pressed === false
            && key.ArrowLeft.pressed === false
            && enemy.isAttacking === false
            && enemy.health > 0) {
            enemy.switchSprites('idle');
        }
    }

    function movement() {
        //player's movement         
        if (key.a.pressed && player.lastKey === 'a') {
            player.velocity.xVec = -5;
            player.switchSprites('move'); // set player current image to run
        }
        else if (key.d.pressed && player.lastKey === 'd') {
            player.velocity.xVec = 5;
            player.switchSprites('move');
        }

        //enemy's movement       
        if (key.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
            enemy.velocity.xVec = 5;
            enemy.switchSprites('move');
        }
        else if (key.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
            enemy.velocity.xVec = -5;
            enemy.switchSprites('move');
        }

    }
    function detectCollision() {
        //player's attackBox collisions
        if (rectangularCollision({
            rect1: player,
            rect2: enemy
        })
            && player.isAttacking
        ) {
            enemy.switchSprites('takeHit');
            player.isAttacking = false;
            enemy.health -= player.damage;
            // document.querySelector('#enemyHealth').style.width = enemy.health + '%';
            gsap.to('#enemyHealth', {
                width: enemy.health + '%'
            })
        }
        //enemy's attackBox collisions
        else if (rectangularCollision({
            rect1: enemy,
            rect2: player
        })
            && enemy.isAttacking
        ) {
            player.switchSprites('takeHit');
            enemy.isAttacking = false;
            player.health -= enemy.damage;
            // document.querySelector('#playerHealth').style.width = player.health + '%';
            gsap.to('#playerHealth', {
                width: player.health + '%'
            })
        }
        // end game base of health
        if (player.health <= 0) {
            changeHTML({
                text: 'player 2 wins',
                timerId: timerId
            })
        } else if (enemy.health <= 0) {
            changeHTML({
                text: 'player 1 wins',
                timerId: timerId
            })
        }
    }
}

animationLoop();

window.addEventListener('keyup', (event) => {
    if (!player.dead) {
        switch (event.key) {
            //player
            case 's':
                player.attack();
                break;
            case 'w':
                player.jump();
                break;
            case 'd': key.d.pressed = false; break;
            case 'a': key.a.pressed = false; break;
        }
    }
    if (!enemy.death) {
        //enemy
        switch (event.key) {
            case 'ArrowDown':
                enemy.attack();
                break;
            case 'ArrowUp':
                enemy.jump();
                break;
            case 'ArrowRight': key.ArrowRight.pressed = false; break;
            case 'ArrowLeft': key.ArrowLeft.pressed = false; break;
        }
    }
})
window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        switch (event.key) {
            //player's key
            case 'd':
                key.d.pressed = true;
                player.looking = 'right';
                player.lastKey = 'd';
                break;
            case 'a':
                key.a.pressed = true;
                player.looking = 'left';
                player.lastKey = 'a';
                break;
        }
    }
    if (!enemy.dead) {
        switch (event.key) {
            //enemy's key'
            case 'ArrowRight':
                key.ArrowRight.pressed = true;
                enemy.looking = 'right';
                enemy.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                key.ArrowLeft.pressed = true;
                enemy.looking = 'left';
                enemy.lastKey = 'ArrowLeft';
                break;
        }
    }
});


const EvilWizard = new Fighter({
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

const MedievalKing = new Fighter({
    position: {
        x: 1024 - 30,
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


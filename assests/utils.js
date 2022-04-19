//detect collisions of hitBox
function rectangularCollision({rect1, rect2}) {
    return ( 
    rect1.hitBox.position.x + rect1.hitBox.width >= 
            rect2.position.x && 
    rect2.position.x + rect2.width >= 
        rect1.hitBox.position.x && 
    rect1.hitBox.position.y  + rect1.hitBox.height >= 
        rect2.position.y && 
    rect1.hitBox.position.y <= rect2.position.y + rect2.hitBox.height
    )
}
//timer
let timer = 60;
let timerId;

function changeHTML({text, timerId}) {
    clearTimeout(timerId); //stop the timer
    document.querySelector('#displayTieText').innerHTML = text;
    document.querySelector('#displayTieText').style.display = 'flex';
}
function decreasingTimer() {   
    if(timer > 0) { 
        timerId = setTimeout(() => {
            decreasingTimer();
        }, 1000)
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }
    if(timer === 0) {
        if(player.health === enemy.health) {
            changeHTML({
                text: 'Tie',
                timerId: timerId
            })
            
        }
        else if(player.health > enemy.health) {
            changeHTML({
                text: 'Player 1 wins',
                timerId: timerId
            })
        }
        else if(player.health < enemy.health) {
            changeHTML({
                text: 'Player 2 wins',
                timerId: timerId
            })
        }
    }   
}
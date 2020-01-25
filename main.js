var pressed = false;
var SPACE = 32;
var MAX_PRESS = 6;
var curr_press = 0;

var mousePos = 0;
const mouseInc = 1000;
var cakePos = 0;
const frameMs = 1000 / 12;
var interval;

setIdle();

function setIdle() {
    clearInterval(interval)
    interval = setInterval( () => {
        document.getElementById("mouse").style.backgroundPosition = `-${mousePos}px, 0px`;
    
        if (mousePos == mouseInc) {
            mousePos = 0;
        } else {
            mousePos = mouseInc;
        }
    
    }, frameMs);    
}

function setIdleFinished() {
    clearInterval(interval);
    mousePos = mouseInc * 7;
    interval = setInterval( () => {
        document.getElementById("mouse").style.backgroundPosition = `-${mousePos}px, 0px`;
    
        if (mousePos == mouseInc * 12) {
            mousePos = 7 * mouseInc;
        } else {
            mousePos += mouseInc;
        }
    
    }, frameMs * 3);    
}

document.onkeydown = function (e) {
    if (e.keyCode == SPACE && pressed == false) {
        pressed = true;
        if (curr_press == MAX_PRESS) {
            pressed = true;
            setIdleFinished();
        } else {
            curr_press++;
            playBite();
        }
    }
}

function playBite() {
    clearInterval(interval);
    mousePos = 0;
    interval = setInterval( () => {
        document.getElementById("mouse").style.backgroundPosition = `-${mousePos}px, 0px`;
    
        if (mousePos == mouseInc*6) {
            reduceCake();
            if (curr_press == MAX_PRESS) {
                pressed = true;
                document.getElementById("text").style.opacity = 1;
                setIdleFinished();
            } else {
                setIdle();
            }

        } else {
            mousePos += mouseInc;
        }
    
    }, frameMs);    
}

function reduceCake() {
    if (cakePos == 5000) {
        document.getElementById("cake").style.opacity = 0;
    } else {
        cakePos += mouseInc;
        document.getElementById("cake").style.backgroundPosition = `-${cakePos}px, 0px`;
        pressed = false;
    }
}
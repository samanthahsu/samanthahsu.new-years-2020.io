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

document.getElementById("div").addEventListener('touchstart', start());

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

function transitionToFinish() {
    clearInterval(interval);
    mousePos = mouseInc * 7;
    document.getElementById("mouse").style.backgroundPosition = `-${mousePos}px, 0px`;

    interval = setInterval( () => {
        document.getElementById("mouse").style.backgroundPosition = `-${mousePos}px, 0px`;
        
        if (mousePos == mouseInc * 10) {
            setIdleFinished();
        } else {
            mousePos += mouseInc;
        }
    }, frameMs);  
}

function setIdleFinished() {
    clearInterval(interval);
    document.getElementById("mouse").style.backgroundPosition = `-${mousePos}px, 0px`;

    interval = setInterval( () => {
        document.getElementById("mouse").style.backgroundPosition = `-${mousePos}px, 0px`;
        
        if (mousePos == mouseInc * 15) {
            mousePos = 10 * mouseInc;
        } else {
            mousePos += mouseInc;
        }
    }, frameMs * 3);  
}

// document.ontouchstart = start();
document.onkeydown = function(e) {
    if (e.keyCode == SPACE && pressed == false) start();
};

function start () {
    console.log("boop");
    pressed = true;
    if (curr_press == MAX_PRESS) {
        pressed = true;
        setIdleFinished();
    } else {
        curr_press++;
        playBite();
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
                document.getElementById("instructions").style.opacity = 0;
                transitionToFinish();
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
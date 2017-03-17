const maze = [
        "**** *************************",
        "**** ************** **********",
        "**** ************** **********",
        "      ** **********           ",
        "**** *** ********** **********",
        "****                **********",
        "****  * **********************",
        "**** *************************"
    ],
    ballChar = " ",
    wallChar = "*";

function createGame(selector) {
    let canvas = document.querySelector(selector),
        ctx = canvas.getContext("2d"),
        isMouthOpen = false,
        steps = 0,
        stepsToMouthOpen = 15,
        pacman = {
            "x": 0,
            "y": 0,
            "size": 30,
            "speed": 2
        },
        dir = 0,
        keyCodeToDirs = {
            "37": 2,
            "38": 3,
            "39": 0,
            "40": 1

        },
        ball = {
            "x": 200,
            "y": 100,
            "size": 10
        };

    const dirDelta = [{
        "x": 1,
        "y": 0
    }, {
        "x": 0,
        "y": 1
    }, {
        "x": -1,
        "y": 0
    }, {
        "x": 0,
        "y": -1
    }];



    document.body.addEventListener('keydown', function(ev) {
        //console.log(ev.keyCode);
        ev.preventDefault();

        if (!keyCodeToDirs.hasOwnProperty(ev.keyCode)) {
            return;
        }
        dir = keyCodeToDirs[ev.keyCode];
    });

    function gameLoop() {
        const offset = 5;


        ctx.fillStyle = 'yellow';
        ctx.clearRect(pacman.x - offset, pacman.y - offset, pacman.size + offset * 2, pacman.size + offset * 2);

        drowPacman();

        if (0 === (steps % stepsToMouthOpen)) {
            isMouthOpen = !isMouthOpen;
        }

        drowBall(ball);

        if (areColliding(pacman, ball)) {
            ball = {
                "x": (Math.random() * 200) | 0,
                "y": (Math.random() * 100) | 0,
                "size": ball.size
            }
        }


        if (updatePacmanPosition()) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }



        window.requestAnimationFrame(gameLoop);
    }

    function positionToBound(obj) {
        let sizes = {
            "top": obj.y,
            "left": obj.x,
            "bottom": obj.y + obj.size,
            "right": obj.x + obj.size
        };
        return sizes;
    }

    function isBetween(value, min, max) {
        return min < value && value < max;
    }

    function areColliding(obj1, obj2) {
        let sizes1 = positionToBound(obj1),
            sizes2 = positionToBound(obj2);

        return (isBetween(sizes2.left, sizes1.left, sizes1.right) ||
                isBetween(sizes2.right, sizes1.left, sizes1.right)) &&
            (isBetween(sizes2.top, sizes1.top, sizes1.bottom) ||
                isBetween(sizes2.bottom, sizes1.top, sizes1.bottom));
    };

    function drowPacman() {
        let deltaRadians = dir * Math.PI / 2;
        ctx.beginPath();

        if (isMouthOpen) {
            let x = pacman.x + pacman.size / 2,
                y = pacman.y + pacman.size / 2,
                size = pacman.size / 2;
            ctx.arc(x, y, size, deltaRadians + Math.PI / 4, deltaRadians + (7 * Math.PI / 4));
            ctx.lineTo(x, y);
        } else {
            drowBall(pacman);
            ctx.lineTo(pacman.x, pacman.y);
        }
        steps += 1;
        ctx.fill();
    }

    function drowBall(ball) {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();

        let x = ball.x + ball.size / 2,
            y = ball.y + ball.size / 2,
            size = ball.size / 2;
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
    };

    function updatePacmanPosition() {
        pacman.x += dirDelta[dir].x * pacman.speed;
        pacman.y += dirDelta[dir].y * pacman.speed;

        if (pacman.x < 0 || pacman.x >= canvas.width ||
            pacman.y < 0 || pacman.y >= canvas.height) {
            pacman.x = (pacman.x + canvas.width) % canvas.width;
            pacman.y = (pacman.y + canvas.height) % canvas.height;
            return true;
        }

        return false;

    };

    return {
        "start": function() {
            gameLoop();
        }
    }
}
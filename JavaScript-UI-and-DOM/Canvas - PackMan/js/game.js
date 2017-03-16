function createGame(selector) {
    let canvas = document.querySelector(selector),
        ctx = canvas.getContext("2d"),
        isMouthOpen = false,
        steps = 0,
        stepsToMouthOpen = 15,
        pacman = {
            "x": 30,
            "y": 30,
            "size": 30
        },
        dir = 0,
        keyCodeToDirs = {
            "37": 2,
            "38": 3,
            "39": 0,
            "40": 1

        };

    document.body.addEventListener('keydown', function(ev) {
        //console.log(ev.keyCode);

        if (!keyCodeToDirs.hasOwnProperty(ev.keyCode)) {
            return;
        }
        dir = keyCodeToDirs[ev.keyCode];
    });

    function gameLoop() {
        let deltaRadians = dir * Math.PI / 2;

        ctx.fillStyle = 'yellow';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        if (isMouthOpen) {
            ctx.arc(pacman.x, pacman.x, pacman.size, deltaRadians + Math.PI / 4, deltaRadians + (7 * Math.PI / 4));
            ctx.lineTo(pacman.x, pacman.y);
        } else {
            ctx.arc(pacman.x, pacman.y, pacman.size, 0, 2 * Math.PI);
            ctx.lineTo(pacman.x, pacman.y);
        }
        steps += 1;
        ctx.fill();
        if (0 === (steps % stepsToMouthOpen)) {
            isMouthOpen = !isMouthOpen;
        }


        window.requestAnimationFrame(gameLoop);
    }

    return {
        "start": function() {
            gameLoop();
        }
    }
}
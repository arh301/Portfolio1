window.onload = function () {
    var canvas = document.getElementById("myCanvas"); // sets cavas in HTML
    
    var ctx = canvas.getContext("2d"); // creates 2D canvas and calls it "ctx"
	// initiate all image sources
    var plane = new Image();
    plane.src = 'game/plane.png';
    var bird = new Image();
    bird.src = 'game/bird.png'
    var birdhit = new Image();
    birdhit.src = 'game/birdhit.png'
    var angel = new Image();
    angel.src = 'game/angel.png'
    var angelhit = new Image();
    angelhit.src = 'game/angelhit.png'
    var rocket = new Image();
    rocket.src = 'game/rocket.png'
    var rockethit = new Image();
    rockethit.src = 'game/rockethit.png'
    var meteor = new Image();
    meteor.src = 'game/meteor.gif'
    var end = new Image();
    end.src = 'game/end.png';
	// initiate game variables
    var keydown = false;
    var seconds = 0;
    var lives = 5;
    var score = 0;
    var level = 1;
    var lastDownTarget;
	
    var planeX = 60; // x coordinate of plane object
    var planeY = 200; // y coordinate of plane object
    var planeW = 114; // plane width
    var planeH = 75; // plane height

    var birdX = 665; 
    var birdY = 350; 
    var birdW = 50;  
    var birdH = 50; 
    var angelX = 665; 
    var angelY = 50; 
    var angelW = 51; 
    var angelH = 51;
    var rocketX = 300; 
    var rocketY = 400; 
    var rocketW = 140; 
    var rocketH = 140;
    var meteorX = 490; 
    var meteorY = -150; 
    var meteorW = 180; 
    var meteorH = 180;
	// initiate the distance moved for x and y for each object
    var planeIncrement = 15; // plane incremented 15px each animation
    var angelMoveX = 7;
    var angelMoveY = 2;
    var rocketMoveX = 1;
    var rocketMoveY = 2;
    var birdMoveX = 9; 
    var birdMoveY = 1; 
    var meteorMoveX = -10; 
    var meteorMoveY = 3;
	// initate keypress variables
    var left = false;
    var right = false;
    var up = false;
    var down = false;
    var enter = false;
    
	var pullback = false;   // plane in retreat (-x)
    var collision = false;  // plane has collided
    var birdHit = false;    // plane has hit bird
    var birdCount = 0;	    // variable acts as countdown/timer to fire/animate object
    var angelHit = false;
    var angelCount = 20;
    var rocketHit = false;
    var rocketCount = 100;
    var meteorHit = false;
    var meteorCount = 200;
    var birdPause = false;
    var angelPause = false;
    var rocketPause = false;
    var meteorPause = false;
	// initiate loop variables
	var speed = 30;           // speed at which the draw() function is reiterated
	var loop = null;
	var startloop = null;
    var endloop = null;
    var timer;

	// event listener listens for key up event and resets all keys' variables to false
    window.addEventListener('keyup', function (key) {
        if (key.which == 37) { left = false; }

        if (key.which == 39) { right = false; }

        if (key.which == 38) { up = false; }

        if (key.which == 40) { down = false; }

        if (key.which == 13) { enter = false; }

    });

	// event listener listens for key down event and sets key variables to true if keys up/down/left/right or enter are pressed
    window.addEventListener('keydown', function (key) {

        if (key.which == 37) { left = true; }

        if (key.which == 39) { right = true; }

        if (key.which == 38) { up = true; }

        if (key.which == 40) { down = true; }

        if (key.which == 13) { enter = true; }

    });

	// animate bird object if it is paused due to collision or timeout
	// restricts object from leaving the canvas boundaries 
	// called each time the draw() function is executed, unless returned early
    function animateBird() {
        if (birdHit == true || birdPause == true) {
            return;
        }
        if (birdCount != 0) {
            birdCount = birdCount - 1;
            return;
        }
        birdX += birdMoveX;
        birdY += birdMoveY;

        if (birdX > 665) {
            birdMoveX = -10;
        }

        if (birdX + 50 < 0) {
            birdRestart();
        }

        if (birdY > 350) {
            birdMoveY = -3;
        }

        if (birdY < 0) {
            birdMoveY = 3;
        }
        checkCollision(birdX, birdY, birdW, birdH, "bird");
    }

	// animate angel object if it is paused due to collision or timeout
	// restricts object from leaving the canvas boundaries 
	// called each time the draw() function is executed, unless returned early
    function animateAngel() {
        if (angelHit == true || angelPause == true) {
            return;
        }
        if (angelCount != 0) {
            angelCount = angelCount - 1;
            return;
        }
        angelX += angelMoveX;
        angelY += angelMoveY;

        if (angelX > 665) {
            angelMoveX = -8;
        }

        if (angelX + 50 < 0) {
            angelRestart();
        }

        if (angelY > 350) {
            angelRestart();
        }

        if (angelY < 0) {
            angelRestart();
        }
        checkCollision(angelX, angelY, angelW, angelH, "angel");
    }

	// animate rocket object if it is paused due to collision or timeout
	// restricts object from leaving the canvas boundaries 
	// called each time the draw() function is executed, unless returned early
    function animateRocket() {

        if (rocketHit == true || rocketPause == true) {
            return;
        }
        if (rocketCount != 0) {
            rocketCount = rocketCount - 1;
            return;
        }
        rocketX += rocketMoveX;
        rocketY += rocketMoveY;

        if (rocketX > 665) {
            rocketMoveX = -8;
        }

        if (rocketX < 0) {
            rocketRestart();
        }

        if (rocketY > 350) {
            rocketMoveY = -8;
        }

        if (rocketY + 150 < 0) {
            rocketRestart();
        }
        checkCollision(rocketX, rocketY, rocketW, rocketH, "rocket");
    }

	// animate meteor object if it is paused due to collision or timeout
	// restricts object from leaving the canvas boundaries
	// called each time the draw() function is executed, unless returned early	
    function animateMeteor() {
        if (meteorHit == true || meteorPause == true) {
            return;
        }
        if (meteorCount != 0) {
            meteorCount = meteorCount - 1;
            return;
        }
        meteorX += meteorMoveX;
        meteorY += meteorMoveY;

        if (meteorX > 665) {
            meteorRestart();
        }
        if (meteorX + 150 < 0) {
            meteorRestart();
        }
        if (meteorY > 380) {
            meteorRestart();
        }
        if (meteorY + 150 < 0) {
            meteorRestart();
        }
        checkCollision(meteorX, meteorY, meteorW, meteorH, "meteor");
    }
	
	// restart the angel object, setting a counter/timer for its next animation and setting new coordinates and movement values
	// called each time angel object collides (checkCollision()) or leaves the canvas
    function angelRestart() {
        angelCount = 40;
        angelX = 665;
        angelY = Math.floor(Math.random() * 350) + 5;
        if (angelY <= 160) {
            angelMoveY = Math.floor(Math.random() * 2) + 1;
        }
        else {
            angelMoveY = Math.floor(Math.random() * 0) + -3;
        }
    }
	
	// restart the rocket object, setting a counter/timer for its next animation and setting new coordinates and movement values
    // called each time angel object collides (checkCollision()) or leaves the canvas
	function rocketRestart() {
        rocketCount = 200;
        rocketX = Math.floor(Math.random() * 500) + 40;
        rocketY = 350;
        rocketMoveX = Math.floor(Math.random() * 2) - 2;
        rocketMoveY = 1;
    }
	
	// restart the meteor object, setting a counter/timer for its next animation and setting new coordinates and movement values
    // called each time angel object collides (checkCollision()) or leaves the canvas
	function meteorRestart() {
        meteorCount = 350;
        meteorX = Math.floor(Math.random() * 550) + 300;
        meteorY = -150;
        meteorMoveX = Math.floor(Math.random() * -6) -1;
        meteorMoveY = Math.floor(Math.random() * 3) + 8;;
    }
	
	// restart the bird object, setting a counter/timer for its next animation and setting new coordinates and movement values
    // called each time angel object collides (checkCollision()) or leaves the canvas
	function birdRestart() {
        birdCount = 30;
        birdX = 665;
        birdY = Math.floor(Math.random() * 350) + 10;
        birdMoveX = Math.floor(Math.random() * 18) + 7;
        birdMoveY = Math.floor(Math.random() * -4) + 4;

    }

	// check if passed object collides with plane and set according values if colliding
	// called each time and object is animated (i.e. animateAngel())
    function checkCollision(objX, objY, objW, objH, obj) {
        if (obj == "rocket" || obj == "meteor") {
            if (planeX + 40 < objX + objW && planeX + planeW - 25 > objX &&
        planeY + 20 < objY + objH && planeY + planeH - 30 > objY) {
                if (obj == "rocket") {
                    lives = lives - 1;
                    score = score - 100;
                    rocketHit = true;
                    rocketCount = 15;
                } if (obj == "meteor") {
                    lives = lives - 1;
                    score = score - 75;
                    meteorHit = true;
                    meteorCount = 10;
                }
            }
        }
	// objects are seperated with differing buffer values (i.e. - 10 or -30, smaller objects (below) have smaller collision buffers
        else {
            if (planeX < objX + objW && planeX + planeW - 5 > objX &&
        planeY + 30 < objY + objH && planeY + planeH - 10 > objY) {
                collision = true;

                if (obj == "bird") {
                    birdHit = true;
                    birdCount = 20;
                    score = score - 20;
                }
                if (obj == "angel") {
                    angelHit = true;
                    angelCount = 40;
                    score = score + 30;
                }
            }
        }
    }
	
	var levelSeconds = 0;
	//function starts timer interval to run every second
	function startTimer() {
	timer = setInterval(time, 1000);
    }
	// function stops timer interval
	function stopTimer(){
		clearInterval(timer);
	}
	// function called per timer interval
	// increases second (displayed in canvas) and score accordingly
	// controls level by increasing level every 16 seconds and increasing the draw() timeout speed
	function time(){
		seconds = seconds + 1;
		levelSeconds = levelSeconds + 1;
        score = score + 16;
		if(levelSeconds == 20){
			levelSeconds = 0;
			level = level + 1;
			speed = speed * 1.25;
		}
	}

    // function called when the game has ended i.e. lives have reached 0
	// stops draw() loop and displays game end message including score and level
	// starts loop to listen for user game restart - by pressing the enter key - calling restart method 
	function gameOver() {
        clearTimeout(drawloop);
		stopTimer();
        
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears canvas
        ctx.fillStyle = "black"; // Sets fill style to red
        ctx.fillRect(100, 100, 500, 200);
        ctx.lineWidth = "5";
        ctx.strokeStyle = "red";
        ctx.rect(100, 100, 500, 200);
        ctx.drawImage(end, 220, 120, 250, 50);
        ctx.font = "18px Arial";
        ctx.lineWidth = "10";
        ctx.fillStyle = "red";
        ctx.fillText("Your score: " + score, 280, 200);
        ctx.fillText("Level reached: " + level, 280, 230);
        ctx.fillStyle = "white";
		ctx.font = "16px Arial";
        ctx.fillText("Think you can do better? Press the Enter key to restart!", 170, 270);
        endloop = setInterval(function () {
            if (enter) {
				enter = false;
                gameRestart();
				return;
            }
        }, 1000 / 40);

        ctx.stroke();
        return;
    }
	
	// function called on startup displays welcome/instruction message and listens for game start (enter key down)
	// on game start, draw() loop is started
	function gameStart(){
		
		startloop = setInterval(function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears canvas
        ctx.fillStyle = "black"; // Sets fill style to red
        ctx.fillRect(100, 40, 500, 300);
        ctx.lineWidth = "5";
        ctx.font = "16px Arial";
        ctx.lineWidth = "10";
        ctx.fillStyle = "white";
        ctx.fillText("Hello Dodjet player", 280, 70);
		ctx.fillRect(100,85,500,5);
        ctx.fillText("Game rules:", 310, 120);
		ctx.fillStyle = "green";
		ctx.fillText("DO: Use the arrow keys to navigate up down and right/forwards.",125, 145);
		ctx.fillText("Fly into angels (+40 points) AND", 240, 165); 
		ctx.fillText("stay in the air as long as possible (++ points).", 200,185);
		ctx.fillStyle = "red";
		ctx.fillText("DONT: Fly into...",300,220);
		ctx.fillText("Birds (-20 points)",296,240);
		ctx.fillText("Rockets (-100 points)",280, 260);
		ctx.fillText("Meteors (-75 points)", 285, 280);
        ctx.fillStyle = "white";
        		ctx.fillText("Ready to play? Press the enter button to begin!", 180, 315);
            if (enter == true){
				startTimer();
                draw();
				enter = false;
            }
        }, 1000 / 30);
		ctx.stroke();
    }
	
	// function called when the game is restarted (from gameOver() method/state)
	// stops endloop and resets all game variables either statically or by calling object restart methods
	// starts timer and draw() loop to begin game
    function gameRestart() {
        clearInterval(endloop);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears canvas
        planeX = 60;
        planeY = 200;
        planeW = 170;
        planeH = 90;
        planeIncrement = 15;
        score = 0;
		seconds = 0;
        level = 1;
        lives = 5;
        collision = false;
        birdHit = false;
        birdCount = 0;
        angelHit = false;
        angelCount = 20;
        rocketHit = false;
        rocketCount = 140;
        meteorHit = false;
        meteorCount = 200;
        birdPause = false;
        angelPause = false;
        rocketPause = false;
        meteorPause = false;
        birdRestart();
        angelRestart();
        rocketRestart();
        meteorRestart();
		startTimer();
		speed = 30;
        draw();
    }

	
	// function starts draw loop to continuously draw canvas in gameplay
	// animates objects, checks for conditions (i.e. user key stroke and collisions) and calls appropriate methods
	// I.e. continuously calls animateBird(), animateAngel() etc.
    function draw() {
		// if game just started, clear startloop in startGame()
		if(startloop != null){
			clearInterval(startloop);
			startloop = null;
		}
		drawloop = setTimeout(function(){
			// check for game over/no lives left
            if (lives == 0) {
                gameOver();
                return;
            }
			// check for user key inputs and move the plane accordingly
            if (up) { 
                planeY = planeY - planeIncrement;
                if (planeY < 40) { // restrict plane to y > 40
                    planeY = 40;
                }
            }
            if (right) {
                //if not in retreat, increase x
                if (pullback == false) {
                    planeX = planeX + planeIncrement;
                    if (planeX > 400) { // if plane x surprasses 400, set pullback counter to 35 
                        pullback = 35; 
                    }
                }
            }
            if (down) {
                planeY = planeY + planeIncrement;
                if (planeY > 300) { // restrict plane to y < 300
                    planeY = 300;
                }
            }
			// Plane in retreat, move place -10 x 35 times and pause all other objects until pullback = 0
            if (pullback > 0) { 
                planeX = planeX - 10; 
                pullback = pullback - 1;
                if (pullback == 34) {
                    birdPause = true;
                    angelPause = true;
                    rocketPause = true;
                    meteorPause = true;
                }
                if (pullback == 0) { // Retreat finished, unpause all other objects
                    birdPause = false;
                    angelPause = false;
                    rocketPause = false;
                    meteorPause = false;
                }

            }
			// get animation frame and draw images to cleared canvas
            requestAnimationFrame(draw);
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears canvas
            ctx.drawImage(plane, planeX, planeY, 170, 90);
			// for each object, the state is determined (collided, in animation or paused) and drawn if appropriate
			// if collision is detected, the original object is not drawn and a replacement collision image is drawn in its place
            if (birdHit == true) {
                if (birdCount != 0) { // birdCounts acts as a timer to keep collision image displayed before restarting the timer and bird object
                    ctx.drawImage(birdhit, birdX - 50, birdY - 30, 100, 100);
                    birdCount = birdCount - 1;
                    if (birdCount == 0) {

                        birdHit = false;
                        birdRestart();
                        birdCount = 20; // bird will be restarted after 20 draw() iterations
                    }
                }
            }
            else {
                if (birdCount == 0) {
                    ctx.drawImage(bird, birdX, birdY, birdW, birdH); // bird in motion, draw bird
                }
            }
            if (angelHit == true) {
                if (angelCount != 0) {
                    ctx.drawImage(angelhit, angelX - 20, angelY - angelCount, 50, 37.5);
                    angelCount = angelCount - 1;
                    if (angelCount == 0) {


                        angelHit = false;
                        angelCount = 40;
                        angelRestart();
                    }
                }
            }
            else {
                if (angelCount == 0) {
                    ctx.drawImage(angel, angelX, angelY, angelW, angelH); 
                }
            }
            if (rocketHit == true) {
                if (rocketCount != 0) {
                    ctx.drawImage(rockethit, planeX, (planeY - 50), 200, 200);
                    rocketCount = rocketCount - 1;
                    if (rocketCount == 0) {
                        rocketHit = false;
                        rocketCount = 200;
                        rocketRestart();
                    }

                }
            }
            else {
                if (rocketCount == 0) {
                    ctx.drawImage(rocket, rocketX, rocketY, rocketW, rocketH); 
                }
            }
            if (meteorHit == true) {
                if (meteorCount != 0) {
                    ctx.drawImage(rockethit, planeX, (planeY - 50), 200, 200);
                    meteorCount = meteorCount - 1;
                    if (meteorCount == 0) {
                        meteorHit = false;
                        meteorCount = 200;
                        meteorRestart();
                    }

                }
            }
            else {
                if (meteorCount == 0) {
                    ctx.drawImage(meteor, meteorX, meteorY, meteorW, meteorH); //Draws red square
                }
            }
			
			// draw header bar displaying user lives, level, seconds played and current score
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,720,40);
			ctx.fillStyle = "white";
            ctx.font = "20px Arial";
			ctx.fillText("Lives: " + lives, 30, 22);
			ctx.fillText("Level: " + level, 150, 22);
            ctx.fillText("Time: " + seconds + "s", 470, 22);
			ctx.fillText("Score: " + score, 590, 22);
			ctx.fillStyle = "red";
			ctx.font = "30px Arial";
			ctx.fillText("Dodjet", 310, 25);
			// animate all objects
            animateAngel();
            animateBird();
            animateMeteor();
            animateRocket();
			
			ctx.stroke;
        
		},1000 / speed); // timer initiated at 1000 / 30 and increased in time() method on level up
    }

   gameStart(); // initiate game

}

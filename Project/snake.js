﻿$(document).ready(function(){
	//gameBoard initializations
	$("#gameBoard").attr('width', '900');
	$("#gameBoard").attr('height', '500');
	var canvas = $("#gameBoard")[0]; 							//Retrieve a single element from a jQuery Object
	var canvasContext= canvas.getContext("2d");
	var gameBoardWidth = $("#gameBoard").width();
	var gameBoardHeight = $("#gameBoard").height();

	//game items
	var cellWidth = 20;
	var direction;
	var food;
	var speed; //execute per N ms
	var playerName;
	var score;
	var gameTimer;
	var cellType = {
	  SNAKEHEAD : 0, 
	  SNAKEBODY: 1, 
	  FOOD : 2
	};
	var map = []; //key press array
	
	//represent the snake as an array of cells
	//push() method can append one or more elements to the end of an array
	//pop() method pulls the last element off of the given array and returns it
	//unshift() method can prepend one or more elements to the beginning of an array
	//shift() method pulls the first element off of the given array and returns it
	var snake_array;
	
	//load gameover image ahead of time
  	var gameoverImg = new Image();
	gameoverImg.src = "img/gameover.png";
	
	//Start game
	init();
	
	$("#start").click(function(){
		//Start game again if user clicks to reset the game
		init();
	});
	
	//GAME CONTROLS
	$(document).keydown(function(event){
		var control = event.which;
		
		//Check that keypress does not count going opposite of the current direction
		if (control == "37" && direction != "right") 	//Key = LEFT
			direction = "left";
		else if(control == "39" && direction != "left")	//Key = RIGHT 
			direction = "right";
		else if(control == "38" && direction != "down")	//Key = UP 
			direction = "up";
		else if(control == "40" && direction != "up")	//Key = DOWN
			direction = "down";
			
		// Prevent space and arrow keys from screen scrolling
		if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
			event.preventDefault();
		}
	})		
	
	function resetBackground(){
		canvasContext.fillStyle = "#00CC66";
		canvasContext.fillRect(0, 0, gameBoardWidth, gameBoardHeight);
		canvasContext.strokeStyle = "black";
		canvasContext.strokeRect(0, 0, gameBoardWidth, gameBoardHeight);
	}
	
	function init()
	{
		direction = "right"; //starting direction
		resetBackground();
		spawnFood();
		updateSnakePosition();

		//reset score in case of replay
		score = 0;
		//display score
		document.getElementById("displayScore").innerHTML="Score: " + score;
		//Clear any previous messages to user
		document.getElementById("displaySubmissionResponse").innerHTML="";

		//set initial game speed - 200ms
		speed = 100; 
		
		if(typeof gameTimer != "undefined") 
			clearInterval(gameTimer);
		gameTimer = setInterval(paint, speed);
	}
		
	function updateSnakePosition()
	{
		var snakeLength = 7; //Length of the snake
		snake_array = []; //Empty array to start with
		for(var ii = snakeLength-1; ii>=0; ii--)
		{
			//horizontal snake starting from the middle left
			snake_array.push({x: ii, y:12});
		}
	}
	
	//Randomly generate food location - may overlap with snakebody, but this will not trigger gameover
	function spawnFood()
	{
		food = {
			x: Math.round(Math.random()*(gameBoardWidth-cellWidth)/cellWidth), 
			y: Math.round(Math.random()*(gameBoardHeight-cellWidth)/cellWidth) 
		};		
		
		//everytime food is generated, assume successful meal, increase speed + 10ms
		speed -= 2;
		//need to clear interval and setInterval again for updated refresh rate
		clearInterval(gameTimer);
		gameTimer = setInterval(paint, speed);
	}
	
	//Draw the snake
	function paint()
	{
		//paint background every frame
		canvasContext.fillStyle = "#00CC66";
		canvasContext.fillRect(0, 0, gameBoardWidth, gameBoardHeight);
		canvasContext.strokeStyle = "black";
		canvasContext.strokeRect(0, 0, gameBoardWidth, gameBoardHeight);
		
		//Basic Logic: Pop out the tail and replace it in front of the current head
		//get location of next move
		var nextX = snake_array[0].x;
		var nextY = snake_array[0].y;

		if(direction == "right") 
			nextX++;
		else if(direction == "left") 
			nextX--;
		else if(direction == "up") 
			nextY--;
		else if(direction == "down")
			nextY++;
		
		//IF NEXT MOVE IS A COLLISION
		if(nextX == -1 || 									//Collision with TOP
		   nextX == gameBoardWidth/cellWidth ||             //Collision with BOTTOM 
		   nextY == -1 || 									//Collision with LEFT 
		   nextY == gameBoardHeight/cellWidth || 			//Collision with RIGHT 
		   check_collision(nextX, nextY, snake_array))		//Collision with BODY
		{
			//Stop paint loop
			clearInterval(gameTimer);
			//Display gameover		
			//To composite overlay correctly: refresh background THEN add image over it
			canvasContext.fillRect(0, 0, gameBoardWidth, gameBoardHeight);
			canvasContext.drawImage(gameoverImg, 100, 200);
			
			//check to see if the browser is online
			if (navigator.onLine){
			    playerName = prompt("Submit your name: ", "ANONYMOUS");
    			
				//NOTE: Javascript alone cannot reach a php script. An AJAX request must be made to pass the variable to PHP, evaluate it and return a result.
				$.ajax({
					type: 'POST', 
					url: 'submitNewScore.php',
					data:{newScore: score,
							newName: playerName},
					success: function(data) {
						//display response from server
						$("#displaySubmissionResponse").text("");
						$("#displaySubmissionResponse").append(data);
					},
					error: function(data) {
				        alert("Error: Unsuccessful AJAX response." + data);}				
				});
			}
			else {
				//discard latest attempt.
				alert("Internet Connection was not detected. Unfortunately, your latest attempt will not count. :(");
			}
			
			//Send high score to database
			return;
		}
		
		//If the next HEAD position is food,
		//Create a new head instead of moving the tail
		if(nextX == food.x && nextY == food.y)
		{
			var tail = {x: nextX, y: nextY};
			score+=100;
			//Update score for user to see
			document.getElementById("displayScore").innerHTML="Score: " + score;
			//Create new food
			spawnFood();
		}
		else
		{
			var tail = snake_array.pop(); //pops out the last cell
			tail.x = nextX; tail.y = nextY;
		}
		
		//Update snake
		snake_array.unshift(tail); //puts back the tail as the first cell
		//Paint updated snake
		for(var ii = 0; ii < snake_array.length; ii++)
		{
			var c = snake_array[ii];
			//HEAD
			if (ii == 0) {
				paint_cell(c.x, c.y, cellType.SNAKEHEAD);
			}
			//BODY
			else {
				paint_cell(c.x, c.y, cellType.SNAKEBODY);
			}
		}
		
		//paint the food
		paint_cell(food.x, food.y, cellType.FOOD);
	}
	
	function paint_cell(x, y, type)
	{
		if (type == cellType.SNAKEHEAD) {
	       	canvasContext.fillStyle = "#3333FF"; //DARK BLUE
			canvasContext.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
			canvasContext.strokeStyle = "black";
			canvasContext.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
	    }
	    else if (type == cellType.SNAKEBODY) {
	        canvasContext.fillStyle = "#FF0066"; //HOT PINK
			canvasContext.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
			canvasContext.strokeStyle = "black";
			canvasContext.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
	    }
	    else if (type == cellType.FOOD) {
	        canvasContext.fillStyle = "#FF6600"; //ORANGE
			canvasContext.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
			canvasContext.strokeStyle = "black";
			canvasContext.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
		}
	}
	
	function check_collision(x, y, snake)
	{
		//if provided x,y matches any part of the snake
		for(var ii = 0; ii < snake.length; ii++)
		{
			if(snake[ii].x == x && snake[ii].y == y)
			 return true;
		}
		return false;
	}
})
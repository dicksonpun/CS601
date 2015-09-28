<!DOCTYPE html>
<html>
	<body>
		<?php
		// get the data from POST
		if (is_ajax()) {
			if ((isset($_POST["newName"]) && !empty($_POST["newName"])) &&  //Checks if name exists
			 	(isset($_POST["newScore"]))) { //Checks if score exists
				$newName = $_POST["newName"];
				$newScore = $_POST["newScore"];
				
				submitNewScore($newName, $newScore);
			}
			else{
				//Since this call is not related to score submission, it must be from viewing high scores
				queryHighScores();
			}

		}
		
		function submitNewScore($name, $score)
		{
			//database information
			$servername = "localhost";
			$username = "dickson3_admin";
			$password = "databaseadmin";
			//$username = "dickson3_dbuser";
			//$password = "databaseuser";
			$dbname = "dickson3_highscores";

			// Create connection
			$conn = mysqli_connect($servername, $username, $password, $dbname);
			// Check connection
			if (mysqli_connect_errno()){
				//echo "Failed to connect to MySQL: " . mysqli_connect_error();
			}

			//sanitize against injection
			$name = mysqli_real_escape_string($conn, $name);
			$score = mysqli_real_escape_string($conn, $score);

			//Drop Table command if needed to restart
			/*
			$dropTable = "DROP TABLE scores";
			if ($conn->query($dropTable) === TRUE) {
				echo "Table scores dropped successfully";
			}
			else {
				echo "Error: " . $conn->error;
			}			
			*/
			
			//Try to create table
			//query - results returned
			//exec - no results returned
			/*
			$createTable = "CREATE TABLE scores (
				id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
				playerName VARCHAR(100),
				score INT UNSIGNED)";
			if ($conn->query($createTable) === TRUE) {
				echo "Table scores created successfully";
			} 
			*/
			
			/*
			$insertUser = "INSERT INTO scores (playerName, score) 
				VALUES ('$name', '$score')";
			if ($conn->query($insertUser) === TRUE) {
				echo "User created successfully";
			}
			else {
				echo "Error: " . $insertUser . "<br>" . $conn->error;
			}			
			*/
						
			//OBJECTIVE: QUERY FOR LOWEST SCORE
			//NOTE:      SORTING OCCURS ON SERVER SIDE
			//LOGIC:     IF NEW_SCORE > CURRENT_MINIMUM_HIGH_SCORE
			//             (MUST BE > TO AVOID TIES AT THE BOTTOM, MAKING THE TOP 10 FIRST GETS SENORITY.
			//              THIS MEANS IF NEW_SCORE IS ADDED AND MULTIPLE TIES OCCUR AT THE BOTTOM,
			//              THE MOST "RECENT" TIE (10th) WILL BE DELETED. THIS CAN BE TARGETED WITH A SQL QUERY
			//              BY THE PRIMARY KEY [ID], WHICH IS SET TO AUTO-INCREMENT EVERY INSERT.
			//		       INSERT NEW SCORE AND 
			//             DELETE CURRENT MINIMUM HIGH SCORE AND
			//             NOTIFY USER
			//           ELSE DO NOTHING WITH DATABASE
            //             NOTIFY USER
            $selectData= "SELECT id, score 
					FROM scores 
					ORDER BY score ASC, id DESC LIMIT 1";
			$result = $conn->query($selectData);
			$minimumHighScoreID;
			if ($result->num_rows > 0) {
				//First Return is Table Header, Loop next row to get actual FIRST data entry
				while($row = $result->fetch_assoc()) {
					if($score > $row["score"]){
						$minimumHighScoreID = $row["id"];
					}
				}
			} 
			else {
				//echo "No results found.";
			}
			
			//DELETE MINIMUM HIGH SCORE
			if(!empty($minimumHighScoreID)){
				$deleteMinHighScore= "DELETE FROM scores WHERE id = '$minimumHighScoreID'";
				if ($conn->query($deleteMinHighScore) === TRUE) {
					//echo "Minimum High Score deleted successfully <br> ";
				}
				else {
					//echo "Error: " . $deleteMinHighScore . "<br>" . $conn->error;
				}
			
				//ADD NEW SCORE
				$insertUser = "INSERT INTO scores (playerName, score) 
					VALUES ('$name', '$score')";
				if ($conn->query($insertUser) === TRUE) {
					//echo "User created successfully <br> ";
				}
				else {
					//echo "Error: " . $insertUser . "<br>" . $conn->error;
				}
				//NOTIFY USER
				echo "Congratulations, " . $name . "!";
				echo "<br>"; //newline
				echo "Check out the Hall Of Fame to see where you placed!"; 
			}
			else{
				echo "Sorry, you didn't make the Hall Of Fame this time."; 
			}

			$conn->close();
		}
		
		function queryHighScores()
		{
			//database information
			$servername = "localhost";
			//$username = "dickson3_admin";
			//$password = "databaseadmin";
			$username = "dickson3_dbuser";
			$password = "databaseuser";
			$dbname = "dickson3_highscores";

			// Create connection
			$conn = mysqli_connect($servername, $username, $password, $dbname);
			// Check connection
			if (mysqli_connect_errno()){
				//echo "Failed to connect to MySQL: " . mysqli_connect_error();
			}

			$selectData= "SELECT id, playerName, score 
					FROM scores 
					ORDER BY score DESC, id ASC";
			$result = $conn->query($selectData);

			if ($result->num_rows > 0) {
			     echo "<table id=\"highScoresTable\">".
			     		"<tr class =\"highScoresTableRow\">".
			     			"<th>RANKING</th>".
			     			"<th>PLAYER</th>".
			     			"<th>SCORE</th>".
			     		"</tr>";
			     // output data of each row
			     $ranking = 1;
			     while($row = $result->fetch_assoc()) {
			         echo "<tr class =\"highScoresTableRow\">".
			         		"<td>" . $ranking++ . "</td>".
			         		"<td>" . $row["playerName"]. "</td>".
			         		"<td>" . $row["score"]. "</td>".
			         	"</tr>";
			     }
			     echo "</table>";
			} 
			else {
			     //echo "No results found.";
			}
			$conn->close();
		}
		
		//Function to check if the request is an AJAX request
		function is_ajax() {
			return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
		}
		?>	
	</body>
</html>
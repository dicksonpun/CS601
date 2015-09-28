<!DOCTYPE html>
<html>
	<body>
		<?php
		// get the data from POST
		
		makeMeOprahFor1Sec();
		
		function makeMeOprahFor1Sec()
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
			
			$oprahStatus= "UPDATE scores SET score = score + 1";
			if ($conn->query($oprahStatus) === TRUE) {
				//echo "You successfully tapped into your inner Oprah.";
			}
			else {
				//echo "Error: " . $oprahStatus. "<br>" . $conn->error;
			}
			$conn->close();
		}
		?>	
	</body>
</html>
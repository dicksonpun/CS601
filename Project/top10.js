﻿$(document).ready(function(){
	//NOTE: Load table first
	$.ajax({
		type: 'POST', 
		url: 'submitNewScore.php',
		success: function(data) {
			//display response from server
			$("#highScores").text("");
			$("#highScores").append(data);
			formatTop10();
		},
		error: function(data) {
	        //alert("Error: Unsuccessful AJAX response." + data);
	    }				
	});

	function formatTop10(){
		//Format table and display them (initialized to display none)
		$("#highScoresTable").contents().css( "background-color", "#335CAD" );
		$("#highScoresTable").contents().css( "display", "table-cell" );
		$(".highScoresTableRow").contents().css( "display", "table-cell" );
		//jQuery effects for displaying the table
		$("#highScoresTable").show(0);
		$( ".highScoresTableRow" ).first().show( "slow", function showNext() {
		    $( this ).next( ".highScoresTableRow" ).show( "fast", showNext );
		});
	}			
});
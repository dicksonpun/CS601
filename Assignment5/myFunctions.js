$(document).ready(function(){
	$.fn.moveLeft = function() {
        $(this).children(':first-child').animate(
            {width: "250px"},
            500,
            function (){ 
                $(this).appendTo($(this).parent());
            }
        );
    }
	
	$.fn.moveRight = function() {
        $(this).children(':last-child').animate(
            {width: "250px"},
            500,
            function (){ 
                $(this).prependTo($(this).parent());
            }
        );
    }
    
    $.fn.setBackgroundColor = function(shift) {
    	if (shift == leftShift){
	        if ($(this).children(':nth-child(2)').is("#redranger")){
	        	$(mainBody).css('background-color', '#D42823');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: RED RANGER');      
	        }
	        else if ($(this).children(':nth-child(2)').is("#blueranger")){
	        	$(mainBody).css('background-color', '#005FB2');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: BLUE RANGER');      
			}
	        else if ($(this).children(':nth-child(2)').is("#blackranger")){
	        	$(mainBody).css('background-color', '#000000');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: BLACK RANGER');      
			}
	        else if ($(this).children(':nth-child(2)').is("#yellowranger")){
	        	$(mainBody).css('background-color', '#FFF400');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: YELLOW RANGER');      
			}
	        else if ($(this).children(':nth-child(2)').is("#pinkranger")){
	        	$(mainBody).css('background-color', '#F275AE');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: PINK RANGER');      
			}
	        else if ($(this).children(':nth-child(2)').is("#greenranger")){
	        	$(mainBody).css('background-color', '#3FAE3D');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: GREEN RANGER');      
			}
	        else if ($(this).children(':nth-child(2)').is("#texasranger")){
	        	$(mainBody).css('background-color', '#FFFFFF');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: TEXAS RANGER');      
			};
		}
		else if (shift == rightShift){
	        if ($(this).children(':last-child').is("#redranger")){
	        	$(mainBody).css('background-color', '#D42823');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: RED RANGER');      
	        }
	        else if ($(this).children(':last-child').is("#blueranger")){
	        	$(mainBody).css('background-color', '#005FB2');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: BLUE RANGER');      
			}
	        else if ($(this).children(':last-child').is("#blackranger")){
	        	$(mainBody).css('background-color', '#000000');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: BLACK RANGER');      
			}
	        else if ($(this).children(':last-child').is("#yellowranger")){
	        	$(mainBody).css('background-color', '#FFF400');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: YELLOW RANGER');      
			}
	        else if ($(this).children(':last-child').is("#pinkranger")){
	        	$(mainBody).css('background-color', '#F275AE');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: PINK RANGER');      
			}
	        else if ($(this).children(':last-child').is("#greenranger")){
	        	$(mainBody).css('background-color', '#3FAE3D');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: GREEN RANGER');      
			}
	        else if ($(this).children(':last-child').is("#texasranger")){
	        	$(mainBody).css('background-color', '#FFFFFF');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: TEXAS RANGER');      
			};
		}
		else {
	        if ($(this).children(':first-child').is("#redranger")){
	        	$(mainBody).css('background-color', '#D42823');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: RED RANGER');      
	        }
	        else if ($(this).children(':first-child').is("#blueranger")){
	        	$(mainBody).css('background-color', '#005FB2');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: BLUE RANGER');      
			}
	        else if ($(this).children(':first-child').is("#blackranger")){
	        	$(mainBody).css('background-color', '#000000');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: BLACK RANGER');      
			}
	        else if ($(this).children(':first-child').is("#yellowranger")){
	        	$(mainBody).css('background-color', '#FFF400');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: YELLOW RANGER');      
			}
	        else if ($(this).children(':first-child').is("#pinkranger")){
	        	$(mainBody).css('background-color', '#F275AE');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: PINK RANGER');      
			}
	        else if ($(this).children(':first-child').is("#greenranger")){
	        	$(mainBody).css('background-color', '#3FAE3D');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: GREEN RANGER');      
			}
	        else if ($(this).children(':first-child').is("#texasranger")){
	        	$(mainBody).css('background-color', '#FFFFFF');
	        	$(rangerType).text('TOP ROSTER SPOT IS NOW: TEXAS RANGER');      
			};
		};
    }
});


function getName() {
	    var person;
	    while (isEmpty(person)) {
	        person = prompt("Please enter your name", "");
	        
	    }
	    document.getElementById("displayName").innerHTML =
	        "Hello " + person + "! How are you today?";
	}
	
function getNumber(str) {
    var number;

    while (isNaN(number)||isEmpty(number)) {
         number = prompt("Please enter a valid number(" + str + "):", "");
    }

    return number; 
}

function displaySum(number1,number2) {
    var sum = parseInt(number1,10) + parseInt(number2,10);
    document.getElementById("displayMath").innerHTML =
        "The sum of " + number1 + " + " + number2 + " = " + sum;
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function refresh() {
    location.reload();
}
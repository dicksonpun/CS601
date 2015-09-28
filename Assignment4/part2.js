function validateForm() {
	var nameField = document.forms["myForm"]["Name"].value;
	var nicknameField = document.forms["myForm"]["Nickname"].value;
	var emailField = document.forms["myForm"]["Email"].value;
	    
    if (!is_name(nameField)){
    	alert("Name must minimum length of 2 characters. Try Again.");
    	return false;
    }
    
    if (!is_nickname(nicknameField)){
    	alert("Nickname must be alphanumeric with a minimum length of 3 characters. Try Again.");
    	return false;
    }

    if (!is_email(emailField)){
    	alert("Invalid email format. Try Again.");
    	return false;
    }

	alert("Successful Submit!");
}

function is_name(input){      
	var nameReg = /^.{2,}/;
	return nameReg.test(input); 
} 

function is_nickname(input){      
	var nicknameReg = /^[A-Za-z0-9]{3,}/;
	return nicknameReg.test(input); 
} 

function is_email(input){      
	var emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
	return emailReg.test(input); 
} 
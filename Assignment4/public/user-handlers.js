function register(){
	const newUser = {
		"username": document.getElementById("username").value,
		"password": document.getElementById("password").value,
	}

	let req = new XMLHttpRequest();

	req.onreadystatechange = function() {
		// Successfully registered
		if(this.readyState==4 && this.status==200){
			alert("Registration complete");

			// Redirect window 
			let body = JSON.parse(this.responseText);
			window.location =("http://localhost:3000/users/" + body);

		// User did not provide valid input
		}else if(this.readyState==4 && this.status==404){
			alert(this.responseText); // Displays error message from server
		}
	}
	//Sends POST request to server containing new user
	req.open("POST", "/registration");
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(newUser));
}

function login(){
	const user = {
		"username": document.getElementById("username").value,
		"password": document.getElementById("password").value,
	}

	let req = new XMLHttpRequest();

	req.onreadystatechange = function() {
		// Successfully logged in
		if(this.readyState==4 && this.status==200){
			alert("Login successful");
			let body = JSON.parse(this.responseText);
			window.location =("http://localhost:3000/users/" + body);

		// User did not have valid credentials
		}else if(this.readyState==4 && this.status==401){
			alert("Invalid username or password");
		}
	}
	
	//Sends POST request to server containing user
	req.open("POST", "/login");
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(user));
}
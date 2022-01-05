function submit(){
	const newRestaurant = {
		"name": document.getElementById("name").value,
		"deliveryFee": document.getElementById("delieveryfee").value,
		"minOrder": document.getElementById("minorder").value
	}

	let req = new XMLHttpRequest();

	req.onreadystatechange = function() {
		// Successfully added restaurant
		if(this.readyState==4 && this.status==200){
			alert("Added restaurant");
			
			// Redirect window to new restaurant
			let body = JSON.parse(this.responseText);
			window.location = "/restaurants/" + body.id;

		// User did not provide valid input
		}else if(this.readyState==4 && this.status==400){
			alert("Field is missing or invalid input.");
		}
	}
	
	//Sends POST request to server containing new restaurant data
	req.open("POST", "/restaurants");
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(newRestaurant));
}
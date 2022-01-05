let req = new XMLHttpRequest();
let currRestaurant;

// Gets current restaurant
req.onreadystatechange = function() {
	if(this.readyState==4 && this.status==200){
		currRestaurant = JSON.parse(this.responseText);
	}
}

// Requests for current restaurant object
req.open("GET", "/restaurants/" + document.title);
req.setRequestHeader("Content-Type", "application/json");
req.send();

// If given valid category, saves it locally
function addCategory(){
	let category = document.getElementById("newCategory").value;

	// Validates category is not blank
	if(category.length > 0){
		let categories = Object.keys(currRestaurant.menu);
			
		// Validates there is no duplicate, then add to restaurant
		if(!categories.includes(category)){
			currRestaurant.menu[category] = {};
			alert("Category added")

			// Adds category to options in HTML
			const categoryOption = document.createElement("OPTION")
			categoryOption.value = category;
			categoryOption.innerText = category;
			document.getElementById("newItemCategory").appendChild(categoryOption);

		}else{
			alert("Duplicate Category")
		}
	}else{
		alert("Category is blank")
	}
}

// Checks for changes, updates restaurant and sends to server
function save(){
	selectCategory =  document.getElementById("newItemCategory").value;
	const mod = {
		"name": document.getElementById("newName").value,
		"delivery_fee": document.getElementById("newFee").value,
		"min_order": document.getElementById("newMinOrder").value
	}
	const newItem = {
			"name": document.getElementById("newItemName").value,
			"description": document.getElementById("newItemDescription").value,
			"price": document.getElementById("newItemPrice").value
	}

	// Check if the name has been changed
	if(mod.name.length > 0){
		currRestaurant.name = mod.name;
	}

	// Check if min order changed
	if(mod.min_order.length > 0){
		currRestaurant.min_order = mod.min_order;
	}

	// Check if the delivery fee changed
	if(mod.delivery_fee.length > 0){
		currRestaurant.delivery_fee = mod.delivery_fee;
	}

	// Validates that name and price field of item are filled out
	if((newItem.name.length != 0) && (newItem.price.length != 0) && (selectCategory.length != 0)){
		// Gets new id for item
		let newId;
		let categories = Object.keys(currRestaurant.menu);
		newId = 0;
		
		// Find highest id
		for(i = 0; i < categories.length; i++){
			let idList = Object.keys(currRestaurant.menu[categories[i]]);
			for(n = 0; n < idList.length; n++ )
				if(parseInt(idList[n]) >= newId){
					newId = (parseInt(idList[n])) + 1;
				}
		}
		newId = String(newId);
		currRestaurant.menu[selectCategory][newId] = newItem;
	}
	
	let req = new XMLHttpRequest();

	req.onreadystatechange = function() {
		// Successfully added restaurant
		if(this.readyState==4 && this.status==200){
			alert("Saved changes");
			window.location = "/restaurants/" + document.title;
		}
	}
	// Sends updated restaurant to server
	req.open("PUT", "/restaurants/"+ document.title);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(currRestaurant));
}
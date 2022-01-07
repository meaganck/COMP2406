let restaurants = [];
let chosenItems =[];

let totalTax = 0;
let subtotal = 0;
let total = 0;

const TAX = 0.1;

// To store chosen items
function Item(name, price){
	this.name = name;
	this.quantity = 1; //default
	this.unitPrice = price;
}

// get restaurants from server
let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(){
	if(xhttp.readyState === 4 && xhttp.status === 200){
		const responseObject = JSON.parse(xhttp.response);
		for(i = 0; i < responseObject.length; i++){
			restaurants.push(responseObject[i]);
		}
	}
}

xhttp.open("GET", "/restaurants", true);
xhttp.send()

function init(){
	let nodeMin = 1; 
	let nodeMax = restaurants.length + 1; 
	// Fills dropdown with restaurants
	for( i = 0; i < restaurants.length ; i++){
		let a = document.createElement("A");
		a.innerHTML = restaurants[i].name;
		a.id = i;
		document.getElementById("myDropdown").appendChild(a);
	}

	// For each resuarant:
	for(i = nodeMin; i < nodeMax; i++){
		// When a restaurant is clicked, displays restuarant's info
		document.getElementById("myDropdown").childNodes[i].onclick = function(event){
			let index = event.target.id;
			currRestaurant = restaurants[index]; // Restuarant that has beeen clicked
			// Shows an alert if they choose a different restaurant and have at least one item in their cart
			if(subtotal > 0){
				let response = confirm("Are you sure you want to clear your order?");
				if(response == false){
					exit; // Don't change order
				}
			}
			// Display title, min order, delivery fee
			document.getElementById("title").innerHTML = currRestaurant.name;
			document.getElementById("minOrder").innerHTML = "Minimum order: $" + currRestaurant.min_order;
			document.getElementById("deliveryFee").innerHTML = "Delievery Fee: $" + currRestaurant.delivery_fee;
			// Clear and reset variables
			clearAll();
			// Adds content to each column for chosen restaurant
			displayColumn1(currRestaurant);
			displayColumn2(currRestaurant);
			displayColumn3(currRestaurant);
		}
	}
}


// Displays the categories
function displayColumn1(restaurant) {
	// Goes through each category in the restaurant
	for(key in restaurant.menu){
		// Gets title of category and displays it
		let a = document.createElement("A");
		a.innerHTML = key + "<br>" + "</br>";
		a.href = "#" + key;
		document.getElementById("categories").appendChild(a);	
	}
}


// Displays menu
function displayColumn2(restaurant){
	let h;
	let dt;
	let dd;

	// Goes through each category in the restaurant
	for(let category in restaurant.menu){
		// Creates heading for each category
		h = document.createElement("H2");
		h.innerHTML = category;
		h.id = category;
		document.getElementById("menu").appendChild(h);

		// Gets length of keys (category), and the values for the current key (category)
		let length = Object.keys(restaurant.menu[category]).length;
		let values = Object.values(restaurant.menu[category])

		// Goes through the items in a category
		for(i = 0; i < length; i++){
			// Name of item and the price
			dt = document.createElement("DT");
			dt.innerHTML = values[i].name + "	($" + values[i].price.toFixed(2) + ")" ;

			// Description of item
			dd = document.createElement("DD");
			dd.innerHTML = values[i].description;
			
			// Add 'button'
			let add;
			add = document.createElement("INPUT");
			add.type = "image";
			add.src = "add.png";
			add.style.float = "right";
			add.style.width = "10%";
			add.id = values[i].name + "Add"; // 'Add' to show it comes from the menu

			// Add the elements to the menu
			document.getElementById("menu").appendChild(add);
			document.getElementById("menu").appendChild(dt);
			document.getElementById("menu").appendChild(dd);

			// Add 'button' event handler
			document.getElementById(add.id).onclick = function(event){
				// Gets name of the item that has been clicked
				let itemName = event.target.id.slice(0,-3); // Gets rid of the 'Add' at the end of the id

				// Gets the price of the item, adds the item, then updates the view
				let price = findPrice(restaurant, itemName);
				addItem(itemName, price); 
				displayColumn3(restaurant);
			}
		}
	}
}


// Displays: subtotal, tax, delievery fee, total and $ more until reach min order or a submit button
function displayColumn3(restaurant){
	// Clear Column 3, and update order
	clear("cart");
	clear("summary");
	updateOrder(restaurant); 
	displayCart(restaurant); 

	// Displays subtotal, tax, delievery fee, and total
	let pSubtotal = document.createElement("P");
	pSubtotal.innerHTML = "Subtotal: $" + subtotal.toFixed(2);

	let pTax = document.createElement("P");
	pTax.innerHTML = "Tax: $" + totalTax.toFixed(2);

	let pFee = document.createElement("P");
	pFee.innerHTML = "Delivery Fee: $" + restaurant.delivery_fee.toFixed(2);

	let pTotal = document.createElement("P");
	pTotal.innerHTML = "Total: $" + total.toFixed(2);

	document.getElementById("summary").appendChild(pSubtotal);
	document.getElementById("summary").appendChild(pTax);
	document.getElementById("summary").appendChild(pFee);
	document.getElementById("summary").appendChild(pTotal);

	// Validates if user reached the min order
	if(subtotal.toFixed(2) < restaurant.min_order){
		// If they didn't, then tell them how much they need
		let moneyNeeded = restaurant.min_order -subtotal;
		let p = document.createElement("P");
		p.innerHTML = "* You must add $" + moneyNeeded.toFixed(2) + " more to your order before submitting."
		document.getElementById("summary").appendChild(p);
	}else{
		// Otherwise, create a Submit button
		let button = document.createElement("BUTTON");
		button.innerText = "Submit";
		button.id = "submitButton";
		document.getElementById("summary").appendChild(button);
		document.getElementById(button.id).onclick = submitOrder;
	}
}

// Clears everything from given id (for a div)
function clear(element){
	let length = document.getElementById(element).childNodes.length;
	// Deletes the child nodes from the given div id
	for(i = length -1; i >= 1 ; i--){
		document.getElementById(element).childNodes[i].remove();
	}
}

// Clears page, except for the select a menu button
function clearAll(){
	// Clear and reset variables
	clear("categories");
	clear("menu");
	clear("summary");
	clear("cart");

	chosenItems = [];
	totalTax = 0;
	subtotal = 0;
	total = 0;
}

// Displays item in cart
function displayCart(restaurant){
	// Displays each item that was chosen
	for(i = 0; i < chosenItems.length; i++){
		// Displays 'nameOfItem X quantity ($ price)'
		let item = document.createElement("P");
		item.innerHTML = chosenItems[i].name + " X " + chosenItems[i].quantity + " ($" + (chosenItems[i].unitPrice * chosenItems[i].quantity).toFixed(2) + ")";
		
		// Remove 'button'
		let remove = document.createElement("INPUT");
		remove.type = "image";
		remove.src = "remove.png";
		remove.style.float = "right";
		remove.style.width = "10%";
		remove.id = chosenItems[i].name;
		document.getElementById("cart").appendChild(remove);
		document.getElementById("cart").appendChild(item);

		// Remove 'button' event handler
		document.getElementById(remove.id).onclick = function(event){
			// Gets name of item
			let itemName = event.target.id;
			// Removes item from list, and updates view
			removeItem(itemName);
			displayColumn3(restaurant);
		}
	}
}


// Recalculates subtotal, tax, and total
function updateOrder(restaurant){
	// Reset variables
	subtotal = 0;
	totalTax = 0;
	// Calculates subtotal
	for(i = 0; i < chosenItems.length; i++){
		subtotal += chosenItems[i].quantity * chosenItems[i].unitPrice;
	}
	// Calculates tax and total
	totalTax = subtotal * TAX;
	total = subtotal + totalTax + restaurant.delivery_fee;
}


// Finds price for given item
function findPrice(restaurant, itemName){
	// Checks each category in restaurant
	for(let category in restaurant.menu){
		// Gets number of items in current category, and the values of each item
		let length = Object.keys(restaurant.menu[category]).length;
		let values = Object.values(restaurant.menu[category])
		// Goes through all the items
		for(i = 0; i < length; i++){
			// Found a matching name, and returns price
			if(itemName === values[i].name){
				return values[i].price;
			}
		}
	}
	return 0; // Shouldn't happen, but just in case
}


// If there is a duplicate, adds one to the quantity,
// else adds the item to the array
function addItem(newName, price){	
	for(i = 0; i < chosenItems.length; i++){
		// Found matching name
		if(newName === chosenItems[i].name){
			chosenItems[i].quantity += 1;
			return;
		}
	}
	chosenItems.push(new Item(newName, price));
}


// Removes given item from list
function removeItem(itemName){
	for(i = 0; i < chosenItems.length; i++){
		// Found matching name
		if(itemName === chosenItems[i].name){
			// Updates quantity of item
			if(chosenItems[i].quantity === 1){
				chosenItems.splice(i, 1);
			}else{
				chosenItems[i].quantity -= 1;
			}
		}
	}
}

// Sends order to server
function submitOrder(){
	//console.log("subiting to restaurant: " + currRestaurant.name);
	let itemsToSend = {
		"name": currRestaurant.name,
		"order": chosenItems,
		"total": total,
	}
	
	let xhttp = new XMLHttpRequest();

	// When server sends ok (200), alerts user and resets page
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState === 4 && xhttp.status === 200){
			alert("Order placed!");
			resetPage();
		}
	}
	// Sends order to server
	xhttp.open("POST", "/newOrder", true);
	xhttp.send(JSON.stringify(itemsToSend))
}

// When user clicks on button, hides and shows button
function displayDropdown(){
	document.getElementById("myDropdown").classList.toggle("show");
}

// Sets page to orginal state
// Called when user submits order
function resetPage(){
	clearAll();
	document.getElementById("title").innerHTML = " ";
	let length = document.getElementById("orderInfo").childNodes.length;

	// Deletes the child nodes from the given div id
	for(i = length -1; i >= 1 ; i--){
		document.getElementById("orderInfo").childNodes[i].innerHTML = " ";
	}
}

// Closes window when user clicks outside box
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
		let dropdowns = document.getElementsByClassName("dropdown-content");
		let i;
		for (i = 0; i < dropdowns.length; i++) {
		  let openDropdown = dropdowns[i];
		  if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
		  }
		}
	  }
}

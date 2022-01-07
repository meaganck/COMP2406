let restaurant_A = {
	name: "Aragorn's Orc BBQ", //The name of the restaurant
	min_order: 20, //The minimum order amount required to place an order
	delivery_charge: 5, //The delivery charge for this restaurant
	//The menu
	menu: {
		//First category
		"Appetizers": {
			//First item of this category
			0: {
				name: "Orc feet",
				description: "Seasoned and grilled over an open flame.", //
				price: 5.50
			},
			1: {
				name: "Pickled Orc fingers",
				description: "Served with warm bread, 5 per order.",
				price: 4.00
			},
			2: { //Thank you Kiratchii
				name: "Sauron's Lava Soup",
				description: "It's just really spicy water.",
				price: 7.50
			},
			3: {
				name: "Eowyn's (In)Famous Stew",
				description: "Bet you can't eat it all.",
				price: 0.50
			},
			4: {
				name: "The 9 rings of men.",
				description: "The finest of onion rings served with 9 different dipping sauces.",
				price: 14.50
			}
		},
		"Combos": {
			5: {
				name: "Buying the Farm",
				description: "An arm and a leg, a side of cheek meat, and a buttered biscuit.",
				price: 15.99
			},
			6: {
				name: "The Black Gate Box",
				description: "Lots of unidentified pieces. Serves 50.",
				price: 65.00
			},
			7: {//Thanks to M_Sabeyon
				name: "Mount Doom Roast Special with Side of Precious Onion Rings.",
				description: "Smeagol's favorite.",
				price: 15.75
			},
			8: { //Thanks Shar[TA]
				name: "Morgoth's Scorched Burgers with Chips",
				description: "Blackened beyond recognition.",
				price: 13.33
				
			},
			10: {
				name: "Slab of Lurtz Meat with Greens.",
				description: "Get it while supplies last.",
				price: 17.50
			},
			11: {
				name: "Rangers Field Feast.",
				description: "Is it chicken? Is it rabbit? Or...",
				price: 5.99
			}
		},
		"Drinks": {
			12: {
				name: "Orc's Blood Mead",
				description: "It's actually raspberries - Orc's blood would be gross.",
				price: 5.99
			},
			13: {
				name: "Gondorian Grenache",
				description: "A fine rose wine.",
				price: 7.99
			},
			14: {
				name: "Mordor Mourvedre",
				description: "A less-fine rose wine.",
				price: 5.99
			}
		}	
	}
};

let restaurant_B = {
	name: "Lembas by Legolas",
	min_order: 15,
	delivery_charge: 3.99,
	menu: {
		"Lembas": {
			0: {
				name: "Single",
				description: "One piece of lembas.",
				price: 3
			},
			1: {
				name: "Double",
				description: "Two pieces of lembas.",
				price: 5.50
			},
			2: { 
				name: "Triple",
				description: "Three pieces, which should be more than enough.",
				price: 8.00
			}
		},
		"Combos": {
			3: {
				name: "Second Breakfast",
				description: "Two pieces of lembas with honey.",
				price: 7.50
			},
			4: {
				name: "There and Back Again",
				description: "All you need for a long journey - 6 pieces of lembas, salted pork, and a flagon of wine.",
				price: 25.99
			},
			5: {
				name: "Best Friends Forever",
				description: "Lembas and a heavy stout.",
				price: 6.60
			}
		}
	}
};

let restaurant_C = {
	name: "Frodo's Flapjacks",
	min_order: 35,
	delivery_charge: 6,
	menu: {
		"Breakfast": {
			0: {
				name: "Hobbit Hash",
				description: "Five flapjacks, potatoes, leeks, garlic, cheese.",
				price: 9.00
			},
			1: {
				name: "The Full Flapjack Breakfast",
				description: "Eight flapjacks, two sausages, 3 eggs, 4 slices of bacon, beans, and a coffee.",
				price: 14.00
			},
			2: { 
				name: "Southfarthing Slammer",
				description: "15 flapjacks and 2 pints of syrup.",
				price: 12.00
			}
			
		},
		"Second Breakfast": {
			3: {
				name: "Beorning Breakfast",
				description: "6 flapjacks smothers in honey.",
				price: 7.50
			},
			4: {
				name: "Shire Strawberry Special",
				description: "6 flapjacks and a hearty serving of strawberry jam.",
				price: 8
			},
			5: {
				name: "Buckland Blackberry Breakfast",
				description: "6 flapjacks covered in fresh blackberries. Served with a large side of sausage.",
				price: 14.99
			}
		},
		"Elevenses": {
			6: {
				name: "Lembas",
				description: "Three pieces of traditional Elvish Waybread",
				price: 7.70
			},
			7: {
				name: "Muffins of the Marish",
				description: "A variety of 8 different types of muffins, served with tea.",
				price: 9.00
			},
			8: {
				name: "Hasty Hobbit Hash",
				description: "Potatoes with onions and cheese. Served with coffee.",
				price: 5.00
			}
		},
		"Luncheon": {
			9: {
				name: "Shepherd's Pie",
				description: "A classic. Includes 3 pies.",
				price: 15.99
			},
			10: {
				name: "Roast Pork",
				description: "An entire pig slow-roasted over a fire.",
				price: 27.99
			},
			11: {
				name: "Fish and Chips",
				description: "Fish - fried. Chips - nice and crispy.",
				price: 5.99
			}
		},
		"Afternoon Tea": {
			12: {
				name: "Tea",
				description: "Served with sugar and cream.",
				price: 3
			},
			13: {
				name: "Coffee",
				description: "Served with sugar and cream.",
				price: 3.50
			},
			14: {
				name: "Cookies and Cream",
				description: "A dozen cookies served with a vat of cream.",
				price: 15.99
			},
			15: {
				name: "Mixed Berry Pie",
				description: "Fresh baked daily.",
				price: 7.00
			}
		},
		"Dinner": {
			16: {
				name: "Po-ta-to Platter",
				description: "Boiled. Mashed. Stuck in a stew.",
				price: 6
			},
			17: {
				name: "Bree and Apple",
				description: "One wheel of brie with slices of apple.",
				price: 7.99
			},
			18: {
				name: "Maggot's Mushroom Mashup",
				description: "It sounds disgusting, but its pretty good",
				price: 6.50
			},
			19: {
				name: "Fresh Baked Bread",
				description: "A whole loaf of the finest bread the Shire has to offer.",
				price: 6
			},
			20: {
				name: "Pint of Ale",
				description: "Yes, it comes in pints.",
				price: 5
			}
		},
		"Supper": {
			21: {
				name: "Sausage Sandwich",
				description: "Six whole sausages served on a loaf of bread. Covered in onions, mushrooms and gravy.",
				price: 15.99
			},
			22: {
				name: "Shire Supper",
				description: "End the day as you started it, with a dozen flapjacks, 5 eggs, 3 sausages, 7 pieces of bacon, and a pint of ale.",
				price: 37.99
			}
		}
	}
};

let restaurants = [restaurant_A, restaurant_B, restaurant_C];
let chosenItems =[];
let nodeMin = 1; // Child nodes of restauarnts 
let nodeMax = restaurants.length + 1; // Maximun child nodes for restaurant
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


function init(){
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
			document.getElementById("orderInfo").classList.add("jumbotron");
			document.getElementById("minOrder").innerHTML = "Minimum order: $" + currRestaurant.min_order;
			document.getElementById("deliveryFee").innerHTML = "Delievery Fee: $" + currRestaurant.delivery_charge;
			
			// Clear and reset variables
			clear("categories");
			clear("menu");
			clear("summary");
			clear("cart");

			chosenItems = [];
			totalTax = 0;
			subtotal = 0;
			total = 0;
			
			// Adds content to each column for chosen restaurant
			displayColumn1(currRestaurant);
			displayColumn2(currRestaurant);
			displayColumn3(currRestaurant);
		}
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

	displayCart(restaurant); // Displays item in cart

	// Displays subtotal, tax, delievery fee, and total
	let pSubtotal = document.createElement("P");
	pSubtotal.innerHTML = "Subtotal: $" + subtotal.toFixed(2);

	let pTax = document.createElement("P");
	pTax.innerHTML = "Tax: $" + totalTax.toFixed(2);

	let pFee = document.createElement("P");
	pFee.innerHTML = "Delivery Fee: $" + restaurant.delivery_charge.toFixed(2);

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
	}
}


// Displays item in cart
function displayCart(restaurant){

	for(i = 0; i < chosenItems.length; i++){
		// Displays 'nameOfItem X quantity ($ price)'
		let item = document.createElement("P");
		item.innerHTML = chosenItems[i].name + " X " + chosenItems[i].quantity + " ($" + (chosenItems[i].unitPrice * chosenItems[i].quantity).toFixed(2) + ")";
		
		// Remove 'button'
		let remove;
		remove = document.createElement("INPUT");
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
	total = subtotal + totalTax + restaurant.delivery_charge;
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
			// If the quantity is 1, remove from the list
			if(chosenItems[i].quantity === 1){
				chosenItems.splice(i, 1);
			}else{
				// Otherwise, remove 1 from the quantity
				chosenItems[i].quantity -= 1;
			}
		}
	}
}


// When user clicks on button, hides and shows button
function displayDropdown(){
	document.getElementById("myDropdown").classList.toggle("show");
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

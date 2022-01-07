const http = require('http');
const fs = require("fs");
var path = require('path');
const pug = require("pug");

const restaurants = [];
const stats = [];

function RestuarantStat(name){
	this.name = name;
	this.totalOrders = 0; 
	this.avgTotal = 0;
	this.orderTotals = [];
	this.items = [];
	this.mostPopularItem = null;
}

function Item(name, quantity){
	this.name = name;
	this.quantity = quantity; 
}

//  Gets restaurant data 
var files = fs.readdirSync("./restaurants");
files.forEach( function (file) {
    // Checks for JSON files in folder
    if (path.extname(file).toUpperCase() === '.JSON'){
        // Gets path name to file
        let pathName = "./restaurants/" + path.basename(file);
        // Gets data from file
        let data = fs.readFileSync(pathName);
        const requestObject = JSON.parse(data);
        // Adds data from JSON file to restaurants and stats
        restaurants.push(requestObject);
		stats.push(new RestuarantStat(requestObject.name));
    }
});


//Creates a server
const server = http.createServer(function (request, response) {
    console.log(request.url);
    if(request.method === "GET"){
        // Home page
		if(request.url === "/" || request.url === "/index.html"){
            let data = pug.renderFile("views/pages/home.pug");
            response.statusCode = 200;
			response.end(data);
			return;

        // Order Form
        }else if(request.url === "/orderForm"){
            fs.readFile("orderform.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.write(data);
				response.end();
                return;
			});

		// Stats page
		}else if(request.url === "/stats"){
			let data = pug.renderFile("views/pages/statistics.pug", { 
				stats: stats, 		
			});
			response.statusCode = 200;
			response.end(data);
			return;

		// JavaScript file
        }else if(request.url === "/client.js"){
			fs.readFile("client.js", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "application/javascript");
				response.write(data);
				response.end();
                return;
			});

		// Returns restaurant data
		}else if(request.url === "/restaurants"){
            response.write(JSON.stringify(restaurants));
			response.end();
            return;

		// CSS file
        }else if(request.url === "/style.css"){
            fs.readFile("views/style.css", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/css");
				response.write(data);
				response.end();
                return;
            });

		// Sends images
        }else if(request.url === "/add.png"){
            fs.readFile("views/add.png", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "image/png");
				response.write(data);
				response.end();
                return;
            });
        }else if(request.url === "/remove.png"){
            fs.readFile("views/remove.png", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "image/png");
				response.write(data);
				response.end();
                return;
            });
		}else if(request.url === "/shire.jpg"){
			fs.readFile("views/shire.jpg", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "image/jpg");
				response.write(data);
				response.end();
                return;
            });
		
        }else{
			response.statusCode = 404;
			response.write("Unknwn resource.");
			response.end();
		}
    }else if(request.method === "POST"){
		// Accepts new order and updates statistics
		if(request.url === "/newOrder"){ 
			let body = "";

			request.on("data", (data) => {
				body += data;
			});

			request.on("end", () => {
				const requestObject = JSON.parse(body);
				let restaurantName = requestObject.name;
				let newOrder = requestObject.order;
				let total = requestObject.total;
				updateStats(restaurantName, newOrder, total);

				response.statusCode = 200;
				response.end();
			});
		}else{
			response.statusCode = 404;
			response.write("Unknwn resource.");
			response.end();
		}
	}
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

// Updates stats for given restaurant
function updateStats(restaurantName, newOrder, total){
	let currRestaurant;

	// Finds restaurant in stats
	for(i = 0; i < stats.length; i++){
		currRestaurant = stats[i];
		// Finds key for restaurant
		if(currRestaurant.name === restaurantName){
			// Adds data to restaurant
			//console.log("found restaurant: ", currRestaurant.name);
			currRestaurant.totalOrders += 1;

			// determine if item already exists in order
			let found = false;

			for(m = 0; m < newOrder.length; m++){
				// check if item is already in list
				for(n = 0; (n < currRestaurant.items.length) && (!found); n++){
					// Updates quantity
					if(currRestaurant.items[n] === newOrder[m].name){
						currRestaurant.items[n].quantity += newOrder[m].quantity;
						found = true;
					}
				}
				// If not found, then add item to items
				if(!found){
					currRestaurant.items.push(new Item(newOrder[m].name, newOrder[m].quantity));
				}
			}
			// Updates order totals, avergae total , and most popular item
			currRestaurant.orderTotals.push(total);
			currRestaurant.avgTotal = avgTotalOrder(currRestaurant).toFixed(2);
			currRestaurant.mostPopularItem = mostPopular(currRestaurant);
			return;
		}
	}
}

// Finds and returns average of all orders
function avgTotalOrder(currRestaurant){
	let sum = 0;
	for(i = 0; i < currRestaurant.orderTotals.length; i++){
		sum += currRestaurant.orderTotals[i];
	}
	return (sum / currRestaurant.totalOrders);
}

// Finds and returns most popular item
function mostPopular(currRestaurant){
	// Sorts list in descending order so first item has the highest quantity
	currRestaurant.items.sort((a, b) => b.quantity - a.quantity); 
	return currRestaurant.items[0];
}
const express = require('express');
const fs = require("fs");
var path = require('path');
const pug = require("pug");
let app = express();
let id = 0;
const restaurants = [];

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
        // Finds largest id
        if(id < requestObject.id){
            id = requestObject.id;
        }
        // Adds data from JSON file to restaurants 
        restaurants.push(requestObject);
    }
});

// Ensure ids are in order
restaurants.sort((a, b) => a.id - b.id)
id++;

app.use(express.static("public"));
app.use(express.json());

// Generates HTML of home page
app.get("/", function (req, res){
    res.set("Content-Type", "text/html")
	res.send(pug.renderFile("./views/pages/home.pug"));
})


// Gets image 
app.get("/shire.jpg", function (req, res){
	fs.readFile("views/shire.jpg", function(err, data){
        res.statusCode = 200;
        res.setHeader("Content-Type", "image/jpg").write(data);
        res.end();
    });
})


// Generates HTML to display all restaurants
app.get("/restaurants", function (req, res){
    res.set("Content-Type", "text/html");
	res.send(
		pug.renderFile("./views/pages/restaurants.pug", {restaurants: restaurants,})
	);
})


// Generates HTML for addRestaurant page
app.get("/addrestaurant", function (req, res){
    res.set("Content-Type", "text/html")
	res.send(pug.renderFile("./views/pages/addRestaurant.pug"));
})


// Sends JSON or HTML of restID
app.get("/restaurants/:restID", function(req, res){
    const reqID = req.params.restID;

    // Check if id exists
    if(reqID >= 0 && reqID < id){
        // Find target in database
        // Since restaurants is sorted in order of id, 
        // can use the id as the index
        const targetRestaurant = restaurants[reqID];

        // Check if request is for JSON
        if(req.headers['content-type'] == "application/json"){
            res.set("Content-Type", "application/json");
            res.statusCode = 200;
            res.send(JSON.stringify(targetRestaurant));
            
        // Sends HTML for restID
        }else{
            res.set("Content-Type", "text/html");
            res.send(pug.renderFile("./views/pages/restaurant.pug", {restaurant: targetRestaurant,}));
        }
    }else{
        res.status(404).send("Invalid id");
    }
})


// Adds new restaurant
app.post("/restaurants", function (req, res){
    req.body.deliveryFee.trim;
    req.body.minOrder.trim;
    
    // Check for valid input
    if((req.body.name.length > 0) &&
        (isNaN(req.body.deliveryFee) == false) && (req.body.deliveryFee.length > 0) &&
        (isNaN(req.body.minOrder) == false) && (req.body.minOrder.length > 0)){

            // Check for valid numbers
            newDeliveryFee = parseFloat(req.body.deliveryFee);
            newMinOrder = parseFloat(req.body.minOrder);
            if((newDeliveryFee >= 0) &&(newMinOrder >= 0)){

                // Adds restaurant and sends it back
                const newRestaurant = {
                    "id": id,
                    "name": req.body.name,
                    "delivery_fee": newDeliveryFee,
                    "min_order": newMinOrder,
                    "menu":{}
                }
                restaurants.push(newRestaurant);
                id++;
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.send(JSON.stringify(newRestaurant));

            }else{
                res.status(400).send("Delivery Fee and Min Order must be greater than 0");
            }
    }else{
        res.status(400).send("Missing Input");
    }
})


// Updates given restaurant data
app.put("/restaurants/:restID", function(req, res){
    const reqID = req.params.restID;
    // Validates id exists
    if(reqID >= 0 && reqID < id){
        // Update restaurant
        restaurants[reqID] = req.body;
        res.sendStatus(200);
    }else{
        res.status(404).send("Invalid Restaurant ID");
    }
})

app.listen(3000);
console.log("Server listening at http://localhost:3000");
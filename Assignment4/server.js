const express = require('express');
const session = require('express-session');
let app = express();
let mongo = require('mongodb');
const mc = require("mongodb").MongoClient;

let db;

app.use(express.urlencoded({extended: true})); 
app.set("view engine", "pug");
app.use(session({ 
    secret: 'some secret here',
    resave: true,
    saveUninitialized: false,
}))
app.use(express.static("public"));
app.use(express.json());

// Home page
app.get("/", function (req, res){
    res.set("Content-Type", "text/html")
	res.status(200).render("index", {loggedIn: req.session.loggedIn, ID: req.session.ID});
})

// Registration page
app.get("/registration", function (req, res){
    res.set("Content-Type", "text/html")
	res.status(200).render("registration", {loggedIn: req.session.loggedIn, ID: req.session.ID});
})

// Login page
app.get("/login", function (req, res){
    res.set("Content-Type", "text/html")
	res.status(200).render("login", {loggedIn: req.session.loggedIn,  ID: req.session.ID});
})


// User directory
app.get("/users", function(req, res){
    const name = req.query.name;

    // Default: shows all users that are not private
    if(name === undefined){
        db.collection("users").find({"privacy": false})
            .toArray(function(err, results){
                if(err){
                    res.status(500).send("Error reading database.");
                    return;
                }
                res.status(200).render("users", {
                    users: results, 
                    loggedIn: req.session.loggedIn,  
                    ID: req.session.ID
                });
        })

    // Shows case-insensitive matching users with non private profies
    }else{
        db.collection("users").find({"privacy": false, "username":{$regex: new RegExp(name , "i")}})
        .toArray(function(err, results){
            if(err){
                res.status(500).send("Error reading database.");
                return;
            }
            res.status(200).render("users", {
                users: results, 
                loggedIn: req.session.loggedIn,  
                ID: req.session.ID
            });
        })
    }
})

// User profile
app.get("/users/:userID", function(req, res){
    let oid;
    try{
		oid = new mongo.ObjectID(req.params.userID);
	}catch{
		res.status(404).send("Unknown ID");
		return;
	}
    
    // Finds profile of user
    db.collection("users").findOne({"_id": oid}, function(err, result){
        if(err){
            res.status(500).send("Error reading database.");
            return;
        }
        if(!result){
			res.status(404).send("Cannot find");
			return;
		}

        // User looking at their own profile, let them change their privacy
        if(result.username === req.session.username){
            res.status(200).render("userProfile", {
                u: result, 
                loggedIn: req.session.loggedIn,
                ID: req.session.ID,
                currUser: true
            });
        }else{
            // Profile is private
            if(result.privacy === true){
                res.status(403).send("Cannot access private profile.");
            }
            // Profile does not belong to user, but it is public, cannot change privacy
            res.status(200).render("userProfile", {
                u: result, 
                loggedIn: req.session.loggedIn,  
                ID: req.session.ID
            });
        }
    })
    
})

// Logout page
app.get("/logout", function (req, res){
    // Validate they are logged in, so they can be logged out
    if(req.session.loggedIn){
		req.session.loggedIn = false;
        req.session.username = undefined;
        req.session.ID = undefined;
		res.status(200).render("login", {loggedIn: req.session.loggedIn});

    // User tried to access this page even though they are not logged in
	}else{
		res.status(400).send("You cannot log out because you aren't logged in.");
	}
})

// Order form page
app.get("/orderform", function(req, res){
    // Validate user is logged in
    if(!req.session.loggedIn){
        res.status(403).send("You must be logged in to order.");
        return;
    }
    res.status(200).render("orderform", {
        loggedIn: req.session.loggedIn,  
        ID: req.session.ID
    });
})

// Order summary page
app.get("/orders/:orderID", function(req, res){
    orderID = req.params.orderID;

    // No ID specified
    if(orderID == undefined){
        res.status(404).send("Page does not exist.");
        return;
    }

    // Gets oid of order ID
    try{
		oid = new mongo.ObjectID(req.params.orderID);
	}catch{
		res.status(404).send("Unknown ID");
		return;
	}

    // Find order
    db.collection("orders").findOne({"_id": oid}, function(err, orderResult){
        if(err){
            res.status(500).send("Error reading database.");
            return;
        }
        if(!orderResult){
            res.status(404).send("Could not find order.");
            return;
        }

        // Find user associated with the order
        db.collection("users").findOne({"_id": orderResult.userID}, function(err, userResult){
            if(err){
                res.status(500).send("Error reading database.");
                return;
            }
            
            // Shouldn't happen, but just in case
            if(!userResult){
                res.status(404).send("User does not exist.")
                return;
            }

            // Check if the user is private or it is the requesting client
            if((userResult.privacy === false) || (req.session.ID == userResult._id)){
                res.status(200).render("order", {
                    user: userResult.username, 
                    order: orderResult,
                    loggedIn: req.session.loggedIn,  
                    ID: req.session.ID
                });

            // Unauthourized to look at order
            }else{
                res.status(403).send("Cannot access order of a private profile.");
            }
        })
    })
})

// Adds new user to database
app.post("/registration", function (req, res){
    let newUserName = req.body.username;
    let newPassword = req.body.password;

    // Validate they gave a valid username
    if(newUserName.trim().length == 0){
        res.status(404).send("Username must be at least 1 character.");
        return;
    }

    // Check if username and password fields are filled
    if((newUserName.length > 0) && (newPassword.length > 0)){
        // Check for duplicate usernames
        db.collection("users").findOne({"username": newUserName}, function(err, result){
            if(err){
                res.status(500).send("Error reading database.");
                return;
            }

            // No duplicate found
            if(!result){
                let newId;
               
                let u = {};
                u.username = newUserName;
                u.password = newPassword;
                u.privacy = false;
                
                // Add to database
                db.collection("users").insertOne(u, function(err, result){
                    if(err){
                        res.status(500).send("Error saving to database.");
                        return;
                    }

                    // Updates the session
                    newId = result.insertedId;
                    req.session.loggedIn = true;
                    req.session.username = u.username;
                    req.session.ID = newId;

                    // Allows the page to be redirected to their profile
                    res.status(200).send(newId); 
                });
                
            // Duplicate found
            }else{
                res.status(404).send("That username already exists.");
            }
        });
    }else{
        res.status(404).send("Must fill out both fields.");
    }
})

// Updates the session
app.post("/login", function(req, res){
    // User tried to access this page when they are already logged in
    if(req.session.loggedin){
        res.status(200).send("Already logged in.");
        return;
    }
    
    let username = req.body.username;
    let password = req.body.password;
    
    // Find the user with the given credientials
    db.collection("users").findOne({"username": username, "password": password}, function(err, result){
        if(err){
            res.status(500).send("Error reading database.");
            return;
        }
        // Wrong username or password
        if(!result){
            res.status(401).send("Not authorized. Invalid password.");
			return;
		}
        // Found matching username & password
        req.session.loggedIn = true;
        req.session.ID = result._id;
        req.session.username = username;

        // Allows the page to be redirected to their profile
        res.status(200).send( result._id);
    })
})

app.post("/users/:userID/updatePrivacy", function(req, res){
    // Gets oid of user
    let oid;
    try{
		oid = new mongo.ObjectID(req.params.userID);
	}catch{
		res.status(404).send("Unknown ID");
		return;
	}

    // Finds user
    db.collection("users").findOne({"_id": oid}, function(err, result){
        if(err){
            res.status(500).send("Error reading database.");
            return;
        }

        // User does not exist
        if(!result){
			res.status(404).send("Cannot find");
			return;
		}

        // Validate that the user is modifing their own profile
        if(result._id != req.session.ID){
            res.status(403).send("Cannot access private profile.");
            return;
        }
        
        // Uppdate Privacy -> need to convert the string to a boolean
        if(req.body.privacy == "true"){
            result.privacy = true;
        }else{
            result.privacy = false;
        }

        // Update user in the database
        db.collection("users").updateOne({"_id": oid}, { $set: {"privacy": result.privacy}}, function(err, results) {
            if (err) throw err;
        });
        
        // Update their page
        res.status(200).render("userProfile", {
            u: result, 
            loggedIn: req.session.loggedIn,  
            ID: req.session.ID,
            currUser: true
        });
    })
})

// Adds new order to database and user
app.post("/orders", function(req, res){
    let orderSummary = [];

    // Gets oid of user
    let oid;
    try{
		oid = new mongo.ObjectID(req.session.ID);
	}catch{
		res.status(404).send("Unknown ID");
		return;
	}

    // Find user who made the order
    db.collection("users").findOne({"_id": oid}, function(err, result){
        if(err){
            res.status(500).send("Error reading database.");
            return;
        }
        if(!result){
			res.status(404).send("Cannot find");
			return;
		}

        // Validate user 
        if(result._id != req.session.ID){
            res.status(403).send("Cannot access private profile.");
            return;
        }
        
        // Creates order
        let order = {
            "userID": oid,
            "name": req.body.restaurantName,
            "subtotal": req.body.subtotal,
            "tax": req.body.tax,
            "deliveryfee": req.body.fee,
            "total": req.body.total,
            "order": req.body.order
        }
        
        // Add order to database
        db.collection("orders").insertOne(order, function(err, orderResult) {
            if (err) throw err;

            // Check if user already has orders
            if(result.hasOwnProperty("orderSummary")){
                // Add existing order to list
                orderSummary = result.orderSummary;
            }  

            // Add id of order to their orderSummary array
            newId = orderResult.insertedId;
            orderSummary.push(newId);

            // Add updated list to user
            db.collection("users").updateOne({"_id": oid}, { $set: {"orderSummary": orderSummary}}, function(err, results) {
                if (err) throw err;
            });
            res.status(200).send();
        });
    });
})

mc.connect("mongodb://localhost:27017", function(err, client) {
	if (err) {
		console.log("Error in connecting to database");
		console.log(err);
		return;
	}
	db = client.db("a4");
	app.listen(3000);
	console.log("Server listening on port 3000");
})


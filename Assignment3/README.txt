To run: 
    1. Type 'npm install' in the terminal to install dependencies
    2. Type 'node restaurant-server.js' into the terminal 
    3. Go to http://localhost:3000/ 
    4. To quit the server, type 'CTRL + C' 

Design Decisions
    - PUG files are used to template engines to generate HTML
    - Javascript files:
        - restaurant-server.js  
            This contains all the server information, which stores all the restaurants as an array. 
            It sends the requests when different tabs are clicked to change the HTML, and it also 
            handles requests to modify data for the restaurants.
        - addRestaurant.js 
            This is used for the 'Add Restaurant' page, which sends the name, delivery fee, and min 
            order of a newly created restaurant when the button on the page is clicked. 
             The server receives this POST request, and checks that the fields are valid.
        = client.js
            This gets the current restauarnt object by using the document.title to get the id of the restaurant.
            addCategory() validates the user's category data and saves it locally and updates the options to allow
            the user to select this for adding a new item.
            save() checks for the fields that have been filled, updated the restauarnt object, then sends it
            to the server,
    - When modifying restaurant, if there is no categories in restaurant, and the user is trying to add an item,
        then, item is not added

            

                
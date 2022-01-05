How to run:
    1. npm install (to install depedencies)
    2. node database-initializer.js (to initialize database)
    3. node server.js (to run server)
    4. Go to http://localhost:3000/

Additional Info:
    - I changed the original database-initializer to include a collection(orders) to store the orders
        - orders contains all the orders, and their info (name, subtotal, total, fee, tax, order, items)
        - users that make an order will have a orderSummary property, which contains an array of all the _id of their orders
        
    - user-handlers.js contains handlers for login and registration because it was easier to add pop up alerts. 
        The order form, and the change privacy are handled by forms from the pug files and are sent using POST
        
*** NOTE: the database-initializer.js was not done by me, and was part of the assignment.

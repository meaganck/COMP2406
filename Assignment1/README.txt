To run:
    1. Open order.html in your preferred browser
    
Notes:
- init() is like the "main" of the program. It is in charge of showing the alerts, displaying the 
tile, min order, and delievery fee of the current restaurant. It also clears the page and the variables
for the newly selected restaurants, then displays each column.

- There is a function to display each column, I split it up so that it would be easier to debug 
and easier to find each section. They all take in the cuurent restaurant as a parameter, so that 
the function knows to display that restaurant's info

- I split column 3 in two (the items in the cart and the order summary prices). I did this because 
I found it easier to have them separted, so that I could change them individually and for organization.

- There are several functions that do compuations: add item and remove item. These functions find the 
the item in the chosenItems array, and then either increases/decreases the quantity or if there is only
one left, then remove it, or add it if it does not exist in the array. findPrice() checks all the categories
in the restautant to find the matching name, and returns the price of the item. updateOrder updates 
all the values in the order summary (subtotal, total tax, total)

- I created an array to store the chosenItems, which are the items that the user adds to their cart.
The chosenItems stores an Item object, which keeps tracks of the item name, quantity, and unit price. 
I did this because it makes it easier to track what is in the cart, and I can maniupulate that array when the user
makes changes, and then print out the array to the website.

- I ended up making most of the variables global, which I didn't really mean to, but it it made it
easier to update the variables and it is why most of the functions do not return anything.

Additional Features:
- Used bootstrap to make a jumbotron to display min order and delivery fee

- Used the font 'Biblo' from Google fonts to match theme of website
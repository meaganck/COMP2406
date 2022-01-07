Design Decisions:
    - The home page and statistics pages are made with pug, while the order form is made with HTML
        - I decided to keep my order page from Assignment 1, so I did not convert it to a pug file 
            - That is why I did not include a footer because I would like it to use the same code as the other pages, 
                so it could eb changed from one file only
            - Next time I would convert the orderForm to pug 
        - client.js was also from my Assignment 1
    - All the images, css files, and template engines are located in the views folder
        - because I thought that all the files related to the look of the page should be in this file

How to run:
    1. Make sure node.js is installed
    2. Type 'npm install' into the terminal to install dependencies
    3. Run server by typing: "node restaurant-server.js"
    4. Go to http://localhost:3000/
    5. Website should be loaded

Notes:
    - In some rare cases if you make your first order to Lemabas by Legolas (last restaurant), it will Go
        to Aragorn's Orc BBQ (first restaurant). However, if you make another order to Lembas, the order will
        to Lemabas. Though, it seems like it is fixed now.

shire.jpg is from https://www.flickr.com/photos/michaelmattiphotography/11160588055

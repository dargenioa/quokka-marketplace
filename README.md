# quokka-marketplace

[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [test](#test)
* [Questions](#Questions)

## Description

Quokka-Marketplace is a full stack web application that allows users to create listings to sell, and browse other user's listings to potentially purchase.  Once they have their listing and click purchase the item will be moved to their cart and where the item can be removed from the cart or finalize checkout.  The user can also edit their own listings and delete it if they so which.  Doing so will delete the item from appearing in another user's cart.

## Installation
There are many packages to install which can be viewed in the package.json.  please view it and remove any you do not need, then run the following command in your terminal.
```bash
npm i
```
Also keep in mind this application uses the cloudinary service which will need to have your cloud name, api_key, and api_secret in order to connect to our env variables and stored in a .env file you need to make.  please sign up for it [here](https://cloudinary.com/home-2).
## Usage 

As either an unsigned in visitor or user, you can browse the latest items posted to the home page. You can sort these items by category in the cateogry dropdown if you wish, which will grab only the items of that category.  You can also get started by going to the sell.html page and using the search bar to search for items.  some reccomended items will appear but you can make the precision of the results down to one even one item.  

## License

This project's code is allowed to be "set free" using [The Unlicense](https://unlicense.org/).  This link provides all the details for the license.

## Contributing

Christopher-Lamb, dargenioa, DevDan13, Gaven56, and Ibram Elias are the contributors for quokka-marketplace.  Please check the questions section to view our github profiles!  We are also open to any other contributors who wish to share their thoughts to make the project grow.

## Test

To test please start by creating a user in the signup page. this can be reached by pressing the start button on sell.html or clicking signup on the login page. after logging in you can update your info if you wish or can create a listing.  Doing so will ask you for the name, price, picture, quantity, and category.  Now your item is ready to be viewed and potentially sold to another quokka user!  You too can browse and buy other users items by searching in sell.html or by searching by category in the home page.  You can also buy items now that you have an account and your items will appear in your cart.  From there they can be bought and removed.  You may buy an item as many times as you wish, but not when it's out of stock!

## Link to Deployed Application
https://projecttwo-rutgers.herokuapp.com/
<hr>

Please checkout our GitHub profiles [DevDan13](https://github.com/DevDan13) [Gavin56](https://github.com/Gavin56) [dargenioa](https://github.com/dargenioa) [Christopher-Lamb](https://github.com/Christopher-Lamb) and Ibram Elias for more of our work.

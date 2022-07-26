# eBuy: ecommerce/group buy platform

## Why

This is the capstone project after 6 project development days (28 Apr - 5 May) at General Assembly's Software Engineering Immersive programme (GA-SEI).

## Technologies

- Frontend: `React` + `Node.js`
- Backend: `Django` + `Python`
- Database: `PostgreSQL`

## Introduction

I wanted to create/replicate an e-commerce app with a [group buy](https://en.wikipedia.org/wiki/Group_buying) feature. Essentially, the products have a "campaign" feature and need to reach 100% of the quantity in order for the product to be shipped out.

## Features

1. Users are able to view the products, add products to cart and checkout (which creates an "order" _assuming payment is successful_).

2. Users need to create an account in order to add to cart / checkout. There is cart database so even after the user logouts, they can view their "saved" cart.

3. Admin users are able to see the orders created and set the status of the order accordingly (i.e "COMPLETE")

4. Admin users can also delete the product.

## Interesting points, pain points & project post-mortems

- Django took quite sometime to learn, in addition to understanding and implementing JWT

- Coding in between frontend (javascript) and backend (python) was very disorientating

## Database Diagram

![image](https://user-images.githubusercontent.com/16322250/180946488-2454e388-931f-4e55-a19b-83fe4c64bc36.png)


## Future roadmap

1. Finish up the full logic of the app (stock status, updates)
2. Finish up the profile creation (edits, delete, creation of admin account)
3. Finish up (backend) protection of API calls and (frontend) protection of routes
4. Work on stretch goals such as implementing a shopfront, featured products.
5. Update the readme with more project details

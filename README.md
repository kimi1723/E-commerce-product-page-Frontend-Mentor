# E-commerce sneakers

Full e-commerce site frontend + backend, design inspired by Frontend Mentor [single product page](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6) challenge.

## About the project

As mentioned above, this project at fist was supposed to be a [single product page](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6) from Frontend Mentor with some additional content so I could consolidate my knowledege about React Router and React Redux/Toolkitjs, however
it has turned out to be a full e-commerce app. Although, the backend is just an Firebase database and the logic validating users and storing their credentials is trivial.

It has been created with 'create react app' as I have started developing it before I have encountered Vite(2 months ago) with which I would have developed the project if I were to start it now.

## What you can do:

### Overall:

- check different sections from the navbar, <br>
- remove item from cart, <br>
- move across the whole page with keyboard only(hopefully).

### From product's page:

- add item(s) to cart, <br>
- open lightbox.

### From checkout pages:

- view the order summary, <br>
- change product's quantity and also add a custom one(e.g. 100), <br>
- enter discount for the current order(mentioned later), <br>
- fill the checkout form that has basic validation, the form is automatically filled based on your previous information if signed in and already ordered something(while singed in), <br>
- order and view order summary. <br>

### From authentication pages:

- either sign in or sign up, both have basic validation, signed in status persists between sessions.

### From account pages (if signed in):

- view submitted orders amount (didn't have much inspiration for this page), <br>
- view submitted orders and check their details, <br>
- view credentials and edit them, <br>
- view personal information and edit them, <br>
- signout(also can be done while hovering over profile icon).

## Test account and discounts:

### Account credentials:

email: email4@gmail.com <br>
password: 12345678 <br>

### Discounts:

- SHIPMENT - shipment discount only, <br>
- SNEAKERS20 - 20% off discount, <br>
- SNEAKERS50 - 50% off discount, <br>

Promotions do combine, although discounts do not. Entering a invalid discount removes the valid one. <br> <br>
Also, test account will probably have either invalid email or password, as any user can change it. I suggest creating your own one, as the only requirements are a valid address email(doesn't have to exist) and a password containing at least 8 characters.

## To do:

- write tests, <br>
- cache data and improve performance overall, <br>
- add more animations.

## Technologies used:

- React, <br>
- Redux Toolkitjs, <br>
- React Router, <br>
- React Select, <br>
- Sonner,<br>
- Framer Motion, <br>
- Firebase, <br>
- CSS Modules.

## Feedback is greatly appreciated!

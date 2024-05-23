# E-commerce sneakers

E-commerce site with user authentication, orderding, reviewing previous orders and changing current credentials. Design inspired by Frontend Mentor [single product page](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6) challenge.

## About the project

As mentioned above, this project at first was supposed to be a [single product page](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6) from Frontend Mentor with some additional content so I could consolidate my knowledege about React Router and React Redux/Toolkitjs, however
it has turned out to be a full e-commerce app. Although, Firebase database and the logic validating users and storing their credentials is trivial.

Created with 'create react app' as I have started developing it (2 months ago) before I have encountered Vite with which I would have developed the project if I were to start now.

## What you can do:

### Overall:

- check different sections from the navbar, <br>
- remove item from cart, <br>
- move across the whole page with keyboard only (hopefully).

### From product's page:

- add item(s) to cart, <br>
- open lightbox.

### From checkout pages:

- view the order summary, <br>
- change product's quantity and also add a custom one (e.g. 100), <br>
- enter discount for the current order (mentioned later), <br>
- fill the checkout form that has basic validation, the form is automatically filled based on your previous information (either changed by creating an order or changing it in the personal information's tab) if signed in - with that in mind, you can fill out shipment form only once and then test the order submission only providing a payment method by hand, <br>
- order and view order summary. <br>

### From authentication pages:

- either sign in or sign up, both have basic validation, signed in status persists between sessions.

### From account pages (if signed in):

- view submitted orders amount (didn't have much inspiration for this page), <br>
- view submitted orders and check their details, <br>
- view credentials and edit them, <br>
- view personal information and edit them, <br>
- signout (also can be done while hovering over profile icon).

## Test account and discounts:

### Account credentials:

email: email4@gmail.com <br>
password: 12345678 <br>

Test account will probably have either invalid email or password, as any user can change it. I suggest creating your own one, as the only requirements are a valid address email (doesn't have to exist) and a password containing at least 8 characters.

### Discounts:

- SHIPMENT - shipment discount only, <br>
- SNEAKERS20 - 20% off discount, <br>
- SNEAKERS50 - 50% off discount, <br>

Promotions do combine, although discounts do not. Entering a invalid discount removes the valid one. <br> <br>


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

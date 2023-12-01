# E-commerce Sneakers

Full e-commerce site frontend + backend, design inspired by Frontend Mentor [single product page](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6).

## About the project

As mentioned above, this project at fist was supposed to be a [single product page](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6) from Frontend Mentor with some additional content so I could consolidate my knowledege about React Router and React Redux/Toolkitjs, however
it has turned out to be a full e-commerce app. Although, the backend is just an Firebase database and the logic validating users and storing their credentials is trivial.

It has been created with 'create react app' as I have started developing it before I have encountered 'Vite'(2 months ago) with which I would have developed the project if I were to start it now.

## What you can do:

### Overall:

-check different sections from the navbar,
-remove item from cart,
-move across the whole page with keyboard only(hopefully).

### From product's page:

-add item(s) to cart,
-open lightbox.

### From checkout pages:

-view the order summary,
-change product's quantity and also add a custom one(e.g. 100),
-enter discount for the current order(mentioned later),
-fill the checkout form that has basic validation, the form is automatically filled based on your previous information if signed in and already ordered something(while singed in).
-order and view order summary.

### From authentication pages:

-either sign in or sign up, both have basic validation, signed in status persists between sessions.

### From account pages(if signed in):

-view submitted orders amount(didn't have much inspiration for this page),
-view submitted orders and check their details,
-view credentials and edit them,
-view personal information and edit them,
-signout(also can be done while hovering over profile icon).

## To do:

-write tests,
-cache data,
-add more animations.

## Technologies:

-React,
-Redux Toolkitjs,
-React Router,
-React Select,
-Sonner,
-Framer Motion,
-Firebase.

## Feedback is greatly appreciated!

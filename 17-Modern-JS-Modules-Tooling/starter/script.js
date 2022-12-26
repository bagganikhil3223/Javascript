// Some Important notes -->

/*

1) Modern javascript development is done using modules. which means we separate out big codes into different different files and later bundle them together to deploy on the browseer.
2) We can also include 3rd party packages in our javascript applications (eg leaflet, lodash etc).
3) NPM (Node package manager) is the place where almost all the packages are available to develop any kind of applications, NPM is both (a repository for packages as well as Software that runs on our systems).
4) When we deploy our application on production , it goes through some build steps.
Step 1 --> Bundling :->  In this step, we join all the modules into one file 
Step 2 --> Transpiling/Polyfilling :-> some old browsers don't support modern javascript at all, so to allow those browsers to use modern JS transpiling/Polyfilling is done.
which means it will convert modern js back to ES5. (We use Babel for this process).

Now to implement these build steps ,we need tools like Webpack and Parcel. which will make things hassle free for us.

*/

/*

--------MODULES-------

--> Modules are reusable piece of code that encapsulates implementation details.
--> These are usually standalone files ,but it doesn't have to be. Modules can have imports and exports
--> What ever we export from modules, are called Public APIs.
--> All modules are executed in strict mode by default.

*/


/*

Exports and Imports

In ES6, there are two types of exports -->
1) Named Exports 
2) Default Exports

*/



// Importing Module


// import {addToCart, totalPrice as price,tq} from './shoppingCart.js'; // doing aliasing using as keyword

// addToCart('bread',10);
// console.log(price,tq);

console.log('Importing Module');
// console.log(shippingCost);

// import * as ShoppingCart from './shoppingCart.js'; // Importing everything at once from exporting module;
// ShoppingCart.addToCart('breads',25);
// console.log(ShoppingCart.totalPrice);


import add, {cart} from './shoppingCart.js'; // usually we don't mix default exports and named exports
add('Atta',23);
add('pizza',2);
add('Bread',10);
console.log(cart);

/*

// Top Level await (ES2022)

// Earlier we could only use await keyword inside an async function only, but in ES2022 we can use await outside the async function (Only possible in modules and not in regular scripts)
// this is called as top level await.


// here using await without async function because top level await is possible inside a module ,not in regular scripts.
// also note that this await keyrword is used outside of async function, so this will block the execution of entire module.


// console.log('Start Fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Done fetching');


const getLastPost = async function() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();

    return {title: data.at(-1).title, text:data.at(-1).body};
}

const lastPost = getLastPost();


// Not a clean way (mixing await and then handlers)
// lastPost.then(last => console.log(last)); 

const lastPost2 = await getLastPost();
console.log(lastPost2);

*/

// Module Pattern (it was a way of implementing code before)
// generally we use IIFE to set variables up and functions

/*

const shoppingCart2 = (function() {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function(product,quantity) { // writing export in front of function makes it named export
        cart.push({product,quantity});
        console.log(`${quantity} ${product} added to cart`);
    }

    const orderStock = function(product,quantity) { // writing export in front of function makes it named export
        cart.push({product,quantity});
        console.log(`${quantity} ${product} ordered from supplier`);
    }

    // returing all these private variables as to make available as public APi
    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity
    }; 
})();

shoppingCart2.addToCart('apple',2); // still able to perform actions because of closures
shoppingCart2.addToCart('pizza',4);

*/

// CommonJs Module in JS
// like ES6 , in commonjs module, one file is one module

// it will not work not here , as it works in Nodejs
// export.addToCart = function(product,quantity) { // writing export in front of function makes it named export
//     cart.push({product,quantity});
//     console.log(`${quantity} ${product} added to cart`);
// }


// Import 
// const {addToCart} = require('./shoppingCart.js');


// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';


const state = {
    cart: [
        {product:'bread', quantity:5},
        {product:'pizza', quantity:5},
    ],
    user: {loggedIn: true}
}

const stateClone = Object.assign({},state);
// state.user.loggedIn = false;
console.log(stateClone);

const stateCloneDeep = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateCloneDeep);



// we can use parcel by two ways :-> 1st using npx parcel index.html and 2nd is by using npm scripts
// Parcel is a devDependency 
// devDependency --> it is like a tool that we need to build our application but it is not a dependency which we actually include in our code

// In Parcel we can activate something better which is called hot module replacement.
// Hot module replacement means whenever we change one of the modules, then it will automatically get injected into browser and our page don't get reloaded.



if(module.hot) {
    module.hot.accept();
}

class Person {
    #greeting = 'Hey';
    constructor(name) {
        this.name = name;
        console.log(`${this.#greeting}, ${this.name}`);
    }
}

const nikhil = new Person('Nikhil');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >=2));
Promise.resolve('TEST').then(val => console.log(val));


// importing the library babel recommend for polyfilling

import 'core-js/stable'; // (npm install core-js)

// import 'core-js/stable/array/find';
// import 'core-js/stable/array/promise';

// (Also npm install regenerator-runtime, it is used for pollyfilling async functions).

// Polyfilling Async functions
import 'regenerator-runtime/runtime';

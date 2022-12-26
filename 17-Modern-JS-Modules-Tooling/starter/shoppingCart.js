// Exporting Module
/*
Note --> in modules, name of modules are generally camelCase
*/

console.log('Exporting Module');

// Blocking Code
// console.log('Start Fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish Fetching users');

const shippingCost = 10;
export const cart = [];

export const addToCart = function(product,quantity) { // writing export in front of function makes it named export
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to cart`);
}

const totalPrice = 237;
const totalQuantity = 10;

export {totalPrice,totalQuantity as tq};

export default function(product,quantity) { // exporting one value at a time from a module made this a default export (used default keyword as well)
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to cart`);
}
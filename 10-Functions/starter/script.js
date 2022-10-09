'use strict';

/*
const bookings = [];

const createBooking = function(flightNum, numPassengers = 1,price = 199 * numPassengers) {
    //Here we can use any expression in default parameters, upper case worked because numPassenger is present 
//   before price , else it would not have worked if present after 


    // ES5
    // numPassengers = numPassengers || 1;
    // price = price || 199;



    const booking = {
        flightNum,
        numPassengers,
        price
    };
    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123',2,800);
createBooking('LH123',2);
createBooking('LH123',5);
createBooking('LH123',undefined,1000); // Skipping a default parameter by setting undefined

*/

/*

const flight = 'LH234';
const jonas = {
    name:'Jonas Schmedtmann',
    passport: 23214235434
};

const checkIn = function(flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;
    
    if(passenger.passport === 23214235434) {
        alert('Checked in');
    } else {
        alert('Wrong Passport');
    }

}

// checkIn(flight,jonas);
// console.log(flight);
// console.log(jonas);


// passing primitive and reference type is same as doing like
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function(person) {
    person.passport = Math.trunc(Math.random() * 1000000000);

}

newPassport(jonas);
// checkIn(flight,passenger);

// Important note ---> Javascript is pass by value, not pass by reference.
// In case of objects , it seems we are passing the reference , but it is the value that is present on that location (like double pointer)

*/



// First-Class VS Higher Order Functions

/*




First Class Functions
// --> Javascript treats functions as first-class citizens
// --> This Means that functions are simply values
// --> Functions are just another type of objects

// Store functions in variables or propertues

// const add = (a,b) => a + b; // function as value
// const counter = {
//     value : 23,
//     inc: function(){ // function as property 
//         this.value++;
//     }
// }

// Pass functions as arguments to other functions 
// const btn = 'Button';
// const greet = () => console.log('Hey Jonas');
// bnt.addEventListener('click', greet); // passing functions as an argument

// We can also return functions from functions

// We can also call methods on functions(since functions are also objects) as we do on Objects and Arrays
*/

/*
Higher Order Functions

--> A Function that receives another function as an argument, that returns a new function, or both.
--> This is also possible because of first class functions.

1) Function that receives another function
cont greet = () => console.log('Hey Jonas');
btnClose.addEventListener('click', greet); 

here addEventListener is Higher-Order function and greet is a callback function.
callback function is called by higher order function, when its ready.

2) Function that returns new Function
function count () {  // Here count is higher order function 
    let counter = 0;
    return function() { // returning a function
        counter++;
    }
}

*/

// Note that first class functions is a concept of language, which means functions are treated as values..thats it.
// But Higher Order functions is in practice and used most of the time.

// Functions Accepting callback functions
/*

const oneWord = function(str) {
    return str.replace(/ /g,'').toLowerCase();
}

const upperFirstWord = function(str) { [1,2,3,4] 
    const [first ,...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}


// Higher-Order Function
const transformer = function(str, fn) {
    console.log(`Original string , ${str}`);
    console.log(`Transformed String : ${fn(str)}`);
    console.log(`Transformed by : ${fn.name}`); // name property on functions

}

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);


// JS uses callbacks all the time
const high5 = function() {
    console.log('👋');
}

document.body.addEventListener('click',high5);

['Jonas','Martha','Adam'].forEach(high5); // callback function

*/

/*
// Functions returning functions

const greetArrow = greeting => name =>  console.log(`${greeting} ${name}`);


const greet = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
}


const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');


greet('Hey')('Jonas');

greetArrow('Hi')('george');

*/

// Call , Apply and Bind Methods


/* behaviour of 'this' always depends on how function is called and is implicitely defined, 
but sometimes we need to set 'this' explicitely and here comes call ,bind and apply into rescue */



const lufthansa = {
    airline:'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function() {}
    book (flightNum,name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({
            flight: `${this.iataCode}${flightNum}`,
            name
        });
    }
}




lufthansa.book(235,'Jonas Schmedtmann');
lufthansa.book(639,'John Smith');
console.log(lufthansa);

const eurowings = {
    airline:'Eurowings',
    iataCode:'EW',
    bookings:[],  
};

const book = lufthansa.book; // with the help of first class functions as functions are just values, we able to assign it


// Does not work
// book(23,'Sarah Williams');

// Call Method 

book.call(eurowings, 23, 'Sarah Williams'); // first argument in call is 'this' we want to refer to, and rest are function parameters required

console.log(eurowings);

book.call(lufthansa,238,'Mary Cooper');
console.log(lufthansa);


const swiss = {
    airline:'Swiss Air Lines',
    iataCode:'LX',
    bookings:[]
};

book.call(swiss,583,'Jacob Ann'); 
console.log(swiss);

// Apply Method (Similar to call but accepts array as argument after this keyword)

const flightData = [660,'George Cooper'];
book.apply(swiss,flightData);
console.log(swiss);

book.call(swiss,...flightData); // Modern JS use case



// Bind Method (Similar to call but it don't call the function immediately rather it returns a function where this keyword is bound)
// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings); // returned a function ... It tells that now this keyword is set to eurowings and bind don't call the function
const bookLH = book.bind(lufthansa);
const bookLX =book.bind(swiss);
bookEW(23,'Steven Smith');


const bookEW23 = book.bind(eurowings,23); // Here presetting the value of first argument to 23, so now this bookEW23 only needs 2nd argument
// This is called Partial Application, which means parts of the arguments of the original function are already applied, means already set.

bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function() {
    console.log(this);
    this.planes++;
    console.log(this.planes);
}

// lufthansa.buyPlane();

//document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); // now according to rules, in event handlers 'this' points to the DOM element upon which it is attached to
// so here it will be button with buy class , now to point 'this' to lufthansa object , we need to use either call or bind
// since call , immediately calls the function..we can't use it.
// so best is to use bind as it will return a function ,but will not call immediatey
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // binding the lufthansa explicitely so that 'this' points to lufthansa object

// Partial Application

const addTax = (rate,value) => value + value * rate;
console.log(addTax(0.1,200));

const addVAT = addTax.bind(null,0.23); // we use null if we don't care about this ,since we don't need this keyword
// addVAT = value => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = (rate) => {
    return function(value) {
        return value + value * rate;
    }
}
const addVAT2 = addTaxRate(.23);
console.log(addVAT2(100));
console.log(addVAT2(23));



///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]


GOOD LUCK 😀
*/
/*
const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        // Get Answer
        const answer = +prompt(`${this.question}\n${this.options.join('\n')}\n(Write option Number)`);
        console.log(answer);

        //Register answer
        typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;

        this.displayResults();
        this.displayResults('string');

    },
    displayResults(type='array') {
        if(type === 'array') {
            console.log(this.answers);

        } else if(type ==='string'){
            console.log(`Poll results are ${this.answers.join(', ')}`);

        }

    }

}


// poll.registerNewAnswer();

document.querySelector('.poll').addEventListener('click',poll.registerNewAnswer.bind(poll));


poll.displayResults.call({answers:[5,2,3]},'string');
poll.displayResults.call({answers:[1, 5, 3, 9, 6, 1]});
poll.displayResults.call({answers:[1, 5, 3, 9, 6, 1]},'string');
//BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

*/

// IIFE (Immediately invoked function expressions)

// we need these to run our functions only once

/*

const runOnce = function() {
    console.log('This will not tun only once');
}

runOnce();

// IIFE (2 Ways to create)


(() => {
console.log('run once');
})();

(function() {
    console.log('run once');
})();


(function () {
    console.log('This will run only once');
    var isPrivate = 23;
})();

(() => console.log('This will run only once'))();

{
    const isPrivate = 23;
    var notPrivate = 45;
}

// console.log(isPrivate);
console.log(notPrivate);
*/

// Closures

const secureBooking = function() {
    let passengerCount = 0;
    return function() {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
        
    }
}
const booker = secureBooking();

booker(); // 1
booker(); // 2
booker(); // 3

// console.dir(booker);


// Closures examples

// Example 1 (Re-birthing by re-assigning)

let f;

const g = function() {
    const a =23;
    f = function() {
        console.log(a * 2);
    }
}

const h = function() {
    const b = 777;
    f = function() {
        console.log(b * 2);
    }
}

g();
f();
console.dir(f);

// Reassigning f function
h();
f(); // closure changes when we reassign the value (kind of reborn again)
console.dir(f);

// Example 2 (Timers)

const boardPassengers = function(n, wait) {
    // Here function parameters are also the part of closure, as they are simply local variables.
    const perGroup = n / 3;
    // here setTimeout was able to remember all the variables because of closure.
    // which means all the variables were attached to the function even when it was removed from execution context and called independently.

    setTimeout(function() {
        console.log(`We are boarding all ${n} passengers` );
        console.log(`There are 3 groups, each with ${perGroup} passengers`);

    },wait * 1000);
}


const perGroup = 1000; // Priority of Closures is more than scope chain
boardPassengers(180,3);






// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function() {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.body.addEventListener('click', function() {
        header.style.color = 'blue';
    })
})();

let age = 20;
let oldage = age;
age = 21;



// Primitives ---- Call stack
// let age = 20;                  identifier     address    value           heap 

//                                age ----->          A001        20             D01         { A : "name" } 
                                  
//                                obj ----->          A002       D01 


// Reference Types ----- Heap 

// let obj = {
//     A:'name'
// };


// GS JS question

// const Person = {
//     vote: 18,
//     isVote: function (age) {
//       return age >= this.vote;
//     },
// };
//   function compose(callbacks) {
//     return function (arg2) {
//       return callbacks.reduceRight((y, f) => {
//         return f.call(this, y);
//       }, arg2);
//     };
//   }
//   function multiply(a) {
//     return 2 * a;
//   }
  
//   console.log(compose([Person.isVote, multiply]).bind(Person)(1));
//   console.log(compose([Person.isVote, multiply]).bind(Person)(10));




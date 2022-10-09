'use strict';

//Scoping in Practice
/*
function calcAge(birthYear) {
    const age = 2037 - birthYear;
    
    function printAge() {
        let output = `${firstName}, you are ${age}, born in ${birthYear}`;
        console.log(output);
        console.log('Millenial', millenial);
        if(birthYear >= 1981 && birthYear <= 1996) {
            var millenial = true;
            // Creating NEW variable with same name as outer scope's variable
            const firstName = 'Steven';

            //Reassigning outer scope's variable
            output = 'NEW OUTPUT!';
            const str = `Oh, and you are a millenial, ${firstName}`;
            console.log(str);

            function add(a,b) {
                return a + b;
            }
        }
        // console.log(str);
        console.log(millenial);
        // const num = add(2,3); // will throw error "add is not defined", which proves functions are also block scoped(only true for strict mode)
        // console.log(num);
        console.log(output);
    }
    printAge();
    return age;
}

const firstName = 'Jonas';
calcAge(1991);
*/

/*

// Hoisting in Practice (TDZ)

// Variables hoisting

console.log(me);
// console.log(job);
// console.log(year);

var me = 'jonas';
let job = 'teacher';
const year = 1991;

// Functions Hoisting

console.log(addDecl(2,3));
//console.log(addExpr(2,4));
console.log(addArrow); // undefiend
//console.log(addArrow(2,5));

function addDecl(a,b) {
    return a + b;
}

const addExpr = function (a,b) {
    return a + b;
}

// const addArrow = (a,b) => a + b;

var addArrow = (a,b) => a + b; // (will give error as var variables are undefined and we are calling undefined(2,4))


// Example

console.log(numProducts);
if(!numProducts) {
    deleteShoppingCart();
}

var numProducts = 10;

function deleteShoppingCart() {
    console.log('All products deleted!')
}

*/

/*

console.log(this); // Window object 

const calcAge = function (birthYear) {
    console.log(2037-birthYear);
    // console.log(this); // undefined in case of strict mode in normal function else it would have been window if no strict mode

}

calcAge(1991);

const calcAgeArrow =  (birthYear) => {
    console.log(2037-birthYear);
    // console.log(this); // Window (as parent's this is window) that is lexical scope 

}

calcAgeArrow(1980);

const jonas = {
    year:1991,
    calcAge: function() {
        console.log(this); // this points to the object that is calling the method
        console.log(2037-this.year);
    }
}

jonas.calcAge();

const matilda = {
    year :2017
}

matilda.calcAge = jonas.calcAge; // Method Borrowing 
matilda.calcAge(); // this points to matilda now


const f = jonas.calcAge;

// f(); // it is now a regular function now so "this is undefined" 

// function hello () {
//     const arrowInside = () => {
//         console.log("I'm arrow inside");
//         console.log('Value of this is ', this); // lexical this is undefined as it is inside regular fn
//     }
//     arrowInside();
// }

// hello();


// here parent is global, this is Window 
// const arr1 = () => {
    
//     // there this is always be window as parent's lexical is Window 
//     console.log('this is in arr1' ,this);

//     // here parent is arr1, 
//     const arr2 = () => {
//         console.log('this is in arr2' ,this);
//         const arr3 = () => {
//             console.log('this is in arr3' ,this);
//         }
//         arr3();
//     }
//     arr2();
// }
// arr1();

const name1 = {
    name:'Hello',
    printName: function() {
        console.log(this); // name1

        const func = function() {
            console.log(this); // will be undefined as it is regular function with strict mode on 
        }


        const ageObject = {
        age:20,
        printAgeAndName:  function () {
            console.log(this) // age object 
            console.log("Name is ",this.name); // undefined
            console.log('Age is ', this.age); // 20
            const printNum = () => { 
                console.log(this); // ageObject  
                const obj1 = {
                    year1: 1991,
                    printYear: () => {
                        console.log(this); // ageObject
                    }
                }
                obj1.printYear();
            }
            printNum();
        },
    }
    ageObject.printAgeAndName(); // this will point to the object that is calling the method
    }
}
name1.printName(); // this will point to the object (name1)

*/

/*
// Regular functions vs Arrow functions


// var firstName = 'Matilda';

const jonas = {
    firstName:'Jonas',
    year:1991,
    calcAge: function() {
        console.log(this); // this points to the object that is calling the method
        console.log(2037-this.year);


        // SOLUTION 1

        // const self = this; // self or that (pre es6 solution)

        // const isMillenial = function (){
        //     //console.log(this); // this is undefined as it is a regular function call (so solution is to use self and assigning this to it )
        //     console.log(self);
        //     console.log(self.year>=1981 && self.year <=1996)
        //     // console.log(this.year>=1981 && this.year <=1996)

        // }  
        
        // SOLUTION 2 (To Use Arrow Function)
        const isMillenial =  () => {
            console.log(this); // inherits the this keyword from parents scope
            console.log(this.year>=1981 && this.year <=1996)

        }
        isMillenial(); 
    },
    greet: () => {
        console.log(this); // window object as lexical parent is global scope not the object // It is just a block or object literal
        console.log(`Hey ${this.firstName}`);
    }
}

jonas.greet();
jonas.calcAge();

// Arguments Keyword
const addExpr = function (a,b) {
    console.log(arguments);
    return a + b;
}
addExpr(2,5);
addExpr(2,5,6,7);

const addArrow = (a,b) => 
{
    console.log(arguments); // undefined as arrow functions don't have arguments keyword
   return a + b;
}
addArrow(2,5,8);

*/

// Primitive vs Reference types

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const me = {
//     name:'Nikhil',
//     age:23
// }

// const friend = me;
// friend.age = 27;
// console.log('Friend ', friend);
// console.log('Me' , me); 

// Primitive Types

let lastName = 'Williams ';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName,oldLastName);

//Reference types

const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age:27,
}

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';

console.log('Before Marriage', jessica);
console.log('After Marriage',marriedJessica);
// marriedJessica = {}; // Not allowed on const , but allowed on let as we are trying to change the value of reference type

// Copying Objects

const jessica2 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age:27,
    family:['Alice','Bob']
}

const jessicaCopy = Object.assign({}, jessica2); // It merges two objects and return a new object 
// (It works on first level i.e if we have object inside object , then inner object will still points to old memory location and this is called shallow copy not the deep copy )
// Shallow copy works only on first level 
// Deep copy works on all level 
jessicaCopy.lastName = 'Davis';


jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before Marriage', jessica2);
console.log('After Marriage',jessicaCopy);
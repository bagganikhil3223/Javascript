'use strict';


// OOP in Javascript : Prototypes

// NOTE --> Unlike regular function , we use "new" operator to call constructor function which is used to create Objects
// Also note that only function declarations and function expression are used to create constructor functions ,not arrow functions because they don't have their own "this" keyword


// const Person = function(firstName,birthYear) {

//     // Since we are creating the object using constructor function, this properties will be called as Instance Properties
//     this.firstName = firstName;
//     this.birthYear = birthYear;

//     // Never do this(bad practice)..(never create a method inside constructor function)
//     // this.calcAge = function() {
//     //     console.log(2037 - this.birthYear);
//     // }
// }


// const jonas = new Person('Jonas',1991);
// console.log(jonas);

// when we call a function using new operator, 4 things happen

// 1) A new empty object is created ( {} );
// 2) Function is called and "this" keyword is set to this newly created Object ( this = {} )
// 3) this newly created object is linked to a prototype 
// 4) function automatically returns this newly created object {}

// const matilda = new Person('matilda',1987);
// console.log(matilda);

// const jack = new Person('jack',1970);
// console.log(jack);

// console.log(jonas instanceof Person); // to check if it is an object/instance of this Person class

// Person.hey = function() {
//     console.log(this);
//     console.log('Hey There!');
// }

// Person.hey();

/* 
// Prototypes 

// Each and every function in javascript has a property called prototype that includes constructor functions 
// Each the objects will have access to the method and properties created on the prototype property of this constructor function


console.log(Person.prototype);
Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
}

jonas.calcAge();
matilda.calcAge();
jack.calcAge();

// This worked because prototype of Jonas and all other objects is the prototype property of the constructor function

console.log(jonas.__proto__);

console.log(jonas.__proto__ === Person.prototype); // true 

// NOTE --> Person.prototype is not the prototype of Person, instead it is what gonna be used as the prototype of all the objects created with the Person Constructor Function

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// .prototypeOfLinkedObjects (could have been)

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species,matilda.species); // these property is not present directly on the objects, but it is present on the proto property of Objects (which means it is not the own property of Objects)

// To check for own properties

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

// Prototype is itself an object contains methods and properties 
// Imp NOTE --> If a property or a method is not found in an object, then it will find it in it's prototype and it will work
// this process of looking up for properties and method in prototype is called prototype chain

// Top of the prototype is the Object.prototype and it's prototype is null(which marks the end of prototype chain (look for pictures taken in phone))


// Prototypal Inheritance on built in Objects

console.log(jonas.__proto__); // Person's Prototype property
console.log(jonas.__proto__.__proto__); // Object's prototype property (top of prototype chain)
console.log(jonas.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); // Will point back to Person constructor function 


const arr = [1,4,2,3,2,1,4,43,48]; //   new Array ===  []

const arr1 = [1,1,2,2,2,3,4,3,3,4,5];

console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function() {
    return ([...new Set(this)]); // here this will point to arr
}

console.log(arr.unique()); // now all arrays will inherit this unique method and will work on those

console.log(arr1.unique());

const h1 = document.querySelector('h1');

console.dir(x => x *1);

*/

/*

// ES6 Classes


// class is just a type of function

// class expression
// const PersonCl = class {

// }

// class declaration

class PersonCl {

    constructor(fullName,birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Instance Methods
    // Methods will be added to .prototype property
    // All these methods are present on the prototype of Object, not on the object itself
    calcAge() {
        console.log(2037 - this.birthYear); 
    }

    greet() {
        console.log(`Hey ${this.firstName}`);
    }

    get age() {
        return 2037 - this.birthYear;
    }

    // Setting a property name that already exist
    // Whenever we try to set a property that already exists, we use _ before it.
    // and also to get that we use getter 

    // NOTE --> Getters and setters are also used for validations
    set fullName(name) {
        if(name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }

    // Static Method (static methods are attached to constructor of the function not to the prototype of the function)
    static hey() {
        console.log(this);
      console.log('Hey There!');
    }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);

jessica.calcAge();
console.log(jessica.age);



console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function() {
//     console.log(`Hey ${this.firstName}`);
// }

jessica.greet();


// IMPORTANT NOTES

// 1) Classes are not hoisted.
// 2) Classes are also first class citizens (which means simply variables i.e pass into functions and return from functions)
// 3) Classes are executed in strict mode (by default) which means even if we didn't activate the strict mode, it is by default on



const walter = new PersonCl('Walter White',1965);

PersonCl.hey(); // no need to create instance for static methods 

// Getters and Setters

const account = {
    owner: 'Jonas',
    movements: [200,300,100,400],

    get latest() { // using get keyword to make it a getter
        return this.movements.at(-1);
    },

    set latest(mov) {
        this.movements.push(mov);
    }
}

console.log(account.latest); // accessing it just like a property, not a method

account.latest = 50; // setting a value just like a property 
console.log(account.movements);

*/


/*


// Object.Create

// we use Object.Create to manually set Prototype of any object to any other object that we want.

const personProto = { // simple object literal
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    // Manual way of creating object properties (method name can be anything)
    init(firstName,birthYear) { // here this will point to Sarah Object as we are calling using Sarah in 263 line
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}


const steven = Object.create(personProto); // passing personProto as we want this to be Prototype of person Objects 
// this will return a brand new object , which is linked to the prototype of personProto

console.log('Steven is ',steven);

steven.name = 'Steven';
steven.birthYear = 2002;

steven.calcAge();

console.log(steven.__proto__); // personProto Object
console.log(steven.__proto__ === personProto); // true

const sarah = Object.create(personProto);

sarah.init('Sarah', 1979);
sarah.calcAge();

*/

// Inheritance between classes :: Constructor Functions

/*

const Person = function(firstName,birthYear) {

    this.firstName = firstName;
    this.birthYear = birthYear;
    
}

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
}


const Student = function(firstName,birthYear,course) {


    // Person(firstName,birthYear); we can't use this as it is just a regular function call and "this" keyword is undefined in regulr function
    // so we need to define this in person function
    Person.call(this,firstName,birthYear); // Here this will point to ({} empty object as we have created the student with new keyword)
    this.course = course;
}

// Linking Prototypes (setting prototype manually)
Student.prototype = Object.create(Person.prototype); // setting the student's prototype to Person's Prototype (check in phone how linking looks like)



Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}


const mike = new Student('Mike', 2020,'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);

// Resetting the proto to Student as mike's prototype should be student not the person

Student.prototype.constructor = Student;
console.log(Student.prototype.constructor); 

*/

// Inheritance between classes :: ES6 Classes

/*

class PersonCl {

    constructor(fullName,birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Instance Methods
    // Methods will be added to .prototype property
    // All these methods are present on the prototype of Object, not on the object itself
    calcAge() {
        console.log(2037 - this.birthYear); 
    }

    greet() {
        console.log(`Hey ${this.firstName}`);
    }

    get age() {
        return 2037 - this.birthYear;
    }

    set fullName(name) {
        if(name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }

    static hey() {
        console.log('Hey there');
    }
}


class StudentCl extends PersonCl { // extends will link the prototypes automatically

    constructor(fullName,birthYear,course) {
        // PersonCl.call(this,fullName,birthYear); we don't need to do this here , instead we will use super function
        // Super function always need to happen first because it responsible for creating "this" keyword in this class
        super(fullName,birthYear); // It will call the constructor function of the parent class ,we don't need to worry about it
        this.course = course;
    }
    // Important Note --> You don't need to bother about writing a constructor in child class if you dont have any new properties other than properties present in parent class
 

    introduce () {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    // Polymorphism (overriding the parent's method in child class)
    calcAge() {
        console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`);
    }
}

// const martha = new StudentCl('Martha jones', 2012); // if we have only these 2 properties which can also be set ini parent's constructor, then we don't need to write these over here in StudentCl (but usually we don't do it)
const martha = new StudentCl('Martha Jones', 2012,'Computer Science');
martha.introduce();

martha.calcAge();

*/


// Inheritance between classes :: Object.create()

/*

const personProto = { 
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName,birthYear) { 
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}


const steven = Object.create(personProto);

const StudentProto = Object.create(personProto);
StudentProto.init = function(firstName,birthYear,course) {
    personProto.init.call(this,firstName,birthYear);
    this.course = course;

}

StudentProto.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}
const jay = Object.create(StudentProto);

jay.init('Jay',2010,'Computer Science');

jay.introduce();

jay.calcAge();

*/

// Another Class Example


// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods

// (There is also static version) 

class Account {

    // public fields (These fields will be present on all the instances which will be created from this class ..they are not present on the prototype)
    locale = navigator.language;
    
    // Private Fields (these are instance fields, that is they will be present on all the instances created from this class.. they are not present on the prototype)
    #movements = []; // by using # we are making it truly private, which means it can't be accessed from outside the class
    #pin;
    constructor(owner, currency,pin) {
        this.owner = owner;
        this.currency = currency;
        // protected property
        this.#pin = pin;
        // this._movements = []; // by using _ , we are telling that this property is private and should not be accessed from outside (even though it is not truly private).
        // this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${owner}`);
    }


    // 3) Public Methods
    // These methods are called Public interface to our objects and are called APIs

    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
        return this; // here this will point to the whole object
    }

    withdraw(val) { // withdrawal is simply deposition of negative movements (Abstraction)
        this.deposit(-val); // using this to call another method
        return this;
    }


    requestLoan(val) {
        // if(this.#approveLoan()) {
            if(this._approveLoan()) {
            this.deposit(val);
            console.log(`Loan approved`);
            return this;
        }
    }

    // 4) Private Methods

    // #approveLoan() { // private by using #
    _approveLoan() {  // protected by using _
        return true;
    }

    // static methods are available not on all the instances , but only on the class itself
    static helper() {
        console.log('Hey There, i am helper fn');
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1.#movements.push(240); // it will throw error if try to access a private property of class outside it 
// acc1.movements.push(-150);
acc1.deposit(240);
acc1.withdraw(-150);
acc1.requestLoan(1000); // we should not be able to access these critical method from outside the class ..we should foucs on data privacy and encapsulation
console.log(acc1.getMovements());

Account.helper();
// console.log(acc1.#movements); // Private fields(not accessible outside class)
// console.log(acc1.#pin);

// console.log(acc1.#approveLoan()); // error due to being private



// Chaining 

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());





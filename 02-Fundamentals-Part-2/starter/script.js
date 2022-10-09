'use strict';
/*
console.log('in strict mode');

// Function declaration
function calcAge1(age) {
    return 2037 - age;
}

const age1 = calcAge1(1991);


// Function expression 
const calcAge2 = function (age) { // called anonymous function (function without a name)
    return 2037 - age;
}

const age2 = calcAge2(2000);
console.log(age1, age2);


// Arrow function
const calcAge3 = birthYear => 2037 - birthYear; // implicitely return the values if one line only 
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear,firstName) => {

    const age = 2037 - birthYear;
    const retirementTimeLeft = 60 - age;
    return `${firstName} retires in ${retirementTimeLeft} years`;

}

console.log(yearsUntilRetirement(1991,'Jonas'));
console.log(yearsUntilRetirement(1999,'Nikhil'));
*/


/*
function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor (apples, oranges) {
    const applePieces = cutFruitPieces(apples); // calling fn inside other function
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} oranges pieces`;
    return juice;
}

console.log(fruitProcessor(2,3));
*/

//Objects methods

const jonas = {
    firstName: 'jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael','Peter','Steven'],
    hasDriversLicense: true,
    study: {
        class:'IX',
        rollNumber: 29,
        display: function () {
            // console.log('this',this);
            console.log(`Student study in ${this.class} and roll Number is ${this.rollNumber}`);
        },
        hasDocuments: {
            science: 'yes',
            maths:'yes',
            studySubjects: function (){
                // console.log('this is -----',this);
                console.log(`Studies subjects as Science ${this.science} and maths ${this.maths}`);
            }
        }

    },
    calcAge: function () {
       //  console.log('This is ',this);
        this.age = 2037 - this.birthYear;
        return this.age;
        //return `Age of ${this.firstName} ${this.lastName} is ${2037 - this.birthYear}`;
    },

    getSummary: function() {
        return (`${this.firstName} is a ${this.calcAge()}-year old ${jonas.job} and he has ${this.hasDriversLicense ? 'a': 'no'} driver's license`);
    }

}

const jimmy = {
    firstName:'Jimmy',
    lastName:'Lander',
    birthYear: 1970,
    job: 'teacher',
    friends: ['Michael','Peter','Steven'],
    hasDriversLicense: true,
}
// jonas.calcAge() ''this'' becomes the object which is calling the method
const jonasAge = jonas.calcAge();
console.log(jonasAge);

const jimmyAge = jonas.calcAge.call(jimmy);
console.log(jimmyAge);

const jimmyAge1 = jonas.calcAge.apply(jimmy);
console.log(jimmyAge1);

const jimmyAge2 = jonas.calcAge.bind(jimmy);
console.log(jimmyAge2(jimmy.birthYear));


jonas.study.display();
jonas.study.hasDocuments.studySubjects();

console.log(jonas.getSummary());
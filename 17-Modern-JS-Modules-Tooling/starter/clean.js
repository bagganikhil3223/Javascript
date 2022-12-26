'use strict';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]); // it will make this as immutable

// NOTE --> Object.freeze will make it a shallow freeze not a deep freeze, which means we can't add new things and update on first level but update the values of existing things in it.
// Eg :-> we can do like ----- budget[0].value = 100000; but we can't do like budget[0] = 1000;

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
}); // making this as immutable, which means we can't add any new properties in this object now

// spendingLimits.jay = 200;
// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
// console.log(spendingLimits); // will not work and will not add this new property
const getLimit = (limits,user) => limits?.[user] ?? 0;

// A function that produces a side effects is called as impure functions, which means it is attempting to manipulate the object or value which is outside of it's scope


// Pure Function as it is not producing any side effects..
const addExpense = function (state,limits,value, description, user='jonas') {
  const cleanUser = user.toLowerCase();

 return value <= getLimit(limits,cleanUser) ? [...state, { value: -value, description, user:cleanUser }] : state;
    // budget.push({ value: -value, description, user:cleanUser });
};
const newBudget1 = addExpense(budget,spendingLimits,10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1,spendingLimits,100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2,spendingLimits,200, 'Stuff', 'Jay');



// Learn about composing and currying and how it works


const checkExpenses = function (state,limits) {

  // using map to create new state rather than mutating original state
  return state.map(entry => {
    return entry.value < -getLimit(limits,entry.user) ? {...entry, flag:'limit'}: entry;
  });
  // for (const entry of budget) {

  //   if (entry.value < -getLimit(limits,entry.user)) {
  //     entry.flag = 'limit';
  //   }
  // }
};
const finalBudget = checkExpenses(newBudget3,spendingLimits);

console.log(finalBudget);

// Impure Function as it console.logs() which makes it impure
const logBigExpenses = function (state,bigLimit) {


  // functional code 
  const bigExpenses = state.filter(entry => entry.value <= -bigLimit).map(entry => entry.description.slice(-2)).join(' / ');
  // .reduce((str,cur) => `${str} / ${cur.description.slice(-2)}`,'');
  console.log(bigExpenses);

  // Imperative code 
  // let output = '';
  // for (const entry of budget) {
  //   output+= entry.value <= -bigLimit ? `${entry.description.slice(-2)} / `: '';
  //   // Emojis are 2 characters that's why we sliced last 2 chars
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);

};

logBigExpenses(finalBudget,1000);

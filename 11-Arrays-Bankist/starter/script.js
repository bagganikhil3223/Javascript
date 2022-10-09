'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



const displayMovements = function(movements,sort = false) {
  containerMovements.innerHTML = ''; // emptying the container before inserting elements
  // Similar to textContent and other properties 

  // Here we have used slice to create copy of the array elements so that we don't mutate the original array in case we want the default behaviour of undoing sorting.
  // Also we could have used spread operator to create copy but after using that we would have been not able to chain method to it (like sort here).
  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;

  movs.forEach(function(mov,i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html); // to insert html from js file to html ..accepts two parameters(1st is position where we want to insert and 2nd is html to insert);

  });
  
}





const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc,mov) => acc + mov,0);
  labelBalance.textContent = `${acc.balance}€`;
};



// console.log(containerMovements.innerHTML);

const calcDisplaySummary = function(account) {
  const incomes = account.movements.filter(mov => mov > 0).reduce((acc,mov) => acc + mov,0);
  labelSumIn.textContent = `${incomes}€`;
  const outComes = account.movements.filter(mov => mov < 0).reduce((acc,mov) => acc + mov,0);
  labelSumOut.textContent = `${Math.abs(outComes)}€`;

  const interest = account.movements
  .filter(mov => mov > 0)
  .map(deposit => deposit * account.interestRate / 100 )
  .filter((int,i,arr) => {
    return int >=1;
  })
  .reduce((acc,int) => acc + int,0);
  labelSumInterest.textContent = `${interest}€`;

};

const updateUI = function(acc) {
  // Display movements

  displayMovements(acc.movements);

  // Display balance

  calcDisplayBalance(acc);

  // Display Summary

  calcDisplaySummary(acc);

}



const createUsernames = function(accs) {

  accs.forEach(accs => {
    accs.username = accs.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
}

createUsernames(accounts);
// console.log(accounts);


// Event Handlers

// NOTE --> When button is in a form and we click submit, the default behaviour is tha page to reload.

let currentAccount; // keeping it outside to know which is current account logged in
btnLogin.addEventListener('click',function(event) {
  // Prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and Messages
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Clear input fields

    inputLoginUsername.value = inputLoginPin.value = ''; // assignment works from right to left;
    inputLoginPin.blur(); // to remove the focus from input field

    updateUI(currentAccount);

  }
});


// Implementing transfer of money

btnTransfer.addEventListener('click', function(event) {

  event.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';


  console.log(amount , receiverAccount);
  if(amount > 0 && receiverAccount && 
    currentAccount.balance >= amount && receiverAccount?.username !== currentAccount.username) {

      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAccount.movements.push(amount);
      updateUI(currentAccount);
  }

});

// Implementing Loan Feature

btnLoan.addEventListener('click', function(event) {
  event.preventDefault();

  const loanAmount = +inputLoanAmount.value;

  if(loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1)) {
    //Add Movement to current account
    currentAccount.movements.push(loanAmount);

    // Update UI
    updateUI(currentAccount);

  }
  inputLoanAmount.value = '';
});

// Implementing close account feature

btnClose.addEventListener('click', function(event) {
  event.preventDefault();
  const userToCloseAccount = inputCloseUsername.value;
  const userToClosePin = +inputClosePin.value;

  if(currentAccount.username === userToCloseAccount && currentAccount.pin === userToClosePin) {

    const index = accounts.findIndex(acc=> acc.username === currentAccount.username); // to find the index of particular element in the element..Works even on complex arrays like containing objects
    console.log(index);
    // .indexOf(23);

    // Delete Account
    accounts.splice(index,1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';

});

let sorted = false;
btnSort.addEventListener('click',function(event) {
  event.preventDefault();
  displayMovements(currentAccount.movements,!sorted);
  sorted = !sorted;
})




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*

// SLICE (Returns a new array)
let arr = ['a','b','c','d','e'];
console.log(arr.slice(2)); // with start parameter
console.log(arr.slice(2,4)); // with start and end parameter
console.log(arr.slice(-2)); // negative paramter
console.log(arr.slice(-1));
console.log(arr.slice(1,-2));
console.log(arr.slice()); // Creating a shallow copy (without passing any argument)
console.log([...arr]);


// SPLICE (it does change the original array i.e it mutates the array)
console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1,2); // start parameter and delete count( no of items to be deleted from start index)
console.log(arr);


// REVERSE (it reverse the array and mutates it .. i.e original array is changed)
arr = ['a','b','c','d','e'];
const arr2 = ['j','i','h','g','f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT (it concat two arrays and doesn't mutate arrays)

const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr,...arr2]);

// JOIN 

console.log(letters.join(' - '));

*/

/*

// AT Method (ES2022)

const arr = [32,22,11];
console.log(arr[0]);
console.log(arr.at(0));

// getting last array element
console.log(arr[arr.length -1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1)); // last element using at method and helpful in method chaining

// also works on strings

console.log('Jonas'.at(0));
console.log('Jonas'.at(-1));

*/

/////////////////

/*

// FOREACH

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for(const movement of movements) {
for(const [i,movement] of movements.entries()) {
  if(movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

const forEachHelper = function(element, index) {
  console.log(`Element is ${element} and is present at ${index}`);
}

movements.forEach(forEachHelper);


console.log('------FOREACH-------');
movements.forEach(function(mov,i,arr) { // receives current element, index and entire array (order matters here like first argument will be element, second will be index and third will be whole array)
  if(mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// IMPORTANT NOTE --> Break and Continue do not work in forEach loop, so if we really need to use break or continue we need to use for of loop

// ITERATIONS----
// 0: function(200)
// 1: function(450)
// 2: function(-400)
// ....

*/

//////////////

/*

// FOREACH ON SETS AND MAPS


// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value,key,map) {
  console.log(`${key}: ${value}`);
});


// Set

const currenciesUnique = new Set(['USD','GBP','USD','EUR','EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function(value,_,map) { 
  console.log(`${value}: ${value}`);
});

// Since sets don't have keys and it doesn't make any sense to include the third parameter in forEach for Sets,
// so to avoid that confusion ,js developers kept the same signature for this and here we use _ to denote that it is a throwaway variable (which is not required)

*/


// Map Method 

/*

const euroToUsd = 1.1;

// const movementsUsd = movements.map(function(mov) {
//   return mov * euroToUsd;
// });

const movementsUsdArr = movements.map(mov => mov * euroToUsd);

console.log(movements);
console.log(movementsUsdArr);

const movementsUsdFor = [];
for(const mov of movements) {
movementsUsdFor.push(mov * euroToUsd);
}

console.log(movementsUsdFor);


const movementDescriptions = movements.map((mov,i) => 
`Movement ${i + 1}: You ${mov > 0 ? 'deposited': 'withdrew'} ${Math.abs(mov)}`
);

console.log(movementDescriptions);

const newArr = [1,2,3,4,5].map(function(ele) {
return ele > 3;
});
console.log(newArr);

*/

// Filter Method

/*

const deposists = movements.filter(function(mov) {
return mov > 0;
});

console.log(deposists);
console.log(movements);

const deposistsFor = [];
for(const mov of movements) {
  if(mov > 0) {
    deposistsFor.push(mov);
  }
}
console.log(deposistsFor);

const withdrawals = movements.filter(function(mov) {
  return mov < 0;
});

console.log(withdrawals);

*/

// Reduce Method

/*

console.log(movements);

// accumulator --> Snowball

// reduce has 2 parameters, 1st is callback fn which has 4 arguments.
// accumulator to accumulate values and rest 3 are same as all previous methods.
// 2nd Argument of reduce method is initial value of accumulator..
// Always remember we have to return the result of operation with accumulator.
// const balance = movements.reduce(function(acc,mov,i,arr) {
//    return acc + mov;
// },0);

const balance = movements.reduce((acc,mov) => acc + mov,0);
console.log(balance);

let balance2 = 0;

for(let mov of movements) {
  balance2+=mov;
}

console.log(balance2);


// Maximum Value

const maximumVal = movements.reduce((acc,mov) => {
  if(acc > mov) {
    return acc;
  } else {
    return mov;
  }
},movements[0]);

console.log(maximumVal);

*/

// Methods Chaining

/*

const euroToUsd = 1.1;

// PIPELINE
const totalDepositUSD = movements.filter(mov => mov > 0).map(mov => mov * euroToUsd).reduce((acc,mov) => acc + mov,0);
console.log(totalDepositUSD);

*/

// Find Method 

/*

// (to retreive one element from array based on condition)
// It returns the first element in the array that satisfies the condition

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

*/

// Some and Every Method

/*

console.log(movements);
// Checks for Equality
console.log(movements.includes(-130));

// Checks for Condition (Some)
console.log(movements.some(mov => mov === -130)); 


const anyDeposits = movements.some(mov => mov > 1500); // returns true or false
console.log(anyDeposits);

// Every

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback

const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

*/

// Flat and FlatMap Methods (Introduced in ES2019)

/*

const arr = [[1,2,3],[4,5,6],7,8]; // removed the nested arrays and flatten the array (goes to one level only)
console.log(arr.flat()); // accepts depth as the argument (by default it is 1)

const arrDeep = [[[1,2],3],[4,[5,6]],7,8];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc,mov) => acc + mov,0);
// console.log(overallBalance);

// Using Chaining (flat)

const overAllBalance = accounts.map(acc => acc.movements).flat().reduce((acc,mov) => acc + mov,0);
console.log(overAllBalance);

// It is noticed that flat and map method are usually chained together so flatmap does this combination and is good for performance

const overAllBalance2 = accounts.flatMap(acc=> acc.movements).reduce((acc,mov) => acc + mov,0); // flatmap also goes one level deep only..so if we want to go to more deep level, we need to use flat method then.
console.log(overAllBalance2);

*/

// Sorting  (it mutates the original array)

/*

// NOTE --> By default sort method works on strings, so if we are sorting numbers ,we have to be careful
// So for sort method to work perfectly on numbers , we should pass compare callback function


// Strings
const owners = ['Jonas','Zach','Adam','Martha'];
console.log(owners.sort());
console.log(owners);


// Numbers
console.log(movements);

// return < 0 , A ,B (keep order)
// return > 0 , B, A (switch order)

// Ascending Order
// movements.sort((a,b) => { // here a is the current value and b is the next value

//   if(a > b) {
//     return 1;
//   } 
//   if(b>a) {
//     return -1;
//   }
// });
movements.sort((a,b) => a - b ); // since we return something that is positive in case of sorting ascendingly, so here a - b will always give positive value if a is greater than b 

console.log(movements);

// Descending Order

// movements.sort((a,b) => { // here a is the current value and b is the next value

//   if(a > b) {
//     return -1;
//   } 
//   if(b>a) {
//     return 1;
//   }
// });

movements.sort((a,b) => b - a);

console.log(movements);

*/

// More Ways of Creating and Filling Arrays

// Fill method is used to fill values in array generated programatically and it does mutate the array.

const arr = [1,2,3,4,5,6,7];
console.log(new Array(1,2,3,4,5,6,7));

// Empty array + fill method 
const x = new Array(7); // will create 7 empty spaces and which will be of no use
console.log(x);
// console.log(x.map(() => 5));

x.fill(1,3,5); // 3 parameters , (value to fill , starting index, ending index)
x.fill(1);
console.log(x);

// Array with existing elements + fill method
arr.fill(23,2,6);
console.log(arr);


// Array.from (we can create array like structures from iterables like set map strings etc using this Array.from)

const y = Array.from({length: 7}, () => 1);
console.log(y);

const z = Array.from({length:7} , (_,i) => i + 1); // using _ as throwaway variable as we only using index not the current variable.
console.log(z);

labelBalance.addEventListener('click', function() {

  const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
  el => +el.textContent.replace('€',''));
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')]; // we can also use this to convert it into array like structure
  console.log(movementsUI2);

});

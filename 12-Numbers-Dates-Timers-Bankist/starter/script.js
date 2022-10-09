'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-09-30T17:01:17.194Z',
    '2022-10-03T23:36:17.929Z',
    '2022-10-06T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function(date,locale) {
  const calcDaysPassed = (date1,date2)  => 
    Math.round(Math.abs(date2-date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(),date);
    console.log(daysPassed);

    if(daysPassed === 0) return `Today`;
    if(daysPassed === 1) return `Yesterday`;
    if(daysPassed <= 7) return `${daysPassed} days ago`; 
    // else {
    //   const day = `${date.getDate()}`.padStart(2,0);
    // const month = `${date.getMonth() + 1}`.padStart(2,0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    //}
    return new Intl.DateTimeFormat(locale).format(date);


}


const formatCurrency = function(value,locale,currency) {
  const formattedMov = new Intl.NumberFormat(locale , {
    style:'currency',
    currency:currency
  }).format(value);

  return formattedMov;

}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date,acc.locale);

    const formattedMov = formatCurrency(mov,acc.locale,acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(acc.balance,acc.locale,acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes,acc.locale,acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(out,acc.locale,acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(interest,acc.locale,acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function() {
  const tick = function() {
    // in each call print the remaining time on UI
    const min = String(Math.trunc(time / 60)).padStart(2,0);
    const sec = String(time % 60).padStart(2,0);
    labelTimer.textContent = `${min}:${sec}`;

    // when 0 seconds , stop timer and log out user
    if(time===0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease the timer
    time-=1;
  }
  // Set time to 5 minutes
  let time = 120;
  // Call the timer every second
  tick(); // calling it immediately so that it should start working immediately as soon as user logs in and doesn't wait for 1 second of set interval
  const timer =  setInterval(tick,1000); 
  return timer; 

}

///////////////////////////////////////
// Event handlers
let currentAccount,timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create Current date and time

    const now =  new Date();
const options = {
  hour:'numeric',
  minute:'numeric',
  day:'numeric',
  month:'numeric',
  year:'numeric',
  // weekday:'long'
}

// Getting the locale from user's browser
// const locale = navigator.language;
// console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,options).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2,0);
    // const month = `${now.getMonth() + 1}`.padStart(2,0);
    // // const day = now.getDate() > 10 ? now.getDate() : `0${now.getDate()}`;
    // // const month = now.getMonth() + 1 > 9 ? now.getMonth() + 1: `0${now.getMonth() + 1}`
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2,0);
    // const minutes = `${now.getMinutes()}`.padStart(2,0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // timer
    if(timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
    currentAccount.movements.push(amount);

    // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();

    },2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*

// In JS all numbers are floating point numbers
// In JS , numbers are 64 base 2 ( i.e they are binary in form of 0 and 1);

// Base 10 --> 0 to 9
// Binary base 2 --> 0 and 1
// so sometimes it becomes difficult to store fraction values in JS like 0.1
console.log(23 === 23.00); // true
console.log(0.1 + 0.2); // gives a weird result of 0.3000000000004 but it should have been 0.3 only 


//Conversion
console.log(Number('23'));
console.log(+'23');


//Parsing 
console.log(Number.parseInt('30px', 10)); //30  // to convert a string into number and it will only convert if string starts with a number else it will give NAN  
console.log(Number.parseInt('34ecj23',10)); // 34


console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(Number.parseInt('  2.5rem ')); // 2 // doesn't matter if there are whitespaces or not

// console.log(parseInt('2.5')); // this will also work but it is encouraged to use these methods on numbers object

// Check if value is NAN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false 
console.log(Number.isNaN(+'20px')); // true
console.log(Number.isNaN(23 / 0 )); // false (result is Infinite)

// Best way to check if a value is a number or not
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0 )); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false

*/

// Rouding in JS

/*

console.log(Math.sqrt(25));
console.log(5 ** (1/2)); // sqrt using exponentiation way
console.log(8 ** (1/3)); // cubic root using exponentiation way

// Math.max does type coercion but not parsing 
console.log(Math.max(5,124,42,6,78)); // 124
console.log(Math.max(5,'124',42,6,78)); // 124
console.log(Math.max(5,'124px',42,6,78)); // NAN


console.log(Math.min(5,124,42,6,78)); // 5

console.log(Math.PI * Number.parseFloat(`10px`) ** 2); 

console.log(Math.trunc(Math.random() * 6) + 1); // using trunc it will delete all the data after decimal.

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
// because random will give us 0...1  ---> 0 ....(max - min) --> (now adding min on both sides below) 
// ---> 0+min .... (max - min + min) ---> min ---- max

console.log(randomInt(10,20));

// Rounding Integers

console.log(Math.trunc(23.3)); // 23  remove any decimal part always

// will round till near integer
console.log(Math.round(23.4)); //23
console.log(Math.round(23.9)); // 24

console.log(Math.ceil(23.9)); // 24
console.log(Math.ceil(23.9)); // 24

console.log(Math.floor(23.9)); // 23
console.log(Math.floor(23.9)); // 23

// Rounding Decimals 

console.log((2.7).toFixed(0));// 3 // to fixed will always return a string , not number
console.log((2.7).toFixed(3)); // 2.700 to fixed will always return a string , not number
console.log((2.345).toFixed(0)); // 2.35 // to fixed will always return a string , not number

*/


// The Remainder Operator
/*
console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

console.log(6 % 2);
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

*/

// Numeric Separators (ES2021)
/*Whenever we want to represent big numbers in JS into something like thousands or hunderes we can use underscores to 
tell that it if we were to say that number in real world , we would have used something like below
Also this separator works only between numbers, not in front , not at the back and not after anything
that is not a number
Also it doesn't work if present in a string
*/

/*

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.1415;
console.log(PI);

console.log(Number('230_000'));
console.log(parseInt('230_000'));

*/

// BigInt(ES2020)

/*
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302));

// Operations
console.log(10000n + 10000n);
console.log(36286372637263726376237263726372632n * 10000000n);
// console.log(Math.sqrt(16n));

const huge = 20289830237283728378237n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');

console.log(huge + ' is REALLY big!!!');

// Divisions
console.log(11n / 3n);
console.log(10 / 3);

*/

// DATES in JS

/*
// Create a date

const now = new Date();
console.log(now);

console.log(new Date('Aug 02 2020 18:05:41'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));


// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142256980000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);

*/

/*
const num = 43443363.22;
const options = {
  style: 'currency',
  unit:'celsius',
  currency:'EUR',
  // useGrouping:false
}

console.log('US  ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany  ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria  ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log('Syria  ', new Intl.NumberFormat('ar-SY', options).format(num));

*/

// SetTimeout and SetInterval 

// settimeout runs once after a defined amount of time
// Setinterval keeps running forever until we stop it.



// SetTimeout
const ingredients = ['olives','spinach'];
// creating a timer and assigning it to a variable
const pizzaTimer = setTimeout(() => {
  console.log(`Here is your pizza with ${ing1} and ${ing2}`)
},3000,...ingredients); 

console.log('Waiting...');

if(ingredients.includes('spinach')) {
  clearTimeout(pizzaTimer); // canceling the timer
}


// SetInterval

// setInterval(function() {
//   const now = new Date();
//   console.log(now);

// },1000);
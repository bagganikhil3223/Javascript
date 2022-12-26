'use strict';




const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function(message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  countriesContainer.style.opacity = 1;
}

const renderCountry = function(data,className='') {
  const html = `
      <article class="country ${className}">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} M</p>
              <p class="country__row"><span>🗣️</span>${data.languages}</p>
              <p class="country__row"><span>💰</span>${data.currencies}</p>
            </div>
      </article>
      `;
  
      countriesContainer.insertAdjacentHTML('beforeend',html);
      countriesContainer.style.opacity = 1;
}

///////////////////////////////////////
console.log('Async'); 

// const getCountryData = function (country) {


// const request = new XMLHttpRequest();

// request.open('GET',`https://restcountries.com/v3.1/name/portugal`);
// request.send();
// console.log('Res is ', request.responseText); // we can't get response here since we have to wait to data to load that's why we used addEventListener


// request.addEventListener('load', function() {
//     const [data] = JSON.parse(this.responseText); // string to json object 

//     console.log('Response Data is ',data); // here this refer to "request"

//     const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} M</p>
//             <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
//             <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
//           </div>
//     </article>
//     `;

//     countriesContainer.insertAdjacentHTML('beforeend',html);
//     countriesContainer.style.opacity = 1;
// });



// getCountryData('portugal');
// getCountryData('usa');



// Callback Hell

// const getCountryAndNeighbour = function (country) {

//   // Ajax call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   console.log('Res is ', request.responseText); // we can't get response here since we have to wait to data to load that's why we used addEventListener
  
//   request.addEventListener('load', function() {
//       const [data] = JSON.parse(this.responseText);
  
//       console.log('Response Data is ',data); // here this refer to "request"

//       // render country 1
//       renderCountry(data); 

//       // get neighbour country 

//       const [neighbour] = data.borders;
//       console.log(neighbour);

//       // Guard Clause
//       if(!neighbour) return;

//       //Ajax call country 2
//       const request2 = new XMLHttpRequest();
//   request2.open('GET',`https://restcountries.com/v3.1/alpha/${neighbour}`);
//   request2.send();
//   // console.log('Res is ', request.responseText); // we can't get response here since we have to wait to data to load that's why we used addEventListener
  
//   request2.addEventListener('load', function() {
//       const [data2] = JSON.parse(this.responseText);
  
//       console.log('Response Data is ',data2); // here this refer to "request"

//       // render country 1
//       renderCountry(data2,'neighbour'); 
//   });
      
      
//   });
//   }

//   getCountryAndNeighbour('portugal');

  

  // Early way 
  // const request = new XMLHttpRequest();
  // request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
  // request.send();


  

  // Promises and fetch api

  // consuming a promise 
   

  // const request1 = fetch('https://restcountries.com/v3.1/name/portugal');
  // console.log('request is ',request1); 



  // const getCountryData = function (country) {
  //   fetch(`https://restcountries.com/v3.1/name/${country}`).then(function (response) {
  //     console.log('Response is ',response); // here we are handling fulfilled promise using then method, now to
  //     return response.json();                                  // read data we need to use json() method on response which itself returns promise
  //   }).then(function(data) {
  //     console.log(data);
  //     renderCountry(data[0]); // here we handled the result of data returned by json() method on response of promise
  //   });
  // }

  // getCountryData('portugal');

  // More Cleaner way of handling async data



const getJSON = function(url, errorMsg='Something went wrong') {
  return fetch(url).then(response => {
    if(!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`);
    }
    return response.json();
  });
}


//   const getCountryData1 = function (country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`) 
//     .then((response) => {
//       console.log('res is ',response);
//       if(!response.ok) {
//         throw new Error(`Country not found ${response.status}`)
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       // const neighbour = 'dsss';

//       // Guard Clause
//       if(!neighbour) return;

//       //Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if(!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }
//       return response.json();
//     }
//       ).then(data => {
//       console.log('Data is ',data);
//       renderCountry(data,'neighbour');
//     }).catch(err =>  // here catch will handle error wherever it happend in promise chain. error will propagate down
//       {
//         console.log(`${err} 🤐🤐🤐`)
//         renderError(`Something went wrong 🤐🤐🤐 ${err.message}. Try again!`)
//       }).finally(() => { // will always be called whether promise is fulfilled or rejected
//         countriesContainer.style.opacity = 1;
//       });
//   }

//   getCountryData1('portugal');
  



  // const getCountryData = function (country) {

  //   getJSON(`https://restcountries.com/v3.1/name/${country}`,'Country not found')
  //   .then(data => {
  //     renderCountry(data[0]);
  //     const neighbour = data[0]?.borders[0];
  //     console.log('Neighbour is ',neighbour);
  //     // const neighbour = 'dsss';

  //     if(!neighbour) throw new Error('No neighbour found');

  //     //Country 2

  //     return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`,'Country not found');
  //   }).then(data => {
  //     console.log('Data is ',data);
  //     renderCountry(data,'neighbour')
  //   }).catch(err =>  // here catch will handle error wherever it happend in promise chain. error will propagate down
  //     {
  //       console.log(`${err} 🤐🤐🤐`);
  //       renderError(`Something went wrong 🤐🤐🤐 ${err.message}. Try again!`)
  //     }).
  //     finally(() => { // will always be called whether promise is fulfilled or rejected
  //       countriesContainer.style.opacity = 1;
  //     });
  // }





  // btn.addEventListener('click', () => {
  //   getCountryData('portugal');

  // });

  //getCountryData('usa');



// Creating Promises 

//1st way 

const lotteryPromise = new Promise(function(resolve,reject) {

  console.log('Lottery draw is happening');
  setTimeout(function () {
    if(Math.random() >=0.5) {
      resolve('You WIN 😎');
    } else {
      reject(new Error('you lose you money 😰'));
    }

  },2000);

});

lotteryPromise.then(response => console.log(response)).catch(error => console.log(error));

// promisifying settimeout 
// promisifying behaviour means to convert callback based async behaviour to promise based.

const wait = function(seconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve,seconds * 1000);
  });
}

wait(2).then(() => {
  console.log('I waited for 2 seconds');
  return wait(1);
}).then(() => {
  console.log('I waited for 1 more second');
});


// 2nd way

// Promise.resolve('Abc').then(res => console.log(res));
// Promise.reject(new Error('Error occured')).catch(err => console.error(err));


// Promisifying Geolocation API


console.log('Getting Started');

const getPosition = function() {
  return new Promise(function(resolve,reject) {
    // navigator.geolocation.getCurrentPosition(
    // position => resolve(position),
    // err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve,reject);
  });
}

// getPosition().then(res => console.log(res));



// Consuming promises using async/await
// Async functions keeps running in the background to perform the tasks and async functions automatically returns promise

// we can have one or more await statements inside an async function
// Await will stop the execution of code at this point of the function until the promise is fulfilled.
// await can only be used inside an async function 

const whereAmI = async function(country) {

  // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));
try {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);

  return `You have succesfully received value of country ${country}`;
}catch(err) {
  console.log("Error Occured");
  // rethrowing error because async functions returns fulfilled promises and not errors if any
  throw new Error('Error while fetching some data from api');
}
};
// whereAmI('portugal');
console.log('FIRST');

// since we can't chain errors in async and await, so we handle the errors using try catch

// Handling Errors using try catch 

// so to handle errors in async functions or overall , we can use these try catch blocks
/*
try {

}

catch(err) {

} 

*/

// Returning Values from Async functions 
// i'm using upper whereAmI method to get the value from async function 

// 1st way is to use mix and match of then handlers

// it will go in catch block to print error as we have rethrown it from catch block upwards.
// whereAmI('hdhdhdhdh').then(city => console.log(`city is ${city}`)).catch(err=> console.log(`Error happened ${err}`));

// This promise will be fullfilled and will return us value and here we are using old way of consuming promises

//whereAmI('portugal').then(city => console.log(`city is ${city}`)).catch(err=> console.log(`Error happened ${err}`));

// 2nd way is by using IIFE so that it gets executed immediately

// (async function() {
//   try {
//     const city = await whereAmI('portugal');
//     console.log(`2: ${city}`);
//   }
//   catch(err) {
//     console.log(`2: ${err.message}`);
//   }
//   console.log('Finished getting location');
// })();



// Running Promises in Parallel 

// const get3Countries = async function(c1,c2,c3) {

//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

//     // console.log([data1.capital,data2.capital,data3.capital]);

//     // now doing all these requests in parallel using Promise.all(), Promise.all is a combinator function

//     // Very important note:::: If any of the promises in Promise.all() rejects, then all Promise.all() gets reject as well
//     // i.e Promise.all shortCircuits if one or more promise rejects

//     const data = await Promise.all([
//     getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//     getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//     getJSON(`https://restcountries.com/v3.1/name/${c3}`)
//   ]);

//   console.log('Inside Promise.all Impl ',data.map(d => d[0].capital));

//   } catch(err) {
//     console.error(err);
//   }
// }

// get3Countries('portugal','canada','tanzania');


// Other Promise Combinator functions  (Race, allsettled and any)

// Promise.race --> receives array of promises and return a new promise (the promise which wins the race and fulfilment value is the value of winning Promise's fulfilment value).
// it settles as soon as one of the promises settles (i.e value is available (either resolved or rejected))

// (async function() {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`)
//   ]);

//   console.log(res[0]);
// })();


// const timeout = function(seconds) {

//   return new Promise(function(_,reject) {
//     setTimeout(() => {
//       reject('Request took too long !!');
//     }, seconds * 1000);
//   });
// }

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/tanzania`),
//   timeout(0.5)
// ]).then(res => console.log(res[0])).catch(err => console.error(err));


// Promise.allSettled (ES2020)

// It is similar to promise.all , but it never shortcircuits the result (i.e it will not reject even if any promise is rejected)
// it takes array of promises and returns array of settled promises whether fulfilled or rejected


// Promise.allSettled([
//   Promise.resolve("Success"),
//   Promise.reject("ERROR"),
//   Promise.resolve("Another Success")
// ]).then(res => console.log('Response is ',res));

// so it will be rejected as it gets shortcircuited due to one failed promise
// Promise.all([
//   Promise.resolve("Success"),
//   Promise.reject("ERROR"),
//   Promise.resolve("Another Success")
// ]).then(res => console.log('Response is ',res)).catch(err => console.error('Error is ',err));


// Promise.any (ES2021)
// It is similar to promise.race
// It will take an array of promises and will return the 1st fulfilled promise and rejected promises are ignored

// Promise.any([
//   Promise.resolve("Success"),
//   Promise.reject("ERROR "),
//   Promise.resolve("Another Success")
// ]).then(res => console.log('Response inside Promise.any ',res)).catch(err => console.error('Error is ',err));




  
     


// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

*/





// const whereIAm = function(){
//   getPosition().then(res => {
//     const {latitude:lat,longitude:lng} = res.coords;
//     console.log(lat,lng);

//     let apiRes = fetch(`https://geocode.xyz/${lat},${lng}?geoit=JSON&auth=528577408555332375238x22609`);
//     return apiRes;
//   }).


//   then(result => {
//     if(result.status === 403) {
//       throw new Error('An Error Encountered');
//     }
//     return result.json();
//   }
//     )

//   .then(data => {
//     // getCountryData(`${data.country}`);
//     console.log(`You are in ${data.city}, ${data.country}`);
//     return fetch(`https://restcountries.com/v3.1/name/${data.country}`);

//   }).then(res => res.json()).then(data => renderCountry(data[0]))

//   .catch(err => console.error('Wrong Country Entered',err));

// }

// whereIAm();

// whereIAm(52.508, 13.381);
// whereIAm(19.037, 72.873);
// whereIAm(-33.933, 18.474);























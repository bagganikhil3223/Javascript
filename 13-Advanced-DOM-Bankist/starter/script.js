'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault(); // since anchor tags have href property and whenever we click them they move page to top...so to avoid that behaviour we can use event.preventDefault to prevent it's default behaviour.
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////
/////////////////////


// Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections); // It Returns a nodelist

document.getElementById('section--1'); // it returns HTMLCOllection
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // It returns HTMLCollection

console.log(document.getElementsByClassName('btn')); // Returns HTML collection

// NOTE --> HTMLCOllection are live,which means if we remove/add anything from/to these, the impact are seen immediately and collections are updated
// while Nodelists are not live which means impact is not seen and they are not updated automatically


// Creating and Inserting elements

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent='We use cookies for improved functionality and analytics';
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

// header.prepend(message); // Prepend insert the element as first child (so here message will be first child of header)
header.append(message); // it will insert the element as last child

// header.append(message.cloneNode(true)); // to copy it and appending 

// NOTE --> A DOM element is unique and it can only exist a one place (like in upper place)
// we first prepended and then appended ,ideally it could have been at 2 places since we perfomed 2 operations
// but since dom elements are live elements so they exist at only one place. 

//header.before(message);
//header.after(message);


// Deleting Elements

document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove(); // recent and modern way of removing element from dom
  // message.parentElement.removeChild(message); // old way of deleting by traversing to parent element and from their removing the child
});


// Styles
message.style.backgroundColor = '#37383d';
message.style.width='100%';

console.log(message.style.color); // it will return nothing as are inline styles, and returns only the styles which we set on them
console.log(message.style.backgroundColor);


// Now to get the styles which are applied by us or are calculated by browser , we use getComputedStyles method

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// message.style.height = getComputedStyle(message).height + 40 + 'px'; // here this will not work as we are adding a string to a number so to work it properly , we need to parse it

message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 30 + 'px';

// Now to change value of css variables, we can use setProperty Method
// Things declared in :root { } in CSS file are css variables, and root is like document of css ..

document.documentElement.style.setProperty('--color-primary','orangered');


// Attributes


const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful Minimalist logo';

// Non Standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company','Bankist');

console.log(logo.src); // logo.src returns the absolute url
console.log(logo.getAttribute('src')); // here we are getting src with getAttribute method , it returns the relative url


const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data Attributes (these are special attributes which starts with data keyword)

// these special attributes are stored in dataset Object
console.log(logo.dataset.versionNumber); // here version Number is in camelcase but in our html it is version-data , so data present in data- attribute is present in ""dataset in JS""

// Classes

logo.classList.add('c','j');
logo.classList.remove('c','j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use as it overrides all the existing classes and also it allows us to put only one class on the element 
logo.className = 'Jonas';




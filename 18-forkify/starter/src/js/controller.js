import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';

import addRecipeView from './views/addRecipeView.js';


import 'core-js/stable'; // for polifilling everything else
import 'regenerator-runtime/runtime'; // for polifilling async functions

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// hot module reloading
if(module.hot) {
  module.hot.accept();
}


const controlRecipes = async function () {
  try {

    const id = window.location.hash.slice(1); // getting the hash from location object

    // Guard Clause
    if(!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    
    // 2) Loading Recipe
    await model.loadRecipe(id); // async function needs to handle using await as it returns promise
    
    // 3) Rendering Recipe
    recipeView.render(model.state.recipe);
    
  
    
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};


const controlSearchResults = async function() {

  try {
    resultsView.renderSpinner();
    // 1) Get Search Query
    const query = searchView.getQuery();

    // Guard Clause
    if(!query) return;

    // 2) Load Search Results
    await model.loadSearchResults(query);

    // 3) Render Results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage()) ;

    // 4) Render initial pagination buttons

    paginationView.render(model.state.search);

    
    
  } catch(err) {
    console.log(err);
  }

}

const controlPagination = function(goToPage) {
  // Render New Results
  resultsView.render(model.getSearchResultsPage(goToPage)) ;

    // Render new pagination buttons

    paginationView.render(model.state.search);
}

const controlServings = function(newServings) {

  // Update the recipe servings(in state)
  model.updateServings(newServings);


  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

}

const controlAddBookmark = function() {
  // 1) Add/Remove bookmark
  if(!model.state.recipe.bookmarked)
  model.addBookmark(model.state.recipe);
  else
  model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {

  try {

    // Show Loading spinner
    addRecipeView.renderSpinner();


    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in the URL(using history)
    // reloading the page
    window.history.pushState(null,'',`#${model.state.recipe.id}`);
    // window.history.back(); going back 


    // Closing the form window
    setTimeout(function() {
      addRecipeView.toggleWindow()
    },MODAL_CLOSE_SEC * 1000);

  } catch(err) {
    console.error('ERRRR',err);
    addRecipeView.renderError(err.message);
  }

  




}




// hashchange event triggers when we hash changes in url (https:js.com/#4739479394) here 4739479394 is what called as hash because it comes after # symbol.
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

// implementing publisher-subscriber pattern

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes); // view(Publisher--> when to react) will be passed with handler function
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init(); // controller (subscriber--> wants to react) will subscribe after view reacts.


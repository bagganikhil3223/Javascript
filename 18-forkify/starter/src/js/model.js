import {API_URL,KEY,RES_PER_PAGE} from './config.js';
// import { getJSON, sendJSON} from './helpers.js';
import {AJAX} from './helpers.js';

export const state = {
    recipe:{},
    search: {
        query:'',
        results: [],
        page:1,
        resultsPerPage:RES_PER_PAGE
    },
    bookmarks:[]
}

const createRecipeObject = function(data) {

    const { recipe } = data.data;
  
       return  {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && {key:recipe.key}) // short circuiting and if doesn't short circuits then result will be returned
      };

}

export const loadRecipe = async function(id) {

    try {

      const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
      state.recipe = createRecipeObject(data);
      
      if(state.bookmarks.some(bookmark => bookmark.id === id)) {
        state.recipe.bookmarked = true;
      } else {
        state.recipe.bookmarked = false;
      }
    } catch(err) {
        // Temp error handling
        console.error(`${err} 💥💥💥💥`);
        throw err; // to catch it in controller 
    }
}

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && {key:rec.key})
            }
        });
        // resetting page when we change the search item
        state.search.page = 1;

    } catch(err) {
        console.error(`${err} 💥💥💥💥`);
        throw err; // to catch it in controller
    }
}


// implementing pagination function to fetch results

export const getSearchResultsPage = function(page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage; // 0
    const end = page * state.search.resultsPerPage; // 9

    return state.search.results.slice(start,end);
}


export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(ing => {

        // formula (newQuantity = oldQty * newServing / oldServings)
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings ;

    });

    // updating servings
    state.recipe.servings = newServings;
}


const persistBookmarks = function() {
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe) {

    // add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark

    if(recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }

    persistBookmarks();

}

export const deleteBookmark = function(id) {

    // Delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index,1);

    // delete current recipe as bookmark

    if(state.recipe.id === id) {
        state.recipe.bookmarked = false;
    }
    persistBookmarks();
}

const init = function() {
const storage = localStorage.getItem('bookmarks');
 if(storage) {
    state.bookmarks = JSON.parse(storage);
 }

}

init();

const clearBookmarks = function() {
    localStorage.clear('clear');
}

// clearBookmarks();


export const uploadRecipe = async function(newRecipe) {

    try {
    // console.log(Object.entries(newRecipe));
    const ingredients = Object.entries(newRecipe).filter(
        entry => entry[0].startsWith('ingredient') && entry[1] !=='')
        .map(ing => {
            // const ingArr = ing[1].replaceAll(' ','').split(',');
            const ingArr = ing[1].split(',').map(el => el.trim());

            if(ingArr.length !==3) {
                throw new Error('Wrong Ingredient format! Please use the correct format.');
            }
            const [quantity,unit,description] = ingArr;
            return {
                quantity:quantity ? +quantity : null,unit,description
            };
        });
        const recipe = {
            title:newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients
        };
    console.log('recipe formed is ',recipe);

    const data = await AJAX(`${API_URL}?key=${KEY}`,recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
    console.log(data);
    } catch(err) {
        throw err;
    }

}
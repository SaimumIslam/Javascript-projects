import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Like';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeViews';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

import { elements, renderLoader, clearLoader } from './views/base';
const hash = require('object-hash');


/**Global States of the app
 * - Search Object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes 
*/
const state = {};

/**
 * Search controller
*/

const controlSearch = async () => {
    //1) get query from view
    const query = searchView.getInput();

    if (query) {
        //2) new search object and add to state
        state.search = new Search(query);

        //3) prepare ui for result
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes);

        try {
            //4) search for recipes
            await state.search.getResult();

            //5)render result in ui
            clearLoader();
            searchView.renderResults(state.search.result);
        }
        catch (error) {
            console.log('error in search!!');
            clearLoader();
        }
    }

};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResults(state.search.result, gotoPage);
    }
});

/**
 * Recipe controller
*/

const controlRecipe = () => {
    recipeView.clearRecipe();
    const id = window.location.hash.replace('#', '');

    if (id) {
        //1)prepare ui for changes
        renderLoader(elements.recipeLayout);
        try{
            searchView.highlightSelected(id);
        }
        catch(err){console.log(err)}

        setTimeout(() => {
            //2)create new recipe object & get Recipe data
            try {
                state.recipe = new Recipe(state.search.result[id].recipe);
                //console.log(id, state.recipe);

                //3)calulate sarvings and time
                state.recipe.calcTime();
                state.recipe.calcServings();

                //4)render recipe
                clearLoader();
                recipeView.renderRecipe(
                    state.recipe,
                    state.likes.isLiked(state.recipe.title)
                    );

            }
            catch {
                console.log('error in recipe!!');
                clearLoader();
            }
        }, 500);
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/**
 * List controller
*/



const controlList=()=>{
    //create a list if not a ist
    if(!state.list){
        state.list=new List();
    }
    //add ingredients to the list
    state.recipe.ingridents.forEach(el=>{
        const item=state.list.addItem(el.quantity,el.measure,el.food);
        listView.renderItem(item);
    });
};

elements.shopping.addEventListener('click',event=>{
    const id=event.target.closest('.shopping__item').dataset.itemid;
    //console.log(id);

    //handle delete button
    if(event.target.matches('.shopping__delete, .shopping__delete *')){

        //delete from state
        state.list.deleteItem(id);

        //delete from ui
        listView.deleteItem(id);
    }
    else if(event.target.matches('.shopping__count--value, .shopping__count--value *')){
        const val= parseFloat(event.target.value,10);
        state.list.updateCount(id,val);
    }

});

/**
 * Like controller
*/

window.addEventListener('load',()=>{
    window.location.hash='';

    //create like object;
    if(!state.likes){
        state.likes=new Likes();
    }

    //restore likes
    state.likes.readStorage();

    //toggle like menu button
    likesView.toggleLikeMenu(state.likes.getLikes());

    //render exiting links
    state.likes.likes.forEach(el=>likesView.renderLike(el));

});

const controlLike=()=>{
    if(!state.likes){
        state.likes=new Likes();
    }
    const currentTitle=state.recipe.title;

    //user has not liked yet
    if(!state.likes.isLiked(currentTitle)){

        //add like to the state
        const newLike=state.likes.addLikes(
            currentTitle,
            state.recipe.publisher,
            state.recipe.img
            )
        //toggle the state
        likesView.toggleLikeBtn(false);


        //addLike to the ui list
        likesView.renderLike(newLike);
    }
    //user has liked current recipe
    else{
        //remvoe like from the state
        state.likes.deleteLikes(currentTitle);

        //toggle the state
        likesView.toggleLikeBtn(true);

        //removeLike to the ui list
        likesView.deleteLike(hash(currentTitle));
    }
    likesView.toggleLikeMenu(state.likes.getLikes())
    console.log(state.likes)

};

/**element handling recipe layout
*/

elements.recipeLayout.addEventListener('click',event=>{
    if(event.target.matches('.btn_decrease, .btn_decrease *')){

        //btn decrease is clicked
        if(state.recipe.servings>1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIng(state.recipe);
        }
    }
    else if(event.target.matches('.btn_increase, .btn_increase *')){

        //btn increase is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIng(state.recipe);

    }
    else if(event.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        //add ingredient to shopping list
        controlList();
    }
    else if(event.target.matches('.recipe__love, .recipe__love *')){
        //like controller
        controlLike();
    }
});

import {elements, elementStrings} from './base';

export const getInput=()=>elements.searchInput.value;

export const clearInput=()=>elements.searchInput.value='';

export const clearResult=()=>{
    elements.searchResList.innerHTML='';
    elements.searchResPages.innerHTML='';
};

export const highlightSelected=id=>{
    const resArr=Array.from(document.querySelectorAll('.results__link'));
    resArr.forEach(el=>el.classList.remove(elementStrings.highlight));
    document.querySelector(`.results__link[href*="${id}"]`).classList.add(elementStrings.highlight);
};

export const limitRecipeTitle=(title,limit=17)=>{
    let newTitle=[];

    if(title.length>limit){
        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length<=limit){
                newTitle.push(cur);
            }
            return acc+cur.length;
        },0);
        return `${newTitle.join('')}...`;
    }
    return title;
};


const renderRecipe=(recipes,id)=>{
    const markup=`
        <li>
            <a class="results__link" href="#${id}">
                <figure class="results__fig">
                    <img src="${recipes.recipe.image}" alt="${limitRecipeTitle(recipes.recipe.label)}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipes.recipe.label)}</h4>
                    <p class="results__author">${recipes.recipe.source}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend',markup);
};


const createPageButton=(page,type)=>`
    <button class="btn-inline results__btn--${type}" data-goto=${type==='prev'?page-1:page+1}>
        <span>Page ${type==='prev'?page-1:page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
        </svg>
    </button>
`;


const renderPageButton=(page,numResult,resPerPage)=>{

    const numOfPages= Math.ceil(numResult/resPerPage);
    let pageButton;

    if(numOfPages>1 && page===1){

        //only button to go to next page;
        pageButton=createPageButton(page,'next');
    }
    else if(page<numOfPages){

        //both button
        pageButton=`
            ${createPageButton(page,'prev')}
            ${createPageButton(page,'next')}
        `;
    }
    else if(page===numOfPages && numOfPages>1){

        //only button to go to previous page;
        pageButton=createPageButton(page,'prev');
    }
    if(pageButton)
    elements.searchResPages.insertAdjacentHTML('afterbegin',pageButton);
};

export const renderResults= (allRecipes,page=1,resPerPage=10 )=>{
    const start=(page-1)*resPerPage;
    const end=page*resPerPage;

    try{
        const recipes=allRecipes.slice(start,end);
        for(let i=0;i<recipes.length;i++){
            renderRecipe(recipes[i],i+start);
        }
        //allRecipes.slice(start,end).forEach(renderRecipe(cur,id));

        //render pagination
        renderPageButton(page,allRecipes.length,resPerPage);
    }
    catch(error){
        console.log(error);
    }
};
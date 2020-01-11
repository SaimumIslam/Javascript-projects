import {elements} from './base'

const formatCout=number=>{
    if(number)
    return number;
    else
    return 0;
}

const formatUnit=unit=>{
    if(unit)
    return unit;
    else
    return 'gram';
};

export const renderItem=item=>{
    const markup=`
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${formatCout(item.count)}" step="${formatCout(item.count)}" class="shopping__count--value">
                <p>${formatUnit(item.unit)}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend',markup);

};
export const deleteItem=id=>{
    const item=document.querySelector(`[data-itemid="${id}"]`);
    
    if(item)
    item.parentElement.removeChild(item);
};
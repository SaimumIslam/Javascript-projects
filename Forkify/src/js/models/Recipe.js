export default class Recipe{

    constructor(recipe){
        this.title=recipe.label;
        this.img=recipe.image;
        this.ingridents=recipe.ingredients;
        this.publisher=recipe.source;
        this.url=recipe.url;
    };

    calcTime(){
        const numIng=this.ingridents.length;
        this.time=numIng*5;
    };

    calcServings(){
        this.servings=4;
    };

    updateServings(type){
        const newServings=type==='dec'?this.servings-1:this.servings+1;
        this.ingridents.forEach(ing => {
            ing.quantity*=(newServings/this.servings);
        });
        this.servings=newServings;
    }
}
import uniqid from 'uniqid'
export default class List{
    constructor(){
        this.iteams=[];
    };
    addItem(count,unit,ingredient){
        const item={id:uniqid(),count,unit,ingredient};
        this.iteams.push(item);
        return item;
    };
    deleteItem(id){
        const index = this.iteams.findIndex(el=>el.id===id);
        this.iteams.splice(index,1);
    };
    updateCount(id, newCount){
        this.iteams.find(el=>el.id===id).count=newCount;
    }

}
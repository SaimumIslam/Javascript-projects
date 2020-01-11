import axios from 'axios'

export default class Search{
    constructor(query){
        this.query=query;
    }
async getResult(){
        const key='40698503668e0bb3897581f4766d77f9';
        const id='900da95e';

        try{
            const res=await axios(`https://api.edamam.com/search?q=${this.query}&app_id=${id}&app_key=${key}&from=0&to=21`);
            this.result=res.data.hits;
           // console.log(this.result);
        }
        catch(error){
            alert(error);
        }
    }

}
const hash = require('object-hash');

export default class Likes{
    constructor(){
        this.likes=[];
    }
    addLikes(title,publisher,img){
        const like={id:hash(title),title,publisher,img};
        this.likes.push(like);

        //save localstorage
        this.persistData();

        return like;
    };

    deleteLikes(title){
        const index=this.likes.findIndex(el=>el.title===title);
        this.likes.splice(index,1);
        
        //save localstorage
        this.persistData();
    };

    isLiked(title){
        return this.likes.findIndex(el=>el.title===title) !== -1;
    };

    getLikes(){
        return this.likes.length;   
    };

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    };
    readStorage(){
        const stroage=JSON.parse(localStorage.getItem('likes'));
        if(stroage){
            this.likes=stroage;
        }
    }
}
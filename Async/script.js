
const getWeather=wordId=>{
    const resultApi = fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${wordId}/`);

    resultApi.then(result=>{
        return result.json();
    })
    .then(data=>{
        //console.log(data);
        const today=data.consolidated_weather[0];
        console.log('fetch then catch ',`Location: ${data.title} Min temp: ${today.min_temp} Max temp: ${today.max_temp}`);
    })
    .catch(error=>{
     });
}
getWeather(2487956);

//Async Await
const getWeatherAw=async function(wordId){
    try{
        const resultApi = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${wordId}/`);
        const data=await resultApi.json();
        const today=data.consolidated_weather[0];
        console.log('async await fetch',`Location: ${data.title} Min temp: ${today.min_temp} Max temp: ${today.max_temp}`);
        return data;
    }
    catch(error){
        alert(error);
    }
}
let sanData=getWeatherAw(2487956);//Return promise
sanData.then(data=>console.log(data))
.catch(error=>alert(error));


/*class Movie{
    constructor(title,producer){
        this.title=title;
        this.producer=producer;
    }
    print(){
        console.log('this is printed movie');
    }
}

let allMovie=new Map();
allMovie.set(100,new Movie('Krish','Rakesh'));
allMovie.set(232,new Movie('studentOf the Year','Karan'));
allMovie.set(123,new Movie('3 idots','Raj kumar'));
allMovie.set(332,new Movie('Bahubali','Raj mouli'));


const getId = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve([100,232,123,332]);
        //reject('something Wrong');
    },1500);
});

const getMovie= movieId =>{
    return new Promise((resolve,reject)=>{
        setTimeout((id)=>{
            resolve(allMovie.get(id));
        },1500,movieId);
    });
}
const getRelated=(movie)=>{
    return new Promise((resolve,reject)=>{
        setTimeout((obj)=>{
            resolve(obj);
        },1000,movie);
    });
}

getId.then(ID => {
    console.log(ID);
    random=Math.floor(Math.random()*4);
    return getMovie(ID[random]);
})
.then((movie)=>{
    console.log(movie);
    return getRelated(movie);
})
.then((obj)=>{
    obj.print();
})
.catch(error => {
    console.log(error);
});


//---------------------------------------
/*
class Movie{
    constructor(title,producer){
        this.title=title;
        this.producer=producer;
    }
    print(){
        console.log('this is printed movie');
    }
}

let allMovie=new Map();
allMovie.set(100,new Movie('Krish','Rakesh'));
allMovie.set(232,new Movie('studentOf the Year','Karan'));
allMovie.set(123,new Movie('3 idots','Raj kumar'));
allMovie.set(332,new Movie('Bahubali','Raj mouli'));


function getMovie() {
    let res=0;
    setTimeout(()=>{
        const movieId=[100,232,123,332];
        console.log(movieId);
        res++;

        setTimeout((id)=>{

            let movie=allMovie.get(id);
            console.log(movie);
            res++;

            setTimeout((obj)=>{
                obj.print();
                res++;

            },1000,movie);

        },1500,movieId[2]);

    },2000);

    setTimeout(()=>{console.log(res)},2000);
}
getMovie();

/*
//--------------------------------
const first = () => {
    console.log('Hey there!!');
    second();
    console.log('first end here');
}
const second = () => {
    let a=0;
    setTimeout(()=>{
        console.log('Async'); 
        a++;
    },2000);
    console.log('Hey second Starts',a);
}
first();
*/
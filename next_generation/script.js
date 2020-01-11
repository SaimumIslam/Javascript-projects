class Element{
    constructor(name, buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element{
    constructor(name, buildYear, area, numTree){
        super(name, buildYear);
        this.area = area;//km2
        this.numTree = numTree;
    }
    treeDensity(){
        const density = (this.numTree / this.area).toFixed(2);
        console.log(`${this.name} has a tree density of ${density} trees per squre km.`)
    }
}

class Street extends Element{
    constructor(name, buildYear, length, size = 3){
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    classifyStreet(){
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} Street `);
    }
}

let allPark = [new Park('Green Park', 1987, .2, 215), new Park('National Park', 1894, 2.9, 3541),
new Park('Oak Park',1953,.4,949),];

let allStreet = [new Street('Ocran avenue', 1999, 1.1, 4), new Street('Ever Green Street',2008,2.7,2),
new Street('4th Street', 2015, .8), new Street('Sunset Boulevard',1982,2.5,5)];


function calc(arr){
    const sum = arr.reduce((prev,cur) => prev + cur, 0);

    return[sum.toFixed(2), (sum/arr.length).toFixed(2)];
}

function reportPark(parks){

    console.log('----------Park Report---------');

    //density
    parks.forEach(el => el.treeDensity());

    //avrage age
    const ages = parks.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, avgAge] = calc(ages);
    console.log(`Our ${ages.length} parks have an age of average of ${avgAge} years`);

    //which has more than 1000 tree

    const hnrdTrePrk = parks.map(el => el.numTree).findIndex(el => el >= 1000);
    console.log(`${parks[hnrdTrePrk].name} has more than 1000 tree`);

}
function reportStreet(streets){
    console.log('----------Street Report---------');

    //total & avg length of town street
    const[totalLength,avgLength] = calc(streets.map(el => el.length));
    console.log(`Our ${streets.length}streets have a total length of ${totalLength} km,
        with an average of ${avgLength} km`);

    //classify all streets
    streets.forEach(el => el.classifyStreet());

}

reportPark(allPark);
reportStreet(allStreet);


















/*               //Class & Inheritence
//ES5
function Person5(name,yearOfBirth){
    this.firstName=name;
    this.yearOfBirth=yearOfBirth;
}
Person5.prototype.calculateAge=function(){
    date=new Date();
    this.age=date.getFullYear()-this.yearOfBirth;
    //console.log(this.age);
}
Person5.prototype.nationality='Bangladeshi';

var jhon5=new Person5('jhon',1996);
jhon5.calculateAge();
console.log('ES5',jhon5,jhon5.nationality);

//inheritence

var Athlate5=function(name,yearOfBirth,medel){
    Person5.call(this,name,yearOfBirth);
    this.medel=medel;
}
var mark5=new Athlate5('mark',1998,10);
console.log('ES5',mark5,mark5.nationality);

Athlate5.prototype=Object.create(Person5.prototype);
Athlate5.prototype.wonMedel=function(){
    return this.medel++;
}

var jene5=new Athlate5('jene',1997,12);
jene5.calculateAge();
console.log('ES5',jene5.wonMedel(),jene5,jene5.nationality);

//ES6
class Person6{
    constructor(name,yearOfBirth){
        this.name=name;
        this.yearOfBirth=yearOfBirth
    }
    calculateAge(){
        date=new Date();
        this.age=date.getFullYear()-this.yearOfBirth;
        //console.log(this.age);
    }
}

var jhon6=new Person6('jhon',1996);
jhon6.calculateAge();

Person6.prototype.nationality='Bangladeshi';

console.log('ES6',jhon6,jhon6.nationality);

class Athlate6 extends Person5{
    constructor(name,yearOfBirth,medel){
        super(name,yearOfBirth);
        this.medel=medel;
    }
    wonMedel(){
        this.medel++;
    }
}

var jene6=new Athlate5('jene',1997,12);
jene6.calculateAge();
console.log('ES6',jene6.wonMedel(),jene6,jene6.nationality);


/*
//---------------------------------------------------------
       //MAP Only
//ES6
const Question=new Map();

Question.set('question','What is the name of your computer?');
Question.set(1,'Acer');
Question.set(2,'Asus');
Question.set(3,'Lenevo');
Question.set(4,'HP');
Question.set('correct',1);
Question.set(true,'Your answer is correct!!');
Question.set(false,'Wrong!! try again');

if(Question.has(4)){
    console.log(`${Question.get(4)} deleted successfully`);
    Question.delete(4);
}
//console.log(Question.size,Question);
//console.log(Question.entries(),Question.values());
//Question.clear();

//Question.forEach((key,value)=>console.log(key,value));

//for(const key of Question){console.log(key);}
console.log(Question.get('question'));

for(const [key,value] of Question.entries()){
    if(typeof(key)==='number')
        console.log(key,value);
}

let ans=parseInt(prompt(Question.get('question')));
console.log(Question.get(ans===Question.get('correct')));

/*
       //Default Arguments
//ES5
function Person5(name,job){
    this.name=name;
    this.job=job;
}
var jhon=new Person5('foysal');
console.log('ES5',jhon);
var mark=new Person5('foysal','student');
console.log('ES5',mark);


//ES6
function Person6(name,job='teacher'){
    this.name=name;
    this.job=job;
}

let jhon6=new Person6('foysal');
console.log('ES6',jhon6);
let mark6=new Person6('foysal','student');
console.log('ES6',mark6);
//ES6


/*
//-------------------------------------
       //Rest Prameter
//ES5
function isFullAge5(limit){
    var argList=Array.prototype.slice.call(arguments,1)
    year=new Date;
    var result=argList.map(function(cur){
        return year.getFullYear()-cur>=limit;
    });
    console.log(result);
}
isFullAge5(18,2004,1998,1995,1992);

//ES6

function isFullAge6(limit,...args){
    year=new Date;
    for(const cur of args){
        console.log(year.getFullYear()-cur>=limit);
    }
}

isFullAge6(18,2004,1998,1995,1992);

/*
        //The Spread Operator
var ages5=[12,23,24,25];
function addAges(a,b,c,d){
    return a+b+c+d;
}
//ES5
var sum1=addAges(12,23,24,25);
console.log('ES5',sum1);

var sum2=addAges.apply(null,ages5);
console.log('ES5',sum2);

//ES6
const ages6=[21,32,42,52];

let sum3=addAges(...ages6);
console.log('ES6',sum3);

const ages=[...ages5,333,...ages6];
console.log(ages);

const h=document.querySelector('h1');
const boxes=document.querySelectorAll('.box');
const all=[h,...boxes];
Array.from(all).forEach(cur=>cur.style.color='green');

/*
//-------------------------------------------
          //Array
//ES5
var ages=[14,16,14,17,21];

console.log(ages);
var fullAges=ages.map(function(cur){
    return cur >=18;
});

console.log('ES5',fullAges);
console.log('ES5',fullAges.indexOf(true));
console.log('ES5',ages[fullAges.indexOf(true)]);

//ES6
console.log('ES6',ages.findIndex(cur=>cur>=18));
console.log('ES6',ages.find(cur=>cur>=18));


            //Arrays & contintue
//ES5
var fields5=document.querySelectorAll('.box');

//1st way
var nodelistForEach=function(fields,callBack){
    resultList=[];
    for (var i = 0; i < fields.length; i++) {
        resultList=callBack(fields[i])
    }
    return resultList;
}

nodelistForEach(fields5,function(cur){
        cur.style.backgroundColor='Red';
});


//2nd way
var nodeList5=Array.prototype.slice.call(fields5);
nodeList5.forEach(function(cur){
    cur.style.backgroundColor='green';
});



//ES6
const fields6=document.querySelectorAll('.box');
const nodeList6=Array.from(fields6);

nodeList6.forEach(cur=>cur.style.backgroundColor='white');

                //  continue & break

//ES5

for(var i=0;i<nodeList6.length;i++){
    if(nodeList6[i].className==='box green')
        continue;
    nodeList6[i].textContent='Text has changed';
}
//ES6
for(const cur of nodeList6){
    if(cur.className==='box blue')
        continue;
    cur.style.color='red';
}
//
/* 
/
resultList=[];=callBack()/-------------------------------------
 //ES5
 var person=['jhon','Mike'];
 var person1=person[0];
 var person2=person[1];
 console.log('ES5 ',person1,person2);

 function calculateAge5(year){
    return {birthYear:year,age:2019-year};
}

 var ya5=calculateAge5(1996);
 console.log('ES5 ',ya5);

//ES6
 let names=person.slice();//copy obj ['jhon','Mike']
 let[name1,name2]=names;
 console.log('ES6 ',name1,name2);

//destructure on object
 const Jhon={
    firstName:'Jhon',
    lastName:'Smith'
 }

 const{firstName,lastName}=Jhon;
 console.log('destructure',firstName,lastName);

 console.log('obj after destructure',Jhon.firstName,Jhon.lastName);

 const{firstName:a,lastName:b}=Jhon;
 console.log('destructure obj',a,b);
 console.log('after destructure obj',firstName,lastName);

 let calculateAge6=(year)=>{
    return [year,2019-year];
}

 const ya6=calculateAge6(1996);//can return as array
 console.log('ES6 ',ya6);


 /*
//----------------------------
        //lexical this
 //ES5
var box5={
    color:'green',
    position:1,
    showMe:function(){
        console.log('ES5 Show: color: '+this.color+' position: '+this.position);
    },

    clickMe:function(){
        document.querySelector('.green').addEventListener('click',function(){
            console.log('ES5 Click callback : color: '+this.color+' position: '+this.position);
        });
    },

    showClickMe:function(){
        var self=this;
        document.querySelector('.green').addEventListener('click',function(){
            console.log('ES5 Click self: color: '+self.color+' position: '+self.position);
        });
    },

    showClickMe2:function(){
        document.querySelector('.green').addEventListener('click',function(){
            console.log('ES5 Click bind: color: '+this.color+' position: '+this.position);
        }.bind(this));
    },
}
box5.clickMe();
box5.showClickMe();
box5.showClickMe2();
box5.showMe();


//ES6

var box6={
    color:'green',
    position:1,
    showClickMe:function(){
        document.querySelector('.green').addEventListener('click',()=>{
            console.log(`ES6 : color: ${this.color} position: ${this.position}`);
        });
    },
    showClickMe2:()=>{
        document.querySelector('.green').addEventListener('click',()=>{
            console.log(`ES6 double arrow function : color: ${this.color} position: ${this.position}`);
        });
    },
}
box6.showClickMe();
box6.showClickMe2();

/*
 //--------------------------------
     //arrow function

//ES5
var years5=[1990,1999,1997,1977];

var ages5=years5.map(function(cur){
    return 2019-cur;
});
console.log(ages5);


//ES6
const years6=[1990,1999,1997,1977];

let ages6=years6.map(cur=>2019-cur);
console.log(ages6);

ages6=years6.map(el=>{
    let birthday=2019-el;
    return birthday;
});
console.log(ages6);

ages6=years6.map((el,index)=>`person ${index+1} birthday ${2019-el}`);
console.log(ages6);

/*
//---------------------------------
           // Strings
//ES5
var firstName='foysal'
console.log('ES5 : My name is '+firstName);

//ES6
const name='foysal'
console.log(`ES6 : My name is ${name}`);
console.log(name.startsWith('f'));
console.log(name.endsWith('al'));
console.log(name.includes('oy'));
console.log(`${name} `.repeat(5));

/*
//-------------------------------------
         //Blocks & IIFE
//ES5
(function(){
    var a=5;
    console.log('ES5',a);
})();
    //console.log('ES5',a) not accessable


//ES6
{
    let a=5;
    console.log('ES6',a);
}

//console.log('ES6',a);//not accessable

//ES5
{
    var a=5;
}
console.log('ES5 As Block',b);


//----------------------------------------
/*
                //variable & const

//ES5
var k=23;

for(var k=0;k<5;k++){
    console.log(k);
}
console.log('ES5',k);//23 will printed

//ES6
let i=23;

for(let i=0;i<5;i++){
    console.log(i);
}
console.log('ES6',i);//23 will printed


function PrintES5(ans){
    if(ans>5){
        var name='foysal';
        var birthYear=1996;
    }
    console.log(name,birthYear);
}
PrintES5(6);

//let & const block-scoped
function PrintES6(ans){
    if(ans>5){
        let name='foysal';
        const birthYear=1996;
        console.log(name,birthYear);
    }
        //console.log(name,birthYear); /error oocured
}
PrintES6(7);
*/
(function(){
	function Question(question,answer,correct){
		this.question=question;
		this.answer=answer;
		this.correct=correct;
	}
	var q1=new Question('Is java script the console programming language?',['Yes','No'],0);
	var q2=new Question('Is Java Script Object Oriented?',['YES','NO'],0);
	var q3=new Question('What does best describe coding?',['Boring','Hard','Fun','Tredious'],2);

	var questions=[q1,q2,q3];

	Question.prototype.questionDisplay= function(){
		console.log(this.question);
		for(var i=0;i<this.answer.length;i++){
			console.log(i+': '+this.answer[i]);
		}
	}
	Question.prototype.checkAnswer=function(ans,scoreUpdate){
		var sc;
		if (ans===this.correct){
			console.log('Correct answer!!');
			sc = scoreUpdate(true);
			//callback function
		}
		else{
			console.log('Wrong answer.Try again :)');
			sc = scoreUpdate(false);
		}
		this.scoreDisplay(sc);
	}
	Question.prototype.scoreDisplay=function(score){
		console.log('Your currect score is '+score);
		console.log('------------------------------')
	}

	function score(){
		var sc=0;
		return function(currect){
			if(currect){
				sc++;
			}
			return sc;
		}
	}
	var scoreUpdate=score();

	function nextQuestion(){
		if(questions.length<1){
			return
		}
		var chooseQuestion=Math.floor(Math.random()*questions.length);

		questions[chooseQuestion].questionDisplay();
		var answer=prompt('Please select the currect answer');

		if (answer!=='exit'){
			questions[chooseQuestion].checkAnswer(parseInt(answer),scoreUpdate);

			nextQuestion();
		}
	}
	nextQuestion();
})();

//---------------------------------------------------
/*function retirement(ageLimit){
	message='your retirement is reaming '
	return function(birthOfYear){
		age=2019-birthOfYear;
		console.log(message+(ageLimit-age)+' years');
	}
}
var retirementBd=retirement(60);
retirementBd(1990);
retirement(62)(1992);
//-------------------------------------------------------
/*function game(){
	var score=Math.random()*10;
	return score>=9;
}
game();

(function(goodluck){
	var score=Math.random()*10;
	console.log(score>=5-goodluck)
})(5);

//---------------------------------------------------------------
/*var years=[1990,1992,2007,1996,2002,1989,1999,2000,2004,2005];

function arrayCal(arr,fn){
	resArr=[];
	for(var i=0;i<arr.length;i++){
		resArr.push(fn(arr[i]));
	}
	return resArr;
}

function calculateAge(year){
	return 2019-year;
}

function isCityzen(age){
	return age>=18;
}

var ages=arrayCal(years,calculateAge);
console.log(ages);
var cityzen=arrayCal(ages,isCityzen);
console.log(cityzen);


//------------------------------------------------------------
/*var personProto={
	year:2019,
	calAge:function(){
		return this.year-this.birthOfYear; 
	}
}
var jhon=Object.create(personProto);
jhon.name='jhon';
jhon.birthOfYear=1993;

var jene=Object.create(personProto,{name:{value:'jene'},birthOfYear:{value:1996}});

//-----------------------------------------------------

/*

function Person(name,birthOfYear,job){
	this.name=name;
	this.birthOfYear=birthOfYear;
	this.job=job;
}
*/
/*
var Person=function(name,birthOfYear,job){
	this.name=name;
	this.birthOfYear=birthOfYear;
	this.job=job;
}
Person.prototype.year=2019;
Person.prototype.calculateAge=function(){
		return this.year-this.birthOfYear;
	}

 
var mark=new Person('mark',1991,'desinger');
mark.age=mark.calculateAge();

var jhon=new Person('jhon',1990,'teacher');
jhon.occupation=function(){
	console.log(this.job);
}
console.log(mark,jhon);

var jene={
	name:'jene',
	birthOfYear:2005,
	job:'student'
}
jhon.occupation.call(jene);
console.log(jene);
*/

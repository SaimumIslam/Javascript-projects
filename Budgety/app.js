//Budget Conroller
var budgetControler=(function(){

    var Item=function(id,description,value){
        this.id=id,
        this.description=description,
        this.value=value
        this.persentage=-1;
    };

    Item.prototype.calcPercentage=function(totalIncome){

        if(totalIncome>0)
            this.persentage=Math.round((this.value/totalIncome)*100);
    }

    var calcualteTotal=function(type){
        var sum=0;
        data.allItems[type].forEach(function(cur){
            sum+=cur.value;
        });
        data.totals[type]=sum;
    };

    var data={
        allItems:{
            inc:[],
            exp:[]
        },
        totals:{
            inc:0,
            exp:0
        },
        budget:0,
        persentage:-1
    };

    return{
        addItem:function(type,des,val){

            var newItem,id;
            //create id
            if(data.allItems[type].length>0)
                id=data.allItems[type][data.allItems[type].length-1].id+1;
            else
                id=0;
            //new Item based on type;
            newItem=new Item(id,des,val);
            //push into data structure
            data.allItems[type].push(newItem);
            return newItem;
        },
        deleteItem:function(type,id){
            //data.allItems[type][id];
            ids=data.allItems[type].map(function(current){
                return current.id
            });

            index=ids.indexOf(id);
            if(index!==-1){
                data.allItems[type].splice(index,1);
            }
        },
        calculateBudget:function(){
            calcualteTotal('inc');
            calcualteTotal('exp');
            data.budget=data.totals.inc-data.totals.exp;

            if (data.totals.inc>0)
                data.persentage=Math.round((data.totals.exp / data.totals.inc)*100);
        },
        getBudget:function(){
            return {
                budget:data.budget,
                persentage:data.persentage,
                totalInc:data.totals.inc,
                totalExp:data.totals.exp,
            }
        },
        calcualtePercentages:function(){
            data.allItems.exp.forEach(function(item){
                item.calcPercentage(data.totals.inc);
            });
        },
        getPercentages:function(){
            var allPercentage = data.allItems.exp.map(function(item){
                return item.persentage;
            });

            return allPercentage;
        },
        testing:function(){
            console.log(data)
        }
    };

})();


//UI Controler
var UIControler=(function(){
    var DOMstrings={
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn',
        incomeContainer:'.income__list',
        expencesContainer:'.expenses__list',
        budgetLebel:'.budget__value',
        incomeLebel:'.budget__income--value',
        expenseLebel:'.budget__expenses--value',
        persentageLebel:'.budget__expenses--percentage',
        container:'.container',
        expPerctageLebel:'.item__percentage',
        dateLebel:'.budget__title--month'

    };
    var nodeListForEach=function(list,callBack){
        for(var i=0;i<list.length;i++){
            callBack(list[i], i);
        }
    };
    var formatNumber=function(number,type){
        var num,numSplit,int,dec;
        /*
        + or - berfore number
         exactly two decimal points
        comma seperating thousands
        */
         num=Math.abs(number);
        num=num.toFixed(2); //return string

        numSplit=num.split('.');

        int=numSplit[0];
        dec=numSplit[1];
        if(int.length>3){
            int=int.substr(0,int.length-3)+','+int.substr(int.length-3,3);
        }
        return (type==='exp'?'-':'+')+' '+int+'.'+dec;
    };

    return{
        getInput:function(){
            return {
               type:document.querySelector(DOMstrings.inputType).value,//will be either inc or exp;
               description:document.querySelector(DOMstrings.inputDescription).value,
               value:parseFloat(document.querySelector(DOMstrings.inputValue).value),
            };
        },
        addListItem:function(obj,type){
            var html,newHtml,element;

            //create html string with placeholder
            if(type==='inc'){
                element=DOMstrings.incomeContainer;

                html='<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>'
            }
            else if(type==='exp'){
                element=DOMstrings.expencesContainer;

                html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            //replace html with placeholder
            newHtml=html.replace('%id%',obj.id);
            newHtml=newHtml.replace('%description%',obj.description);
            newHtml=newHtml.replace('%value%',formatNumber(obj.value,type));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },
        deleteListItem:function(selectorId){
            var element=document.getElementById(selectorId);
            element.parentNode.removeChild(element);
        },
        clearFields:function(){
            var fields,fieldsArr;
            fields= document.querySelectorAll(DOMstrings.inputDescription+', '+DOMstrings.inputValue);

            fieldsArr=Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current){
                current.value="";
            });
            fieldsArr[0].focus();
        },
        displayBudget:function(obj){
            var type=obj.budget<0?'exp':'inc';

            document.querySelector(DOMstrings.budgetLebel).textContent=formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLebel).textContent=formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expenseLebel).textContent=formatNumber(obj.totalExp,'exp');
            if(obj.persentage>0)
                document.querySelector(DOMstrings.persentageLebel).textContent=obj.persentage+'%';
            else
                document.querySelector(DOMstrings.persentageLebel).textContent='---';

        },
        displayPercentage:function(persentages){
            var fields = document.querySelectorAll(DOMstrings.expPerctageLebel);

            nodeListForEach(fields,function(current,index){
                if(persentages[index]>0)
                    current.textContent=persentages[index]+'%';
                else
                    current.textContent='---';
            });

        },
        displayMonth:function(){
            var now,year,month,allMonth;

            allMonth=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


            now=new Date();
            year=now.getFullYear();
            month=now.getMonth();

            document.querySelector(DOMstrings.dateLebel).textContent=allMonth[month] +' '+year;
        },
        changeType:function(){
            var fields=document.querySelectorAll(DOMstrings.inputType+','+DOMstrings.inputDescription+','+DOMstrings.inputValue);
            nodeListForEach(fields,function(cur){
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

        },
        getDOMstrings:function(){
            return DOMstrings;
        }
    };

})();


//Global App Controler
var controler=(function(budgetCtrl,UICtrl){

    var setupEventListener=function(){

            var DOM=UICtrl.getDOMstrings();
            document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

            document.addEventListener('keypress',function(event){
                if(event.keyCode===13 || event.which===13){
                    ctrlAddItem();
                }
            });

            document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

            document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changeType);
    };

    var updateBudget=function(){
            //1.calculate budger
            budgetCtrl.calculateBudget();
            //2.return budget
            var budget=budgetCtrl.getBudget();
            //3.update budget
            UICtrl.displayBudget(budget);
    };

    var updatePercentages=function(){

        //1 calculate percentages
        budgetCtrl.calcualtePercentages();

        //2.read from buged
        var percentages=budgetCtrl.getPercentages();

        //update in ui
        UICtrl.displayPercentage(percentages);

    };

    var ctrlAddItem=function(){
        var input,newItem;
        //1.get data.
        input=UICtrl.getInput();

        if(input.description!=='' && input.value>0 && !isNaN(input.value)){
            //2 add the data to budget controller
            newItem=budgetCtrl.addItem(input.type,input.description,input.value);

            //3 add data to the UI
            UICtrl.addListItem(newItem,input.type);

            //4 clear items
            UICtrl.clearFields();

            //5 calcualte budget & update
            updateBudget()

            //6 update percentages
            updatePercentages();
        }

    };

    var ctrlDeleteItem=function(event){
        var itemId;
        itemId=event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemId){
            spiltId=itemId.split('-');
            type=spiltId[0];
            id=parseInt(spiltId[1]);

            //delete from data structure
            budgetCtrl.deleteItem(type,id);
            //delete from UI
            UICtrl.deleteListItem(itemId);
            //update Budget
            updateBudget()
            //update percentages
            updatePercentages();
        }

    };

    return{
        init:function(){
            console.log('Application Starts');
            UICtrl.displayMonth();
            UICtrl.displayBudget({budget:0,persentage:-1,totalInc:0,totalExp:0});
            setupEventListener();
        }
    };

})(budgetControler,UIControler);

controler.init();
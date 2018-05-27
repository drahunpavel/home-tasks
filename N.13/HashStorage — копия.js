"use script"

function HashStorage() {
    
    this.storage={};

    this.addValue=function(key, value){
        this.storage[key]=value;
    };

    this.getValue=function(key){
        if(key in this.storage)
        {
            //console.log(this.storage[key]);
            return this.storage[key];
        };
    };

    this.deleteValue=function(key){
        if(key in this.storage){
            delete this.storage[key];
            //console.log(this.storage[key] === undefined);
            return this.storage[key] === undefined;
        }else{
            //console.log(this.storage[key] === !undefined);
            return this.storage[key] === !undefined;
        };
        //console.log('metod deleteValue');
    }

    this.getKeys=function(){
        //console.log('metod getKeys');
        return Object.keys(this.storage);
        
    };
    //console.log(this.storage );
};

var drinkStorage = new HashStorage();
//var resultObj = document.getElementById('result');

function getInfo() {
var cocltailDescription={};
var cocltailName=prompt("Введите название коктейля","");
//var cocltailAlc=confirm("Коктейль алкогольный?");
//var cocltailDescription=prompt("Введите описание коктейля","");
var recipe = prompt("Введите рецепт приготовления коктейля "+ cocltailName,"");
drinkStorage.addValue(cocltailName, cocltailDescription);
//console.log("==========");
//console.log("Добавили "+cocltailName+":"+ cocltailDescription);

};

function getDescription() { //onclick="getDescription()" value="получение информации о напитке"
    var cocltailName=prompt("Введите название коктейля, чтобы узнать его описание","");
    console.log("==========");
    console.log(drinkStorage.getValue(cocltailName));
    //document.getElementById("result").value="проверка "+drinkStorage.getValue(cocltailName);

};

function deleteInformation(){ //onclick="deleteInformation()" value="удаление информации о напитке"
    var cocltailName=prompt("Введите название коктейля для его удаления","");
    console.log("==========");
    console.log("Результат удаление коктейля " + cocltailName +":"+ drinkStorage.deleteValue(cocltailName));
    //document.getElementById("result").value=drinkStorage.deleteValue(cocltailName);
};

function getСocktailNames(){ //onclick="getСocktailNames()" value="перечень всех напитков"
    console.log("==========");
    console.log(drinkStorage.getKeys());
};









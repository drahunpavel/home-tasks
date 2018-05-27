"use script"

function HashStorage() {
    
    this.storage={};

    this.addValue=function(key, value){
        this.storage[key]=value;
    };

    this.getValue=function(key){
        if(key in this.storage)
        {
            return this.storage[key];
        };
    };

    this.deleteValue=function(key){
        if(key in this.storage){
            delete this.storage[key];
            return this.storage[key] === undefined;
        }else{
            return this.storage[key] === !undefined;
        };

    }

    this.getKeys=function(){
        return Object.keys(this.storage); 
    };
};

var drinkStorage = new HashStorage();


function getInfo() {
var coctailDescription={};
var coctailName=prompt("Введите название коктейля","");
coctailDescription.recipe = prompt("Введите рецепт приготовления коктейля "+ coctailName,"");
coctailDescription.alcohol = confirm("Коктейль алкогольный?");
coctailDescription.cooled = confirm("Коктейль подавать охлажденным?");
drinkStorage.addValue(coctailName, coctailDescription);
};

function getDescription() { //onclick="getDescription()" value="получение информации о напитке"
    var coctailName=prompt("Введите название коктейля, чтобы узнать его описание","");
    console.log("==========");
    //var arr=drinkStorage.getValue(coctailName);
    /*console.log("Название: "+coctailName+
                "\nАлкогольный?: "+drinkStorage.getValue(coctailName).alcohol+
                "\nПодавать охлажденным?: "+drinkStorage.getValue(coctailName).cooled+
                "\nРецепт: "+drinkStorage.getValue(coctailName).recipe);*/
                //console.log(drinkStorage.getValue(coctailName));
                console.log(drinkStorage.getValue(coctailName).recipe);
    };

function deleteInformation(){ //onclick="deleteInformation()" value="удаление информации о напитке"
    var coctailName=prompt("Введите название коктейля для его удаления","");
    console.log("==========");
    console.log("Результат удаление коктейля " + coctailName +":"+ drinkStorage.deleteValue(coctailName));
};

function getСocktailNames(){ //onclick="getСocktailNames()" value="перечень всех напитков"
    console.log("==========");
    console.log(drinkStorage.getKeys());
};








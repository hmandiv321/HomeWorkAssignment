const myForm = document.querySelector('#my-form');
const errorMsg = document.querySelector('.msg');
const numberInput = document.querySelector('#phoneNumber');
const numberEnteredInput = document.querySelector('#numberEntered');
const rulesInput = document.querySelector('#rule');
const userList = document.querySelector('#users');
const rulesList = document.querySelector('#rulesList');
const resultList = document.querySelector('#results');


let listOfPhoneNumbers = [];
let unwantedItems = [];
let userRuleStartsWith = [];
let userRuleEndsWith = [];
let filteredList = [];


//phone object that creates starts with three and four properties
//and creates ends with three and four properties
class phone{
  constructor(phoneNumber){
    //make phoneNumber into string
    phoneNumber = phoneNumber.toString();

    this.phoneNumber = phoneNumber;
    this.startsWithThree = phoneNumber.substring(0,3);
    this.endsWithThree = phoneNumber.substring(4);
    this.startsWithFour = phoneNumber.substring(0,4);
    this.endsWithFour = phoneNumber.substring(3);
  }
}

//accepts a phone number
//summary==> creates a phone object
//checks if the phone number matches the wanted number pattern
//returns ==> a new phone object
function createPhoneNumber(userProvidedNumber){
    //check params
    //user phone number expected pattern
    let pattern = "[0-9]{7}";
    userProvidedNumber = userProvidedNumber.match(pattern);

    //create phone number
    const newPhone = new phone(userProvidedNumber);

    return newPhone;
    
}

//accepts an event 
//summary ==>used when the user clicks the "Enter Number" btn 
//builds the list of phone
function onSubmit(){

    if(numberInput.value !==''){
    
        //creates a phone
        let userInputPhoneNumber = createPhoneNumber(numberInput.value);
        
        //building the user phone list
        buildTheUserPhoneList(userInputPhoneNumber);

        //clear fields
        numberInput.value = '';
    
    }     
}

//accepts an event
//summary ==> used when the user clicks on the "ADD" button
//adds the user rule digits
//others==> when a user wants to filter with different digits
//with the same list of phone numbers the, the rules dislpay and
// and filtered number display is cleaned and repopulates with new 
//rule digits
function onAdd(){

    //if the user wants to do a new filter on the same l
    //list of phone number then clean result list
    if(userRuleEndsWith.length == 0 && userRuleStartsWith.length == 0){
        cleanRulestList();
        cleanResultList();
    }
    
    //user rule inputs expected pattern
    let pattern = "[0-9]{3,4}";
    
    //checks if user input is only 3  digits long
    if(!(numberEnteredInput.length == 3 || numberEnteredInput.length == 4)){

        //cleaning user input
        numberEnteredInput.value = (numberEnteredInput.value).match(pattern);

        // add numberEnteredInput to either userRule_StartsWith array or
        // userRule_EndsWith array
        //and returns true if the digit was added
         let digitsAdded = addingUserRuleToUserRule_StartsWithAndUserRule_EndsWithArrays();


        //display the user
        if(digitsAdded){
            displayRulesDigitForUserList(numberEnteredInput.value);
        }
    }
    
    // if the user input for the rule did not mathc the requirements 
    //then an error message is displayed
    //if user input for rules are not good then the userRule_StartsWith
    //and userRule_EndsWith arrays stay empty.
    if(userRuleStartsWith.length == 0 && userRuleEndsWith.length == 0){
        errorMsgForUserRule();
    }
        
}

//summary ==> used when the user clicks on the "filter list" btn
//filters the list of phone numbers depending on if
// only starts with rules are applied or
// only ends with rules are applied or
//both rules are applied
//other ==> after the filter process the filtered list is displayed
function filterList(){  

    //for only startswith
    if(userRuleStartsWith.length > 0 && userRuleEndsWith.length < 1){
        buildForOnlyStartsWith();
    }
    
    //for only endswith
    if(userRuleStartsWith.length < 1 && userRuleEndsWith.length > 0){
        buildForOnlyEndsWith();
    }
    
    //for multiple rules
    if(userRuleStartsWith.length > 0 && userRuleEndsWith.length > 0){
            BuildForMultipleRules();
    }
    
    //makes the userRule_StartsWith and userRule_EndsWith array empty after filtration
    userRuleStartsWith.length = 0;
    userRuleEndsWith.length = 0;

    //show user the filtered list
        showFilteredListToUser();
        filteredList.length = 0

}

//starts over fresh
function startAgain(){
    location.reload();
}

//if phone number dosent exists then adds to the listOfPhoneNumbers array 
//else checks if the phone number provided already exits
//if it does not exist, then pushes the phone to the 
//listOfPhoneNumbers array
function buildTheUserPhoneList(phone){  

        //if list of phone numbers is empty then push phone object into the array.
        //then display to the user the phone number they entered
        if(listOfPhoneNumbers.length == 0){
            listOfPhoneNumbers.push(phone);
            displayPhoneListForUserList(phone.phoneNumber);
        }
        //checks if user phone number added already exists in the
        //listOfPhoneNumbers array, else adds to the listOfPhoneNumbers
        //array
        if(!traverseForDuplicateInListOfPhoneNumbers(phone)){
            listOfPhoneNumbers.push(phone);
            displayPhoneListForUserList(phone.phoneNumber);
        }
        
}

//checks if listOfPhoneNumbers array has a number that mathces users 
//input of phone number from the "input" field
//retun ==> returns true or false
function traverseForDuplicateInListOfPhoneNumbers(phone){
    for(let i = 0; i < listOfPhoneNumbers.length; i++){
       if(listOfPhoneNumbers[i].phoneNumber == phone.phoneNumber){
           return true;
       }
    }
    return false;
}

//shows the user the list of phone numbers they are creating
function displayPhoneListForUserList(value){
     
     const li =document.createElement('li');
     li.appendChild(document.createTextNode(`${value}`));
     userList.appendChild(li);
}

//shows the user the list of rules digits they are creating
function displayRulesDigitForUserList(value){
    //get the user rule selected
   const userRule = rulesInput.options[rulesInput.selectedIndex].text;
   
   const li =document.createElement('li');
   li.appendChild(document.createTextNode(`${userRule}=>${value}`));
   rulesList.appendChild(li);
   
   //clears the field for the user
   numberEnteredInput.value = "";
}

//Summary==> If does not start with rules is selected then adds to
// userRuleStartsWith array else adds to userRuleEndsWith array
//return == >true if the addition was successful else retuns false
function addingUserRuleToUserRule_StartsWithAndUserRule_EndsWithArrays(){

    //get the user rule selected
    const userRule = rulesInput.options[rulesInput.selectedIndex].value;

    // if rule starts With is selected then push that value into the 
    //userRule_StartsWith array
    if(userRule == 1){
        //check if numberEnteredInput already exists to avoid duplicates
        if(!userRuleStartsWith.includes(numberEnteredInput.value)){
            //final check to not allow any empty values to be pushed to the array
            if(numberEnteredInput.value !== ""){
                userRuleStartsWith.push(numberEnteredInput.value);
                return true;
            }           
        }
    }

    // if rule ends With is selected then push that value into the userRule_EndsWith array
    if(userRule == 2){
        //check if numberEnteredInput already exists to avoid duplicates
        if(!userRuleEndsWith.includes(numberEnteredInput.value)){
            //final check to not allow any empty values to be pushed to the array
            if(numberEnteredInput.value !== ""){
                userRuleEndsWith.push(numberEnteredInput.value);
                return true;
            }
        }
    }

    return false;
}

//if the user input for the rules are wrong then this error message is used
function errorMsgForUserRule(){
    
    errorMsg.classList.add('error');
    errorMsg.innerHTML = 'please enter a 3 or 4 digit number only';
    //cleans out the error msg
    setTimeout(function(){
        errorMsg.classList.remove('error');
        errorMsg.innerHTML = '';
    },3000);
}

//Summary ==> cleans up rules display
function cleanRulestList(){
    //if new filter then clean result list
        while(rulesList.firstChild) {
            rulesList.removeChild(rulesList.firstChild);
        }
}

//Summary ==> cleans up filtered numbers display
function cleanResultList(){
    //if new filter then clean result list   
        while(resultList.firstChild) {
            resultList.removeChild(resultList.firstChild);
        }   
}

//Use ==> if the user selects both rules
//Summary ==> fills the filtered list array with listofPhoneNumbers.phoneNumber
//fills the unwantedItems array with phone numbers that the user does not want
//then filters out the number from the filteredList array.
function BuildForMultipleRules(){
    fillFilteredListInitial();
    
    for(let i = 0; i < listOfPhoneNumbers.length; i++){
           for(let j = 0; j < userRuleStartsWith.length; j++){
               if(userRuleStartsWith[j].length == 4){
                    if(listOfPhoneNumbers[i].startsWithFour == userRuleStartsWith[j]){
                        unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                    }    
               }
               if(userRuleStartsWith[j].length == 3){
                    if(listOfPhoneNumbers[i].startsWithThree == userRuleStartsWith[j]){
                        unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                    }
                }
           }
    }

    for(let i = 0; i < filteredList.length; i++){
        for(let j = 0; j < unwantedItems.length; j++){
            if(filterList[i] !== null && filteredList[i] !== undefined){
                if(filteredList[i] == unwantedItems[j]){
                    filteredList.splice(i,1);
                    //because the fileteredList array size goes down after splice
                    //i--;
                    j--;
                } 
            }
        }
    }

    //cleaningup unwantedItems array 
    unwantedItems.length = 0;

    for(let i = 0; i < listOfPhoneNumbers.length; i++){
        for(let j = 0; j < userRuleEndsWith.length; j++){
            if(userRuleEndsWith[j].length == 4){
                if(listOfPhoneNumbers[i].endsWithFour == userRuleEndsWith[j]){
                    unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                }    
            }
            if(userRuleEndsWith[j].length == 3){
                if(listOfPhoneNumbers[i].endsWithThree == userRuleEndsWith[j]){
                    unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                }
            }
        }
    }

    for(let i = 0; i < filteredList.length; i++){
        for(let j = 0; j < unwantedItems.length; j++){
            if(filteredList[i] !== null && filteredList[i] !== undefined){
                if(filteredList[i] == unwantedItems[j]){
                    filteredList.splice(i,1);
                    //because the fileteredList array size goes down after splice
                    //i--;
                    j--;
                }
            }
        }
    }
    //cleaningup unwantedItems array 
    unwantedItems.length = 0;
}

//Use ==> if the user selects only one rule
//Summary ==> fills the filtered list array with listofPhoneNumbers.phoneNumber 
//comapres listOfPhoneNumbers with the userRuleStartsWith value
//if a match is found then adds to unwantedItems array, then removes the unwanted Items
//from the filtered list.
function buildForOnlyStartsWith(){
    fillFilteredListInitial();

    for(let i = 0; i < listOfPhoneNumbers.length; i++){
        for(let j = 0; j < userRuleStartsWith.length; j++){
            if(userRuleStartsWith[j].length == 4){
                 if(listOfPhoneNumbers[i].startsWithFour == userRuleStartsWith[j]){
                     unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                 }    
            }
            if(userRuleStartsWith[j].length == 3){
                 if(listOfPhoneNumbers[i].startsWithThree == userRuleStartsWith[j]){
                     unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                 }
             }
        }
 }

    for(let i = 0; i < filteredList.length; i++){
        for(let j = 0; j < unwantedItems.length; j++){
            if(filterList[i] !== null && filteredList[i] !== undefined){
                if(filteredList[i] == unwantedItems[j]){
                    filteredList.splice(i,1);
                    //because the fileteredList array size goes down after splice
                    //i--;
                    j--;
                } 
            }
        }
    }

    //cleaningup unwantedItems array 
    unwantedItems.length = 0;
}

//Use ==> if the user selects only one rule
//Summary ==> fills the filtered list array with listofPhoneNumbers.phoneNumber 
//comapres listOfPhoneNumbers with the userRuleEndsWith value
//if a match is found then adds to unwantedItems array, then removes the unwanted Items
//from the filtered list.
function buildForOnlyEndsWith(){
    fillFilteredListInitial();
    for(let i = 0; i < listOfPhoneNumbers.length; i++){
           for(let j = 0; j < userRuleEndsWith.length; j++){
                if(userRuleEndsWith[j].length == 4){
                    if((listOfPhoneNumbers[i].endsWithFour == userRuleEndsWith[j])){
                        unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                    }
                }
                if(userRuleEndsWith[j].length == 3){
                    if((listOfPhoneNumbers[i].endsWithThree == userRuleEndsWith[j])){
                        unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                    }
                }
           }
    }

    for(let i = 0; i < filteredList.length; i++){
        for(let j = 0; j < unwantedItems.length; j++){
            if(filteredList[i] !== null && filteredList[i] !== undefined){
                if(filteredList[i] == unwantedItems[j]){
                    filteredList.splice(i,1);
                    //because the fileteredList array size goes down after splice
                    //i--;
                    j--;
                }
            }
        }
    }

    //cleaningup unwantedItems array 
    unwantedItems.length = 0;

}

//fills the filteredList with listOfPhoneNumber.phoneNumber
function fillFilteredListInitial(){
    for(let i = 0; i < listOfPhoneNumbers.length; i++){
        filteredList.push(listOfPhoneNumbers[i].phoneNumber);
    }
}

//creates li element to display filtered list of phone numbers
function showFilteredListToUser(){
    for(let i = 0 ; i < filteredList.length; i++ ){
     const li =document.createElement('li');
     li.appendChild(document.createTextNode(`${filteredList[i]}`));
     resultList.appendChild(li);
    }
}
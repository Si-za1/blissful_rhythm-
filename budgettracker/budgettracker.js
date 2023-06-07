// let's get all the variables 

const incomeInput=document.getElementById("total-amount");
const expenseTitle=document.getElementById("product-title");
const expenseInput=document.getElementById("user-amount");

//buttons 
const incomeButton=document.getElementById("total-amount-button");
const expenseButton=document.getElementById("check-amount");
const refreshButton=document.getElementById("refresh-button")

//display amounts 
const amountDisplay = document.getElementById("amount");
const expenseValueDisplay = document.getElementById("expense-value");
const balanceAmountDisplay = document.getElementById("balance-amount");

//list 
const expenseListContainer=document.getElementById("list");

//error messges
const errorMessage = document.getElementById("budget-error");
const productCostError = document.getElementById("expense-error");
const productTitleError = document.getElementById("expense-error");

//initial values 

let totalIncome=0;
let totalExpense=0;
let balance=0;


//for setting the expense goal for the month 

const expenseGoalInput = document.getElementById("expense-goal");
const expenseGoalDisplay = document.getElementById("expense-goal-display");
const expenseGoalButton = document.getElementById("set-goal");
let expenseGoal = 0;

//function to update the income display

incomeButton.addEventListener("click", ()=>{
    totalIncome= incomeInput.value;

    if (totalIncome==="" || totalIncome<0){
        errorMessage.classList.remove("hide");
    }
    else{
        errorMessage.classList.add("hide");
        //setting the income
        amountDisplay.innerHTML=totalIncome;
        //showing the balance
        balanceAmountDisplay.innerText=totalIncome-expenseValueDisplay.innerText;

        //clearing the input box of the income
        incomeInput.value="";
    }
})

// function to the edit and delete button usage like toogle using bool for expense list container
const disableButtons=(bool)=>{
    let editButtons=document.getElementsByClassName("edit"); //use of classname made to use array.from 
    Array.from(editButtons).forEach((element)=>{
        element.disabled=bool;
    })
}

//function to modify the expense list container 

const modifyList=(element, edit=false)=>{
    let parentDiv=element.parentElement;
    let currentBalance=balanceAmountDisplay.innerText;
    let currentExpense=expenseValueDisplay.innerText;
    let parentAmount=parentDiv.querySelector(".amount").innerText;

    if(edit){
        let parentText=parentDiv.querySelector(".product").innerText;
        expenseTitle.value=parentText;
        expenseInput.value=parentAmount;
        disableButtons(true);
    }
    balanceAmountDisplay.innerText=parseInt(currentBalance)+parseInt(parentAmount);
    expenseValueDisplay.innerText=parseInt(currentExpense)-parseInt(parentAmount);
    parentDiv.remove();
}

//function to add expense list
const listCreator= (expenseName, expenseValue)=>{
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);

    //creating the edit button 

    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-regular", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
      modifyList(editButton, true);
    });

    //creating delete button 
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-regular", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
      modifyList(deleteButton);
    });

    //adding all the items to the flex of the sublist content

    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
}

//for the expense goal 
expenseGoalButton.addEventListener("click", () => {
    expenseGoal = parseFloat(expenseGoalInput.value);
    expenseGoalDisplay.innerText = expenseGoal;
  });

//function to add the expense
expenseButton.addEventListener("click", ()=>{
    if(!expenseInput.value || !expenseTitle.value){
        productTitleError.classList.remove("hide");
        return false;
    }

    //enable the buttons to modify
    disableButtons(false);



    //for the expense 
    let expenses= parseInt(expenseInput.value);

    let sum=parseInt(expenseValueDisplay.innerText)+expenses;
    expenseValueDisplay.innerText=sum;

    //total income (total budget-total expense)
    const totalBalance= totalIncome-sum;
    balanceAmountDisplay.innerText=totalBalance;

     //if the expense exceeds display a message
     if (totalBalance < 0) 
     {
         alert("Your expense exceeds your Income, be wise!")
     }

    //to add the expense goal and only move forward
    if(expenseGoalDisplay.innerText==="0")
    {
        prompt("Please set your goal first")
    }
    
    // for the expense to be exceeding the sum 
    if (sum > expenseGoal) {
        // Disable everything if expenses exceed the goal
        alert("You exceeded your expense goal, so app is disabled now!")
        disableButtons(true);
        expenseButton.disabled = true;
        expenseTitle.disabled = true;
        expenseInput.disabled = true;
        expenseGoalButton.disabled = true;
        expenseGoalInput.disabled = true;
      }

   

    listCreator(expenseTitle.value, expenseInput.value)

    expenseInput.value="";
    expenseTitle.value="";

    
});

refreshButton.addEventListener("click",()=>{
    location.reload();
})
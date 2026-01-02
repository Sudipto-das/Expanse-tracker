const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const list = document.getElementById("expense-list");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex=null;

function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function calculateTotal() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalEl.textContent = total;
}

function renderExpenses() {
    list.innerHTML = "";

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
      ${expense.title} - ₹${expense.amount}
      <div>

      <button class = "edit" onClick="editExpense(${index})">Edit</button>
      <button class="delete" onclick="deleteExpense(${index})">X</button>
      </div>
      
    `;
        list.appendChild(li);
    });

    calculateTotal();
}
function editExpense(index) {
    titleInput.value = expenses[index].title;
    amountInput.value = expenses[index].amount;
    editIndex = index;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveToLocalStorage();
    renderExpenses();
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const expense = {
        title: titleInput.value,
        amount: Number(amountInput.value),
    };
    if(editIndex === null){
        expenses.push(expense);
    } else {
        expenses[editIndex] = expense;
        editIndex =null;
    }

    
    saveToLocalStorage();
    renderExpenses();

    titleInput.value = "";
    amountInput.value = "";
});

// Initial load
renderExpenses();

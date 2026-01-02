const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const list = document.getElementById("expense-list");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

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
      <button class="delete" onclick="deleteExpense(${index})">X</button>
    `;
    list.appendChild(li);
  });

  calculateTotal();
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

  expenses.push(expense);
  saveToLocalStorage();
  renderExpenses();

  titleInput.value = "";
  amountInput.value = "";
});

// Initial load
renderExpenses();

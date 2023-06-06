// variables
var input = document.getElementById("todo-items");
var todoList = document.getElementById("todo-list");
var addButton = document.getElementById("add");

// function to add a task
function addTask() {
  var task = input.value.trim();

  if (task !== "") {
    var listItem = document.createElement("li");
    var taskText = document.createElement("span");
    taskText.textContent = task;
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deleteTask);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteBtn);
    todoList.appendChild(listItem);
    input.value = "";
  }
}

// function to delete a task
function deleteTask() {
  var listItem = this.parentNode; // the current node that has been added
  todoList.removeChild(listItem);
}

// event listener for adding a task
addButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
  addTask();
});

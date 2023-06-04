// for storing the name in the local storage as well as the todos

window.addEventListener("load", () => {
	todos = JSON.parse(localStorage.getItem("todos")) || [];
	const nameInput = document.querySelector("#name");
	const newTodoForm = document.querySelector("#todo-form");

	const userName = localStorage.getItem("userName") || ""; //if name add else empty

	nameInput.value = userName;

	nameInput.addEventListener("change", (e) => {
		localStorage.setItem("userName", e.target.value);
	});

	todos.forEach((todo) => {
		todo.done = false;
	});

	newTodoForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime(),
		};

		todos.push(todo);

		localStorage.setItem("todos", JSON.stringify(todos));
		e.target.reset();

		displayTodos();
	});
	displayTodos();
});

//now we want to display the todos in the screen
function displayTodos() {
	const todoList = document.querySelector("#todo-list");

	todoList.innerHTML = "";

	todos.forEach((todo) => {
		const todoItem = document.createElement("div");
		todoItem.classList.add("todo-item");

		const label = document.createElement("label");
		const input = document.createElement("input");
		const span = document.createElement("span");
		const content = document.createElement("div");
		const actions = document.createElement("div");
		const edit = document.createElement("button");
		const deleteButton = document.createElement("button");

		input.type = "checkbox";
		input.checked = todo.done;
		span.classList.add("bubble");

		// for choosing the category of business or personal or selfcare

		if (todo.category === "personal") {
			span.classList.add("personal");
			input.classList.add("personal-checkbox");
		} else if(todo.category==="business") {
			span.classList.add("business");
			input.classList.remove("personal-checkbox");
		}else if(todo.category==="selfcare"){
			span.classList.add("selfcare");
			input.classList.remove("personal-checkbox");
		}else{
			span.classList.add("fitness");
			input.classList.remove("personal-checkbox");
		}

		//creating the div inside which adding all the items in the div to create the class of todolist and add the item

		content.classList.add("todo-content");
		actions.classList.add("actions");
		edit.classList.add("edit");
		deleteButton.classList.add("delete");

		
		//for the displaying of the time and date created at
		const createdAt = new Date(todo.createdAt);
		const dateString = createdAt.toLocaleDateString();
		const timeString = createdAt.toLocaleTimeString();

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>
         <span class="created-time">Time created at: ${timeString} & on ${dateString}</span>`;

		edit.innerHTML = "Edit";
		deleteButton.innerHTML = "Delete";

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

			

		//for striking through the done object while pressing the checked button

		input.addEventListener("change", (e) => {
			todo.done = e.target.checked;
			localStorage.setItem("todos", JSON.stringify(todos));
		});

		//to edit the todo list from the added list
		edit.addEventListener("click", (e) => {
			const input = content.querySelector("input");
			input.removeAttribute("readonly");
			input.focus();

			input.addEventListener("blur", (e) => {
				input.setAttribute("readonly", true);
				todo.content = e.target.value;
				localStorage.setItem("todos", JSON.stringify(todos));
				displayTodos();
			});
		});

		// to delete the list from the saved item
		deleteButton.addEventListener("click", (e) => {
			todos = todos.filter((t) => t != todo);
			localStorage.setItem("todos", JSON.stringify(todos));
			displayTodos();
		});
	});
}

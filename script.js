const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded",getLocalTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",handleActions);
filterOption.addEventListener("change",filterTodo);

function addTodo(event){
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo=document.createElement("li");
    newTodo.innerText=todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);
    const completedButton=document.createElement("button");
    completedButton.innerHTML='<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML='<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv)
    todoInput.value="";

    const editButton = document.createElement("button");
    editButton.innerHTML = "📝";
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);



}
todoList.addEventListener("click", handleActions);

function handleActions(e){
    const item = e.target;
    const todo = item.closest(".todo");

    if(item.classList.contains("trash-btn")){
        todo.classList.add("slide");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }

    if(item.classList.contains("complete-btn")){
        todo.classList.toggle("completed");
    }

    if(item.classList.contains("edit-btn")){
        const todoItem = todo.querySelector(".todo-item");
        const oldText = todoItem.innerText;

        const input = document.createElement("input");
        input.type = "text";
        input.value = oldText;
        input.classList.add("edit-input");
        todo.replaceChild(input, todoItem);
        input.focus();

        input.addEventListener("blur", function(){
            const updatedText = input.value.trim();
            if(updatedText !== "") {
                todoItem.innerText = updatedText;
                todo.replaceChild(todoItem, input);
                updateLocalTodos(oldText, updatedText);
            } else {
                alert("Task can't be empty!");
                input.focus();
            }
        });

        input.addEventListener("keydown", function(e){
            if(e.key === "Enter"){
                input.blur();
            }
        });
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed": 
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function updateLocalTodos(oldTodo, newTodo){
    let todos = JSON.parse(localStorage.getItem("todos"));
    const index = todos.indexOf(oldTodo);
    if(index !== -1){
        todos[index] = newTodo;
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

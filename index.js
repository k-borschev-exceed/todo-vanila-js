const form = document.querySelector("form");
const todos = document.querySelector(".todos");
const input = document.querySelector("input");
var storedTodos = [];
var storedCompletedTodos = [];
var todoValues;
window.onload = () => {
  if (localStorage.getItem("completedTodos")) {
    storedCompletedTodos = JSON.parse(localStorage.getItem("completedTodos"));
    for (var todo in storedCompletedTodos) {
      createTaskElement(storedCompletedTodos[todo], true, true);
    }
  }

  if (localStorage.getItem("todos")) {
    storedTodos = JSON.parse(localStorage.getItem("todos"));
    for (var todo in storedTodos) {
      createTaskElement(storedTodos[todo], false, true);
    }
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createTaskElement(input.value, false, false);
  input.value = "";
});

var createTaskElement = (taskValue, isCompleted, isInitial) => {
  var todo = document.createElement("LI");
  todo.classList.add("list-group-item");
  todo.innerText = taskValue;
  if (!isInitial) {
    storedTodos.push(taskValue);
    localStorage.setItem("todos", JSON.stringify(storedTodos));
  }

  if (isCompleted) {
    todo.style["text-decoration"] = "line-through";
    todo.style["background-color"] = "#A9A9A9";
    var returnCompleteTaskButtonButton = document.createElement("BUTTON");
    returnCompleteTaskButtonButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
    </svg>`;
    returnCompleteTaskButtonButton.classList.add(
      "btn",
      "btn-success",
      "float-end"
    );

    returnCompleteTaskButtonButton.onclick = returnTask;
  } else {
    var completeTaskButton = document.createElement("BUTTON");
    completeTaskButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
    </svg>`;
    completeTaskButton.classList.add("btn", "btn-success", "float-end");
    completeTaskButton.onclick = completeTask;
    todo.appendChild(completeTaskButton);
  }
  if (returnCompleteTaskButtonButton) {
    todo.insertBefore(returnCompleteTaskButtonButton, todo.firstChild);
  }
  var rejectTaskButton = document.createElement("BUTTON");
  rejectTaskButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
  </svg>`;
  rejectTaskButton.classList.add("btn", "btn-danger", "float-end");
  rejectTaskButton.onclick = rejectTask;
  todo.appendChild(rejectTaskButton);

  todos.insertBefore(todo, todos.firstChild);
};

var completeTask = (e) => {
  for (var i = 0; ; i++) {
    if (e.path[i].tagName === "LI") {
      break;
    }
  }

  for (var j = 0; ; j++) {
    if (storedTodos[j] === e.path[i].innerText) {
      storedCompletedTodos.push(storedTodos[j]);
      storedTodos.splice(j, 1);
      localStorage.setItem("todos", JSON.stringify(storedTodos));
      localStorage.setItem(
        "completedTodos",
        JSON.stringify(storedCompletedTodos)
      );
      break;
    }
  }
  e.path[i].style["background-color"] = "#A9A9A9";
  e.path[i].style["text-decoration"] = "line-through";
  e.path[i].children[0].remove();

  var returnCompleteTaskButtonButton = document.createElement("BUTTON");
  returnCompleteTaskButtonButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
    </svg>`;
  returnCompleteTaskButtonButton.classList.add(
    "btn",
    "btn-success",
    "float-end"
  );
  returnCompleteTaskButtonButton.onclick = returnTask;

  e.path[i].appendChild(returnCompleteTaskButtonButton);
};

var rejectTask = (e) => {
  var isConfirmed = confirm("delete task?");
  if (isConfirmed) {
    for (var i = 0; ; i++) {
      if (e.path[i].tagName === "LI") {
        break;
      }
    }

    if (e.path[i].style["text-decoration"] !== "line-through") {
      for (var j = 0; j < storedTodos.length; j++) {
        if (storedTodos[j] === e.path[i].innerText) {
          storedTodos.splice(j, 1);
          localStorage.setItem("todos", JSON.stringify(storedTodos));
          break;
        }
      }
    } else {
      for (var k = 0; k < storedCompletedTodos.length; k++) {
        if (storedCompletedTodos[k] === e.path[i].innerText) {
          storedCompletedTodos.splice(k, 1);
          localStorage.setItem(
            "completedTodos",
            JSON.stringify(storedCompletedTodos)
          );
          break;
        }
      }
    }
    e.path[i].remove();
  }
};

var returnTask = (e) => {
  for (var i = 0; ; i++) {
    if (e.path[i].tagName === "LI") {
      break;
    }
  }

  storedTodos.push(e.path[i].innerText);
  localStorage.setItem("todos", JSON.stringify(storedTodos));

  for (var k = 0; k < storedCompletedTodos.length; k++) {
    if (storedCompletedTodos[k] === e.path[i].innerText) {
      storedCompletedTodos.splice(k, 1);
      localStorage.setItem(
        "completedTodos",
        JSON.stringify(storedCompletedTodos)
      );
      break;
    }
  }
  if (e.path[i].children[0].classList.contains("btn-success")) {
    e.path[i].children[0].remove();
  } else {
    e.path[i].children[1].remove();
  }
  e.path[i].style["text-decoration"] = "none";
  e.path[i].style["background-color"] = "white";
  var completeTaskButton = document.createElement("BUTTON");
  completeTaskButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
    </svg>`;
  completeTaskButton.classList.add("btn", "btn-success", "float-end");
  completeTaskButton.onclick = completeTask;
  e.path[i].insertBefore(completeTaskButton, e.path[i].firstChild);
};

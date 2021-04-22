const form = document.querySelector('form');
const todos = document.querySelector('.todos');
const input = document.querySelector('input');
let storedTodos = [];

class TaskElement {
  constructor(task, isCompleted, id) {
    this.task = task;
    this.isCompleted = isCompleted;
    this.id = id;

    this.todo = document.createElement('LI');
    this.todo.setAttribute('id', this.id);
    this.todo.classList.add('list-group-item');
    this.todo.innerHTML = `<p>${task}</p>`;

    this.completeBtn = document.createElement('BUTTON');
    this.completeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
    </svg>`;
    this.completeBtn.classList.add('btn', 'btn-success', 'float-end');
    this.completeBtn.onclick = this.makeCompleted;

    this.resetBtn = document.createElement('BUTTON');
    this.resetBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
    </svg>`;
    this.resetBtn.classList.add('btn', 'btn-success', 'float-end');
    this.resetBtn.onclick = this.makeUncompleted;

    this.deleteBtn = document.createElement('BUTTON');
    this.deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
    </svg>`;
    this.deleteBtn.classList.add('btn', 'btn-danger', 'float-end');
    this.deleteBtn.onclick = this.deleteTask;

    if (this.isCompleted) {
      this.todo.style['text-decoration'] = 'line-through';
      this.todo.style['background-color'] = '#A9A9A9';
      this.buttons = [this.resetBtn, this.deleteBtn];
      this.todo.append(...this.buttons);
    } else {
      this.buttons = [this.completeBtn, this.deleteBtn];
      this.todo.append(...this.buttons);
    }
  }

  makeCompleted = () => {
    this.isCompleted = true;
    const [i, j] = this.detectId(this.id);
    todos.children[i].parentNode.removeChild(todos.children[i]);
    const temp = new TaskElement(this.task, true, this.id);
    todos.append(temp.todo);
    storedTodos[i].isCompleted = true;
    localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
  };

  makeUncompleted = () => {
    this.isCompleted = false;
    const [i, j] = this.detectId(this.id);
    todos.children[i].parentNode.removeChild(todos.children[i]);
    const temp = new TaskElement(this.task, false, this.id);
    todos.insertBefore(temp.todo, todos.children[0]);
    storedTodos[j].isCompleted = false;
    localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
  };

  deleteTask = () => {
    if (confirm('delete task?')) {
      const [i, j] = this.detectId(this.id);
      todos.children[i].parentNode.removeChild(todos.children[i]);
      storedTodos.splice(j, 1);
      localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
    }
  };

  detectId(id) {
    let i;
    for (i = 0; i < todos.children.length; i++) {
      if (todos.children[i].id == this.id) break;
    }
    let j;
    storedTodos = JSON.parse(localStorage.getItem('storedTodos') || '[]');
    for (j = 0; j < todos.children.length; j++) {
      if (storedTodos[j].id == this.id) break;
    }
    return [i, j];
  }
}

window.onload = () => {
  storedTodos = JSON.parse(localStorage.getItem('storedTodos') || '[]');
  console.log(storedTodos);
  storedTodos.sort(function (a, b) {
    if (a.isCompleted > b.isCompleted) {
      return 1;
    }
    if (a.isCompleted < b.isCompleted) {
      return -1;
    }
    return 0;
  });
  storedTodos.forEach((e) => {
    const temp = new TaskElement(e.task, e.isCompleted, e.id);
    todos.append(temp.todo);
  });
  console.log('all');
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = +new Date();
  const temp = new TaskElement(input.value, false, id);
  todos.append(temp.todo);
  storedTodos = JSON.parse(localStorage.getItem('storedTodos') || '[]');
  storedTodos.push({
    task: input.value,
    isCompleted: false,
    id,
  });
  input.value = '';

  console.log('stored todos after push');
  console.log(storedTodos);
  localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
});

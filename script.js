let tasks = [];

function Task(title, description, assignedUser, priority) {
  this.title = title;
  this.description = description;
  this.assignedUser = assignedUser;
  this.priority = priority || "Normal"; // Default priority is Normal
}

function addTask() {
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-description").value;
  const assignedUser = document.getElementById("task-user").value;
  const priority = document.getElementById("task-priority").value;

  const task = new Task(title, description, assignedUser, priority);
  tasks.push(task);

  renderTasks();
  resetForm();

  notifyObservers(task);
}

// Observer pattern - Create an Observer object to notify when a new task is added
const observers = [];

function addObserver(observer) {
  observers.push(observer);
}

function removeObserver(observer) {
  const index = observers.indexOf(observer);
  if (index !== -1) {
    observers.splice(index, 1);
  }
}

function notifyObservers(task) {
  observers.forEach((observer) => {
    observer.update(task);
  });
}

const taskAddedObserver = {
  update: function (task) {
    const notification = `New task added: ${task.title} [${task.priority}]`;
    alert(notification);
  },
};

addObserver(taskAddedObserver);

function renderTasks() {
  const taskList = document.getElementById("tasks");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.innerHTML = `<h3>${task.title}</h3>
                             <p>${task.description}</p>
                             <p>Assigned to: ${task.assignedUser}</p>`;
    taskList.appendChild(taskElement);
  });
}

function resetForm() {
  document.getElementById("task-form").reset();
}

document.addEventListener("DOMContentLoaded", function () {
  renderTasks();
});

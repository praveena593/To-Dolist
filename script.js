document.addEventListener("DOMContentLoaded", loadTasks);
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);

  saveTask(taskText);
  taskInput.value = "";
}

function createTaskElement(taskText) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", toggleTaskCompletion);

  const taskContent = document.createElement("span");
  taskContent.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Remove";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", deleteTask);

  label.appendChild(checkbox);
  label.appendChild(taskContent);
  taskItem.appendChild(label);
  taskItem.appendChild(deleteBtn);

  return taskItem;
}

function toggleTaskCompletion(event) {
  const taskContent = event.target.nextElementSibling;
  taskContent.classList.toggle("completed");
  updateTaskStatus(taskContent.textContent, event.target.checked);
}

function deleteTask(event) {
  const taskItem = event.target.parentElement;
  const taskText = taskItem.querySelector("span").textContent;
  taskItem.remove();
  removeTask(taskText);
}

function saveTask(taskText) {
  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => {
    const taskItem = createTaskElement(task.text);
    if (task.completed) {
      const checkbox = taskItem.querySelector("input[type='checkbox']");
      const taskContent = taskItem.querySelector("span");
      checkbox.checked = true;
      taskContent.classList.add("completed");
    }
    taskList.appendChild(taskItem);
  });
}

function updateTaskStatus(taskText, isCompleted) {
  const tasks = getTasks();
  const task = tasks.find(t => t.text === taskText);
  if (task) {
    task.completed = isCompleted;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function removeTask(taskText) {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

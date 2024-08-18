// Get references to DOM elements
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add');
const deleteCompletedBtn = document.getElementById('delete');
const taskList = document.getElementById('task');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear the list

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        // Create a checkbox for marking task as completed
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleComplete(index)); // Toggle task completion

        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `<span>${task.text}</span>`;
        
        // Add the checkbox in front of the task text
        li.prepend(checkbox);

        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = ''; // Clear the input field
}

// Function to toggle task completion
function toggleComplete(index) {
    if (tasks[index]) {  // Check if the task exists before toggling
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }
}

// Function to delete completed tasks
function deleteCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for adding a task
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Event listener for deleting completed tasks
deleteCompletedBtn.addEventListener('click', deleteCompletedTasks);

// Initial rendering of tasks
renderTasks();

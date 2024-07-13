document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const taskPriority = document.getElementById('task-priority');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const filterAllButton = document.getElementById('filter-all');
    const filterActiveButton = document.getElementById('filter-active');
    const filterCompletedButton = document.getElementById('filter-completed');

    let tasks = [];

    addTaskButton.addEventListener('click', addTask);
    filterAllButton.addEventListener('click', () => filterTasks('all'));
    filterActiveButton.addEventListener('click', () => filterTasks('active'));
    filterCompletedButton.addEventListener('click', () => filterTasks('completed'));

    function addTask() {
        const taskText = taskInput.value.trim();
        const dueDate = taskDate.value;
        const priority = taskPriority.value;

        if (taskText === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            dueDate: dueDate,
            priority: priority,
            completed: false
        };

        tasks.push(task);
        taskInput.value = '';
        taskDate.value = '';
        taskPriority.value = 'low';
        renderTasks(tasks);
    }

    function renderTasks(tasksToRender) {
        taskList.innerHTML = '';
        tasksToRender.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span>${task.text} (Due: ${task.dueDate}, Priority: ${task.priority})</span>
                <div>
                    <button class="complete-button" onclick="toggleComplete(${task.id})">✔</button>
                    <button class="delete-button" onclick="deleteTask(${task.id})">✖</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    window.toggleComplete = function(id) {
        tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
        renderTasks(tasks);
    };

    window.deleteTask = function(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks(tasks);
    };

    function filterTasks(filter) {
        let filteredTasks;
        switch (filter) {
            case 'active':
                filteredTasks = tasks.filter(task => !task.completed);
                break;
            case 'completed':
                filteredTasks = tasks.filter(task => task.completed);
                break;
            default:
                filteredTasks = tasks;
        }
        renderTasks(filteredTasks);
    }
});


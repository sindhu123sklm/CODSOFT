// JavaScript code for the to-do list in tabular form

const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('addTask');
const taskTable = document.querySelector('#taskList tbody');

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="checkbox" class="task-checkbox"></td>
            <td>${taskText}</td>
            <td><button class="edit-button">Edit</button></td>
            <td><button class="delete-button">Delete</button></td>
        `;
        taskTable.appendChild(newRow);
        taskInput.value = '';

        const checkbox = newRow.querySelector('.task-checkbox');
        const editButton = newRow.querySelector('.edit-button');
        const deleteButton = newRow.querySelector('.delete-button');

        checkbox.addEventListener('change', () => {
            newRow.classList.toggle('completed', checkbox.checked);
            saveTasksToLocalStorage();
        });

        editButton.addEventListener('click', () => {
            const cell = newRow.querySelector('td:nth-child(2)');
            const newTaskText = prompt('Edit task:', cell.textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                cell.textContent = newTaskText;
                saveTasksToLocalStorage();
            }
        });

        deleteButton.addEventListener('click', () => {
            taskTable.removeChild(newRow);
            saveTasksToLocalStorage();
        });

        saveTasksToLocalStorage();
    }
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(taskTable.children).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            text: cells[1].textContent,
            completed: row.classList.contains('completed')
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskData => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="checkbox" class="task-checkbox" ${taskData.completed ? 'checked' : ''}></td>
            <td>${taskData.text}</td>
            <td><button class="edit-button">Edit</button></td>
            <td><button class="delete-button">Delete</button></td>
        `;
        taskTable.appendChild(newRow);

        const checkbox = newRow.querySelector('.task-checkbox');
        const editButton = newRow.querySelector('.edit-button');
        const deleteButton = newRow.querySelector('.delete-button');

        checkbox.addEventListener('change', () => {
            newRow.classList.toggle('completed', checkbox.checked);
            saveTasksToLocalStorage();
        });

        editButton.addEventListener('click', () => {
            const cell = newRow.querySelector('td:nth-child(2)');
            const newTaskText = prompt('Edit task:', cell.textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                cell.textContent = newTaskText;
                saveTasksToLocalStorage();
            }
        });

        deleteButton.addEventListener('click', () => {
            taskTable.removeChild(newRow);
            saveTasksToLocalStorage();
        });
    });
}

loadTasksFromLocalStorage();
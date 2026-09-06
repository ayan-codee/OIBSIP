let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');
const pendingCount = document.getElementById('pending-count');
const completedCount = document.getElementById('completed-count');
const pendingEmpty = document.getElementById('pending-empty');
const completedEmpty = document.getElementById('completed-empty');


form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const text = taskInput.value.trim();
    
    if (text !== '') {
        const newTask = {
            id: Date.now(), 
            text: text,
            completed: false, 
            timestamp: new Date().toLocaleString()
        };
        
        tasks.push(newTask); 
        taskInput.value = ''; 
        
        saveAndRender(); 
    }
});


function renderTasks() {
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    let pendingCountNum = 0;
    let completedCountNum = 0;

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <label class="checkbox-container">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                <span class="checkmark"></span>
            </label>
            <div class="task-content">
                <span class="task-text" id="text-${task.id}">${task.text}</span>
                <span class="task-time">${task.completed ? 'Completed' : 'Added'}: ${task.timestamp}</span>
            </div>
            <div class="task-actions">
                ${!task.completed ? `<button class="btn-icon edit-btn" onclick="editTask(${task.id})" title="Edit">✎</button>` : ''}
                <button class="btn-icon delete-btn" onclick="deleteTask(${task.id})" title="Delete">×</button>
            </div>
        `;

        if (task.completed) {
            completedList.appendChild(li);
            completedCountNum++;
        } else {
            pendingList.appendChild(li);
            pendingCountNum++;
        }
    });

    pendingCount.innerText = pendingCountNum;
    completedCount.innerText = completedCountNum;

    pendingEmpty.style.display = pendingCountNum === 0 ? 'block' : 'none';
    completedEmpty.style.display = completedCountNum === 0 ? 'block' : 'none';
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id); 
    if (task) {
        task.completed = !task.completed; 
        saveAndRender();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const textSpan = document.getElementById(`text-${id}`);
    
    textSpan.innerHTML = `<input type="text" class="edit-input" id="edit-input-${id}" value="${task.text}">`;
    
    const inputField = document.getElementById(`edit-input-${id}`);
    inputField.focus(); 

    inputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveEdit(id, inputField.value);
        }
    });

    inputField.addEventListener('blur', function() {
        saveEdit(id, inputField.value);
    });
}

function saveEdit(id, newText) {
    const task = tasks.find(t => t.id === id);
    if (task && newText.trim() !== '') {
        task.text = newText.trim();
    }
    saveAndRender();
}


function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

renderTasks();
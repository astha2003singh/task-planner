const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  // Move main cursor
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';

  // Create sparkle
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.top = e.clientY + 'px';
  sparkle.style.left = e.clientX + 'px';
  document.body.appendChild(sparkle);

  // Remove after animation ends
  setTimeout(() => {
    sparkle.remove();
  }, 600);
});

let tasks = [];

const addTask = () => {
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = ''; // Clear input after adding
    updateTaskList();
    updateProgress();
  }
};

const updateTaskList = () => {
  const taskList = document.querySelector('.task-list');
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="To-Do-Img/images/edit.png" class="edit-btn" alt="edit">
          <img src="To-Do-Img/images/bin.png" class="delete-btn" alt="delete">
        </div>
      </div>
    `;

    // Add event listeners
    const checkbox = listItem.querySelector('.checkbox');
    const editBtn = listItem.querySelector('.edit-btn');
    const deleteBtn = listItem.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => toggleTaskComplete(index));
    editBtn.addEventListener('click', () => editTask(index));
    deleteBtn.addEventListener('click', () => deleteTask(index));

    taskList.appendChild(listItem);
  });
  
  updateProgress();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
};

const editTask = (index) => {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    updateTaskList();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
};

const createConfetti = () => {
  const container = document.querySelector('.celebration-container');
  container.innerHTML = '';
  container.style.display = 'block';

  // Create celebration message
  const message = document.createElement('div');
  message.className = 'celebration-message';
  message.textContent = '🎉Mission Accomplished!🎉';
  container.appendChild(message);
  message.style.display = 'block';

  // Create confetti pieces
  const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96f7d2'];
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(confetti);
  }

  // Clean up after animation
  setTimeout(() => {
    container.style.display = 'none';
    container.innerHTML = '';
  }, 5000);
};

const updateProgress = () => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  
  const progressFill = document.querySelector('.progress-fill');
  const numbersElement = document.getElementById('numbers');
  
  if (total > 0) {
    const percentage = (completed / total) * 100;
    progressFill.style.width = percentage + '%';
    
    // Check if all tasks are completed
    if (completed === total) {
      createConfetti();
    }
  } else {
    progressFill.style.width = '0%';
  }
  
  numbersElement.textContent = `${completed} / ${total}`;
};

// Event listener for form submission
document.querySelector('.task-form').addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});

// Initial update
updateTaskList();
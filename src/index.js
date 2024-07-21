document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  const prioritySelect = document.getElementById("priority");
  const sortSelect = document.getElementById("sort-priority");
  const dueDateInput = document.getElementById("due-date");

  let tasks = []; 

  form.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const taskInput = document.getElementById("new-task-description");
    const taskDescription = taskInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;

    if (taskDescription !== "") {
      const task = { description: taskDescription, priority, dueDate };
      tasks.push(task); 
      updateTaskList();
      taskInput.value = "";
      dueDateInput.value = "";
    }
  });

  function updateTaskList() {
    taskList.innerHTML = "";
    
    
    const sortedTasks = tasks.slice().sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      if (sortSelect.value === "asc") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortSelect.value === "desc") {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return 0;
      }
    });
    
    sortedTasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = `${task.description} - Due: ${task.dueDate}`;
      
      
      let color;
      switch (task.priority) {
        case "high":
          color = "red";
          break;
        case "medium":
          color = "yellow";
          break;
        case "low":
          color = "green";
          break;
      }
      li.style.color = color;
      
      
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function() {
        tasks = tasks.filter(t => t !== task);
        updateTaskList();
      });
      
      
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", function() {
        taskInput.value = task.description;
        prioritySelect.value = task.priority;
        dueDateInput.value = task.dueDate;
        tasks = tasks.filter(t => t !== task);
        updateTaskList();
      });

      li.appendChild(editButton);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }
});

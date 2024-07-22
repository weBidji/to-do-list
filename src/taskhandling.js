export const tasks = [];

export function createTaskModal() {

    console.log('modal has arrived')

    // Create the task modal
    const taskModal = document.createElement('dialog');
    taskModal.id = 'task-modal';
    document.body.appendChild(taskModal);

    // Create the top bar
    const modalTopBar = document.createElement('div');
    modalTopBar.id = 'top-bar';
    taskModal.appendChild(modalTopBar);

    // Create and append the title
    const modalTitle = document.createElement('h4');
    modalTitle.textContent = 'Create new task';
    modalTopBar.appendChild(modalTitle);

    // Create and append the close button
    const closeButton = document.createElement('button');
    closeButton.id = 'close-button';
    closeButton.textContent = 'X';
    modalTopBar.appendChild(closeButton);

    // Function to create input elements
    function createInput(type, name, labelText) {
        const label = document.createElement('label');
        label.htmlFor = name;
        label.textContent = labelText;

        const createdInput = document.createElement('input');
        createdInput.type = type;
        createdInput.id = name;
        createdInput.name = name;

        const container = document.createElement('div');
        container.classList.add('form-input');
        container.appendChild(label);
        container.appendChild(createdInput);

        return container;
    }

    // Create the form
    const taskForm = document.createElement('form');
    taskForm.method = 'dialog';
    taskModal.appendChild(taskForm);

    // Create input elements and append to the form
    const nameInputDiv = createInput('text', 'name-input', 'Task name:');
    const nameInput = nameInputDiv.querySelector('input');

    const descInputDiv = createInput('text', 'desc-input', 'Task details:');
    const descInput = descInputDiv.querySelector('input');

    // Create and append project selection
    const projectInputDiv = document.createElement('div');
    const projectLabel = document.createElement('label');
    projectLabel.textContent = 'Project:';
    projectLabel.htmlFor = 'project-input';
    projectInputDiv.appendChild(projectLabel);

    const projectInput = document.createElement('select');
    projectInput.name = 'project-input';
    projectInput.id = 'project-input';
    projectInputDiv.classList.add('form-input');
    projectInputDiv.appendChild(projectInput);

    const projectsArr = Array.from(document.querySelectorAll('.current-project'));
    projectsArr.forEach((project) => {
        const option = document.createElement('option');
        option.textContent = project.textContent;
        option.value = project.textContent;
        projectInput.appendChild(option);
    });

    const dateInputDiv = createInput('date', 'date-input', 'Due date:');
    const dateInput = dateInputDiv.querySelector('input');

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Add Task';
    submitButton.id = 'submit-btn';

    // Append all created elements to the form
    taskForm.appendChild(nameInputDiv);
    taskForm.appendChild(descInputDiv);
    taskForm.appendChild(projectInputDiv);
    taskForm.appendChild(dateInputDiv);
    taskForm.appendChild(submitButton);

    // Close button event listener
    closeButton.addEventListener('click', () => {
        taskModal.remove();
    });

    // Submit button event listener
    submitButton.addEventListener('click', (e) => {
        if (nameInput.value === '' || descInput.value === '' || dateInput.value === '') {
            e.preventDefault();
            alert('Please fill out the entire form.');
        } else {
            console.log(nameInput.value);
            console.log(dateInput.value);
            tasks.push({
                name: nameInput.value,
                description: descInput.value,
                project: projectInput.value,
                date: dateInput.value,
            });

            console.log(tasks);
            displayTasks('all');
            taskModal.remove();
        }
    });

    // Show the modal
    taskModal.showModal();

}

export function createTask(name, description, project, date) {

    const task = {
        name: name,
        description: description,
        project: project,
        date: date,
        markComplete: function () {
            this.completed = true;
        },
        edit: function (newName, newDescription, newDate) {
            this.name = newName;
            this.description = newDescription;
            this.date = newDate;
        },
        delete: function () {
            const index = tasks.indexOf(this);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        }
    };


    task.completed = false;


    tasks.push(task);



    return task;
}

let tasksToDisplay;

export function displayTasks(project) {


    const main = document.getElementById('main-section');
    const existingTasks = main.querySelectorAll('.task');
    existingTasks.forEach(task => task.remove());

    if (project === 'all') {
        tasksToDisplay = tasks;
    } else {
        tasksToDisplay = tasks.filter(containsProjectName)
    }

    function containsProjectName(task) {

        return task.project === project;
    }
    tasksToDisplay.forEach((task) => {

        const taskDiv = document.createElement('div');
        const taskName = document.createElement('h3');
        const taskDesc = document.createElement('p');
        const taskProject = document.createElement('p');
        const taskDate = document.createElement('p');
        const completedButton = document.createElement('button');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');


        taskDiv.classList.add('task');
        taskName.classList.add('task-name');
        taskDesc.classList.add('task-desc');
        taskProject.classList.add('task-project');
        taskDate.classList.add('task-date')
        completedButton.classList.add('completed-button');
        editButton.classList.add('edit-button')
        deleteButton.classList.add('delete-button')
        const main = document.getElementById('main-section');

        taskName.textContent = task.name;
        taskDesc.textContent = task.description;
        taskProject.textContent = task.project;
        taskDate.textContent = `(Due: ${task.date})`;
        editButton.textContent = 'Edit task'
        deleteButton.textContent = 'Delete'



        main.appendChild(taskDiv);
        taskDiv.appendChild(completedButton);
        taskDiv.appendChild(taskName);
        taskDiv.appendChild(taskDesc);
        taskDiv.appendChild(taskProject);
        taskDiv.appendChild(taskDate);
        taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton);

      /*  deleteButton.addEventListener('click', () => {
            console.log('task removed');
            task.remove();
        })*/

    })

}

export function openModal() {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', () => {

        console.log('clicked');

        createTaskModal();
    }
    )
}

export function markAsComplete() {

    const main = document.getElementById('main-section');

    main.addEventListener('click', (e) => {
        if (e.target.classList.contains('completed-button')) {
            console.log('marking as complete');
            const completedTask = e.target.closest('.task');
            completedTask.classList.toggle('completed');
            e.target.classList.toggle('checked')

        }
    });

}

export function deleteTask() {
    const main = document.getElementById('main-section');

    main.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-button')) {
            console.log('Deleting task');

            const taskToRemove = e.target.closest('.task');
            const taskName = taskToRemove.querySelector('.task-name').textContent;
            const taskIndex = tasks.findIndex(task => task.name === taskName);

            if (taskIndex > -1) {
                tasks.splice(taskIndex, 1);
                console.log('Task removed from array');
            }


          // taskToRemove.remove();
           displayTasks('all');

            console.log(tasks);
        }
    });
}






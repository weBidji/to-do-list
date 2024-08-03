import { renderProjects } from "./projects";

export let tasks = [];

export function createTaskModal() {


    // Modal
    const taskModal = document.createElement('dialog');
    taskModal.id = 'task-modal';
    document.body.appendChild(taskModal);

    // Top bar
    const modalTopBar = document.createElement('div');
    modalTopBar.id = 'top-bar';
    taskModal.appendChild(modalTopBar);

    // Title
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Create new task';
    modalTopBar.appendChild(modalTitle);

    // Close Button
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

    // Create  form
    const taskForm = document.createElement('form');
    taskForm.method = 'dialog';
    taskModal.appendChild(taskForm);

    // Input elements
    const nameInputDiv = createInput('text', 'name-input', 'Task name:');
    const nameInput = nameInputDiv.querySelector('input');

    const descInputDiv = createInput('text', 'desc-input', 'Task details:');
    const descInput = descInputDiv.querySelector('input');

    // Project selection

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

    //Date input

    const dateInputDiv = createInput('date', 'date-input', 'Due date:');
    const dateInput = dateInputDiv.querySelector('input');

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Add Task';
    submitButton.id = 'submit-btn';

    // Append created elements

    taskForm.appendChild(nameInputDiv);
    taskForm.appendChild(descInputDiv);
    taskForm.appendChild(projectInputDiv);
    taskForm.appendChild(dateInputDiv);
    taskForm.appendChild(submitButton);

    nameInput.focus();

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

            tasks.push({
                name: nameInput.value,
                description: descInput.value,
                project: projectInput.value,
                date: dateInput.value,
            });

            storeTasks();
            renderTasks('all');
            taskModal.remove();
        }
    });

    // Show modal
    taskModal.showModal();

}

export function createTask(name, description, project, date) {

    const task = {
        name: name,
        description: description,
        project: project,
        date: date,
    };

    tasks.push(task);
    console.log('task pushed');
    storeTasks();
    renderTasks('all');

}



export function renderTasks(project) {

    console.log('rendering');
    const main = document.getElementById('main-section');
    const mainTitleContainer = document.getElementById('main-title-container');


    //Get tasks from storage before rendering

    let storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }

    let tasksToDisplay;

    // Clear section

    const titleToDelete = main.querySelector('h2');
    if (titleToDelete) { titleToDelete.remove(); }
    const existingTasks = main.querySelectorAll('.task');
    existingTasks.forEach(task => task.remove());

    // Title of current project

    const projectTitle = document.createElement('h2');
    projectTitle.id = 'project-title';
    if (project === 'all') {
        projectTitle.textContent = 'All projects'
    } else {
        projectTitle.textContent = project;
    }

    mainTitleContainer.appendChild(projectTitle);


    // Filter tasks relative to selected project

    if (project === 'all') {
        tasksToDisplay = tasks;


    } else {
        tasksToDisplay = tasks.filter(containsProjectName)
    }

    function containsProjectName(task) {

        return task.project === project;
    };

    // Create, fill and append elements to section

    tasksToDisplay.forEach((task) => {

        const taskDiv = document.createElement('div');
        const taskName = document.createElement('h3');
        const taskDesc = document.createElement('div');
        const taskProject = document.createElement('div');
        const taskDate = document.createElement('div');
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

        taskName.textContent = capitalizeFirstLetter(task.name);
        taskDesc.textContent = capitalizeFirstLetter(task.description);

        let taskProjectText = '';
        if (task.project === '') {
            taskProjectText = '(No project)'
        } else {
            taskProjectText = task.project;
        }
        taskProject.innerHTML = '<span><svg class="project-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z" /></svg></span>' + `<p class="task-project-name">${capitalizeFirstLetter(taskProjectText)}</p>`;
        taskDate.innerHTML = '<span><svg  class= "calendar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V9H19V19M19 7H5V5H19V7Z" /></svg></span>' + `<p>${task.date}</p>`;
        editButton.innerHTML = '<svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.13 12L19.39 10.74C19.83 10.3 20.39 10.06 21 10V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H11V19.13L11.13 19H5V5H12V12H18.13M14 4.5L19.5 10H14V4.5M19.13 13.83L21.17 15.87L15.04 22H13V19.96L19.13 13.83M22.85 14.19L21.87 15.17L19.83 13.13L20.81 12.15C21 11.95 21.33 11.95 21.53 12.15L22.85 13.47C23.05 13.67 23.05 14 22.85 14.19Z" /></svg>'

        deleteButton.innerHTML = '<svg class = "delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>'



        main.appendChild(taskDiv);
        taskDiv.appendChild(completedButton);
        taskDiv.appendChild(taskName);
        taskDiv.appendChild(taskDesc);
        taskDiv.appendChild(taskProject);
        taskDiv.appendChild(taskDate);
        taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton);


    })
    editTaskEventListener();
    deleteTask();

}

export function openModal() {
    const addBtn = document.getElementById('add-btn');

    addBtn.addEventListener('click', () => {

        createTaskModal();
    }
    )
}

export function markAsComplete() {

    const main = document.getElementById('main-section');

    main.addEventListener('click', (e) => {
        if (e.target.classList.contains('completed-button')) {
            const completedTask = e.target.closest('.task');
            completedTask.classList.toggle('completed');
            e.target.classList.toggle('checked')
        }
    });

}

export function deleteTask() {

    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            {
                console.log('Deleting task');

                const taskToRemove = e.target.closest('.task');
                const taskName = taskToRemove.querySelector('.task-name').textContent.toLowerCase();
                const taskIndex = tasks.findIndex(task => task.name === taskName);

                if (taskIndex > -1) {
                    tasks.splice(taskIndex, 1);
                    storeTasks();
                }



                const projectTitle = document.getElementById('project-title');
                const projectName = taskToRemove.querySelector('.task-project-name');
                console.log(projectName.textContent);


                if (projectTitle.textContent.toLowerCase() === projectName.textContent.toLowerCase()) {

                    renderTasks(projectTitle.textContent);

                } else {
                    renderTasks('all');
                }


            }
        });

    })



}

export function editTaskEventListener() {
    const editButtons = document.querySelectorAll('.edit-button')

    editButtons.forEach((button) => {

        button.addEventListener('click', (e) => {


            console.log('Editing task');

            const taskToEdit = e.target.closest('.task');
            const taskName = taskToEdit.querySelector('.task-name').textContent.toLowerCase();
            const taskIndex = tasks.findIndex(task => task.name === taskName);

            if (taskIndex > -1) {
                const task = tasks[taskIndex];


                openEditTaskModal(task, taskIndex);
            } else {
                console.log('Task not found in the array');
            }

        });
    })
};

function openEditTaskModal(task, taskIndex) {


    const taskModal = document.createElement('dialog');
    taskModal.id = 'task-modal';
    document.body.appendChild(taskModal);


    const modalTopBar = document.createElement('div');
    modalTopBar.id = 'top-bar';
    taskModal.appendChild(modalTopBar);


    const modalTitle = document.createElement('h4');
    modalTitle.textContent = 'Edit task';
    modalTopBar.appendChild(modalTitle);


    const closeButton = document.createElement('button');
    closeButton.id = 'close-button';
    closeButton.textContent = 'X';
    modalTopBar.appendChild(closeButton);

    // Function to create input elements

    function createInput(type, name, labelText, value = '') {
        const label = document.createElement('label');
        label.htmlFor = name;
        label.textContent = labelText;

        const createdInput = document.createElement('input');
        createdInput.type = type;
        createdInput.id = name;
        createdInput.name = name;
        createdInput.value = value;

        const container = document.createElement('div');
        container.classList.add('form-input');
        container.appendChild(label);
        container.appendChild(createdInput);

        return container;
    }

    // Date formatting function

    function formatDate(date) {

        const dateString = date;
        const [day, month, year] = dateString.split('/');


        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;

    }


    const taskForm = document.createElement('form');
    taskForm.method = 'dialog';
    taskModal.appendChild(taskForm);

    const nameInputDiv = createInput('text', 'name-input', 'Task name:', task.name);
    const nameInput = nameInputDiv.querySelector('input');

    const descInputDiv = createInput('text', 'desc-input', 'Task details:', task.description);
    const descInput = descInputDiv.querySelector('input');



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
        if (project.textContent === task.project) {
            option.selected = true;
        }
        projectInput.appendChild(option);
    });

    const formattedDate = formatDate(task.date);
    const dateInputDiv = createInput('date', 'date-input', 'Due date:', formattedDate);
    const dateInput = dateInputDiv.querySelector('input');

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Save Task';
    submitButton.id = 'submit-btn';


    taskForm.appendChild(nameInputDiv);
    taskForm.appendChild(descInputDiv);
    taskForm.appendChild(projectInputDiv);
    taskForm.appendChild(dateInputDiv);
    taskForm.appendChild(submitButton);


    closeButton.addEventListener('click', () => {
        taskModal.remove();
    });


    submitButton.addEventListener('click', (e) => {
        if (nameInput.value === '' || descInput.value === '' || dateInput.value === '') {
            e.preventDefault();
            alert('Please fill out the entire form.');
        } else {

            tasks[taskIndex] = {
                name: nameInput.value,
                description: descInput.value,
                project: projectInput.value,
                date: dateInput.value,
            };

            renderTasks('all');
            taskModal.remove();
        }
    });

    taskModal.showModal();
}


export function storeTasks() {

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


export function capitalizeFirstLetter(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);
}



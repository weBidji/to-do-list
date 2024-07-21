export const tasks = [];

export function createTaskModal() {

    //task modal

    const taskModal = document.createElement('dialog');
    taskModal.id = ('task-modal');
    document.body.appendChild(taskModal);


    const modalTopBar = document.createElement('div');
    taskModal.appendChild(modalTopBar);
    modalTopBar.id = 'top-bar';
    const modalTitle = document.createElement('h4');
    modalTitle.textContent = 'Create new task';
    modalTopBar.appendChild(modalTitle);
    const closeButton = document.createElement('button');
    closeButton.id = 'close-button';
    closeButton.textContent = 'X';
    modalTopBar.appendChild(closeButton);


    //modal form

    function createInput(type, name) {

        const createdInput = document.createElement('input');
        createdInput.type = type,
            createdInput.id = name,
            createdInput.name = name

        return createdInput;
    }

    const taskForm = document.createElement('form');
    taskForm.method = 'dialog';

    taskModal.appendChild(taskForm);

    const nameInput = createInput('text', 'name-input');
    nameInput.placeholder = 'Task Name';


    const descInput = createInput('text', 'desc-input');
    descInput.placeholder = 'Task Description';

    const projectInput = document.createElement('select');

    const projectsArr = Array.from(document.querySelectorAll('.current-project'));
    projectsArr.forEach((project) => {

        console.log(project.textContent);
        const option = document.createElement('option');
        option.textContent = project.textContent;
        option.value = project.textContent;
        projectInput.appendChild(option);

    })
    const dateInput = createInput('date', 'date-input')

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Add Task';
    submitButton.id = 'submit-btn';



    taskForm.appendChild(nameInput);
    taskForm.appendChild(descInput);
    taskForm.appendChild(projectInput);
    taskForm.appendChild(dateInput);
    taskForm.appendChild(submitButton);

    closeButton.addEventListener('click', () => {

        taskModal.remove();

    });

    submitButton.addEventListener('click', (e) => {
        if (nameInput.value === '' || descInput.value === '' || dateInput.value === '') {

            e.preventDefault();
            alert('Please fill out the entire form.');

        } else {

            createTask(nameInput.value, descInput.value, projectInput.value, dateInput.value);
            displayTasks();
            nameInput.value = '';
            descInput.value = '';
            dateInput.value = '';
            taskModal.remove();

        }
    })
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

export function displayTasks() {

    const main = document.getElementById('main-section');
    const existingTasks = main.querySelectorAll('.task');
    existingTasks.forEach(task => task.remove());

    tasks.forEach((task) => {

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

        deleteButton.addEventListener('click', () => {
            console.log('task removed');
            task.delete();
        })

    })








}

export function openModal() {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', () => {
        console.log('clicked');
        createTaskModal();
        console.log('enter task details');

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
            taskToRemove.remove();
        }
    });
}






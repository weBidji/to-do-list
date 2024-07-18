export const tasks = [];

export function createTaskModal() {

    //task modal

    const taskModal = document.createElement('dialog');
    taskModal.id = ('task-modal');
    document.body.appendChild(taskModal);
    //temporarily show modal to build it

    //taskModal.open = true;

    const modalTopBar = document.createElement('div');
    taskModal.appendChild(modalTopBar);
    modalTopBar.id = 'top-bar'
    const modalTitle = document.createElement('h4');
    modalTitle.textContent = 'Create new task';
    modalTopBar.appendChild(modalTitle);
    const closeButton = document.createElement('button');
    closeButton.id = 'close-button';
    closeButton.textContent = 'X';
    modalTopBar.appendChild(closeButton);


    //modal form

    const taskForm = document.createElement('form');
    taskForm.method = 'dialog';

    taskModal.appendChild(taskForm);

    const nameInput = document.createElement('input');
    nameInput.id = 'name-input';
    nameInput.type = 'text';
    nameInput.name = 'taskName';
    nameInput.placeholder = 'Task Name';

    const descInput = document.createElement('input');
    descInput.id = 'desc-input';
    descInput.type = 'text';
    descInput.name = 'taskDescription';
    descInput.placeholder = 'Task Description';

    const dateInput = document.createElement('input');
    dateInput.id = 'date-input';
    dateInput.type = 'date'

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Add Task';
    submitButton.id = 'submit-btn';



    taskForm.appendChild(nameInput);
    taskForm.appendChild(descInput);
    taskForm.appendChild(dateInput);
    taskForm.appendChild(submitButton);

    closeButton.addEventListener('click', () => {
        const inputs = taskModal.querySelectorAll('input');

        inputs.forEach(input => {
            input.value = '';
        });

        taskModal.close();
    });

    submitButton.addEventListener('click', (e) => {
        if (nameInput.value === '') {
            e.preventDefault();
            alert('Please fill out the task name.');
        } else {

            createTask(nameInput.value, descInput.value, dateInput.value);
            displayTasks();
            nameInput.value = '';
            descInput.value = '';

            taskModal.close();

        }
    })

}

export function createTask(name, description, date) {

    const task = {
        name: name,
        description: description,
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
        const taskDate = document.createElement('p');
        const completedButton = document.createElement('button');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');


        taskDiv.classList.add('task');
        taskName.classList.add('task-name');
        taskDesc.classList.add('task-desc');
        taskDate.classList.add('task-date')
        completedButton.classList.add('completed-button');
        editButton.classList.add('edit-button')
        deleteButton.classList.add('delete-button')
        const main = document.getElementById('main-section');

        taskName.textContent = task.name;;
        taskDesc.textContent = task.description;
        taskDate.textContent = `(Due: ${task.date})`;
        editButton.textContent = 'Edit task'
        deleteButton.textContent = 'Delete'



        main.appendChild(taskDiv);
        taskDiv.appendChild(completedButton);
        taskDiv.appendChild(taskName);
        taskDiv.appendChild(taskDesc);
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
    const taskModal = document.getElementById('task-modal');

    addBtn.addEventListener('click', () => {

        taskModal.showModal();
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






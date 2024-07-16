export function createTaskModal() {
    //task modal

    const taskModal = document.createElement('dialog');
    taskModal.id = ('task-modal');
    document.body.appendChild(taskModal);
    //temporarily show modal to build it

    //taskModal.open = true;
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

    submitButton.addEventListener('click', (e) => {
        if (nameInput.value === '') {
            e.preventDefault();
            alert('Please fill out the task name.');
        } else {
            createTask(nameInput.value, descInput.value, dateInput.value);
            nameInput.value = '';
            descInput.value = '';

            taskModal.close();

        }
    })

}

export function createTask(name, description, date) {



    const createdTask = document.createElement('div');
    const taskName = document.createElement('h3');
    const taskDesc = document.createElement('p');
    const taskDate = document.createElement('p')

    createdTask.classList.add('task');
    taskName.classList.add('task-name');
    taskDesc.classList.add('task-desc');
    taskDate.classList.add('task-date')
    const main = document.getElementById('main-section');

    taskName.textContent = name;
    taskDesc.textContent = description;
    taskDate.textContent = date;

    main.appendChild(createdTask);
    createdTask.appendChild(taskName);
    createdTask.appendChild(taskDesc);
    createdTask.appendChild(taskDate);
    return {
        name: name,
        description: description,
        date: date,
        element: createdTask
    };

}
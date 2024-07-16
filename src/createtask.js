export function createTaskModal() {
    //task modal

    const taskModal = document.createElement('dialog');
    taskModal.id = ('task-modal');
    document.body.appendChild(taskModal);
    //temporarily show modal to build it

    taskModal.open = true;
    //modal form

    const taskForm = document.createElement('form');
    taskForm.method = 'dialog';

    taskModal.appendChild(taskForm);

    const taskNameInput = document.createElement('input');
    taskNameInput.id = 'name-input';
    taskNameInput.type = 'text';
    taskNameInput.name = 'taskName';
    taskNameInput.placeholder = 'Task Name';

    const taskDescInput = document.createElement('input');
    taskDescInput.id = 'desc-input';
    taskDescInput.type = 'text';
    taskDescInput.name = 'taskDescription';
    taskDescInput.placeholder = 'Task Description';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Task';
    submitButton.id = 'submit-btn';



    taskForm.appendChild(taskNameInput);
    taskForm.appendChild(taskDescInput);
    taskForm.appendChild(submitButton);

}

export function createTask(name, description) {



    const createdTask = document.createElement('div');
    const taskName = document.createElement('h3');
    const taskDesc = document.createElement('p');

    createdTask.classList.add('task');
    taskName.classList.add('task-name');
    taskDesc.classList.add('class-desc');
    const main = document.getElementById('main-section');

    taskName.textContent = name;
    taskDesc.textContent = description;

    main.appendChild(createdTask);
    createdTask.appendChild(taskName);
    createdTask.appendChild(taskDesc);

    return {
        name: name,
        description: description,
        element: createdTask
    };

}
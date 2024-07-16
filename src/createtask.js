export function showTaskModal() {
    const taskModal = document.createElement('div');
    taskModal.id = ('task-modal');
    document.body.appendChild(taskModal);

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'modal-overlay';
    document.body.appendChild(modalOverlay);





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
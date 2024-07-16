import './style.css';
import { createTask, createTaskModal } from './createtask.js';
import { loadUI } from './loadUI.js';

document.addEventListener('DOMContentLoaded', () => {

    loadUI();
    createTaskModal();
    const nameInput = document.getElementById('name-input');
    const descInput = document.getElementById('desc-input');
    const submitBtn = document.getElementById('submit-btn');


    submitBtn.addEventListener('click', () => {
        if (nameInput.value === '' || descInput.value === '') {
            e.preventDefault();
            alert('Please fill out both the task name and description.');
        } else {
            createTask(nameInput.value, descInput.value);
            nameInput.value = '';
            descInput.value = '';

        }
    })
    const addBtn = document.getElementById('add-btn');
    const taskModal = document.getElementById('task-modal');

    addBtn.addEventListener('click', () => {

        taskModal.showModal();
        console.log('enter task details');

    }
    )

})










import './style.css';
import { createTaskModal, createTask, openModal, markAsComplete, deleteTask } from './taskhandling.js';
import { loadUI } from './loadUI.js';

document.addEventListener('DOMContentLoaded', () => {

    loadUI();
    createTaskModal();
    openModal();

    createTask('laundry', 'wash clothes', '25/07/2024');
    createTask('dishes', 'wash cutlery and plates', '29/07/2024');
        markAsComplete();
        deleteTask();
})


//











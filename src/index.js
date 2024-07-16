import './style.css';
import { createTask, showTaskModal } from './createtask.js';
import { loadUI } from './loadUI.js';

document.addEventListener('DOMContentLoaded', () => {

    loadUI();

    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', () => {

        showTaskModal();
        console.log('enter task details');
        
    }
    )

})










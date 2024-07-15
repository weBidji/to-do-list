import './style.css';
 import { createTask } from './createtask.js';

import { loadUI } from './loadUI.js';

document.addEventListener('DOMContentLoaded', () => {

    loadUI();
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', () => {
        createTask('laundry', 'wash ur clothes')
        console.log('task added');
    }
    )

})










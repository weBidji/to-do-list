import './style.css';
import { tasks, createTask, displayTasks, openModal, markAsComplete, deleteTask } from './taskhandling.js';
import { loadUI } from './loadUI.js';
import { projectList, createProject } from './projectshandling.js';
document.addEventListener('DOMContentLoaded', () => {

    loadUI();
    projectList();
    openModal();


    createTask('laundry', 'wash clothes', 'music', '25/07/2024');
    createTask('dishes', 'wash cutlery and plates', 'work', '29/07/2024');
    createTask('butter', 'toast', 'food', '01/02/2023');
    
    displayTasks();
    console.log(tasks)
    markAsComplete();
    deleteTask();
})

//fix project and date switching places

// Add labels to form

// Add tasklist rendering by project name















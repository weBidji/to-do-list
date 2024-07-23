import './style.css';
import { tasks, createTask, displayTasks, openModal, markAsComplete, deleteTask, editTask } from './taskhandling.js';
import { loadUI } from './loadUI.js';
import { projectList, createProject, filterProjects, deleteProject } from './projectshandling.js';
document.addEventListener('DOMContentLoaded', () => {

    loadUI();
    openModal();
    projectList();

    createTask('laundry', 'wash clothes', 'Studies', '25/07/2024');
    createTask('dishes', 'wash cutlery and plates', 'Work', '29/07/2024');
    createTask('butter', 'toast', 'Studies', '01/02/2023');
    createTask('fix car', 'windshield', 'Work', '29/07/2024');
    displayTasks('all');
    filterProjects();

    editTask();
    console.log(tasks);
    markAsComplete();
    deleteTask();
    deleteProject();
})


// Data storage

//clean-up / organise code

//styling















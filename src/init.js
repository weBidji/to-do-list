import { loadUI } from './loadUI.js';
import { createTask, renderTasks, openModal, markAsComplete, deleteTask, editTask } from './tasks.js';
import { createProject, projectList, renderProjects, filterProjects, deleteProject } from './projects.js';

export function initializeApp() {


    loadUI();
    projectList();
    openModal();


    createProject('Studies');
    createProject('Work');
    createTask('laundry', 'wash clothes', 'Studies', '25/07/2024');
    createTask('dishes', 'wash cutlery and plates', 'Work', '29/07/2024');
    createTask('butter', 'toast', 'Studies', '01/02/2023');
    createTask('fix car', 'windshield', 'Work', '29/07/2024');
    
    renderTasks('all');
    renderProjects();
    filterProjects();
    editTask();
    markAsComplete();
    deleteTask();
    deleteProject();
}
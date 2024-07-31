import { createTask, renderTasks, openModal, markAsComplete, deleteTask, editTask, createTaskModal } from './tasks.js';
import { createProject, projectList, renderProjects, filterProjects, deleteProject, projectInput } from './projects.js';

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
    // createTaskModal();

    renderTasks('all');
    renderProjects();
    filterProjects();
    editTask();
    markAsComplete();
    deleteTask();
    deleteProject();
    projectInput();
}

export function loadUI() {

    // Header

    const header = document.createElement('header');
    const title = document.createElement('h1');

    title.innerHTML = 'To-Do List'
    document.body.appendChild(header);
    header.appendChild(title);

    // Nav

    const navBar = document.createElement('nav');
    document.body.appendChild(navBar);
    navBar.id = 'nav';








    // Main
    const main = document.createElement('main');
    main.id = 'main-section';
    document.body.appendChild(main);

    const mainTitleContainer = document.createElement('div');
    mainTitleContainer.id = ('main-title-container');
    main.appendChild(mainTitleContainer);

    const createTaskBtn = document.createElement('button');
    createTaskBtn.textContent = ' + Add task';
    createTaskBtn.id = 'add-btn';
    main.appendChild(createTaskBtn);



}


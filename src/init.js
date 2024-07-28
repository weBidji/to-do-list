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
    const navLinks = document.createElement('ul');
    navBar.appendChild(navLinks);

    navLinks.id = 'nav-links';
    navBar.id = 'nav';
    createNavLink('Today', navLinks);
    createNavLink('This week', navLinks);






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
    mainTitleContainer.appendChild(createTaskBtn);



}


function createNavLink(text, navLinks) {
    const newLink = document.createElement('a');
    newLink.textContent = text;
    navLinks.appendChild(newLink);
}


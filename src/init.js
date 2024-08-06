import { createTask, renderTasks, openModal, deleteTask, editTaskEventListener, createTaskModal, todayEventListener, thisWeekEventListener, allTasksEventListener, markAsCompleteEventListener } from './tasks.js';
import { createProject, projectList, renderProjects, filterProjects, deleteProjectEventListener, showProjectInput } from './projects.js';

export function initializeApp() {

    loadUI();
    projectList();
    openModal();
   
    renderTasks('all');
    renderProjects();
    filterProjects();
    markAsCompleteEventListener();
    deleteTask();
    todayEventListener();
    thisWeekEventListener();
    allTasksEventListener();

}

export function loadUI() {

    // Header

    const header = document.createElement('header');
    const title = document.createElement('h1');

    title.innerHTML = 'To-Do'
    document.body.appendChild(header);
    header.appendChild(title);

    // Nav

    const navBar = document.createElement('nav');
    document.body.appendChild(navBar);
    navBar.id = 'nav';


    const allTasks = document.createElement('a');
    allTasks.id = "all-tasks-link";
    allTasks.textContent = 'All tasks';
    allTasks.classList.add('nav-link');
    navBar.appendChild(allTasks);

    const todayLink = document.createElement('a');
    todayLink.id = 'today-link';
    todayLink.textContent = 'Today';
    todayLink.classList.add('nav-link');
    navBar.appendChild(todayLink);

    const thisWeekLink = document.createElement('a');
    thisWeekLink.id = 'this-week-link';
    thisWeekLink.textContent = 'This week';
    thisWeekLink.classList.add('nav-link');
    navBar.appendChild(thisWeekLink);





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


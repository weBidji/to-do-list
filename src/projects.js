import { tasks, storeTasks, renderTasks, capitalizeFirstLetter } from "./tasks";

let projectsArr = [];

export function projectList() {
    const nav = document.getElementById('nav');
    const projects = document.createElement('div');
    projects.id = 'projects'

    nav.appendChild(projects);

    const projectsLinkContainer = document.createElement('div');
    projectsLinkContainer.id = 'project-link-container';
    projects.appendChild(projectsLinkContainer);

    const projectsLink = document.createElement('a');
    projectsLink.id = 'projects-link';
    projectsLink.textContent = 'Projects';


    projectsLink.addEventListener('click', () => renderTasks('all'));

    const addProjectButton = document.createElement('button');
    addProjectButton.id = 'add-project-button';
    addProjectButton.textContent = '+';

    projectsLinkContainer.appendChild(projectsLink);
    projectsLinkContainer.appendChild(addProjectButton);

    const projectsBox = document.createElement('div');
    projectsBox.id = 'projects-box';
    nav.appendChild(projectsBox);

    addProjectButton.addEventListener('click', (e) => {

        const projectForm = document.getElementById('project-form');

        if (projectForm) {
            e.preventDefault();
        } else {


            showProjectInput();
        }

    })



}

export function showProjectInput() {

    // Form creation

    const projectForm = document.createElement('form')
    projectForm.id = 'project-form'

    const projectNameInput = document.createElement('input');
    projectNameInput.type = 'text';
    projectNameInput.id = 'project-name-input';
    projectNameInput.classList.add('text-input');
    const submitButton = document.createElement('button');
    submitButton.id = 'submit-project-button';
    submitButton.textContent = 'Add project';
    submitButton.type = 'button';



    const projectsBox = document.getElementById('projects-box');
    projectsBox.appendChild(projectForm);
    projectForm.appendChild(projectNameInput);
    projectForm.appendChild(submitButton);

    projectNameInput.focus();

    submitButton.addEventListener('click', (e) => {

        if (projectNameInput.value.trim() === '') {

            e.preventDefault();
            alert('please enter a valid project name');

        } else {

            createProject(projectNameInput.value);
            storeProjects();
            renderProjects();

        }
    })


    //Submission

    projectNameInput.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            e.preventDefault();

            submitButton.click();
        }
    });

}


export function createProject(name) {


    const newProject = { name: name };
    projectsArr.push(newProject);


}

export function renderProjects() {
    const projectsBox = document.getElementById('projects-box');
    projectsBox.innerHTML = '';

    let storedProjects = localStorage.getItem('projects');
    if (storedProjects) {

        projectsArr = JSON.parse(storedProjects);


    };



    projectsArr.forEach((project) => {


        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        const projectName = document.createElement('p');
        projectName.classList.add('current-project');
        projectName.textContent = capitalizeFirstLetter(project.name);

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.classList.add('delete-project-button');
        deleteProjectButton.innerHTML = '<svg class = "delete-project-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>'

        const projectsBox = document.getElementById('projects-box')

        projectsBox.appendChild(projectContainer);
        projectContainer.appendChild(projectName);

        projectContainer.appendChild(deleteProjectButton);
        deleteProjectEventListener();
    })

    filterProjects();

}

export function filterProjects() {
    const currentProjects = document.querySelectorAll('.current-project');

    currentProjects.forEach((project) => {
        const projectName = project.textContent.trim();

        project.addEventListener('click', () => renderTasks(projectName));
    });
}

export function deleteProjectEventListener() {
    const deleteProjectButtons = document.querySelectorAll('.delete-project-button');

    deleteProjectButtons.forEach(button => {
        button.addEventListener('click', (e) => {


            const projectContainer = e.target.closest('.project-container');
            if (projectContainer) {

                const projectName = projectContainer.querySelector('.current-project').textContent;

                const updatedTasks = tasks.filter(task => capitalizeFirstLetter(task.project) !== projectName);
                tasks.length = 0;
                tasks.push(...updatedTasks);
                storeTasks();

                const updatedProjects = projectsArr.filter(project => capitalizeFirstLetter(project.name) !== projectName);
                projectsArr.length = 0;
                projectsArr.push(...updatedProjects)
                storeProjects();



                projectContainer.remove();


                renderTasks('all');
                renderProjects();

            }


        }
        );
    });
}

function storeProjects() {

    localStorage.setItem('projects', JSON.stringify(projectsArr));
}

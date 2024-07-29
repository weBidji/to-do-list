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

            console.log('adding project to projects list');
            projectInput();
        }

    })



}

function projectInput() {

    // Form creation

    const projectForm = document.createElement('form')
    projectForm.id = 'project-form'

    const projectNameInput = document.createElement('input');
    projectNameInput.type = 'text';
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add project';
    submitButton.type = 'button';



    const projectsBox = document.getElementById('projects-box');
    projectsBox.appendChild(projectForm);
    projectForm.appendChild(projectNameInput);
    projectForm.appendChild(submitButton);

    submitButton.addEventListener('click', (e) => {
        console.log('project added');
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
    console.log(projectsArr);


}

export function renderProjects() {
    const projectsBox = document.getElementById('projects-box');
    projectsBox.innerHTML = '';

    let storedProjects = localStorage.getItem('projects');
    if (storedProjects) {

        projectsArr = JSON.parse(storedProjects);
        console.log('projects retrieved');
        console.log(projectsArr);

    };



    projectsArr.forEach((project) => {


        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        const projectName = document.createElement('p');
        projectName.classList.add('current-project');
        projectName.textContent = capitalizeFirstLetter(project.name);

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.classList.add('delete-project-button');
        deleteProjectButton.textContent = 'X'

        const projectsBox = document.getElementById('projects-box')

        projectsBox.appendChild(projectContainer);
        projectContainer.appendChild(projectName);

        projectContainer.appendChild(deleteProjectButton);
        deleteProject();
    })

    filterProjects();
    deleteProject();
}

export function filterProjects() {
    const currentProjects = document.querySelectorAll('.current-project');

    currentProjects.forEach((project) => {
        const projectName = project.textContent.trim();
        console.log('yo');

        project.addEventListener('click', () => renderTasks(projectName));
    });
}

export function deleteProject() {
    const deleteProjectButtons = document.querySelectorAll('.delete-project-button');

    deleteProjectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log('deleting project started')

            const projectContainer = e.target.closest('.project-container');
            if (projectContainer) {

                const projectName = projectContainer.querySelector('.current-project').textContent;
                console.log(projectName);
                const updatedTasks = tasks.filter(task => capitalizeFirstLetter(task.project) !== projectName);
                tasks.length = 0;
                tasks.push(...updatedTasks);
                console.log(tasks);
                storeTasks();

                const updatedProjects = projectsArr.filter(project => project.name !== projectName);
                projectsArr.length = 0;
                projectsArr.push(...updatedProjects)
                storeProjects();



                projectContainer.remove();
                console.log(projectsArr);

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

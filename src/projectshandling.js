import { displayTasks } from "./taskhandling";
export function projectList() {
    const navLinks = document.getElementById('nav-links');
    const projects = document.createElement('div');
    projects.id = 'projects'

    navLinks.appendChild(projects);

    const projectsLink = document.createElement('a');
    projectsLink.id = 'projects-link';
    projectsLink.textContent = 'Projects';
    projects.appendChild(projectsLink);

    projectsLink.addEventListener('click',() => displayTasks('all'));

    const addProjectButton = document.createElement('button');
    addProjectButton.id = 'add-project-button';
    addProjectButton.textContent = '+';

    projects.appendChild(projectsLink);
    projects.appendChild(addProjectButton);

    const projectsBox = document.createElement('div');
    projectsBox.id = 'projects-box';
    navLinks.appendChild(projectsBox);

    addProjectButton.addEventListener('click', () => {
        
        console.log('adding project to projects list');
        projectInput();


    })


    createProject('Work');
    createProject('Studies');



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
            alert('please enter a valid project name')
        } else {

            createProject(projectNameInput.value);
            projectsBox.removeChild(projectForm);
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


function createProject(name) {


    const project = document.createElement('p');
    project.classList.add('current-project');
    project.textContent = name;
    const projectsBox = document.getElementById('projects-box')
    projectsBox.appendChild(project);

}

export function filterProjects() {
    const currentProjects = document.querySelectorAll('.current-project');

    currentProjects.forEach((project) => {
        const projectName = project.textContent.trim();

        project.addEventListener('click', () => displayTasks(projectName));
    });
}

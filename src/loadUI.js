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

    const createTaskBtn = document.createElement('button');
    createTaskBtn.textContent = ' + Add task';
    createTaskBtn.id = 'add-btn';
    main.appendChild(createTaskBtn);


}


function createNavLink(text, navLinks) {
    const newLink = document.createElement('a');
    newLink.textContent = text;
    navLinks.appendChild(newLink);
}


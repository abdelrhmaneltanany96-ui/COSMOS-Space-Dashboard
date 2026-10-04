// git nav-links
let navTodayInSpace = document.querySelector('#nav-today-in-space');
let navLaunches = document.querySelector('#nav-launches');
let navPlanets = document.querySelector('#nav-planets');

//git sections 
let sectionTodayInSpace = document.querySelector('#today-in-space');
let sectionLaunches = document.querySelector('#launches');
let sectionPlanets = document.querySelector('#planets');

//add event listeners to nav links
navTodayInSpace.addEventListener('click', function () {
    sectionTodayInSpace.classList.remove('hidden');
    sectionLaunches.classList.add('hidden');
    sectionPlanets.classList.add('hidden');
});

navLaunches.addEventListener('click', function () {
    sectionTodayInSpace.classList.add('hidden');
    sectionLaunches.classList.remove('hidden');
    sectionPlanets.classList.add('hidden');
});

navPlanets.addEventListener('click', function () {
    sectionTodayInSpace.classList.add('hidden');
    sectionLaunches.classList.add('hidden');
    sectionPlanets.classList.remove('hidden');
});
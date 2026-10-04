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

    navTodayInSpace.classList.add('nav-active-link');
    navLaunches.classList.remove('nav-active-link');
    navPlanets.classList.remove('nav-active-link');
});

navLaunches.addEventListener('click', function () {
    sectionTodayInSpace.classList.add('hidden');
    sectionLaunches.classList.remove('hidden');
    sectionPlanets.classList.add('hidden');

    navLaunches.classList.add('nav-active-link');
    navTodayInSpace.classList.remove('nav-active-link');
    navPlanets.classList.remove('nav-active-link');
});

navPlanets.addEventListener('click', function () {
    sectionTodayInSpace.classList.add('hidden');
    sectionLaunches.classList.add('hidden');
    sectionPlanets.classList.remove('hidden');

    navPlanets.classList.add('nav-active-link');
    navTodayInSpace.classList.remove('nav-active-link');
    navLaunches.classList.remove('nav-active-link');
});


// .................................................................................................................
// .................................................................................................................
// .................................................................................................................
// .................................................................................................................
// .................................................................................................................



let apodImage = document.querySelector("#apod-image");
let apodTitle = document.querySelector("#apod-title");
let apodDate = document.querySelector("#apod-date");
let apodDataDisplay = document.querySelector("#apod-date-display");
let apodDateDetail = document.querySelector("#apod-date-detail");
let apodExplanation = document.querySelector("#apod-explanation");
let apodCopyright = document.querySelector("#apod-copyright");
let apodDateInfo = document.querySelector("#apod-date-info");
let apodMediaType = document.querySelector("#apod-media-type");


let apodDateInput = document.querySelector("#apod-date-input");
let loadDateBtn = document.querySelector("#load-date-btn");


let todayApodBtn = document.querySelector("#today-apod-btn");


let data;

async function getData() {

    var response = await fetch('https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=DEMO_KEY');
    data = await response.json();

    console.log(data[0]);

    apodTitle.innerHTML = data[0].title;
    apodDataDisplay.innerHTML = data[0].date;
    apodDate.innerHTML = `Astronomy Picture of the Day - ${data[0].date}`;
    apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i>${data[0].date}`;
    apodExplanation.innerHTML = data[0].explanation;
    apodCopyright.innerHTML = data[0].copyright;
    apodDateInfo.innerHTML = data[0].date;
    apodMediaType.innerHTML = data[0].media_type;
    apodImage.src = data[0].hdurl;
}
getData();



loadDateBtn.addEventListener("click", function () {

    let selectedDate = data.find(function (item) {
        return item.date === apodDateInput.value;
    });

    apodTitle.innerHTML = selectedDate.title;
    apodImage.src = selectedDate.hdurl;
    apodDataDisplay.innerHTML = selectedDate.date;
    apodDate.innerHTML = `Astronomy Picture of the Day - ${selectedDate.date}`;
    apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i>${selectedDate.date}`;
    apodDateInfo.innerHTML = selectedDate.date;
    apodExplanation.innerHTML = selectedDate.explanation;
    apodCopyright.innerHTML = selectedDate.copyright;
    apodMediaType.innerHTML = selectedDate.media_type;

});



todayApodBtn.addEventListener("click", function () {

    apodTitle.innerHTML = data[0].title;
    apodImage.src = data[0].hdurl;
    apodDataDisplay.innerHTML = data[0].date;
    apodDate.innerHTML = `Astronomy Picture of the Day - ${data[0].date}`;
    apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i>${data[0].date}`;
    apodDateInfo.innerHTML = data[0].date;
    apodExplanation.innerHTML = data[0].explanation;
    apodCopyright.innerHTML = data[0].copyright;
    apodMediaType.innerHTML = data[0].media_type;

});









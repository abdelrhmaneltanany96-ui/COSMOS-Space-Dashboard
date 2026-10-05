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





// .................................................................................................................
// .................................................................................................................
// .................................................................................................................
// .................................................................................................................
// .................................................................................................................


let featuredName = document.querySelector("#featured-name");
let featuredProvider = document.querySelector("#featured-provider");
let featuredRocket = document.querySelector("#featured-rocket");
let featuredDays = document.querySelector("#featured-days");
let featuredDate = document.querySelector("#featured-date");
let featuredTime = document.querySelector("#featured-time");
let featuredLocation = document.querySelector("#featured-location");
let featuredCountry = document.querySelector("#featured-country");
let featuredDescription = document.querySelector("#featured-description");
let featuredImage = document.querySelector("#featured-image");
let launchesGrid = document.querySelector("#launches-grid");

let data2;
async function getUpcomingLaunches() {
    let response2 = await fetch('https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10')
    data2 = await response2.json();

    let featuredLaunch = data2.results[0];

    console.log(featuredLaunch);

    featuredName.innerHTML = featuredLaunch.name;
    featuredProvider.innerHTML = featuredLaunch.launch_service_provider.name;
    featuredRocket.innerHTML = featuredLaunch.rocket.configuration.full_name;
    featuredDate.innerHTML = featuredLaunch.net;
    featuredTime.innerHTML = featuredLaunch.net;
    featuredLocation.innerHTML = featuredLaunch.pad.location.name;
    featuredCountry.innerHTML = featuredLaunch.pad.country.name;
    featuredDescription.innerHTML = featuredLaunch.mission.description;
    featuredImage.src = featuredLaunch.image.image_url;


    data2.results.slice(1).forEach(function (launch) {

        launchesGrid.innerHTML += `
        <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">

            <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
                <img 
                    src="${launch.image?.image_url || 'assets/images/launch-placeholder.png'}"
                    alt=""
                    class="w-full h-full object-cover"
                    onerror="this.onerror=null; this.src='assets/images/launch-placeholder.png';"
                >

                <div class="absolute top-3 right-3">
                    <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                        ${launch.status.name}
                    </span>
                </div>
            </div>

            <div class="p-5">

                <div class="mb-3">
                    <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        ${launch.name}
                    </h4>

                    <p class="text-sm text-slate-400 flex items-center gap-2">
                        <i class="fas fa-building text-xs"></i>
                        ${launch.launch_service_provider.name}
                    </p>
                </div>

                <div class="space-y-2 mb-4">

                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-calendar text-slate-500 w-4"></i>
                        <span class="text-slate-300">
                            ${launch.net}
                        </span>
                    </div>

                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-rocket text-slate-500 w-4"></i>
                        <span class="text-slate-300">
                            ${launch.rocket.configuration.full_name}
                        </span>
                    </div>

                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                        <span class="text-slate-300 line-clamp-1">
                            ${launch.pad.name}
                        </span>
                    </div>

                </div>

                <div class="flex items-center gap-2 pt-4 border-t border-slate-700">

                    <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                        Details
                    </button>

                    <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                        <i class="far fa-heart"></i>
                    </button>

                </div>

            </div>
        </div>
    `;
    });



}
getUpcomingLaunches();








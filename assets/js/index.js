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
// fetching data and display data of today 
async function getData() {
    let response = await fetch("https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=DEMO_KEY");
    data = await response.json();
    console.log(data[0]);
    console.log(data);
    displayApod(data[0]);
}

// display data 
function displayApod(item) {
    apodTitle.innerHTML = item.title;
    apodDataDisplay.innerHTML = item.date;
    apodDate.innerHTML = `Astronomy Picture of the Day - ${item.date}`;
    apodDateDetail.innerHTML = `
        <i class="far fa-calendar mr-2"></i>
        ${item.date}
    `;
    apodExplanation.innerHTML = item.explanation;
    apodCopyright.innerHTML = item.copyright || "NASA";
    apodDateInfo.innerHTML = item.date;
    apodMediaType.innerHTML = item.media_type;
    apodImage.src = item.hdurl || item.url;
}
getData();

// add event to loadDataBtn
loadDateBtn.addEventListener("click", function () {
    let selectedDate = data.find(function (item) {
        return item.date === apodDateInput.value;
    });
    if (selectedDate) {
        displayApod(selectedDate);
    }
    else {
        displayApod(data[0]);
    }
});

// add event to todayApodBtn
todayApodBtn.addEventListener("click", function () {
    displayApod(data[0]);
});


// async function getNewData() {
//     let response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2026-07-01");
//     let data = await response.json();
//     console.log(data);
// }
// getNewData()
// // this API give me this eror 
// // code: 'OVER_RATE_LIMIT',
// // message :"You have exceeded your rate limit. Try again later or contact us for assistance: https://api.nasa.gov:443"
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


async function getUpcomingLaunches() {
    let response = await fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10");
    let data = await response.json();
    let featuredLaunch = data.results[0];

    console.log(featuredLaunch);


    // Featured launch
    featuredName.innerHTML = featuredLaunch.name;
    featuredProvider.innerHTML =
        featuredLaunch.launch_service_provider?.name || "Unknown provider";
    featuredRocket.innerHTML =
        featuredLaunch.rocket?.configuration?.full_name || "Unknown rocket";
    featuredLocation.innerHTML =
        featuredLaunch.pad?.location?.name || "Unknown location";
    featuredCountry.innerHTML =
        featuredLaunch.pad?.country?.name || "Unknown country";
    featuredDescription.innerHTML =
        featuredLaunch.mission?.description || "No description available.";

    // Optional chaining (?.) safely accesses image_url when image is not null or undefined.
    // This operator (||) uses the placeholder if the URL is missing or empty.
    // featuredImage.src =
    //     featuredLaunch.image?.image_url || "assets/images/launch-placeholder.png";

    // This approach is insufficient because image_url may exist even when the image cannot be loaded.
    // A URL's presence does not guarantee a valid image.
    // if (featuredLaunch.image.image_url) {
    //     featuredImage.src = featuredLaunch.image.image_url;
    // } else {
    //     featuredImage.src = "assets/images/launch-placeholder.png";
    // }

    // ChatGPT suggested using onerror to display a placeholder if the image fails to load.
    // Setting featuredImage.onerror to null disables the error handler, preventing repeated calls if the placeholder also fails.
    // Setting featuredImage.src to the placeholder path loads the local image.
    featuredImage.onerror = function () {
        featuredImage.onerror = null;
        featuredImage.src = "assets/images/launch-placeholder.png";
    };
    featuredImage.src =
        featuredLaunch.image?.image_url ||
        "assets/images/launch-placeholder.png";


    // Featured date and time
    // "2026-10-15T14:30:00Z" convert this to 10/15/2026 , 5:30:00 PM
    let launchDate = new Date(featuredLaunch.net);
    featuredDate.innerHTML = launchDate.toLocaleDateString();
    featuredTime.innerHTML = launchDate.toLocaleTimeString();


    // Days until launch
    // let today = new Date(); This creates a JavaScript Date object containing the current date and current time from the user's device.
    let today = new Date();
    let difference = launchDate - today;
    // Math.ceil(5.2); // 6
    // Math.ceil(8.7); // 9
    // 1000  milliseconds = 1 second
    // 60    seconds = 1 minute
    // 60    minutes = 1 hour
    // 24    hours = 1 day
    let days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    featuredDays.innerHTML = days;



    // Clear grid before adding cards
    launchesGrid.innerHTML = "";

    // Remaining launches
    data.results.slice(1).forEach(function (launch) {

        // discussed it before
        let launchDate = new Date(launch.net);
        let formattedDate = launchDate.toLocaleDateString();
        let formattedTime = launchDate.toLocaleTimeString();


        // cartoona 
        launchesGrid.innerHTML += `
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">

                <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">

                    <img 
                        src="${launch.image?.image_url || 'assets/images/launch-placeholder.png'}"
                        alt="${launch.name}"
                        class="w-full h-full object-cover"
                        onerror="this.onerror=null; this.src='assets/images/launch-placeholder.png';"
                    >

                    <div class="absolute top-3 right-3">
                        <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                            ${launch.status?.name || "Unknown"}
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

                            ${launch.launch_service_provider?.name || "Unknown provider"}
                        </p>

                    </div>


                    <div class="space-y-2 mb-4">

                        <div class="flex items-center gap-2 text-sm">
                            <i class="fas fa-calendar text-slate-500 w-4"></i>

                            <span class="text-slate-300">
                                ${formattedDate} - ${formattedTime}
                            </span>
                        </div>


                        <div class="flex items-center gap-2 text-sm">
                            <i class="fas fa-rocket text-slate-500 w-4"></i>

                            <span class="text-slate-300">
                                ${launch.rocket?.configuration?.full_name || "Unknown rocket"}
                            </span>
                        </div>


                        <div class="flex items-center gap-2 text-sm">
                            <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>

                            <span class="text-slate-300 line-clamp-1">
                                ${launch.pad?.name || "Unknown location"}
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
// .................................................................................................................



let planetDetailName = document.querySelector('#planet-detail-name');
let planetDetailImage = document.querySelector('#planet-detail-image');
let planetDescription = document.querySelector('#planet-detail-description')
let planetDistance = document.querySelector('#planet-distance');
let planetRadius = document.querySelector('#planet-radius');
let planetMass = document.querySelector('#planet-mass');
let planetDensity = document.querySelector('#planet-density');
let planetOrbitalPeriod = document.querySelector('#planet-orbital-period');
let planetRotation = document.querySelector('#planet-rotation');
let planetMoons = document.querySelector('#planet-moons');
let planetGravity = document.querySelector('#planet-gravity');

let planetDiscoverer = document.querySelector('#planet-discoverer');
let planetDiscoveryDate = document.querySelector('#planet-discovery-date');
let planetBodyType = document.querySelector('#planet-body-type');

let planetPerihelion = document.querySelector('#planet-perihelion');
let planetAphelion = document.querySelector('#planet-aphelion');
let planetEccentricity = document.querySelector('#planet-eccentricity');
let planetInclination = document.querySelector('#planet-inclination');
let planetAxialTilt = document.querySelector('#planet-axial-tilt');
let planetTemp = document.querySelector('#planet-temp');
let planetEscape = document.querySelector('#planet-escape');

let planetCards = document.querySelectorAll('.planet-card');

async function getPlanets() {

    let response = await fetch('https://solar-system-opendata-proxy.vercel.app/api/planets');
    let data = await response.json();
    // (filter) higher function becaouse it take another func. as a parameters
    let planets = data.bodies.filter(function (planet) {
        return planet.isPlanet == true;
    });

    console.log(planets);




    // here we selected 8 cards for 8 planets so we have nodeList and it's same as array as it's iterartive
    // here for loop foe each card and add event click for each them
    planetCards.forEach(function (card) {

        card.addEventListener('click', function () {
            // let planetId = card.dataset.planetId means
            // for example every card has <div class="planet-card" data-planet-id="earth"> 
            // so here that's means planetId = "earth";
            let planetId = card.dataset.planetId;
            // here we put the planet which has english name with lower case same as planetId in new variable called selectedPlanet
            // and find also higher order function  
            let selectedPlanet = planets.find(function (planet) {
                return planet.englishName.toLowerCase() == planetId;
            });
            console.log(selectedPlanet);

            // main card for choosen planet
            planetDetailName.innerHTML = selectedPlanet.englishName;
            planetDetailImage.src =
                `./assets/images/${selectedPlanet.englishName.toLowerCase()}.png`;
            planetDescription.innerHTML = selectedPlanet.description;
            // toLocalString using in
            // let number = 149600000
            // console.log(number.toLocaleString())
            // Output:
            // 149,600,000  
            planetDistance.innerHTML =
                selectedPlanet.semimajorAxis.toLocaleString() + ' km';
            planetRadius.innerHTML =
                selectedPlanet.meanRadius.toLocaleString() + ' km';
            if (selectedPlanet.mass) {
                planetMass.innerHTML =
                    selectedPlanet.mass.massValue +
                    ' × 10^' +
                    selectedPlanet.mass.massExponent +
                    ' kg';
            } else {
                planetMass.innerHTML = 'N/A';
            }
            planetDensity.innerHTML =
                selectedPlanet.density + ' g/cm³';
            planetOrbitalPeriod.innerHTML =
                selectedPlanet.sideralOrbit + ' days';
            planetRotation.innerHTML =
                selectedPlanet.sideralRotation + ' hours';
            if (selectedPlanet.moons) {
                planetMoons.innerHTML =
                    selectedPlanet.moons.length;
            } else {
                planetMoons.innerHTML = 0;
            }
            planetGravity.innerHTML =
                selectedPlanet.gravity + ' m/s²';
            if (selectedPlanet.discoveredBy) {
                planetDiscoverer.innerHTML =
                    selectedPlanet.discoveredBy;
            } else {
                planetDiscoverer.innerHTML =
                    'Known since antiquity';
            }





            //Discovery Info    
            if (selectedPlanet.discoveryDate) {
                planetDiscoveryDate.innerHTML =
                    selectedPlanet.discoveryDate;
            } else {
                planetDiscoveryDate.innerHTML =
                    'Ancient';
            }
            planetBodyType.innerHTML =
                selectedPlanet.bodyType;







            //Orbital Characteristics
            planetPerihelion.innerHTML =
                selectedPlanet.perihelion.toLocaleString() + ' km';
            planetAphelion.innerHTML =
                selectedPlanet.aphelion.toLocaleString() + ' km';
            planetEccentricity.innerHTML =
                selectedPlanet.eccentricity;
            planetInclination.innerHTML =
                selectedPlanet.inclination + '°';
            planetAxialTilt.innerHTML =
                selectedPlanet.axialTilt + '°';
            planetTemp.innerHTML =
                Math.round(selectedPlanet.avgTemp - 273.15) + '°C';
            planetEscape.innerHTML =
                (selectedPlanet.escape / 1000).toFixed(2) + ' km/s';
        });
    });
}
getPlanets();
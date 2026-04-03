const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const locationsList = document.getElementById("locations-list");
const mapSearch = document.getElementById("map-search");
const resultsContainer = document.getElementById("results-container");

//Search input logic
searchInput.addEventListener("input", () => {
    //Only showing 'x' button when there is text
    searchClear.style.display = searchInput.value ? "flex" : "none";

    const query = searchInput.value.trim();

    // Update the URL with the query without refreshing the page
    if (query.length >= 3) {
        const newUrl = `${window.location.pathname}?q=${encodeURIComponent(query)}`;
        window.history.replaceState(null, "", newUrl);

        resultsContainer.style.display = "block";

        // Executing Google Custom Search
        let retryCount = 0;
        const trySearch = () => {
            if (window.google && window.google.search && window.google.search.cse) {
                window.google.search.cse.element.getElement("main-search").execute(query);
            } else if (retryCount < 50){
                retryCount++;
                setTimeout(trySearch, 100);
            } else {
                console.warn("Google Custom Search Engine timed out");
            }
        };
        trySearch();

        // Fetching location results to display
        locationResults(query);
    } else if (query.length === 0) {
        //If the input box is cleared, reset
        window.history.replaceState(null, "", window.location.pathname);
        resultsContainer.style.display = "none";
        mapSearch.style.display = "none";
        locationsList.innerHTML = "";
    }
});

//Clear search bar
searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchClear.style.display = "none";
    searchInput.focus();
    window.history.replaceState(null, "", window.location.pathname);
    resultsContainer.style.display = "none";
    mapSearch.style.display = "none";
    locationsList.innerHTML = "";
});

//Fetching header navigation menu from UCF 
function loadHeader() {
    fetch(`https://www.ucf.edu/wp-json/ucf-rest-menus/v1/menus/23/`)
        .then((response) => response.json())
        .then((data) => {
            const menu = document.getElementById("menu");
            //For each item retrieve the link and text
            data.items.forEach((item) => {
                if (item.parent == 0) {
                    const link = document.createElement("a");
                    link.href = item.url;
                    link.textContent = item.title;
                    menu.appendChild(link);
                }
            });
        })
        .catch((error) => console.error("header not loading", error));
}

//Fetching footer navigation menu
function loadFooter() {
    fetch(`https://www.ucf.edu/wp-json/ucf-rest-menus/v1/menus/24/`)
        .then((response) => response.json())
        .then((data) => {
            const footerMenu = document.getElementById("ucf-footer-nav");
            //Building nav by getting the link for the item, adding it to the nav, and appending to the footer
            data.items.forEach((item) => {
                if (item.parent == 0) {
                    const li = document.createElement("li");
                    li.classList.add("ucf-footer-nav-item");
                    const link = document.createElement("a");
                    link.href = item.url;
                    link.textContent = item.title;
                    link.classList.add("ucf-footer-nav");
                    li.appendChild(link);
                    footerMenu.appendChild(li);
                }
            });
        })
        .catch((error) => console.error("footer not loading", error));
}

//Fetching social media links
function loadFooterSocials() {
    //Social icons pulled from Font Awesome
    const socialIcons = {
        facebook: `<i class="fa-brands fa-facebook-f"></i>`,
        twitter: `<i class="fa-brands fa-twitter"></i>`,
        social: `<i class="fa-solid fa-share-nodes">`,
        youtube: `<i class="fa-brands fa-youtube"></i>`,
        instagram: `<i class="fa-brands fa-instagram"></i>`,
    };
    fetch(`https://www.ucf.edu/wp-json/ucf-rest-menus/v1/menus/26/`)
        .then((res) => res.json())
        .then((data) => {
            const footerSocials = document.getElementById("ucf-footer-socials");

            data.items.forEach((item) => {
                if (item.parent == 0) {
                    const href = item.url.toLowerCase();
                    //Matching the URL to the icon
                    const platform = Object.keys(socialIcons).find((k) => href.includes(k));

                    const link = document.createElement("a");
                    link.href = item.url;
                    link.classList.add("ucf-social-link");
                    link.setAttribute("aria-label", item.title);
                    link.setAttribute("target", "_blank");
                    link.setAttribute("rel", "noopener noreferrer");

                    //If no icon can be found, use generic social icon
                    if (platform) {
                        link.innerHTML = socialIcons[platform];
                    } else {
                        link.innerHTML = `<i class="fa-solid fa-share-nodes"></i>`;
                        console.warn(`No icon found for URL: ${href}`);
                    }

                    footerSocials.appendChild(link);
                }
            });
        })
        .catch((error) => console.error("footer socials not loading", error));
}

//Fetching Spotlight promotional image
function loadSpotlight() {
    fetch(`https://www.ucf.edu/wp-json/myucf-cp/v1/options`)
        .then((response) => response.json())
        .then((data) => {
            //Retrieving all spotlight information and the image
            const promo = data.sidebarSpotlight;
            const container = document.getElementById("promo-block");
            const link = document.createElement("a");
            link.href = promo.url;
            const img = document.createElement("img");
            img.src = "https://www.ucf.edu/" + promo.image;
            img.alt = promo.alt;
            img.classList.add('img-fluid');
            link.appendChild(img);
            container.appendChild(link);
        })
        .catch((err) => console.error("Promo image not loading", err));
}

function search(query) {
    //Fallback for if an empty string is received 
    if (!query) {
        window.location.href = window.location.pathname;
        return;
    }
    //Adding the query to the URL
    window.location.href = `?q=${encodeURIComponent(query)}`;
}

//Fetching building data from UCF map API
function locationResults(query) {
    fetch(`https://map.ucf.edu/search/.json?q=${query}&extended=true&type=buildings`)
        .then((res) => res.json())
        .then((data) => {
            const results = data.results.locations;
            //If there's no location results, display nothing
            locationsList.innerHTML = "";
            if (!results || results.length === 0) {
                mapSearch.style.display = "none";
                return;
            }

            results.forEach((item) => {
                //getting the map information using the api tags
                const url = item.profile_link;
                const lat = item.googlemap_point?.[0] ?? 0;
                const lng = item.googlemap_point?.[1] ?? 0;
                const card = document.createElement("div");
                card.classList.add("location-result");
                //HTML structure for the location cards
                card.innerHTML = `
            <p class="location-heading">${item.name}</p>
                <div class="sidebar-result">
                    <a href="${url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                        <i class="fa-solid fa-circle-info"></i>
                        <span style="text-decoration: underline;">More Information</span>
                    </a>
                    <a href="https://www.google.com/maps/dir/Current+Location/${lat},${lng}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
                        <i class="fa-solid fa-location-arrow" style="text-decoration:none;"></i>
                        <span style="text-decoration: underline;">Directions</span>
                    </a>
                </div>`;
                locationsList.appendChild(card);
            });
            mapSearch.style.display = "block";
        })
        .catch((err) => console.error("Error loading the map.", err));
}

//Enter key for searching 
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        search(searchInput.value.trim());
    }
});

//Initial page load
window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    //If a 'q' exists in the URL, seach for that query
    if (query) {
        searchInput.value = query;
        searchClear.style.display = "flex";
        // showing results area and trigger google search
        resultsContainer.style.display = "block";
        //Google CSE callbacks
        window.__gcse = window.__gcse || {};
        window.__gcse.searchCallbacks = {
            web: {
                starting: function () {},
                ready: function () {},
            },
        };
        // Once the element is ready, CSE search
        const cseInterval = setInterval(() => {
            if (window.google && window.google.search && window.google.search.cse) {
                clearInterval(cseInterval);
                window.google.search.cse.element.getElement("main-search").execute(query);
            }
        }, 100);

        locationResults(query);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    loadHeader();
    loadSpotlight();
    loadFooter();
    loadFooterSocials();
});

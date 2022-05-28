import './style.css'

// Data, Variables required
let articles, heroArticle, date, i, serverResponse;
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let country = 'in', category = 'technology', query = '';
let headItem = `<article class="headingItem border-b-2 border-dark-50">
              <h2>
                Trump, Cruz, make defiant stand against gun control in NRA
                speeches - The Washington Post
              </h2>
              <div class="dateAut">
                Oct 31, 2021 • by
                <span class="author font-medium">Benneth Kennedy</span>
                </div>
                </article>`;
let apiKey = '9edb774ca7e64c6d8dcd085f7870393a';
let heroHeading = document.querySelector('#headHero');
let heroDesc = document.querySelector("#descHero");
let heroDate = document.querySelector("#dateHero");
let heroAuth = document.querySelector("#authorHero");
let heroImg = document.querySelector("#imageHero");
let headlineContainer = document.querySelector("#headlineContainer");

// Fetching the headlines for the hero Headline
function fetchHeadline(query) {
    let fetchHead;
    if (query) {
        fetchHead = new Request(`https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${apiKey}`);
    }
    else {
        fetchHead = new Request(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`);
    }

    // Calling the fetch API
    fetch(fetchHead).then(response => {
        return response.json();
    }).then((response) => {
        articles = response?.articles;
        for (i = 0; i < response?.totalResults; i++) {
            if (articles[i].urlToImage != null) {
                heroArticle = articles[i];
                break;
            }
        }
        return heroArticle
    }).then(article => {
        // Adding received details to the DOM
        heroHeading.textContent = article?.title;
        heroDesc.textContent = article?.description;
        date = new Date(article?.publishedAt);
        date = `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        heroDate.textContent = date;
        heroAuth.textContent = article?.source.name;
        heroImg.setAttribute('src', article?.urlToImage);
        return articles;
    }).then(() => {
        headlineContainer.innerHTML = "";
        for (i = 0; i < 5; i++) {
            let story = articles?.[i];
            let title = story?.title;
            let author = story?.source.name;
            let date = new Date(story?.publishedAt);
            date = `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;
            headlineContainer.insertAdjacentHTML('afterbegin', `<article class="headingItem border-b-2 border-dark-50">
                      <h2>
                      ${title}
                      </h2>
                     <div class="dateAut text-sm py-3 font-normal opacity-50">
                      <span class="date" id="dateHero">${date}</span> • by
                      <span class="author font-medium" id="authorHero"
                        >${author}</span
                        >
                    </div>
                    </article>`);
        }
    })
}
fetchHeadline();
// Adding topic functionality to the above 

// Adding search feature to the app
let searchKey = document.querySelector('#searchKey');
let searchInput = document.querySelector('#search');
let searchItemContainer = document.querySelector("#searchContainer");
let sectionBody = document.querySelector('.body');
let mainApp = document.querySelector('#app');
let flagSearch = 1;

// Search function which has fetch API for searching the keyword
function fetchHeadSearch(searchInput, topic) {
    let fetchSearch;
    if (searchInput)
        fetchSearch = new Request(`https://newsapi.org/v2/top-headlines?q=${searchInput}&apiKey=${apiKey}`);
    else if (topic)
        fetchSearch = new Request(`https://newsapi.org/v2/top-headlines?country=${country}&category=${topic}&apiKey=${apiKey}`);

    // Calling the fetch API
    fetch(fetchSearch).then(response => {
        return response.json();
    }).then((response) => {
        articles = response?.articles;
        return articles;
    }).then((articles) => {
        let searchItemContainer = document.querySelector("#searchContainer");
        searchItemContainer.innerHTML = "";
        for (i = 0; i < 10; i++) {
            let story = articles?.[i];
            if (!story) {
                if (i == 1) {
                    searchItemContainer.insertAdjacentElement('beforeend',
                        `<p
                        class="descriptionNews text-base font-medium opacity-75 pr-10"
                        id="descHero"
                    >Couldn't find any news for that search value 🥲</p>
                    `);
                }
                throw new Error("Not having that many articles");
            }
            let title = story?.title;
            let author = story?.source.name;
            let date = new Date(story?.publishedAt);
            let image = story?.urlToImage;
            if (!image) {
                image = `media/mediaFallback.svg`;
            }
            let content = story?.description;
            date = `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;
            searchItemContainer.insertAdjacentHTML('beforeend', `<article class="headlineSearch border-b-2 border-b-light-blue-900">          <img
            src="${image}"
            alt=""
            class="imageSearch w-[95%] py-6"
            id="imageHero"
          />
          <div class="details">
            <h2
              class="headingNews text-3xl font-semibold font-serif pb-6"
              id="headHero"
            >
              ${title}
            </h2>
            <p
              class="descriptionNews text-base font-medium opacity-75 pr-10"
              id="descHero"
            >
              ${content}
            </p>
            <div class="dateAut text-sm py-3 font-normal opacity-50">
              <span class="date" id="dateHero">${date}</span> • by
              <span class="author font-medium" id="authorHero"
                >${author}</span
              >
            </div>
          </div>
        </article>`);
        }
    }).catch((err) => {
    });
}


// Search key Event listener
searchKey.addEventListener('click', function (e) {
    e.preventDefault();

    // Removing the Top headings html elements
    sectionBody.remove();

    if (flagSearch) {
        // Adding searching based html elements
        mainApp.insertAdjacentHTML('beforeend', `<section class="search flex flex-col px-20 py-14" id="searchContainer">
        </section>`);
        flagSearch = 0;
    }
    fetchHeadSearch(searchInput.value,);
});

// Topics Searching feature
let businessLink = document.querySelector("#business");
let enterLink = document.querySelector("#entertainment");
let generalLink = document.querySelector("#general");
let healthLink = document.querySelector("#health");
let scienceLink = document.querySelector("#science");
let techLink = document.querySelector("#technology");


// Event delegation of topic bar
let topicBar = document.querySelector("#topicBar");

topicBar.addEventListener('click', function (e) {
    e.preventDefault();
    let elementClicked = e.target;
    let queryTopic = elementClicked.id;
    // Removing the Top headings html elements
    sectionBody.remove();

    // Adding searching based html elements
    mainApp.insertAdjacentHTML('beforeend', `<section class="search flex flex-col px-20 py-14" id="searchContainer">
      </section>`);
    fetchHeadSearch(searchInput.value,);


    fetchHeadSearch("", queryTopic);

});


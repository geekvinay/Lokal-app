import './style.css'

// Datastructures
let articles, heroArticle, date, i, serverResponse;
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let country = 'in', category = 'technology';
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


// let headlineContainer = document.querySelector();
let heroHeading = document.querySelector('#headHero');
let heroDesc = document.querySelector("#descHero");
let heroDate = document.querySelector("#dateHero");
let heroAuth = document.querySelector("#authorHero");
let heroImg = document.querySelector("#imageHero");
let headlineContainer = document.querySelector("#headlineContainer");

// Adding Headline items to the DOM
async function fetchHeadlineItem(data) {
    // articles = await data?.articles;
    // console.log(data);
    // console.log(articles);
    // for (i = 1; i < 4; i++) {
    //     let story = articles[i];
    //     let title = story?.title;
    //     let author = story?.source.name;
    //     let date = new Date(story?.publishedAt);
    //     console.log(date);
    //     date = `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    //     console.log(title, author, date);

    //     headlineContainer.insertAdjacentHTML('afterbegin', `<article class="headingItem border-b-2 border-dark-50">
    //           <h2>
    //           ${title}
    //           </h2>
    //          <div class="dateAut text-sm py-3 font-normal opacity-50">
    //           <span class="date" id="dateHero">${date}</span> • by
    //           <span class="author font-medium" id="authorHero"
    //             >${author}</span
    //             >
    //         </div>
    //         </article>`);
    // }
}

fetchHeadlineItem();

// Fetching the headlines for the hero Headline
function fetchHeadline() {
    let fetchHead = new Request(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=4dd3ac3d26b8400291f76f813bbb67f7`);

    // Calling the fetch API
    fetch(fetchHead).then(response => {
        return response.json();
    }).then((response) => {
        fetchHeadlineItem(response);
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
        console.log(articles);
        for (i = 1; i < 5; i++) {
            let story = articles[i];
            let title = story?.title;
            let author = story?.source.name;
            let date = new Date(story?.publishedAt);
            console.log(date);
            date = `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;
            console.log(title, author, date);

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
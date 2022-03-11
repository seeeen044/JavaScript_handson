// const URL = "https://myjson.dit.upm.es/api/bins/as8f";
//*myjsonが繋がらないので一時的に一時的に下記の記述をしています。
const URL = [
    {
      "category": "News",
      "display": true,
      "img": "./img/news.png",
      "article": [
        {
          "data": "2022/02/24",
          "title": "News01",
          "comment": [
            {
              "name": "Harry",
              "data": "2022/02/24"
            },
            {
              "name": "James",
              "data": "2022/02/25"
            }
          ]
        },
        {
          "data": "2022/02/02",
          "title": "News02",
          "comment": [{}]
        },
        {
          "data": "2022/02/12",
          "title": "News03",
          "comment": [
            {
              "name": "Lily",
              "data": "2022/02/13"
            },
            {
              "name": "Ather",
              "data": "2022/02/25"
            }
          ]
        },
        {
          "data": "2022/02/18",
          "title": "News04",
          "comment": [{}]
        }
      ]
    },
    {
      "category": "Economic",
      "display": false,
      "img": "./img/economic.png",
      "article": [
        {
          "data": "2022/02/26",
          "title": "Economic01",
          "comment": [
            {
              "name": "Arther",
              "data": "2022/02/24"
            },
            {
              "name": "Bill",
              "data": "2022/02/25"
            }
          ]
        },
        {
          "data": "2022/02/27",
          "title": "Economic02",
          "comment": [
            {
              "name": "Charlie",
              "data": "2022/02/24"
            },
            {
              "name": "Fred",
              "data": "2022/02/25"
            }
          ]
        },
        {
          "data": "2022/02/10",
          "title": "Economic03",
          "comment": [{}]
        },
        {
          "data": "2022/02/02",
          "title": "Economic04",
          "comment": [{}]
        }
      ]
    },
    {
      "category": "Movie",
      "display": false,
      "img": "./img/movie.png",
      "article": [
        {
          "data": "2022/02/18",
          "title": "Movie01",
          "comment": [
            {
              "name": "Charlie",
              "data": "2022/02/24"
            },
            {
              "name": "Fred",
              "data": "2022/02/25"
            },
            {
              "name": "Geroge",
              "data": "2022/02/24"
            }
          ]
        },
        {
          "data": "2022/02/12",
          "title": "Movie02",
          "comment": [{}]
        },
        {
          "data": "2022/02/23",
          "title": "Movie03",
          "comment": [
            {
              "name": "Ron",
              "data": "2022/02/25"
            }
          ]
        },
        {
          "data": "2022/02/28",
          "title": "Movie04",
          "comment": [{}]
        }
      ]
    },
    {
      "category": "Sports",
      "display": false,
      "img": "./img/sports.png",
      "article": [
        {
          "data": "2022/02/28",
          "title": "Sports01",
          "comment": [
            {
              "name": "Ginny",
              "data": "2022/02/24"
            },
            {
              "name": "Morry",
              "data": "2022/02/25"
            },
            {
              "name": "Percy",
              "data": "2022/02/24"
            }
          ]
        },
        {
          "data": "2022/03/01",
          "title": "Sports02",
          "comment": [{}]
        },
        {
          "data": "2022/03/03",
          "title": "Sports03",
          "comment": [{}]
        },
        {
          "data": "2022/03/03",
          "title": "Sports04",
          "comment": [{}]
        }
      ]
    }
  ]

const tabWrapper = document.getElementById("js-tabWrapper");
const tab = document.getElementById("js-tabMenu");

const createElementWithClassName = (element, name) => {
  const createdElement = document.createElement(element);
  createdElement.classList.add(name);
  return createdElement;
};

const addLoading = () => {
  const loadingPlace = createElementWithClassName("div", "loader");
  loadingPlace.id = "loadingPlace";
  tabWrapper.appendChild(loadingPlace);
};

const removeLoading = () => document.getElementById("loadingPlace").remove();

const getFetchData = async () => {
  try {
// const respons = await fetch(URL);
    // if (!respons.ok) {
    //   throw new Error("ただいまサーバー側で通信が壊れています");
    // }
    // const json = await respons.json();
    // return json;
    //*myjsonが繋がらないので一時的に下記の記述をしています。
    const json =  URL;
    return json;
  } catch (error) {
    console.error("error:ただいまサーバー側で通信が壊れています");
  }
};

const init = async () => {
  addLoading();
  try {
    const value = await getFetchData();
    renderTabMenu(value);
    renderTabContainer(value);
  } catch (error) {
    console.error(error);
    tab.textContent = "データを読み込めませんでした";
  } finally {
    removeLoading();
  }
};
init();

const renderTabMenu = (value) => {
  const tabMenuFragment = document.createDocumentFragment();
  for (let i = 0; i < value.length; i++) {
    const menuList = createElementWithClassName("li", "menu-list");
    menuList.dataset.index = i;
    menuList.textContent = value[i].category;
    value[i].display && menuList.classList.add("active");
    tabMenuFragment.appendChild(menuList);
  }
  tab.appendChild(tabMenuFragment);
};

const renderTabContainer = (value) => {
  const tabContentsFragment = document.createDocumentFragment();
  for (let i = 0; i < value.length; i++) {
    const newsWrapper = createElementWithClassName("div", "news-wrapper");
    const articleTitlelist = createElementWithClassName("ul", "article-title-list");
    const newsImg = createElementWithClassName("img", "news-img");
    value[i].display && newsWrapper.classList.add("show");
    newsImg.src = value[i].img;

    tabContentsFragment
      .appendChild(newsWrapper)
      .appendChild(articleTitlelist)
      .appendChild(createArticleTitle(value[i]));

    tabContentsFragment.appendChild(newsWrapper).appendChild(newsImg);
  }
  const tabContainer = createElementWithClassName("div", "tab-container");
  tabWrapper.appendChild(tabContainer).appendChild(tabContentsFragment);
};

const createArticleTitle = ({ article }) => {
  const articleTitleFragment = document.createDocumentFragment();
  for (let i = 0; i < article.length; i++) {
    const articleTitleItem = createElementWithClassName("li", "article-title-item");
    const articleWrapper = createElementWithClassName("article", "article-wrapper");
    const articleLink = createElementWithClassName("a", "article-link");
    const articleTitle = createElementWithClassName("h1", "article-title");
    articleTitle.textContent = article[i].title;
    articleLink.href = "#";

    articleTitleFragment.appendChild(articleTitleItem).appendChild(articleWrapper).appendChild(articleLink).appendChild(articleTitle);
  }
  return articleTitleFragment;
};

tab.addEventListener("click", (e) => {
  if (e.target === tab) return;
  const active = document.querySelector(".active");
  const show = document.querySelector(".show");
  active.classList.remove("active");
  e.target.classList.add("active");
  show.classList.remove("show");
  const contents = document.getElementsByClassName("news-wrapper");
  contents[e.target.dataset.index].classList.add("show");
});

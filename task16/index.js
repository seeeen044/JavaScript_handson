const URL = "https://myjson.dit.upm.es/api/bins/as8f";
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
    const respons = await fetch(URL);
    if (!respons.ok) {
      throw new Error("ただいまサーバー側で通信が壊れています");
    }
    const json = await respons.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const init = async () => {
  addLoading();
  try {
    const value = await getFetchData();
    renderTabMenu(value);
    renderTabContainer(value);
    // tabSwitch();
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
    menuList.id = `js-tabMenuList${i}`;
    menuList.textContent = value[i].category;
    tabMenuFragment.appendChild(menuList);
  }
  tab.appendChild(tabMenuFragment);
  const addClassActive = document.getElementById("js-tabMenuList0");
  addClassActive.classList.add("active");
};

const renderTabContainer = (value) => {
  const tabContentsFragment = document.createDocumentFragment();
  for (let i = 0; i < value.length; i++) {
    const newsWrapper = createElementWithClassName("div", "news-wrapper");
    const articleTitlelist = createElementWithClassName("ul", "article-title-list");
    const newsImg = createElementWithClassName("img", "news-img");
    newsWrapper.id = `js-newsWrapper${i}`;
    newsImg.src = value[i].img;

    tabContentsFragment
      .appendChild(newsWrapper)
      .appendChild(articleTitlelist)
      .appendChild(createArticleTitle(value[i]));

    tabContentsFragment.appendChild(newsWrapper).appendChild(newsImg);
  }
  const tabContainer = createElementWithClassName("div", "tab-container");
  tabWrapper.appendChild(tabContainer).appendChild(tabContentsFragment);
  const addClassShow = document.getElementById("js-newsWrapper0");
  addClassShow.classList.add("show");
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
  const active = document.querySelector(".active");
  const show = document.querySelector(".show");
  active.classList.remove("active");
  e.target.classList.add("active");
  const tabMenu = document.querySelectorAll(".menu-list");
  const arrayTabMenu = Array.prototype.slice.call(tabMenu);
  const index = arrayTabMenu.indexOf(e.target);
  show.classList.remove("show");
  const tabContent = document.getElementsByClassName("news-wrapper");
  tabContent[index].classList.add("show");
});

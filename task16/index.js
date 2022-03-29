const URL = "https://mocki.io/v1/ce33509e-08ef-4d9e-bacc-7878cd0ba039";

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
    const articleTitlelist = createElementWithClassName(
      "ul",
      "article-title-list"
    );
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
    const articleTitleItem = createElementWithClassName(
      "li",
      "article-title-item"
    );
    const articleWrapper = createElementWithClassName(
      "article",
      "article-wrapper"
    );
    const articleLink = createElementWithClassName("a", "article-link");
    const articleTitle = createElementWithClassName("h1", "article-title");
    articleTitle.textContent = article[i].title;
    articleLink.href = "#";

    articleTitleFragment
      .appendChild(articleTitleItem)
      .appendChild(articleWrapper)
      .appendChild(articleLink)
      .appendChild(articleTitle);

    renderNewArrivals(article[i], articleLink);
    renderCommentCount(article[i], articleLink);
  }
  return articleTitleFragment;
};

const renderNewArrivals = (article, articleLink) => {
  const articleDate = elapsedTime(article.date);
  const newArrivalsLimiter = 3;
  if (articleDate <= newArrivalsLimiter) {
    articleLink.appendChild(createNewArrivals());
  }
};

const renderCommentCount = (article, articleLink) => {
  const commentLength = article.comment.length;
  if (commentLength > 0) {
    articleLink.appendChild(createCommentCount(article));
  }
};

const elapsedTime = (articlePostedDate) => {
  const postedDate = new Date(articlePostedDate);
  const today = new Date();
  const timeEquivalent = 1000 * 60 * 60 * 24;
  const elapsed = (today.getTime() - postedDate.getTime()) / timeEquivalent;
  return elapsed;
};

const createNewArrivals = () => {
  const newIconWrapper = createElementWithClassName("span", "new-icon-wrapper");
  const newIconImg = createElementWithClassName("img", "new-icon-img");
  newIconImg.src = "./img/new_16x16.png";
  newIconWrapper.appendChild(newIconImg);
  return newIconWrapper;
};

const createCommentCount = (commentValue) => {
  const commentCount = commentValue.comment.length;
  const commentContainer = createElementWithClassName("span", "comment-icon");
  const commentImg = createElementWithClassName("img", "comment-img");
  const commentNumber = createElementWithClassName("span", "comment-number");
  commentNumber.textContent = commentCount;
  commentImg.src = "./img/comment_16x16.png";
  commentContainer.appendChild(commentImg);
  commentContainer.appendChild(commentNumber);
  return commentContainer;
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

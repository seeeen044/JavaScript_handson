import '../css/style.css'
import { createElementWithClassName } from "./utils/createElement";
import { addLoading } from "./module/loading";
import { removeLoading } from "./module/loading";
import { renderErrorMessage } from "./module/error";
import { format, differenceInCalendarDays } from "date-fns";

const endpointForNews = "https://mocki.io/v1/1a552372-eb0e-4bf6-855a-24b5d59e6399";

const tabWrapper = document.getElementById("js-tabWrapper");
const tab = document.getElementById("js-tabMenu");

const getFetchData = async () => {
  try {
    const response = await fetch(endpointForNews);
    if (!response.ok) {
      console.error(`${response.status}:${response.statusText}`);
      renderErrorMessage(tabWrapper, "問題が発生し表示することができません。");
      }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`${response.status}:${response.statusText}`);
    renderErrorMessage(tabWrapper, "問題が発生し表示することができません。");
  }
};

const initialize = async () => {
  addLoading(tabWrapper);
  let newsData
  try {
    newsData = await getFetchData();
  } catch (error) {
    console.error(error);
    tab.textContent = "データを読み込めませんでした";
  } finally {
    removeLoading(tabWrapper);
  }
  renderTabMenu(newsData);
  renderTabContainer(newsData);
};
initialize();

const renderTabMenu = (newsData) => {
  const tabMenuFragment = document.createDocumentFragment();
  for (let i = 0; i < newsData.length; i++) {
    const menuListElement = createElementWithClassName("li", "menu-list");
    menuListElement.dataset.index = i;
    menuListElement.textContent = newsData[i].category;
    newsData[i].display && menuListElement.classList.add("active");
    tabMenuFragment.appendChild(menuListElement);
  }
  tab.appendChild(tabMenuFragment);
};

const renderTabContainer = (newsData) => {
  const tabContentsFragment = document.createDocumentFragment();
  for (let i = 0; i < newsData.length; i++) {
    const newsWrapperElement = createElementWithClassName("div", "news-wrapper");
    const articleTitlelistElement = createElementWithClassName(
      "ul",
      "article-title-list"
    );
    const newsImgElement = createElementWithClassName("img", "news-img");
    newsData[i].display && newsWrapperElement.classList.add("show");
    newsImgElement.src = newsData[i].img;

    tabContentsFragment
      .appendChild(newsWrapperElement)
      .appendChild(articleTitlelistElement)
      .appendChild(createArticleItem(newsData[i]));

    tabContentsFragment.appendChild(newsWrapperElement).appendChild(newsImgElement);
  }
  const tabContainerElement = createElementWithClassName("div", "tab-container");
  tabWrapper.appendChild(tabContainerElement).appendChild(tabContentsFragment);
};

const createArticleItem = ({ article }) => {
  const articleTitleFragment = document.createDocumentFragment();
  for (let i = 0; i < article.length; i++) {
    const articleTitleItemElement = createElementWithClassName(
      "li",
      "article-title-item"
    );
    const articleWrapperElement = createElementWithClassName(
      "article",
      "article-wrapper"
    );
    const articleLinkElement = createElementWithClassName("a", "article-link");
    const articleTitleElement = createElementWithClassName("h1", "article-title");
    articleTitleElement.textContent = article[i].title;
    articleLinkElement.href = "#";

    articleTitleFragment
      .appendChild(articleTitleItemElement)
      .appendChild(articleWrapperElement)
      .appendChild(articleLinkElement)
      .appendChild(articleTitleElement);

    renderNewArrivals(article[i], articleLinkElement);
    renderCommentCount(article[i], articleLinkElement);
  }
  return articleTitleFragment;
};

const renderNewArrivals = (article, parent) => {
  const diffDays = getDiffDays(article.date);
  const newArrivalsLimiter = 3;
  if (diffDays <= newArrivalsLimiter) {
    parent.appendChild(createNewArrivals());
  }
};

const renderCommentCount = (article, parent) => {
  const commentLength = article.comment.length;
  if (commentLength > 0) {
    parent.appendChild(createCommentCount(commentLength));
  }
};

const getDiffDays = (articlePostedDate) => {
  const postedDate = format(new Date(articlePostedDate), "yyyy, MM, dd");
  const today = format(new Date(), "yyyy, MM, dd");
  const elapsed = differenceInCalendarDays(new Date(today), new Date(postedDate));
  return elapsed;
};

const createNewArrivals = () => {
  const newIconWrapperElement = createElementWithClassName("span", "new-icon-wrapper");
  const newIconImgElement = createElementWithClassName("img", "new-icon-img");
  newIconImgElement.src = "./img/new_16x16.png";
  newIconWrapperElement.appendChild(newIconImgElement);
  return newIconWrapperElement;
};

const createCommentCount = (commentCount) => {
  const commentContainerElement = createElementWithClassName("span", "comment-icon");
  const commentImgElement = createElementWithClassName("img", "comment-img");
  const commentNumberElement = createElementWithClassName("span", "comment-number");
  commentNumberElement.textContent = commentCount;
  commentImgElement.src = "./img/comment_16x16.png";
  commentContainerElement.appendChild(commentImgElement);
  commentContainerElement.appendChild(commentNumberElement);
  return commentContainerElement;
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

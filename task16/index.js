const URL = "https://myjson.dit.upm.es/api/bins/as8f";
const tabWrapper = document.getElementById("js-tabWrapper");
const tab = document.getElementById("js-tabMenu");

const createElementWithClassName = (element, name) => {
    const createdElement = document.createElement(element);
    createdElement.classList.add(name);
    return createdElement;
};

const addLoading = () => {
    const loadingPlace = createElementWithClassName('div', "loader");
    loadingPlace.id = "loadingPlace";
    tabWrapper.appendChild(loadingPlace);
}

const removeLoading = () => document.getElementById("loadingPlace").remove();

const getFetchData = async () => {
    addLoading();
    try{
        const respons = await fetch(URL);
        if(!respons.ok){
            throw new Error('ただいまサーバー側で通信が壊れています')
        };
        const json = await respons.json();
        return json;
    }
    catch(error) {
        console.error(error);
    }
    finally {
        removeLoading();
    }
};

const init = async () => {
    try {
        const value = await getFetchData();
        renderTabMenu(value);
        renderTabContainer(value);
        tabSwitch();
    }
    catch(error) {
        console.error(error);
        tab.textContent = "データを読み込めませんでした";
    }
};
init();

const renderTabMenu = (value) => {
    const tabMenuFragment = document.createDocumentFragment();
    for(let i = 0; i < value.length; i++){
        const menuList = createElementWithClassName('li', "menu-list");
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
    for(let i = 0; i < value.length; i++){
        const newsWrapper = createElementWithClassName('div', "news-wrapper");
        const newsTitlelist = createElementWithClassName('ul', "news-title-list");
        const newsImg = createElementWithClassName('img', "news-img")
        newsWrapper.id = `js-newsWrapper${i}`;
        newsImg.src = value[i].img;

        tabContentsFragment.appendChild(newsWrapper).appendChild(newsTitlelist).appendChild(getNewsTitle(value[i]));

        tabContentsFragment.appendChild(newsWrapper).appendChild(newsImg);
    }
    const tabContainer = createElementWithClassName('div', "tab-container");
    tabWrapper.appendChild(tabContainer).appendChild(tabContentsFragment);
    const addClassShow = document.getElementById("js-newsWrapper0");
    addClassShow.classList.add("show");
};

const getNewsTitle = ({article}) => {
    const newsTitleFragment = document.createDocumentFragment();
    for(let i = 0; i < article.length; i++){
        const newsTitleItem = createElementWithClassName('li', "news-title-item");
        const newsLink = createElementWithClassName('a', "news-link");
        newsLink.textContent = article[i].title;
        newsLink.href = "#";

        newsTitleFragment.appendChild(newsTitleItem).appendChild(newsLink);
    }
    return newsTitleFragment;
};

const tabSwitch = () => {
    addEventListener('click', (e) => {
    const active = document.querySelector(".active");
    const show = document.querySelector(".show");
    active.classList.remove("active");
    e.target.classList.add("active");
    const tabMenu = document.querySelectorAll(".menu-list")
    const arrayTabMenu = Array.prototype.slice.call(tabMenu);
    const index = arrayTabMenu.indexOf(e.target);
    show.classList.remove("show");
    const tabContent = document.getElementsByClassName("news-wrapper");
    tabContent[index].classList.add("show");
    });
};

const URL = "https://myjson.dit.upm.es/api/bins/as8f";
const tabWrapper = document.getElementById("js-tabWrapper");
const tab = document.getElementById("js-tabMenu");

const createElementWithClassName = (element, name) => {
    const createdElement = document.createElement(element);
    createdElement.classList.add(name);
    return createdElement;
};

const getFetchData = async () => {
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

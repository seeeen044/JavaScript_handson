import '../css/style.css'
import { createElementWithClassName } from './utils/createElement'
import { renderLoading } from './modules/loading'
import { removeLoading } from './modules/loading'
import { renderErrorMessage } from './modules/error'

const body = document.getElementById("js-body");
const parent = document.getElementById("js-parent");

const getFetchData = async (endpoint) => {
    const response = await fetch(endpoint);

    if (!response.ok){
        console.error(`${response.status}:${response.statusText}`);
        renderErrorMessage(parent, "問題が発生し表示することができません。");
    }
    return await response.json();
};

const fetchTableData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getFetchData("https://mocki.io/v1/159d72ba-bd6b-429f-a28c-713eeaba9f72"));
        }, 3000);
    });
};

const getUserData = async () => {
    renderLoading(body);
    try {
        const json = await fetchTableData();
        const data= json.data;
        if(data.length === 0){
            renderErrorMessage(parent, "データがありません。");
            return;
        }
        return data;
    } catch(error) {
        renderErrorMessage(parent, "問題が発生し表示することができません。");
    } finally {
        removeLoading();
    }    
};

const initialize = async () => {
    const userContentsData = await getUserData();
    userContentsData && renderTableContents(userTableColumn, userContentsData);
}
initialize();

const userTableColumn =  {
    "id" : "ID",
    "name" : "名前",
    "gender" : "性別",
    "age" : "年齢"
};

const renderTableContents = (userTableColumn, userContentsData) => {
    const tableElement = document.createElement("table");
    tableElement.classList.add("mt-20", "mx-auto", "w-3/5");

    parent.appendChild(tableElement).appendChild(getCreatedTableHeader(userTableColumn)).after(getCreatedTableBody(userContentsData));

    addEventForSortButton(userContentsData);
};

const getCreatedTableHeader = (userTableColumn) => {
    const theadElement = document.createElement("thead");
    const tableRowElement = document.createElement("tr");
    const tableHeaderFragment = document.createDocumentFragment();
    for(const column of Object.values(userTableColumn)){
        const tableHeaderElement = createElementWithClassName("th", "table-header");
        const isColumnId = column === "ID";
        const renderSortButton = getCreatedSortButton();
        tableHeaderElement.classList.add("bg-gray-900", "text-white");
        tableHeaderElement.textContent = column;
        isColumnId && tableHeaderElement.appendChild(renderSortButton);
        tableHeaderFragment.appendChild(tableHeaderElement);
    }
    theadElement.appendChild(tableRowElement).appendChild(tableHeaderFragment);
    return theadElement;
}

const getCreatedTableBody = (userContentsData) => {
    const tbodyElement = document.createElement("tbody");
    tbodyElement.id = "js-tableBody";
    const tableBodyFragment = document.createDocumentFragment();
    for(const user of userContentsData){
        const tableRowElement = document.createElement("tr");
        for(const column of Object.keys(userTableColumn)){
            const tableDataElement = createElementWithClassName("td", "table-data");
            tableDataElement.textContent = user[column];
            tableBodyFragment.appendChild(tableRowElement).appendChild(tableDataElement);
        }
    }
    tbodyElement.appendChild(tableBodyFragment);
    return tbodyElement;
};

const getCreatedSortButton = () => {
    const sortButton = document.createElement("button");
    const sortImage = createElementWithClassName("img", "sort-image");
    sortButton.id = "js-sortButton";
    sortImage.dataset.status = "default";
    sortButton.appendChild(sortImage);
    return sortButton;
};

const addEventForSortButton = (userContentsData) => {
    const sortButton = document.getElementById("js-sortButton");
    sortButton.addEventListener('click', (e) => {
        const nextStatus = changeSortStatus(e.target.dataset.status);
        e.target.dataset.status = nextStatus;

        sortContents(userContentsData, nextStatus);        
    })
}

const changeSortStatus = (status) => {
    switch(status){
        case "default":
            return "asc";
        case "asc":
            return "desc";
        case "desc":
        default:
            return "default";
    }
}

const renderTableData = (userContentsData) => {
    document.getElementById("js-tableBody").remove();
    const table = document.querySelector("table");
    table.appendChild(getCreatedTableBody(userContentsData));
};

const sortContents = (userContentsData, status) => {
    const cloneUserData = [...userContentsData];
    switch(status){
        case "asc":
            cloneUserData.sort((a, b) => a.id - b.id);
            renderTableData(cloneUserData);
        break;
        case "desc":
            cloneUserData.sort((a, b) => b.id - a.id);
            renderTableData(cloneUserData);
        break;
        default:
            return renderTableData(userContentsData);
    }
}

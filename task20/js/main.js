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
        // setTimeout(() => {
        //     resolve(getFetchData("https://mocki.io/v1/f12ae2d1-310d-4120-8749-47773d65e236"));
        // }, 3000);//空配列
        // setTimeout(() => {
        //     resolve(getFetchData("https://httpstat.us/503"));
        // }, 3000);//503error
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
};

const getCreatedTableHeader = (userTableColumn) => {
    const theadElement = document.createElement("thead");
    const tableRowElement = document.createElement("tr");
    const tableHeaderFragment = document.createDocumentFragment();
    for(const column of Object.values(userTableColumn)){
        const tableHeaderElement = createElementWithClassName("th", "table-header");
        tableHeaderElement.classList.add("bg-gray-900", "text-white");
        tableHeaderElement.textContent = column;

        tableHeaderFragment.appendChild(tableHeaderElement);
    }
    theadElement.appendChild(tableRowElement).appendChild(tableHeaderFragment);
    return theadElement;
}

const getCreatedTableBody = (userContentsData) => {
    const tbodyElement = document.createElement("tbody");
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


import '../css/style.css'
import { createElementWithClassName } from './utils/createElement'
import { renderLoading } from './modules/loading'
import { removeLoading } from './modules/loading'
import { renderErrorMessage } from './modules/error'

const endpoint = "https://mocki.io/v1/159d72ba-bd6b-429f-a28c-713eeaba9f72";

const parent = document.getElementById("js-parent");

const getFetchData = async () => {
    const response = await fetch(endpoint);
    // const response = await fetch("https://mocki.io/v1/f12ae2d1-310d-4120-8749-47773d65e236");//空配列

    if (!response.ok){
        console.error(`$(response:status):$(response:statusText)`);
        renderErrorMessage(parent, "問題が発生し表示することができません。");
    }
    return await response.json();
};

const fetchTableData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getFetchData(endpoint));
        }, 3000);
        // setTimeout(() => {
        //     resolve(getFetchData("https://mocki.io/v1/f12ae2d1-310d-4120-8749-47773d65e236"));
        // }, 3000);//空配列
    });
};

const initialize = async () => {
    renderLoading(parent);
    let userContentsData
    try {
        const json = await fetchTableData();
        userContentsData = json.data;
        if(userContentsData.length === 0){
            renderErrorMessage(parent, "データがありません。");
        }
    } catch(error) {
        renderErrorMessage(parent, "問題が発生し表示することができません。");
    } finally {
        removeLoading(parent);
    }
    renderTableContents(userTableColumn, userContentsData);
};
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


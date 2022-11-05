import '../css/style.css'
import { createElementWithClassName } from './utils/createElement'
import { renderLoading } from './modules/loading'
import { removeLoading } from './modules/loading'
import { renderErrorMessage } from './modules/error'

const endpoint = "https://mocki.io/v1/7afded4f-46ed-4535-b770-997abc352aea";

const parent = document.getElementById("js-parent");

const getFetchData = async () => {
    const response = await fetch(endpoint);
    if (!response.ok){
        console.error(`$(response:status):$(response:statusText)`);
        renderErrorMessage(parent, "問題が発生し表示することができません。");
    }
    const json = await response.json();
    return json.data;
};

const fetchTableData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getFetchData(endpoint));
        }, 3000);
    });
};

const initialize = async () => {
    renderLoading(parent);
    let userContentsData
    try {
        userContentsData = await fetchTableData();
    } catch(error) {
        renderErrorMessage(parent, "問題が発生し表示することができません。");
    } finally {
        removeLoading(parent);
    }
    renderTableContents(userContents, userContentsData);
};
initialize();

const userContents =  {
    "userId" : "ID",
    "userName" : "名前",
    "userGender" : "性別",
    "userAge" : "年齢"
};

const renderTableContents = (userContents, userContentsData) => {
    const tableElement = document.createElement("table");
    tableElement.classList.add("mt-20", "mx-auto", "w-3/5");

    parent.appendChild(tableElement).appendChild(getCreatedTableHeader(userContents));
    parent.appendChild(tableElement).appendChild(getCreatedTableBody(userContentsData));
};

const getCreatedTableHeader = (userContents) => {
    const theadElement = document.createElement("thead");
    const tableRowElement = document.createElement("tr");
    const tableHeaderFragment = document.createDocumentFragment();
    for(const content of Object.values(userContents)){
        const tableHeaderElement = createElementWithClassName("th", "table-header");
        tableHeaderElement.classList.add("bg-gray-900", "text-white");
        tableHeaderElement.textContent = content;

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
        for(const content of Object.keys(userContents)){
            const tableDataElement = createElementWithClassName("td", "table-data");
            tableDataElement.textContent = user[content];

            tableBodyFragment.appendChild(tableRowElement).appendChild(tableDataElement);
        }
    }
    tbodyElement.appendChild(tableBodyFragment);
    return tbodyElement;
};


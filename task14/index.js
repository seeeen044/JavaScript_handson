const parent = document.getElementById("js-parent"); 
const modalPlace = document.getElementById('js-modalPlace');

const appendModalForParent = () => {
    const modalText = document.createElement('p');
    const getNumber = document.createElement('input')
    const closeBtn = document.createElement('input');
    modalPlace.className = "modal";
    modalPlace.style.display = "block";
    modalText.textContent = "数字を入力して値を取得します。";
    getNumber.id = "js-number";
    getNumber.className = "number";
    getNumber.type = "number";
    closeBtn.id = "js-closeBtn";
    closeBtn.className = "close-button";
    closeBtn.type = "button";
    closeBtn.value = "click";

    modalPlace.appendChild(modalText);
    modalPlace.appendChild(getNumber);
    modalPlace.appendChild(closeBtn);
};

const appendButtonForParent = () => {
    const button = document.createElement('input');
    button.id = "js-openBtn";
    button.type = "button";
    button.value = "click";
    parent.appendChild(button);
};
appendButtonForParent();

const requestNumber = () => {
    const getValue = document.getElementById("js-number");
    if(getValue.value === ""){
        alert("数字を入力してください");
        return false;
    } else {
        console.log(getValue.value);
        modalPlace.style.display = "none";
        init();
        return true;
    }
};

const openBtn = document.getElementById("js-openBtn");
openBtn.addEventListener("click", (e) => {
    appendModalForParent();
    e.target.remove();
    modalClose();
});

const modalClose = () => {
    const closeBtn = document.getElementById("js-closeBtn");
    closeBtn.addEventListener("click", () => {
        requestNumber();
    });
};

const getFetchData = async () => {
    const response = await fetch("https://jsondata.okiba.me/v1/json/3jhPW210812052923");
    const json = await response.json();
    return json.data;
};

const addLoading = () => {
    const loadingPlace = document.createElement("div");
    const gif = document.createElement('img');
    loadingPlace.id = "loadingPlace";
    gif.src = "loading-circle.gif";
    parent.appendChild(loadingPlace).appendChild(gif);
};

const removeLoading = () => {
    document.getElementById("loadingPlace").remove();
};

const appendListForParent = (value) => {
    const ul = document.createElement('ul');
    const fragment = document.createDocumentFragment();
    
    value.forEach(d => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');
    
        a.textContent = d.text;
        a.href = d.a;
        img.src = d.img;
        img.alt = d.alt;
    
        fragment.appendChild(li).appendChild(a).appendChild(img);
    })
    parent.appendChild(ul).appendChild(fragment);  
};

const init = async () => {
    addLoading();
    try {
        const value = await getFetchData();
        appendListForParent(value);
    } catch (error) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "データを読み込めませんでした";
        parent.appendChild(errorMessage);        
        console.error(error); 
    }
    finally{
        removeLoading();
    };
};

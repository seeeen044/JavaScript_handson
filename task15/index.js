const parent = document.getElementById("js-parent"); 
const modalPlace = document.getElementById('js-modalPlace');

const renderButtonForParent = () => {
    const button = document.createElement('input');
    modalPlace.style.display = "none"; 
    button.id = "js-openBtn";
    button.type = "button";
    button.value = "click";
    parent.appendChild(button);
};
renderButtonForParent();

const openBtn = document.getElementById("js-openBtn");
openBtn.addEventListener("click", (e) => {
    modalPlace.className = "modal";
    modalPlace.style.display = "block";
    e.target.remove();
    modalClose();
});

const modalClose = () => {
    const closeBtn = document.getElementById("js-closeBtn");
    closeBtn.addEventListener("click", () => {
        requestValue();
    });
};

const requestValue = () => {
    const getName = document.getElementById("js-getName").value;
    const getNumber = document.getElementById("js-getNumber").value;

    if(!getName.match(/\S/g) || getNumber === ""){
        alert("入力してください");
    } else {
        console.log(getName);
        console.log(getNumber);
        modalPlace.style.display = "none";
        init();
    }
};

const getFetchData = async () => {
    const response = await fetch("https://myjson.dit.upm.es/api/bins/cvud");
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

const renderListForParent = (value) => {
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
        renderListForParent(value);
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

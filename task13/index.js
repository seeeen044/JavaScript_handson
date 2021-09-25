const parent = document.getElementById("js-parent"); 

const appendModalForParent = () => {
    const modalPlace = document.createElement('section');
    const modalText = document.createElement('p');
    const closeBtn = document.createElement('input');
    modalPlace.style.margin = '0 auto';
    modalPlace.style.textAlign = "center";
    modalPlace.style.width = '300px';
    modalPlace.style.padding = '20px';
    modalPlace.style.backgroundColor = "lightGray";
    modalPlace.id = "modalPlace";
    modalText.textContent = "クリックしてデータを取得します。";
    closeBtn.style.margin = '0 auto';
    closeBtn.style.display = "block";
    closeBtn.id = "closeBtn";
    closeBtn.type = "button";
    closeBtn.value = "click";

    parent.appendChild(modalPlace).insertBefore(modalText, modalPlace.firstChild).appendChild(closeBtn);
};

const appendButtonForParent = () => {
    const button = document.createElement('input');
    button.id = "button";
    button.type = "button";
    button.value = "click";
    parent.appendChild(button);
};
appendButtonForParent();

const modalEvent = document.getElementById("button"); 
modalEvent.addEventListener('click', (e) => {
    appendModalForParent();
    e.target.remove();
    const closeEvent = document.getElementById("closeBtn");
    closeEvent.addEventListener('click', () => {
        document.getElementById('modalPlace').remove();
        init();
    });
});

const getData = async () => {
    const response = await fetch("https://jsondata.okiba.me/v1/json/3jhPW210812052923");
    const data = response.json();
    return data;
};

const loading = () => {
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
    
    value.data.forEach(key => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');
    
        a.textContent = key.text;
        a.href = key.a;
        img.src = key.img;
        img.alt = key.alt;
    
        fragment.appendChild(li).appendChild(a).appendChild(img);
    })
    parent.appendChild(ul).appendChild(fragment);  
};

const init = async () => {
    loading();
    try {
        const value = await getData();
        appendListForParent(value);
    } catch (error) {
        parent.textContent = "データを読み込めませんでした";
        console.error(error); 
    }
    finally{
        removeLoading();
    };
};

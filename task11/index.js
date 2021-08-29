const div = document.getElementById("js-parent");

const loading = () => {
    const loadingPlace = document.createElement("div");
    const gif = document.createElement('img');
    loadingPlace.id = "loadingPlace";
    gif.src = "loading-circle.gif";
    div.appendChild(loadingPlace).appendChild(gif);
};

const removeLoading = () => {
    document.getElementById("loadingPlace").remove();
};

const getData = async () => {
    loading();
    try {
        const request = await fetch("https://jsondata.okiba.me/v1/json/3jhPW210812052923");
        const data = request.json();
        return data;
        
    } catch (error) {
        div.textContent = "データを読み込めませんでした";
        console.error(error);
    }
    finally{
        removeLoading();
    };
};

const objShow = async () => {
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
    div.appendChild(ul).appendChild(fragment);  
};

const init = async () => {
    const value = await getData();
    objShow(value);
};
init();

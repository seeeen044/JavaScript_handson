const parent = document.getElementById("js-parent");
    
const appendButtonForParent = () => {
    const button = document.createElement('input');
    button.id = "button";
    button.type = "button";
    button.value = "click";
    parent.appendChild(button);
};
appendButtonForParent();

const button = document.getElementById("button"); 
button.addEventListener('click', (e) => {
    e.target.remove();
    init();
});

// or When the argument is deleted
// button.addEventListener('click', () => {
//     button.remove();
//     init();
// });

const getData = async () => {
    try {
        const response = await fetch("https://jsondata.okiba.me/v1/json/3jhPW210812052923");
        const data = response.json();
        return data;
            
    } catch (error) {
        parent.textContent = "データを読み込めませんでした";
        console.error(error);
    }
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
    try {
        const value = await getData();
        appendListForParent(value);
    } catch (error) {
        parent.textContent = "JSONデータを読み込めませんでした";
        console.error(error); 
    }
};

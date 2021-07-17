const obj = [
    {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, 
    {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]

const div = document.getElementById("js-parent");

const loadingPlace = document.createElement("div");
div.appendChild(loadingPlace);

const loading = () => {
    const gif = document.createElement('img');
    gif.src = "loading-circle.gif";
    loadingPlace.appendChild(gif);
};
    
const getData = new Promise((resolve) => {
    loading();
    
    setTimeout(() => {
        resolve(obj);
    },2000);
});

getData.then((value) => {
    loadingPlace.remove();

    const ul = document.createElement('ul');
    const fragment = document.createDocumentFragment();

    value.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');

        a.textContent = item.text;
        a.href = item.to;
        img.src = item.img;
        img.alt = item.alt;

        fragment.appendChild(li).appendChild(a).appendChild(img);
    })
    div.appendChild(ul).appendChild(fragment);
});

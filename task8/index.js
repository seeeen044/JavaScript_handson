const obj = [
    {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, 
    {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]

const div = document.getElementById("js-parent");

const loading = () => {
    const loadingPlace = document.createElement("div");
    const gif = document.createElement('img');
    loadingPlace.id = "loadingPlace";
    gif.src = "loading-circle.gif";
    div.appendChild(loadingPlace).appendChild(gif);
};loading();

const removeLoading = () => {
    document.getElementById("loadingPlace").remove();
}
    
const getData  = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("error!");
    },3000);
});

getData.then((value) => {
    removeLoading();
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
getData.catch((error) => {
    console.error(error);
});

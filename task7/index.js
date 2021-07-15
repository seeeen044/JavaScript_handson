const obj = [
    {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, 
    {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]

const div = document.getElementById("js-loading");
const gif = document.createElement('img');
div.appendChild(gif);
const loading = () => {
    gif.src = "loading-circle.gif";
};

const getData = new Promise((resolve) => {
    loading();

    setTimeout(() => {
        resolve(obj);
        gif.remove();
    },2000);
});

getData.then((value) => {
    const ul = document.getElementById("js-ul");
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
    ul.appendChild(fragment);
});

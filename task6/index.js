const ul = document.getElementById("js-ul");

const fragment = document.createDocumentFragment();

const getData = new Promise((resolve) => {
    const obj = [
        {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, 
        {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
    ]
    setTimeout(() => {
        resolve(obj);
    }, 3000);
});

getData.then((value) => {
    value.forEach((item) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');

        a.textContent = item.text;
        a.href = item.to;
        img.src = item.img;
        img.alt = item.alt;

        fragment.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);
    }) 
    ul.appendChild(fragment);
});

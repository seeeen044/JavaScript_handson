const ul = document.getElementById("js-ul");

    const fragment = document.createDocumentFragment();
    const obj = [
    {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, 
    {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
    ]

    new Promise((resolve) => {
     resolve();
    }).then(() => {
     obj.forEach((value) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');

        a.textContent = value.text;
        a.href = value.to;
        img.src = value.img;
        img.alt = value.alt;

        fragment.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);
      })
      ul.appendChild(fragment);
    });

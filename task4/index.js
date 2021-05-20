const ul = document.getElementById("js-ul");
      
  const fragment = document.createDocumentFragment();
  const obj = [
    {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, 
    {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
  ]

//その1
Object.values(obj).forEach((value)=>{
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

//その2
for (let value in obj) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');
            
    a.textContent = obj[value].text;
    a.href = obj[value].to;
    img.src = obj[value].img;
    img.alt = obj[value].alt;

    fragment.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);
}
ul.appendChild(fragment);

//その3
for (let i = 0; i < obj.length; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');
            
    a.textContent = obj[i].text;
    a.href = obj[i].to;
    img.src = obj[i].img;
    img.alt = obj[i].alt;

    fragment.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);
}
ul.appendChild(fragment);
const ul = document.getElementById("js-ul");

const fragment = document.createDocumentFragment();
const src = ["/img/bookmark.png", "/img/message.png"];
for(let i = 0; i < src.length; i++){
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');

    a.textContent = `a${i+1}`;
    a.href = `a${i+1}.html`;
    img.src = src[i];

    fragment.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);  
  }

  ul.appendChild(fragment);

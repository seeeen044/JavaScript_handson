const ul = document.getElementById("js-ul");

const fragment = document.createDocumentFragment();
const length = 2;
for(let i = 1; i <= length; i++){
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');

    a.textContent = `a${i}`;
    a.href = `a${i}.html`;
    img.src = "/img/bookmark.png";

    fragment.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);  
  }

  ul.appendChild(fragment);
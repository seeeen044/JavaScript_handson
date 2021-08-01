const ul = document.getElementById("js-ul");

const fragment = document.createDocumentFragment();
const src = ["bookmark.png", "message.png"];
for(let i = 1; i <= src.length; i++){
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');

    a.textContent = `a${i}`;
    a.href = `a${i}.html`;
    img.src = `/img/${src[i-1]}`;

    fragment.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);  
  }

  ul.appendChild(fragment);

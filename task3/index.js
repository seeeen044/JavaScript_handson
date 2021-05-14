const ul = document.getElementById("js-ul");

for(let i = 1; i <= 2; i++){
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');

    a.textContent = "a"+i;
    a.href = "a"+i+".html";
    img.src = "/img/bookmark.png";

    ul.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);  
  }

      

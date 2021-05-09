//domの習得
const ul = document.getElementById("js_ul");

//domの生成
const li = document.createElement("li");
const a = document.createElement("a");
const img = document.createElement("img");

//domに属性を追加
a.textContent = "これです";
a.setAttribute("src","1.html");
img.setAttribute("src","bookmark.png");
img.setAttribute("alt","ブックマーク");

//domに追加
ul.appendChild(li).appendChild(a).prepend(img);
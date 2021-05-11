//domの習得
const ul = document.getElementById("js_ul");

//domの生成
const li = document.createElement("li");
const a = document.createElement("a");
const img = document.createElement("img");

//domに属性を追加
a.textContent = "これです";
a.href = "1.html";
img.src = "bookmark.png";
img.alt = "ブックマーク";

//domに追加
ul.appendChild(li).appendChild(a).insertBefore(img, a.firstChild);

// この書き方はprependがIE非対称なので上記書き方の方が推奨
// ul.appendChild(li).appendChild(a).prepend(img);
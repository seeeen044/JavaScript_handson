const ul = document.getElementById("js_ul");

const li = document.createElement("li");
ul.appendChild(li);
//liタグを作成しulに差し込み

const a = document.createElement("a");
a.href = "1.html";
li.appendChild(a);
//aタグをliタグの中に差し込み

const img = document.createElement("img");
img.src = "bookmark.png";
img.alt = "ブックマーク";
a.appendChild(img);
//imgタグをaタグの中に差し込み

const text = document.createTextNode("これです");
a.appendChild(text);
//テキストをaタグの中のimgタグの後ろに差し込み
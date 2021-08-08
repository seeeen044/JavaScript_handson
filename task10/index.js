const div = document.getElementById("js-parent");

const loading = () => {
    const loadingPlace = document.createElement("div");
    const gif = document.createElement('img');
    loadingPlace.id = "loadingPlace";
    gif.src = "loading-circle.gif";
    div.appendChild(loadingPlace).appendChild(gif);
};

const removeLoading = () => {
    document.getElementById("loadingPlace").remove();
};

const getData = () => {
    const obj = [
        {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, 
        {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
    ]
    
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(obj) {
                resolve(obj);

            } else {
                reject("error!");

            }
        },2000);
    });    
};

const objShow = async () => {
    loading();

    const value = await getData();

    //【Question】 Can I use try-catch-finally in here?
    // try {
    //     getData();
    // } catch (error) {
    //     div.textContent = "データを読み込めませんでした";
    //     console.error(error);
    // }
    // finally{
    //     removeLoading();
    // };

    const ul = document.createElement('ul');
    const fragment = document.createDocumentFragment();

    value.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');

        a.textContent = item.text;
        a.href = item.to;
        img.src = item.img;
        img.alt = item.alt;

        fragment.appendChild(li).appendChild(a).appendChild(img);
    })
    div.appendChild(ul).appendChild(fragment);
    
};
objShow();

const exception = async () => {
    try {
        await getData();
    } catch (error) {
        div.textContent = "データを読み込めませんでした";
        console.error(error);
    }
    finally{
        removeLoading();
    };
};
exception();

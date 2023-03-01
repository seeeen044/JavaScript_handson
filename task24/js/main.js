import "../css/style.css";

const modalWrapper = document.getElementById("js-modalContents");
const modal = document.getElementById("js-modal");
const modalContents = document.getElementById('js-modalContents');
const modalPlace = document.getElementById("js-modalPlace");
const closeModal = document.getElementById("js-modalClose");
const closeModalText = document.getElementById("js-modalCloseText");
const checkBox = document.getElementById("js-checkBox");
const login = document.getElementById("js-login");

const createModal = () => {
    modalWrapper.classList.remove('hidden');
    modalWrapper.classList.add("fixed", "inset-0", "flex",  "justify-center", "items-center", "z-50", "bg-gray-700", "bg-opacity-95")
    modal.classList.add("max-w-screen-sm", "h-96", "p-4", "bg-white", "overflow-y-auto", "rounded-lg")
    closeModal.classList.add("flex", "justify-center", "items-center", "p-6", "hover-item")
    closeModalText.classList.add("hover-text")
}

modalPlace.addEventListener("click", createModal);
closeModal.addEventListener("click", () => {
    modalWrapper.classList.add('hidden')
});

const options = {
    root: modalContents,
  }

const checkedvalue = ([entry]) => {
    if(entry.isIntersecting){
        settingInputValue();
    } 
};

const settingInputValue = () => {
    const getMailAdress = document.getElementById("js-getMailAdress").value;
    const getPassWord = document.getElementById("js-getPassWord").value;
    if(getMailAdress.trim() && getPassWord.trim()){
        checkBox.checked = true;
        checkBox.disabled = false;
    } else {
        alert("ログインに必要な項目を入力して下さい");
    }
};

const observer = new IntersectionObserver(checkedvalue, options);
observer.observe(closeModal);

login.addEventListener("click" , (e) => {
    e.preventDefault();
    if (checkBox.checked) 
    document.location.href = "./register-done.html";
})


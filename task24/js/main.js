import "../css/style.css";

const modalWrapper = document.getElementById("js-modalContents");
const modal = document.getElementById("js-modal");
const modalContents = document.getElementById('js-modalContents');
const modalPlace = document.getElementById("js-modalPlace");
const closeModal = document.getElementById("js-modalClose");
const closeModalText = document.getElementById("js-modalCloseText");
const checkBox = document.getElementById("js-checkBox");
const login = document.getElementById("js-login");

modalPlace.addEventListener("click", () => {
    modalWrapper.classList.remove('hidden');
});
closeModal.addEventListener("click", () => {
    modalWrapper.classList.add('hidden')
});

const options = {
    root: modalContents,
  }

const checkedvalue = ([entry]) => {
    if(entry.isIntersecting){
        checkBox.checked = true;
        checkBox.disabled = false;
    } 
};

const observer = new IntersectionObserver(checkedvalue, options);
observer.observe(closeModal);

login.addEventListener("click" , (e) => {
    e.preventDefault();
    if (checkBox.checked) 
    document.location.href = "./register-done.html";
})


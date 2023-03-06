import "../css/style.css";

const modalWrapper = document.getElementById("js-modalContents");
const modalContents = document.getElementById('js-modalContents');
const modalPlace = document.getElementById("js-modalPlace");
const closeModal = document.getElementById("js-modalClose");
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

const checkedValue = ([entry]) => {
    if(entry.isIntersecting){
        checkBox.checked = true;
        checkBox.disabled = false;
    } 
};

const observer = new IntersectionObserver(checkedValue, options);
observer.observe(closeModal);

login.addEventListener("click" , (e) => {
    e.preventDefault();
    if (checkBox.checked) 
    document.location.href = "./register-done.html";
})


import "../css/style.css";
import { createElementWithClassName } from "./utils/createElement";

const modalWrapper = document.getElementById("js-modalContents");
const modalPlace = document.getElementById("js-modalPlace");
const closeModal = document.getElementById("js-modalClose");
const closeModalButton = document.getElementById("js-modalCloseButton");
const checkBox = document.getElementById("js-checkBox");
const login = document.getElementById("js-login");

const renderErrorMessage = (parent, errorMessage, element) => {
    const errorText = document.createElement("p"); 
    errorText.classList.add("text-red-600", "text-sm");
    errorText.textContent = errorMessage;
    element.classList.add("border-red-600");
    parent.append(errorText);
}

const addValidationForUserName = () => {
    const userNameError = document.getElementById("js-userName");
    const userName = document.getElementById("user-name");
    if(!userName.value.match(/^([a-zA-Z0-9]{1,16})$/)){
        renderErrorMessage(userNameError, "半角英数字16文字以内で入力してください", userName);
    }
}

const addValidationForEMail = () => {
    const emailError = document.getElementById("js-email");
    const email = document.getElementById("user-email");
    if(!email.value.match(/.+@.+\..+/)){
        renderErrorMessage(emailError, "メールアドレスをご確認ください", email);
    }
};

const addValidationForPassWord = () => {
    const passWordError = document.getElementById("js-passWord");
    const passWord = document.getElementById("user-password");
    if(!passWord.value.match(/^([a-zA-Z0-9]{8,12})$/)){
        renderErrorMessage(passWordError, "半角英数字8文字以上12文字以内で入力してください", passWord);
    }
};


modalPlace.addEventListener("click", () => {
    modalWrapper.classList.remove('hidden');
});
closeModal.addEventListener("click", () => {
    modalWrapper.classList.add('hidden')
});
closeModalButton.addEventListener("click", () => {
    modalWrapper.classList.add('hidden');
});

modalWrapper.addEventListener("click", (e) => {
    if(!e.target.closest('#js-modal')){
        modalWrapper.classList.add('hidden');
    }
})

const options = {
    root: modalWrapper,
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
    addValidationForUserName();
    addValidationForEMail();
    addValidationForPassWord();
    // if (checkBox.checked) 
    // document.location.href = "./register-done.html";
})


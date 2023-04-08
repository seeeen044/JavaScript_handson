import "../css/style.css";

const modalWrapper = document.getElementById("js-modalContents");
const modalPlace = document.getElementById("js-modalPlace");
const closeModal = document.getElementById("js-modalClose");
const closeModalButton = document.getElementById("js-modalCloseButton");
const checkBox = document.getElementById("js-checkBox");
const loginWrapper = document.getElementById("js-loginWrapper");
const login = document.getElementById("js-login");
const name = document.getElementById("name");
const mail = document.getElementById("mail");
const password = document.getElementById("password");

const renderClassOfLoginWrapper = () => {
    loginWrapper.classList.add("my-8", "mx-auto", "text-center", "w-52", "rounded-md", "bg-yellow-500", "p-3", "login-button")
}
renderClassOfLoginWrapper();

const validationStatus = {
    name : false ,
    mail : false ,
    password : false ,
};

const validations =  {
    name : {
        maxLength : 16,
        minLength : 2,
        validation : (value) => value.length > validations.name.minLength && value.length < validations.name.maxLength,
        errorMessage : "ユーザー名は2文字以上15文字以下にしてください。",
    } ,
    mail : {
        validation : (value) => /.+@.+\..+/.test(value),
        errorMessage : "メールアドレスの形式になっていません。",
    } ,
    password : {
        validation : (value) => /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9.?\/-]{8,12}$/.test(value) ,
        errorMessage : "8文字以上の大小の英数字を交ぜたものにしてください。",
    }
}

const settingValidation = (isValid, target) => {
    if(isValid) {
        target.classList.add("isvalid");
        target.classList.remove("invalid");
        target.nextElementSibling.textContent = "";
        validationStatus[target.id] = true;
    } else {
        target.classList.add("invalid");
        target.classList.remove("isvalid");
        target.nextElementSibling.textContent = validations[target.id].errorMessage;
        validationStatus[target.id] = false;
    }
}

const checkEventForValid = (e) => {
    const target = e.target;
    const value = target.value.trim();
    const inputValue = validations[target.id].validation(value);
    settingValidation(inputValue, target);
    CheckEmptyInputValues(target, value);
    switchLoginButton(checkedAllIsValidAndInputValues());

}

const CheckEmptyInputValues = (target, value) => {
    if(value === ""){
        target.nextElementSibling.textContent ="入力必須項目です";
        return;
    }
}
const checkedAllIsValidAndInputValues = () => {
    return Object.values(validationStatus).every((value) => value);
}

const switchLoginButton = (isValid) => {
    login.disabled = isValid && checkBox.checked ? false : true;
    isValid && changeColorOfLoginButton();
}

const changeColorOfLoginButton = () => {
    loginWrapper.classList.remove("bg-yellow-500");
    loginWrapper.classList.add("bg-green-600");
}

name.addEventListener("blur", checkEventForValid);
mail.addEventListener("blur", checkEventForValid);
password.addEventListener("blur", checkEventForValid);

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
        checkBox.disabled = false;
    } 
};

const observer = new IntersectionObserver(checkedValue, options);
observer.observe(closeModal);

checkBox.addEventListener("input", () => {
    switchLoginButton(checkedAllIsValidAndInputValues());
})

login.addEventListener("click" , (e) => {
    e.preventDefault();
    window.location.href = "./register-done.html";
})


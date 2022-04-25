const URL = "https://mocki.io/v1/af7d1b29-da7d-4eba-977b-cdb5caeb2fff";

const slideShowContainer = document.getElementById("js-slideShowContainer");
const slideShowWrapper = document.getElementById("js-slideShowWrapper");
const slideImgList = document.getElementById("js-slideImgList");

const createElementWithClassName = (element, name) => {
  const createdElement = document.createElement(element);
  createdElement.classList.add(name);
  return createdElement;
};

const addLoading = () => {
  const loadingPlace = createElementWithClassName("div", "loader");
  loadingPlace.id = "js-loadingPlace";
  slideShowWrapper.appendChild(loadingPlace);
};

const removeLoading = () => document.getElementById("js-loadingPlace").remove();

const renderErrorMessage = (errorMessage) => {
  slideShowWrapper.textContent = errorMessage;
};

const getFetchData = async () => {
  const response = await fetch(URL);
  if (!response.ok) {
    console.error(`${response.status}:${response.statusText}`);
    renderErrorMessage("問題が発生し表示することができません。");
  }
  const json = await response.json();
  return json;
};

const fetchImgData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getFetchData(URL));
    }, 3000);
  });
};

const init = async () => {
  addLoading();
  try {
    const value = await fetchImgData();
    renderSlideImage(value);
    renderSlideNumber(value);
  } catch (error) {
    console.error(error.message);
    renderErrorMessage("表示することができません");
  } finally {
    removeLoading();
  }
};
init();

const renderSlideImage = (value) => {
  const slideImgFragment = document.createDocumentFragment();
  for (let i = 0; i < value.length; i++) {
    const slideImgItem = createElementWithClassName("li", "slide-img-item");
    const slideImage = createElementWithClassName("img", "slide-image");
    slideImage.src = value[i].img;
    slideImage.alt = value[i].alt;
    value[i].display && slideImgItem.classList.add("is-active");
    slideImgFragment.appendChild(slideImgItem).appendChild(slideImage);
  }
  slideImgList.appendChild(slideImgFragment);
};

const renderSlideNumber = (value) => {
  const slideNumText = createElementWithClassName("p", "slide-number");
  const slideLength = value.length;
  slideNumText.id = "js-slideNumber";
  slideNumText.textContent = `${findIndexItem()} / ${slideLength}`;
  slideShowContainer.appendChild(slideNumText);
};

const findIndexItem = () => {
  const slideItemArray = [...document.querySelectorAll(".slide-img-item")];
  const indexItem = slideItemArray.findIndex((element) =>
    element.classList.contains("is-active")
  );
  return indexItem + 1;
};

const slideBtn = document.querySelectorAll(".slide-btn");
const nextBtn = document.getElementById("js-nextBtn");
const prevBtn = document.getElementById("js-prevBtn");
let currentIndexImg = 0;

slideBtn.forEach((button) => {
  prevBtn.disabled = currentIndexImg === 0;
  button.addEventListener("click", (event) => {
    const eventTarget = event.target.parentElement;
    const slideImg = document.querySelectorAll(".slide-img-item");
    document.querySelector(".is-active").classList.remove("is-active");
    eventTarget.id === "js-nextBtn" ? ++currentIndexImg : --currentIndexImg;
    slideImg[currentIndexImg].classList.add("is-active");
    btnDisabled(slideImg);
    renderActiveNumber(slideImg);
  });
});

const btnDisabled = (value) => {
  nextBtn.disabled = currentIndexImg === value.length - 1;
  prevBtn.disabled = currentIndexImg === 0;
};

const renderActiveNumber = (value) => {
  document.getElementById("js-slideNumber").textContent = `${
    currentIndexImg + 1
  } / ${value.length}`;
};

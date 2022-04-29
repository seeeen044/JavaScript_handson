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
  let slideImgData;
  try {
    slideImgData = await fetchImgData();
  } catch (error) {
    console.error(error.message);
    renderErrorMessage("表示することができません");
  } finally {
    removeLoading();
  }
  currentImgIndex = slideImgData.findIndex((v) => v.display);
  renderSlideImage(slideImgData);
  renderSlideNumber(slideImgData);

};
init();

const renderSlideImage = (slideImgData) => {
  const slideImgFragment = document.createDocumentFragment();
  for (let i = 0; i < slideImgData.length; i++) {
    const slideImgItem = createElementWithClassName("li", "slide-img-item");
    const slideImage = createElementWithClassName("img", "slide-image");
    slideImage.src = slideImgData[i].img;
    slideImage.alt = slideImgData[i].alt;
    slideImgData[i].display && slideImgItem.classList.add("is-active");
    slideImgFragment.appendChild(slideImgItem).appendChild(slideImage);
  }
  slideImgList.appendChild(slideImgFragment);
};

const renderSlideNumber = (slideImgData) => {
  const slideNumText = createElementWithClassName("p", "slide-number");
  const slideLength = slideImgData.length;
  slideNumText.id = "js-slideNumber";
  slideNumText.textContent = `${currentImgIndex + 1} / ${slideLength}`;
  slideShowContainer.appendChild(slideNumText);
};

const slideBtn = document.querySelectorAll(".slide-btn");
const nextBtn = document.getElementById("js-nextBtn");
const prevBtn = document.getElementById("js-prevBtn");
let currentImgIndex = 0;

slideBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    const eventTarget = event.target.parentElement;
    const slideImg = document.querySelectorAll(".slide-img-item");
    document.querySelector(".is-active").classList.remove("is-active");
    eventTarget.id === "js-nextBtn" ? ++currentImgIndex : --currentImgIndex;
    slideImg[currentImgIndex].classList.add("is-active");
    btnDisabled(slideImg);
    renderActiveNumber(slideImg);
  });
});

const btnDisabled = (slideImgData) => {
  nextBtn.disabled = currentImgIndex === slideImgData.length - 1;
  prevBtn.disabled = currentImgIndex === 0;
};

const renderActiveNumber = (slideImgData) => {
  document.getElementById("js-slideNumber").textContent = `${
    currentImgIndex + 1
  } / ${slideImgData.length}`;
};

const endpoint = "https://mocki.io/v1/af7d1b29-da7d-4eba-977b-cdb5caeb2fff";

const slideShowContainer = document.getElementById("js-slideShowContainer");
const slideShowWrapper = document.getElementById("js-slideShowWrapper");
const slideImgList = document.getElementById("js-slideImgList");
let currentImgIndex = 0;

const createElementWithClassName = (element, name) => {
  const createdElement = document.createElement(element);
  createdElement.classList.add(name);
  return createdElement;
};

const addLoading = () => {
  const loadingPlaceElement = createElementWithClassName("div", "loader");
  loadingPlaceElement.id = "js-loadingPlace";
  slideShowWrapper.appendChild(loadingPlaceElement);
};

const removeLoading = () => document.getElementById("js-loadingPlace").remove();

const renderErrorMessage = (errorMessage) => {
  slideShowWrapper.textContent = errorMessage;
};

const getFetchData = async () => {
  const response = await fetch(endpoint);
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
      resolve(getFetchData(endpoint));
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
  renderSliderContents(slideImgData);
  toggleDisabledOfButton(slideImgData);
  autoSlider(slideImgData);
};
init();

let autoPlay;
const autoSlider = (slideImgData) => {
  autoPlay = setInterval(() => {
    currentImgIndex < slideImgData.length - 1 ? ++ currentImgIndex : currentImgIndex = 0;
    initOfSlider(slideImgData);
  }, 3000);
};

const resetAutoSlider = (slideImgData) => {
  clearInterval(autoPlay);
  autoSlider(slideImgData);
};

const renderSliderContents = (slideImgData) => {
  currentImgIndex = slideImgData.findIndex((data) => data.display);
  renderSlideItem(slideImgData);
  renderSlideBtn(slideImgData);
  renderPagination(slideImgData);
  renderSlideNumber(slideImgData);
};

const renderSlideItem = (slideImgData) => {
  const slideImgFragment = document.createDocumentFragment();
  for (let i = 0; i < slideImgData.length; i++) {
    const slideImgItemElement = createElementWithClassName("li", "slide-img-item");
    const slideImageElement = createElementWithClassName("img", "slide-image");
    slideImageElement.src = slideImgData[i].img;
    slideImageElement.alt = slideImgData[i].alt;
    slideImgData[i].display && slideImgItemElement.classList.add("is-active");
    slideImgFragment.appendChild(slideImgItemElement).appendChild(slideImageElement);
  }
  slideImgList.appendChild(slideImgFragment);
};

const renderSlideBtn = (slideImgData) => {
  const direction = ["prev", "next"];
  direction.forEach((direction) => {
    const buttonElement = createElementWithClassName("button", "slide-btn");
    const buttonImg = document.createElement("img");
    buttonElement.id = `js-${direction}Btn`;
    buttonImg.src = `./img/${direction}-arrow.png`;
    buttonElement.append(buttonImg);
    direction === "prev" && slideShowWrapper.before(buttonElement);
    direction === "next" && slideShowWrapper.after(buttonElement);
  });
  addEventForBtn(slideImgData);
};

const renderPagination = (slideImgData) => {
  const paginationListElement = createElementWithClassName("ul", "pagination-list");
  const paginationFragment = document.createDocumentFragment();
  for (let i = 0; i < slideImgData.length; i++) {
    const paginationItemElement = createElementWithClassName("li", "pagination-item");
    paginationItemElement.dataset.index = i;
    slideImgData[i].display && paginationItemElement.classList.add("is-show");
    paginationFragment.appendChild(paginationListElement).appendChild(paginationItemElement);
  }
  slideShowContainer.appendChild(paginationFragment);
  addEventForPagination(slideImgData);
};

const renderSlideNumber = (slideImgData) => {
  const slideNumTextElement = createElementWithClassName("p", "slide-number");
  const slideLength = slideImgData.length;
  slideNumTextElement.id = "js-slideNumber";
  slideNumTextElement.textContent = `${currentImgIndex + 1} / ${slideLength}`;
  slideShowContainer.appendChild(slideNumTextElement);
};

const initOfSlider = (slideImgData) => {
  changeCurrentNumber(slideImgData);
  toggleDisabledOfButton(slideImgData);
  passIsActiveClass();
  passIsShowClass();
};

const changeCurrentNumber = (slideImgData) => {
  document.getElementById("js-slideNumber").textContent = `${currentImgIndex + 1} / ${slideImgData.length}`;
}

const toggleDisabledOfButton = (slideImgData) => {
  const nextBtn = document.getElementById("js-nextBtn");
  const prevBtn = document.getElementById("js-prevBtn");
  const firstSlideImg = 0;
  const lastSlideImg = slideImgData.length - 1;
  nextBtn.disabled = currentImgIndex === lastSlideImg;
  prevBtn.disabled = currentImgIndex === firstSlideImg;
};

const passIsActiveClass = () => {
  const slideImg = document.querySelectorAll(".slide-img-item");
  document.querySelector(".is-active").classList.remove("is-active");
  slideImg[currentImgIndex].classList.add("is-active");
}

const passIsShowClass = () => {
  const paginations = document.querySelectorAll(".pagination-item");
  document.querySelector(".is-show").classList.remove("is-show");
  paginations[currentImgIndex].classList.add("is-show");
}

const addEventForBtn = (slideImgData) => {
  const slideBtn = document.querySelectorAll(".slide-btn");
  slideBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.currentTarget.id === "js-nextBtn" ? ++currentImgIndex : --currentImgIndex;
      initOfSlider(slideImgData);
      resetAutoSlider(slideImgData);
    })
  })
}

const addEventForPagination = (slideImgData) => {
  const paginations = document.querySelectorAll(".pagination-item");
  paginations.forEach((pagination) => {
    pagination.addEventListener("click", (e) => {
      currentImgIndex = Number(e.target.dataset.index);
      initOfSlider(slideImgData);
      resetAutoSlider(slideImgData);
    })
  })
}


const endpoint = "https://mocki.io/v1/fc890b98-dee0-4eb6-9e83-8c25364dcaa9";

const slideShowContainer = document.getElementById("js-slideShowContainer");
const slideShowWrapper = document.getElementById("js-slideShowWrapper");
const slideImageList = document.getElementById("js-slideImageList");
let currentImageIndex = 0;

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

const fetchImageData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getFetchData(endpoint));
    }, 3000);
  });
};

const initialize = async () => {
  addLoading();
  let slideImageData;
  try {
    slideImageData = await fetchImageData();
  } catch (error) {
    console.error(error.message);
    renderErrorMessage("表示することができません");
  } finally {
    removeLoading();
  }
  renderSliderContents(slideImageData);
  document.getElementById("js-previousButton").disabled = slideImageData[0]
  // toggleDisabledOfButton(slideImageData);
  // 初期設定されていれば関数を実行する必要がなくなる。
  autoSlider(slideImageData);
};
initialize();

let autoPlay;
const autoSlider = (slideImageData) => {
  autoPlay = setInterval(() => {
    currentImageIndex < slideImageData.length - 1 ? ++ currentImageIndex : currentImageIndex = 0;
    changeSlider(slideImageData);
  }, 3000);
};

const resetAutoSlider = (slideImageData) => {
  clearInterval(autoPlay);
  autoSlider(slideImageData);
};

const renderSliderContents = (slideImageData) => {
  renderSlideItem(slideImageData);
  renderSlideBtn(slideImageData);
  renderPagination(slideImageData);
  renderSlideNumber(slideImageData);
};

const renderSlideItem = (slideImageData) => {
  const slideImageFragment = document.createDocumentFragment();
  for (let i = 0; i < slideImageData.length; i++) {
    const slideImageItemElement = createElementWithClassName("li", "slide-image-item");
    const slideImageElement = createElementWithClassName("img", "slide-image");
    slideImageElement.src = slideImageData[i].img;
    slideImageElement.alt = slideImageData[i].alt;
    i === 0 && slideImageItemElement.classList.add("is-active");
    slideImageFragment.appendChild(slideImageItemElement).appendChild(slideImageElement);
  }
  slideImageList.appendChild(slideImageFragment);
};

const renderSlideBtn = (slideImageData) => {
  const directions = ["previous", "next"];
  directions.forEach((direction) => {
    const buttonElement = createElementWithClassName("button", "slide-button");
    const buttonImage = document.createElement("img");
    buttonElement.id = `js-${direction}Button`;
    buttonImage.src = `./img/${direction}-arrow.png`;
    buttonElement.append(buttonImage);
    direction === "previous" && slideShowWrapper.before(buttonElement);
    direction === "next" && slideShowWrapper.after(buttonElement);
  });
  addEventForButton(slideImageData);
};

const renderPagination = (slideImageData) => {
  const paginationListElement = createElementWithClassName("ul", "pagination-list");
  const paginationFragment = document.createDocumentFragment();
  for (let i = 0; i < slideImageData.length; i++) {
    const paginationItemElement = createElementWithClassName("li", "pagination-item");
    paginationItemElement.dataset.index = i;
    i === 0 && paginationItemElement.classList.add("is-show");
    paginationFragment.appendChild(paginationListElement).appendChild(paginationItemElement);
  }
  slideShowContainer.appendChild(paginationFragment);
  addEventForPagination(slideImageData);
};

const renderSlideNumber = (slideImageData) => {
  const slideNumberTextElement = createElementWithClassName("p", "slide-number");
  const slideLength = slideImageData.length;
  slideNumberTextElement.id = "js-slideNumber";
  slideNumberTextElement.textContent = `${currentImageIndex + 1} / ${slideLength}`;
  slideShowContainer.appendChild(slideNumberTextElement);
};

const changeSlider = (slideImageData) => {
  changeCurrentNumber(slideImageData);
  toggleDisabledOfButton(slideImageData);
  changeImage();
  changePagination();
};

const changeCurrentNumber = (slideImageData) => {
  document.getElementById("js-slideNumber").textContent = `${currentImageIndex + 1} / ${slideImageData.length}`;
}

const toggleDisabledOfButton = (slideImageData) => {
  const nextButton = document.getElementById("js-nextButton");
  const previousButton = document.getElementById("js-previousButton");
  const firstSlideImage = 0;
  const lastSlideImage = slideImageData.length - 1;
  nextButton.disabled = currentImageIndex === lastSlideImage;
  previousButton.disabled = currentImageIndex === firstSlideImage;
};

const changeImage = () => {
  const slideImage = document.querySelectorAll(".slide-image-item");
  document.querySelector(".is-active").classList.remove("is-active");
  slideImage[currentImageIndex].classList.add("is-active");
}

const changePagination = () => {
  const paginations = document.querySelectorAll(".pagination-item");
  document.querySelector(".is-show").classList.remove("is-show");
  paginations[currentImageIndex].classList.add("is-show");
}

const addEventForButton = (slideImageData) => {
  const slideButton = document.querySelectorAll(".slide-button");
  slideButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.currentTarget.id === "js-nextButton" ? ++currentImageIndex : --currentImageIndex;
      changeSlider(slideImageData);
      resetAutoSlider(slideImageData);
    })
  })
}

const addEventForPagination = (slideImageData) => {
  const paginations = document.querySelectorAll(".pagination-item");
  paginations.forEach((pagination) => {
    pagination.addEventListener("click", (e) => {
      currentImageIndex = Number(e.target.dataset.index);
      changeSlider(slideImageData);
      resetAutoSlider(slideImageData);
    })
  })
}


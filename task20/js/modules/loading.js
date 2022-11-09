import { createElementWithClassName } from "../utils/createElement";

export const renderLoading = (parent) => {
    const loadingPlaceElement = createElementWithClassName("div", "loader");
    loadingPlaceElement.id = "js-loading";

    parent.appendChild(loadingPlaceElement);
};
  
export  const removeLoading = () => document.getElementById("js-loading").remove();

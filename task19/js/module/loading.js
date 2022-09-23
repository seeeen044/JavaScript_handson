import { createElementWithClassName } from "../utils/createElement";

export const addLoading = (parent) => {
    const loadingPlaceElement = createElementWithClassName("div", "loader");
    loadingPlaceElement.id = "loadingPlace";
    parent.appendChild(loadingPlaceElement);
};
  
export  const removeLoading = () => document.getElementById("loadingPlace").remove();

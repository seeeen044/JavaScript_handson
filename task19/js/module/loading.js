import { createElementWithClassName } from "../utils/createElement";

export const addLoading = (parent) => {
    const loadingPlaceElement = createElementWithClassName("div", "loader");
    loadingPlaceElement.id = `${parent.id}-loading`;
    parent.appendChild(loadingPlaceElement);
};
  
export  const removeLoading = (parent) => document.getElementById(`${parent.id}-loading`).remove();

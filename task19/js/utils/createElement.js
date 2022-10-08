export const createElementWithClassName = (element, name) => {
    const createdElement = document.createElement(element);
    createdElement.classList.add(name);
    return createdElement;
  };
  

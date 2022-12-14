import { CreateElement } from "../../utilities/utility.js"

const ResetButton = () => {
  let resetButton = CreateElement('button');
  resetButton.classList.add('controllerButton');
  resetButton.setAttribute('data-button','reset')
  resetButton.innerHTML = "Rematch";  
  return resetButton
}

const PrevMoveButton = () => {
  let prevButton = CreateElement('button');
  prevButton.classList.add('controllerButton');
  prevButton.setAttribute('data-button','previous')
  prevButton.innerHTML = "Prev";  
  return prevButton
}

const NextMoveButton = () => {
  let nextButton = CreateElement('button');
  nextButton.classList.add('controllerButton');
  nextButton.setAttribute('data-button','next')
  nextButton.innerHTML = "Next";  
  return nextButton
}

export {
  ResetButton,
  PrevMoveButton,
  NextMoveButton
}

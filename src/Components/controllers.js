import { CreateElement } from "../../utilities/utility.js"

const ResetButton = () => {
  let resetButton = CreateElement('button');
  resetButton.setAttribute('data-button','reset')
  resetButton.innerHTML = "Reset";
  
  return resetButton
}

export {
  ResetButton
}

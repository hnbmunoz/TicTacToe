import { CreateElement } from "../../utilities/utility.js";
import { LoadPlayerSelection } from "./playerSelection.js";

let vsMode = false;

const WelcomeScreen = (PlayerSelected) => {    
  let showSelection  = false
  let welcome = CreateElement("div");
  welcome.classList.add("welcome-panel");
  document.body.appendChild(welcome);

  const vsButton = () => {
    let vsButton = CreateElement("button");
    vsButton.innerHTML = "VS Mode";
    vsButton.classList.add('game-mode');
    vsButton.classList.add('controllerButton');
    vsMode = true
    return vsButton;
  };

  const aiButton = () => {
    let aiButton = CreateElement("button");
    aiButton.innerHTML = "AI Mode";
    return aiButton;
  };

  welcome.appendChild(vsButton());  
  // showSelection && LoadPlayerSelection(welcome,PlayerSelected)
  document.querySelector('.game-mode').addEventListener('click', () => {
    showSelection = !showSelection    
    showSelection &&
      [...document.querySelectorAll('.game-mode')].forEach(buttons => buttons.remove())
      LoadPlayerSelection(welcome, PlayerSelected, vsMode)     
  })
};

export { WelcomeScreen };

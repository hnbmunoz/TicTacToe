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
    vsButton.addEventListener('click',() => {ModeSelected(true)})
    return vsButton;
  };

  const aiButton = () => {
    let aiButton = CreateElement("button");
    aiButton.classList.add('game-mode');
    aiButton.classList.add('controllerButton');
    aiButton.innerHTML = "AI Mode";
    aiButton.addEventListener('click',() => {ModeSelected(false)})

    return aiButton;
  };

  welcome.appendChild(vsButton());  
  welcome.appendChild(aiButton());  
  const ModeSelected = (vsMode) => {
    showSelection = !showSelection    
    showSelection &&
      [...document.querySelectorAll('.game-mode')].forEach(buttons => buttons.remove())
      LoadPlayerSelection(welcome, PlayerSelected, vsMode)     
  }
};

export { WelcomeScreen };

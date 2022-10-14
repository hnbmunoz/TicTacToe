import { CreateElement } from "../../utilities/utility.js";

const LoadPlayerSelection = (parent, PlayerSelected, vsMode) => {  
  let selectionContainer = CreateElement('div');
  selectionContainer.classList.add('selection-container')
  selectionContainer.classList.add("flex-column");
  selectionContainer.appendChild(selectionTitle());
  parent.appendChild(selectionContainer);
  selectionContainer.appendChild(PlayerSelection(PlayerSelected, vsMode));
}

const PlayerSelection = (PlayerSelected, vsMode) => {
  let playerSelection = CreateElement('div');
  playerSelection.classList.add('player-selection-container');
  playerSelection.classList.add('flex-row');
  playerSelection.appendChild(playerX(PlayerSelected, vsMode));
  playerSelection.appendChild(playerO(PlayerSelected, vsMode));
  return playerSelection;
}

const selectionTitle = () => {
  let div = CreateElement('div')
  let selectionTitle = CreateElement('label');
  selectionTitle.classList.add('player-selection-title');
  selectionTitle.innerHTML= "Select Player";
  div.appendChild(selectionTitle);
  return div
}

const playerX = (PlayerSelected, vsMode) => {
  let divX = CreateElement('div');  
  let playerX = CreateElement("button");
  playerX.classList.add('player-selection');
  playerX.innerHTML = "X";
  playerX.addEventListener('click', () => {PlayerSelected({mode: vsMode, player1: 'PlayerX'})})
  divX.appendChild(playerX)
  return divX;
};

const playerO = (PlayerSelected, vsMode) => {
  let divO = CreateElement('div');
  let playerO = CreateElement("button");
  playerO.classList.add('player-selection');
  playerO.innerHTML = "O";
  playerO.addEventListener('click', () => {PlayerSelected({mode: vsMode, player1: 'PlayerO'})})
  divO.appendChild(playerO)
  return divO;
};

export {
  LoadPlayerSelection
}
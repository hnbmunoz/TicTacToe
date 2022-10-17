import { GameState, InitializeTicTacToe } from "./Components/tictactoe.js";
import { WelcomeScreen } from "./Components/welcome.js";
import * as Utility from "../utilities/utility.js";
import { AISelected } from "./Components/AI/ai.js"

const app = () => {
  const root = document.getElementById("root");
  const App = Utility.CreateElement("div");
  App.classList.add("app");
  root?.appendChild(App);
  
  let isGameOver = false;
  let isDraw = false;
  let gameState = GameState();
  let isPlayer1 = true;
  let player1 = 'PlayerX'
  let moveRepo = [];
  let currMove = 0;
  let vsMode = false;

  document.addEventListener("click", (e) => {
    if (e.target.dataset.button === "reset") {
      Utility.ResetGameBoard();
      isGameOver = false;
      isPlayer1 = true;
      gameState = GameState();
      moveRepo = [];
      Utility.EnableGameControllers([], 0);
      return;
    }      
    if (document.querySelectorAll('.winningPanel').length > 0) return

    if (e.target.dataset.button === "previous" || e.target.dataset.button === "next") {     
      let currState = Utility.ExecuteGameControllers(e.target.dataset.button, moveRepo, currMove, gameState) 
      currMove = currState.currMove;
      gameState = currState.state
      isPlayer1 = !isPlayer1;
      Utility.EnableGameControllers(moveRepo, currMove);
      return;
    }

    if (e.target.dataset.gamepanel !== "gamePanel") return;

    if (e.target.innerHTML.trim() !== "") return; 
    
    currMove += 1;
    let playerMove = Utility.MapInPanel(isPlayer1, player1, e.target, gameState);  
    gameState = playerMove.currState;
    vsMode && (isPlayer1 = !isPlayer1);  

    moveRepo = Utility.StoreGameMove( e.target.dataset.row,  e.target.dataset.col, playerMove.tag , currMove, moveRepo);
    Utility.EnableGameControllers(moveRepo, currMove);
    isGameOver = Utility.CheckGameOver(gameState, playerMove.tag, {row: e.target.dataset.row, col: e.target.dataset.col});
    isDraw = Utility.CheckDrawGame(gameState, isGameOver);
    (isGameOver || isDraw) && Utility.EnableGameControllers([], 0);

    !vsMode && AIMove(gameState, isPlayer1, player1)  
    
  });
   
  const PlayerSelected = (data) => {
    document.querySelector('.welcome-panel').style.transform = "translateY(-100vh)";   
    player1 = data.player1
    vsMode = data.mode
  }

  const AIMove = (gameState, isPlayer1, player1) => {
    isPlayer1 = !isPlayer1;
    AISelected(gameState, isPlayer1, player1)
  }

  WelcomeScreen(PlayerSelected)
  InitializeTicTacToe(App);
};

window.addEventListener('load', app, false);

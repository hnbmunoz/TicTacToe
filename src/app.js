import { GameState, InitializeTicTacToe } from "./Components/tictactoe.js";
import { WelcomeScreen } from "./Components/welcome.js";
import * as Utility from "../utilities/utility.js";
import { AIPlayer } from "./Components/AI/ai.js"
import Slider from "./Components/slider.js";

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
  let aiRepo = [];
  let aiMove = 0;
  let vsMode = false;

  document.addEventListener("click", (e) => {
    if (e.target.dataset.button === "reset") {
      Utility.ResetGameBoard();
      isGameOver = false;
      isPlayer1 = true;
      gameState = GameState();
      moveRepo = [];
      aiRepo = [];
      isDraw = false;
      currMove = 0;
      Utility.EnableGameControllers([], [], 0, vsMode);
      return;
    }      
    if (document.querySelectorAll('.winningPanel').length > 0 || isDraw) return
    
    if (e.target.dataset.disable === "true") return

    if (e.target.dataset.button === "previous" || e.target.dataset.button === "next") {           
      let currState = Utility.ExecuteGameControllers(e.target.dataset.button, moveRepo, aiRepo, currMove, gameState, vsMode) 
      currMove = currState.currMove;
      gameState = currState.state;
      aiRepo = currState.aiRepo
      vsMode && (isPlayer1 = !isPlayer1);
      Utility.EnableGameControllers(moveRepo, aiRepo, currMove, vsMode);      
      !vsMode && e.target.dataset.button === "next" && AIMove(gameState, isPlayer1, player1, aiRepo, currMove)
      return;
    }

    if (e.target.dataset.gamepanel !== "gamePanel") return;
    e.target.dataset.emptypanel = false

    if (e.target.innerHTML.trim() !== "") return; 
    
    currMove += 1;
    let playerMove = Utility.MapInPanel(isPlayer1, player1, e.target, gameState);  
    gameState = playerMove.currState;
    vsMode && (isPlayer1 = !isPlayer1);  

    moveRepo = Utility.StoreGameMove( e.target.dataset.row,  e.target.dataset.col, playerMove.tag , currMove, moveRepo);
    Utility.EnableGameControllers(moveRepo, aiRepo, currMove, vsMode);
    
    CheckGameResult(playerMove.tag, e.target.dataset.row, e.target.dataset.col)

    !vsMode && AIMove(gameState, isPlayer1, player1, aiRepo, currMove)  
    
  });
   
  const PlayerSelected = (data) => {
    document.querySelector('.welcome-panel').style.transform = "translateY(-100vh)";   
    player1 = data.player1
    vsMode = data.mode
  }

  const AIMove = (gameState, isPlayer1, player1, repo, move) => {
    if (document.querySelectorAll('.winningPanel').length > 0) return
    isPlayer1 = !isPlayer1;
    let ai = AIPlayer(gameState, isPlayer1, player1);
    aiRepo = Utility.StoreGameMove( ai.row,  ai.col, ai.tag , move, repo);        
    CheckGameResult(ai.tag, ai.row, ai.col)
  }

  const ToggleDarkMode = () => {    
    Utility.DarkMode()    
  }

  const CheckGameResult = (tag, targetRow, targetColumn) => {
    isGameOver = Utility.CheckGameOver(gameState, tag, {row: targetRow, col: targetColumn});
    isDraw = Utility.CheckDrawGame(gameState, isGameOver);    
    (isGameOver || isDraw) && Utility.EnableGameControllers([], [], 0, vsMode);
  }

  WelcomeScreen(PlayerSelected)
  InitializeTicTacToe(App);
  let darkModeSlider = Slider(ToggleDarkMode)
  darkModeSlider.setAttribute('id','darkModeSlider')
  document.body.appendChild(darkModeSlider)
};

window.addEventListener('load', app, false);

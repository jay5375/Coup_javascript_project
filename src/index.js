import Player from "./scripts/player";
import Gameview from "./scripts/view";
import Game from "./scripts/game"


document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById("board")
    canvasEl.width = window.outerWidth
    canvasEl.height = window.outerHeight 
    const g = new Game(canvasEl);   
    const v = new Gameview(g, canvasEl); 
    g.button_actions(); 
    v.start()
    g.playerTurn()
});


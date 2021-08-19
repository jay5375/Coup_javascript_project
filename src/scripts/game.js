import player from "./player";
import ai from "./ai";

class Game {
    constructor(canvas){
        this.player = new player; 
        this.ai = new ai;
        this.current_player = this.player;
        this.win = false;
        this.canvas = canvas;
    }
    
    button_actions(){
        document.querySelector("#tax").onclick = function () { 
            this.tax.bind(this)();
        }.bind(this)
        document.querySelector("#steal").onclick = function () { 
            this.steal.bind(this)();
        }.bind(this)
        document.querySelector("#assassinate").onclick = function () { 
            this.assassinate.bind(this)();
        }.bind(this)
        document.querySelector("#block").onclick = function () { 
            this.block.bind(this)();
        }.bind(this)
        document.querySelector("#coup").onclick = function () { 
            this.coup.bind(this)();
        }.bind(this)
        document.querySelector("#allow").onclick = function () { 
            this.allow.bind(this)();
        }.bind(this)
        document.querySelector("#challenge").onclick = function () { 
            this.challenge.bind(this)();
        }.bind(this)
    }

    // rerender cards
    tax(){
        this.disable_actions()
        const decision = this.ai.decision()
        if (decision === 'allow'){
            this.player.coins += 3
            document.querySelector('#test').innerHTML = 'Action allowed: Player gained 3 coins'
            document.querySelector('#dAllow').style.display='block'
        } else {
            if ((this.player.roles[0][0] === 'duke' && this.player.roles[0][1] === true) || (this.player.roles[1][0] === 'duke' && this.player.roles[1][1] === true)){
                this.ai.removeRole()
                document.querySelector('#test').innerHTML = 'Action has been challenged: Ai loses a role'
                document.querySelector('#dAllow').style.display='block'
            } else {
                this.player.removeRole()
                document.querySelector('#test').innerHTML = 'Action has been challenged: Player loses a role'
                document.querySelector('#dAllow').style.display='block'
            }
        }
        this.computerTurn()
    }

    assassinate(){
        this.disable_actions()
        const decision = this.ai.decision()
        if (decision === 'allow'){
            this.ai.removeRole() 
            document.querySelector('#test').innerHTML = 'Action allowed: Assassination successful'
            document.querySelector('#dAllow').style.display='block'
        } else {
            if ((this.player.roles[0][0] === 'assassin' && this.player.roles[0][1] === true) || (this.player.roles[1][0] === 'assassin' && this.player.roles[1][1] === true)) {
                this.ai.removeRole()
                document.querySelector('#test').innerHTML = 'Action has been challenged: Ai loses a role'
                document.querySelector('#dAllow').style.display='block'
            } else {
                this.player.removeRole()
                document.querySelector('#test').innerHTML = 'Action has been challenged: Player loses a role'
                document.querySelector('#dAllow').style.display='block'
            }
        }
        this.computerTurn()
    }

     steal(){
        this.disable_actions()
        const decision = this.ai.decision()
        if (decision === 'allow'){
            if (this.ai.coins === 1){
            this.player.coins += 1 
            this.ai.coins = 0
            document.querySelector('#test').innerHTML = 'Success: Player has stolen 1 coin'
            document.querySelector('#dAllow').style.display='block'
        } else if (this.ai.coins > 0 && this.ai.coins !== 1){
            this.player.coins += 2
            this.ai.coins -= 2
            document.querySelector('#test').innerHTML = 'Success: Player has stolen 2 coins'
            document.querySelector('#dAllow').style.display='block'
        } else if (this.ai.coins <= 0) {
            this.ai.coins = 0
            document.querySelector('#test').innerHTML = 'No coins to steal'
            document.querySelector('#dAllow').style.display='block'
        }}
        else {
            if ((this.player.roles[0][0] === 'captain' && this.player.roles[0][1] === true) || (this.player.roles[1][0] === 'captain' && this.player.roles[1][1] === true)) {
                this.ai.removeRole()
                document.querySelector('#test').innerHTML = 'Action has been challenged: Ai loses a role'
                document.querySelector('#dAllow').style.display='block'
            } else {
                this.player.removeRole()
                document.querySelector('#test').innerHTML = 'Action has been challenged: Player loses a role'
                document.querySelector('#dAllow').style.display='block'
            }   
        }
        this.computerTurn()
    }

    coup(){
        if (this.player.coins >= 10){
            this.player.coins -= 10; 
            this.ai.removeRole();
            document.querySelector('#test').innerHTML = 'Player staged a coup on Ai: Ai loses a role'
            document.querySelector('#dAllow').style.display='block'
            this.computerTurn()
        } else {
            document.querySelector('#test').innerHTML = 'Coup requires 10 coins'
            document.querySelector('#dAllow').style.display='block'
        }
    }

    allow(){
        if (this.aiMove === 'steal' && this.player.coins === 1){
            this.player.coins = 0
            this.ai.coins += 1 
            document.querySelector('#test').innerHTML = 'Action allowed: Ai has stolen 1 coin'
            document.querySelector('#dAllow').style.display='block'
        } else if (this.aiMove === 'steal' && this.player.coins > 1){
            this.player.coins -= 2
            this.ai.coins += 2
            document.querySelector('#test').innerHTML = 'Action allowed: Ai has stolen 2 coin'
            document.querySelector('#dAllow').style.display='block'
        } else if (this.aiMove === 'assassinate'){
            this.player.removeRole()
            document.querySelector('#test').innerHTML = 'Action allowed: Computer assassinated a role'
            document.querySelector('#dAllow').style.display='block'
        } else if (this.aiMove === 'tax'){
            this.ai.coins += 3
            document.querySelector('#test').innerHTML = 'Action allowed: Computer gained 3 coins'
            document.querySelector('#dAllow').style.display='block'
        }
        this.disable_decisons()
        this.allow_actions()
    }

    challenge(){
        if ((this.aiMove === 'steal') && ((this.ai.roles[0][0] === 'captain' && this.ai.roles[0][1] === false) || (this.ai.roles[1][0] === 'captain' && this.ai.roles[1][1] === false))){
            this.player.removeRole()
            document.querySelector('#test').innerHTML = 'Action challenged: Player loses a role'
            document.querySelector('#dAllow').style.display='block'
        } else if ((this.aiMove === 'steal') && (this.ai.roles[0][0] !== 'captain' && this.ai.roles[1][0] !== 'captain')){
            this.ai.removeRole()
            document.querySelector('#test').innerHTML = 'Action challenged: Ai loses a role'
            document.querySelector('#dAllow').style.display='block'
        } else if ((this.aiMove === 'steal') && ((this.ai.roles[0][0] === 'captain' && this.ai.roles[0][1] === true) || (this.ai.roles[1][0] === 'captain' && this.ai.roles[1][1] === true))){
            this.ai.removeRole()
            document.querySelector('#test').innerHTML = 'Action challenged: Ai loses a role'
            document.querySelector('#dAllow').style.display='block'
        } else if ((this.aiMove === 'assassinate') && ((this.ai.roles[0][0] === 'assassin' && this.ai.roles[0][1] === false) || (this.ai.roles[1][0] === 'assassin' && this.ai.roles[1][1] === false))){
            this.player.removeRole()
            document.querySelector('#test').innerHTML = 'Action challenged: Player loses a role'
            document.querySelector('#dAllow').style.display='block'
        } else if ((this.aiMove === 'assassinate') && (this.ai.roles[0][0] !== 'assassin' && this.ai.roles[1][0] !== 'assassin')){
            this.ai.removeRole()
            document.querySelector('#test').innerHTML = 'Action challenged: Ai loses a role'
            document.querySelector('#dAllow').style.display='block'
        } else if ((this.aiMove === 'assassinate') && ((this.ai.roles[0][0] === 'assassin' && this.ai.roles[0][1] === true) || (this.ai.roles[1][0] === 'assassin' && this.ai.roles[1][1] === true))){
            this.ai.removeRole()
            document.querySelector('#test').innerHTML = 'Action challenged: Ai loses a role'
            document.querySelector('#dAllow').style.display='block'
        } else if ((this.aiMove === 'tax') && ((this.ai.roles[0][0] === 'duke' && this.ai.roles[0][1] === false) || (this.ai.roles[1][0] === 'duke' && this.ai.roles[1][1] === false))){
            this.player.removeRole()
            document.querySelector('#test').innerHTML = 'Action challenged: Player loses a role'
            document.querySelector('#dAllow').style.display='block'
        } else if ((this.aiMove === 'tax') && (this.ai.roles[0][0] !== 'duke' && this.ai.roles[1][0] !== 'duke')){
            this.ai.removeRole()
            document.querySelector('#test').innerHTML = 'Action challenged: Ai loses a role'
            document.querySelector('#dAllow').style.display='block'
        } else if ((this.aiMove === 'tax') && ((this.ai.roles[0][0] === 'duke' && this.ai.roles[0][1] === true) || (this.ai.roles[1][0] === 'duke' && this.ai.roles[1][1] === true))){
            this.ai.removeRole()
            document.querySelector('#test').innerHTML = 'Action challenged: Ai loses a role'
            document.querySelector('#dAllow').style.display='block'
        }
        this.disable_decisons()
        this.allow_actions()

    }

    block(){
        const decision = this.ai.decision()
        if (this.aiMove === 'assassinate' && decision === 'allow'){ 
            document.querySelector('#test').innerHTML = 'Action not challenged: Assassination blocked'
            document.querySelector('#dAllow').style.display='block'
        } else if (this.aiMove === 'assassinate' && decision !== 'allow'){
            if ((this.player.roles[0][0] === 'contessa' && this.player.roles[0][1] === true) || (this.player.roles[1][0] === 'contessa' && this.player.roles[1][1] === true)) {
                this.ai.removeRole()
                document.querySelector('#test').innerHTML = 'Action has been challenged: Ai loses a role'
                document.querySelector('#dAllow').style.display='block'
            } else {
                this.player.removeRole()
                document.querySelector('#test').innerHTML = 'Action has been challenged: Player loses a role'
                document.querySelector('#dAllow').style.display='block'
            }
        }
            this.allow_actions()
            this.disable_decisons()
    } 
        
    


    allow_actions(){
        const actions = [document.querySelector('#tax'),
        document.querySelector('#steal'),
        document.querySelector('#assassinate'),
        document.querySelector('#coup')]
        actions.forEach(el => {
            el.disabled = false
        })
    }

    allow_decisions(){
        const decision = [document.querySelector('#allow'),
        document.querySelector('#challenge'),
        document.querySelector('#block')]
        decision.forEach(el => {
            el.disabled = false 
        })
    }

    disable_actions(){
        const actions = [document.querySelector('#tax'),
        document.querySelector('#steal'),
        document.querySelector('#assassinate'),
        document.querySelector('#coup')]
        actions.forEach(el => {
            el.disabled = true 
        })
    }

    disable_decisons(){
        const decision = [document.querySelector('#allow'),
        document.querySelector('#challenge'),
        document.querySelector('#block')]
        decision.forEach(el => {
            el.disabled = true 
        })
    }

    computerTurn(){
        if (this.ai.coins >= 10){
            this.ai.coins -= 10
            document.querySelector('#compMove').innerHTML = `Computer has staged a coup: Player loses a role.`
            document.querySelector('#computerMove').style.display='block'
            this.player.removeRole()
        } else {
            const moves = ['assassinate', 'steal', 'tax']
            const rand = Math.floor(Math.random() * 3)
            this.aiMove = moves[rand]
            document.querySelector('#compMove').innerHTML = `Computer has used ${this.aiMove}`
            document.querySelector('#computerMove').style.display='block'
           
        }
        this.disable_actions(); //issue here
        this.allow_decisions();
    }


    gameOver(){
        if (this.player.roles[0][1] === false && this.player.roles[1][1] === false ){
            this.ai_win = true 
        } else if (this.ai.roles[0][1] === true && this.ai.roles[1][1] === true){
            this.player_win = true 
        }
    }

    newGame(){
        if (this.player_win === true){
            document.querySelector('#test2').innerHTML = 'Player wins'
            document.querySelector('#restart').style.display='block'
            this.restart()
        } else if (this.ai_win === true){
            document.querySelector('#test2').innerHTML = 'Ai wins'
            document.querySelector('#restart').style.display='block'
            this.restart()
        }
    }

    restart(){
        document.querySelector('#restart2').onclick = function (){
            document.location.href = ''
        }.bind(this)
    }

    playerTurn(){
        document.querySelector('#playerMove').style.display='block' 
    }

    
}

export default Game;
window.game = Game;

//fix modal
//display win
//game over restart
//fix navbar
import player from "./player";
import Board from "./board";
import ai from "./ai";

class Game {
    constructor(canvas){
        this.player = new player; 
        this.ai = new ai;
        this.current_player = this.player;
        this.win = false;
        this.canvas = canvas;
        this.game_over = false 
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
            console.log('+3')
        } else {
            if ((this.player.roles[0][0] === 'duke' && this.player.roles[0][1] === true) || (this.player.roles[1][0] === 'duke' && this.player.roles[1][1] === true)){
                this.ai.removeRole()
                console.log('ai loses card')
            } else {
                this.player.removeRole()
                console.log('player loses card')
            }
        }
         setTimeout(this.allow_actions, 2000)
    }

    assassinate(){
        this.disable_actions()
        const decision = this.ai.decision()
        if (decision === 'allow'){
            this.ai.removeRole() 
            console.log('Ai loses card')
        } else {
            if ((this.player.roles[0][0] === 'assassin' && this.player.roles[0][1] === true) || (this.player.roles[1][0] === 'assassin' && this.player.roles[1][1] === true)) {
                this.ai.removeRole()
                console.log('Ai loses card2')
            } else {
                this.player.removeRole()
                console.log('Player loses card')
            }
        }

        setTimeout(this.allow_actions, 2000)
    }

     steal(){
        this.disable_actions()
        const decision = this.ai.decision()
        if (decision === 'allow'){
            if (this.ai.coins === 1){
            this.player.coins += 1 
            this.ai.coins = 0
            console.log('stolen') 
        } else if (this.ai.coins > 0 && this.ai.coins !== 1){
            this.player.coins += 2
            this.ai.coins -= 2
            console.log('stolen2')
        } else if (this.ai.coins <= 0) {
            this.ai.coins = 0
            console.log('0 coins')
        }}
        else {
            if ((this.player.roles[0][0] === 'captain' && this.player.roles[0][1] === true) || (this.player.roles[1][0] === 'captain' && this.player.roles[1][1] === true)) {
                this.ai.removeRole()
            } else {
                this.player.removeRole()
            }
        }
        
        setTimeout(this.allow_actions, 2000)
    }

    coup(){
        if (this.player.coins >= 10){
            this.player.coins -= 10; 
            this.ai.removeRole();
        }
    }

    allow(){
        if (this.aiMove === 'steal' && this.player.coins === 1){
            this.player.coins = 0
            this.ai.coins += 1 
        } else if (this.aiMove === 'steal' && this.player.coins > 1){
            this.player.coins -= 2
            this.ai.coins += 2
        } else if (this.aiMove === 'assassinate'){
            this.player.removeRole()
        } else if (this.aiMove === 'tax'){
            this.ai.coins += 3
        }
        this.disable_decisons()
    }

    challenge(){
        if ((this.aiMove === 'steal') && (this.ai.roles[0][0] === 'captain' || this.ai.roles[1][0] === 'captain')){
            this.player.removeRole()
        } else if ((this.aiMove === 'steal') && (this.ai.roles[0][0] !== 'captain' && this.ai.roles[1][0] !== 'captain')){
            this.ai.removeRole()
        } else if ((this.aiMove === 'assassinate') && (this.ai.roles[0][0] === 'assassin' || this.ai.roles[1][0] === 'assassin')){
            this.player.removeRole()
        } else if ((this.aiMove === 'assassinate') && (this.ai.roles[0][0] !== 'assassin' && this.ai.roles[1][0] !== 'assassin')){
            this.ai.removeRole()
        } else if ((this.aiMove === 'tax') && (this.ai.roles[0][0] === 'duke' || this.ai.roles[1][0] === 'duke')){
            this.player.removeRole()
        } else if ((this.aiMove === 'tax') && (this.ai.roles[0][0] !== 'duke' && this.ai.roles[1][0] !== 'duke')){
            this.ai.removeRole()
        } 
        this.disable_decisons()
    }

    block(){
        if ((this.aiMove === 'assassinate') && ((this.player.roles[0][0] === 'contessa' && this.player.roles[0][1] === true) || (this.player.roles[1][0] === 'contessa' && this.player.roles[1][1] === true))){
            alert('blocked')
        }
        this.allow_actions()
        this.disable_decisons()
    }


    allow_actions(){
        const actions = [document.querySelector('#tax'),
        document.querySelector('#steal'),
        document.querySelector('#assassinate')]
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
        document.querySelector('#assassinate')]
        actions.forEach(el => {
            el.disabled = true 
        })
    }

    disable_decisons(){
        const decision = [document.querySelector('#allow'),
        document.querySelector('#challenge')]
        decision.forEach(el => {
            el.disabled = true 
        })
    }

    computerTurn(){
        const moves = ['assassinate', 'steal', 'tax']
        const rand = Math.floor(Math.random() * 3)
        alert(`Computer used ${moves[rand]}`)
        this.aiMove = `${moves[rand]}`
        this.disable_actions();
        this.allow_decisions();
        setTimeout(this.allow_actions, 5000)
    }

    play(){
        while(!this.game_over){
            this.playerTurn()
            setTimeout(this.computerTurn(), 10000)
            this.win();
        }
    }

    win(){
        if (this.player.roles[0][1] === false && this.player.roles[1][1] === false ){
            this.game_over = true 
            console.log('Ai wins')
        } else if (this.ai.roles[0][1] === true && this.ai.roles[1][1] === true){
            this.game_over = true 
            console.log('Player wins')
        }
    }

    playerTurn(){
        document.querySelector('#playerMove').style.display='block' 
    }
    
}

export default Game;
window.game = Game;

//fix modal
//implement turns 
//allow challenge block in response
//display turns 
//display win
//restart 
//fix player remove
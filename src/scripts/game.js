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
    }

    switchTurns(){
        if (this.current_player !== this.player){
            this.current_player = this.ai; 
        } else {
            this.current_player = this.player;
        }
    }


    win(){
        if (this.player.roles[0][1] === false && this.player.roles[1][1] === false ){
            console.log('Ai wins')
        } else if (this.ai.roles[0][1] === true && this.ai.roles[1][1] === true){
            console.log('Player wins')
        }
    }

    turn(){
        this.current_player
    }
    // rerender cards
    tax(){
        const others = document.querySelectorAll('button')
        others.forEach(el => {
            el.disabled = true 
        })
        const decision = this.ai.decision()
        if (decision === 'allow'){
            this.player.coins += 3
            console.log('+3')
           
        } else {
            if (this.player.roles[0].includes('duke') || this.player.roles[1].includes('duke')){
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
        const other = document.querySelectorAll('button')
        other.forEach(el => {
            el.disabled = true 
        })
        const decision = this.ai.decision()
        if (decision === 'allow'){
            this.ai.removeRole() 
            console.log('Ai loses card')
        } else {
            if (this.player.roles[0].includes('assassin') || this.player.roles[1].includes('assassin')) {
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
        const other = document.querySelectorAll('button')
        other.forEach(el => {
            el.disabled = true 
        })
        const decision = this.ai.decision()
        if (decision === 'allow'){
            if (this.ai.coins === 1)
            this.player.coins += 1 
            this.ai.coins -= 1
            this.ai.coins = 0
            console.log('stolen') 
        } else if (this.ai.coins > 0){
            this.player.coins += 2
            this.ai.coins -= 2
            console.log('stolen2')
        } else if (this.ai.coins <= 0) {
            this.ai.coins = 0
            console.log('0 coins')
        }  else {
            if (this.player.roles[0].includes('captain') || this.player.roles[1].includes('captain')) {
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

    //  block(){
    //     const other = document.querySelectorAll('button')
    //     other.forEach(el => {
    //         el.disabled = true 
    //     })
    //     const decision = this.ai.decision()
    //     if (decision === 'allow'){
             
    //     } else {
    //         if (this.player.roles[0].includes('assassin') || this.player.roles[1].includes('assassin')) {
    //             this.ai.removeRole()
    //         } else {
    //             this.player.removeRole()
    //         }
    //     }

    //     setTimeout(this.allow_actions, 2000)
    // }

    start(){
        
        this.switchTurns()
    }

    allow_actions(){
        const actions = document.querySelectorAll('button')
        actions.forEach(el => {
            el.disabled = false
        })
    }

    computer_assassinate(){

    }

    computer_turn(){
        const rand = Math.floor(Math.random() * 3)
        if (rand === 1){
            this.assassinate()
        }
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
// fix assassinate
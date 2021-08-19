
class GameView {
    constructor(game, canvas) {
       this.game = game 
       this.canvas = canvas
       this.ctx = this.canvas.getContext('2d')
    }

    start(){
        //functions in succession
        this.animating = true
        this.initializeEntities()
        this.animation = function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            if (this.animating === true){
                this.renderEntities()
                this.game.gameOver() 
                this.game.newGame()
                this.interval = window.requestAnimationFrame(this.animation)
                
            }
        }.bind(this)
        window.requestAnimationFrame(this.animation)
    }

     initializeEntities(){
        this.setupCard1();
        this.setupCard2();
        this.setupCoins();
        this.setupAiCard();
        this.setupAiCard2();
        this.setupAiCoins();
    }

    renderEntities(){
        this.setupCard1();
        this.setupCard2();
        this.setupCoins();
        this.setupAiCard();
        this.setupAiCard2();
        this.setupAiCoins();
        this.renderCoinPlayer();
        this.renderAiCoin();
        
    }

    render_card1(){
        this.ctx.drawImage(this.card, this.canvas.width * .35, 425)
    }
   
    setupCard1(){
        const role = this.game.player.roles
        const first = role[0][0]
        const first_boolean = role[0][1]
        if (first_boolean === true){
            this.card = new Image();
            this.card.src = `./assets/${first}.png`
            this.ctx.drawImage(this.card, this.canvas.width * .37, this.canvas.height * .38)
     
        } else if (first_boolean === false) {
            this.card = new Image();
            this.card.src = './assets/cardback.png'
            this.ctx.drawImage(this.card, this.canvas.width * .37, this.canvas.height * .38)
        }
    }

    setupCard2(){
        const role = this.game.player.roles
        const first = role[1][0]
        const first_boolean = role[1][1]
        if (first_boolean === true){
            this.card2 = new Image();
            this.card2.src = `./assets/${first}.png`
            this.ctx.drawImage(this.card2, this.canvas.width * .52, this.canvas.height * .38) 
        } else if (first_boolean === false) {
            this.card2 = new Image();
            this.card2.src = './assets/cardback.png'
            this.ctx.drawImage(this.card2, this.canvas.width * .52, this.canvas.height * .38)
        }
    }

    setupAiCard(){
        const role = this.game.ai.roles
        const first = role[0][0]
        const first_boolean = role[0][1]
        if (first_boolean === true){
            this.aicard = new Image();
            this.aicard.src = `./assets/${first}.png`
            this.ctx.drawImage(this.aicard, this.canvas.width * .37, this.canvas.height * .02)
        } else if (first_boolean === false) {
            this.aicard = new Image();
            this.aicard.src = './assets/cardback.png'
            this.ctx.drawImage(this.aicard, this.canvas.width * .37, this.canvas.height * .02)
        }
    }

    setupAiCard2(){
        const role = this.game.ai.roles
        const first = role[1][0]
        const first_boolean = role[1][1]
        if (first_boolean === true){
            this.aicard2 = new Image();
            this.aicard2.src = `./assets/${first}.png`
            this.ctx.drawImage(this.aicard2, this.canvas.width * .52, this.canvas.height * .02)
            
        } else if (first_boolean === false) {
            this.aicard2 = new Image();
            this.aicard2.src = './assets/cardback.png'
            this.ctx.drawImage(this.aicard2, this.canvas.width * .52, this.canvas.height * .02)
            
        }
    }

    setupCoins(){
        this.coins = new Image();
        this.coins.src = './assets/coins.png'
        this.ctx.drawImage(this.coins, this.canvas.width * .2, this.canvas.height * .55)
        
    }

     setupAiCoins(){
        this.coins = new Image();
        this.coins.src = './assets/coins.png'
        this.ctx.drawImage(this.coins, this.canvas.width * .2, this.canvas.height * .05)
        
    }

     renderAiCoin(){
        this.ctx.textAlign = 'left'
        this.ctx.textBaseline = 'top'
        this.ctx.fillStyle = 'RED'
        this.ctx.strokeStyle = 'BLACK'
        this.ctx.font = 50 + 'px Georgia'
        this.ctx.fillText(this.game.ai.coins, this.canvas.width * .2, this.canvas.height * .05)
        this.ctx.strokeText(this.game.ai.coins, this.canvas.width * .2, this.canvas.height * .05)
    }

    renderCoinPlayer(){
        this.ctx.textAlign = 'left'
        this.ctx.textBaseline = 'bottom'
        this.ctx.fillStyle = 'RED'
        this.ctx.strokeStyle = 'BLACK'
        this.ctx.font = 50 + 'px Georgia'
        this.ctx.fillText(this.game.player.coins, this.canvas.width * .2, this.canvas.height * .60)
        this.ctx.strokeText(this.game.player.coins, 300, 650)
    }   


    
}


export default GameView 
window.gameView = GameView; 

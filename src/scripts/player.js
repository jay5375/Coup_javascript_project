
class Player {
    
    constructor(){
        this.roles = [];
        this.coins = 1; 
        this.setRoles();
        
    }
    
    static getRoles(){
        return ['duke', 'captain', 'assassin', 'contessa'] 
    }

    action(arg){
        console.log('here')
    }

    setRoles(){
        this.roles.push([Player.getRoles()[Math.floor(Math.random() * Player.getRoles().length)], true])
        this.roles.push([Player.getRoles()[Math.floor(Math.random() * Player.getRoles().length)], true])
    }


    // add event listener maybe?
    removeRole(){
        const rand = Math.floor(Math.random() * 2)
        if (this.roles[0][1] === true && this.roles[1][1] === true){
            this.roles[rand][1] = false
        } else if (this.roles[0][1] === false){
            this.roles[1][1] = false
        } else if (this.roles[1][1] === false){
            this.roles[0][1] = false
        }
    }

    allow_actions(){
        const buttons = document.querySelectorAll('button')
        buttons.forEach(el => {
            el.disabled = false 
        })
    }


}

window.player = Player
export default Player 
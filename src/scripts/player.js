
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
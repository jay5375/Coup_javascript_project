
class Player {
    
    constructor(){
        this.roles = [];
        this.coins = 1; 
        this.setRoles();
        
    }
    
    static getRoles(){
        return ['duke', 'captain', 'assassin', 'contessa'] 
    }

    setRoles(){
        this.roles.push([Player.getRoles()[Math.floor(Math.random() * Player.getRoles().length)], true])
        this.roles.push([Player.getRoles()[Math.floor(Math.random() * Player.getRoles().length)], true])
    }

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

}

window.player = Player
export default Player 
class Ai {
    constructor(){
        this.roles = []
        this.coins = 1
        this.setRoles()
    }

    static getRoles(){
        return ['duke', 'captain', 'assassin', 'contessa'] 
    }

    setRoles(){
        this.roles.push([Ai.getRoles()[Math.floor(Math.random() * Ai.getRoles().length)], false])
        this.roles.push([Ai.getRoles()[Math.floor(Math.random() * Ai.getRoles().length)], false])
    }

    decision(){
        const rand = Math.floor(Math.random() * 2)
        console.log(rand)
        if (rand === 0) {
            return 'allow'
        } else if (rand === 1){
            return 'challenge'
        }
    }

    removeRole(){
        const rand = Math.floor(Math.random() * 2)
        if (this.roles[0][1] === true){
            this.roles[1][1] === true 
        } else if (this.roles[1][1] === true){
            this.roles[0][1] === true 
        }
        this.roles[rand][1] === true
    }
}

export default Ai;
// window.ai = Ai;
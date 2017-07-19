app.models.Player = (function(){
    var Observable = app.libs.Observable;
    function Player(id, name, team, pos) {
        Observable.call(this);
        this.setId(id)
            .setName(name)
            .setTeam(team)
            .setAnimator()
            .animator.addSprites(
                this.team.sprite,
                new Sprite("smoke", "../../image")
                );        
        this.initPos(pos);
    }
    Player.prototype = Object.create(Observable.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.setTeam = function(team){
        team.addMember(this);
        return this;
    }

    Player.prototype.setId = function(id){
        this.id = id;
        return this;
    }

    Player.prototype.setSocket = function(socket){
        this.socket = socket;
        return this;
    }

    Player.prototype.initPos = function(pos) {
        this.setPos(pos)
            .prevPos = this.pos;
        return this;
    }
    
    Player.prototype.setPos = function(varPos){
        this.pos.x = varPos.x || this.pos.x;
        this.pos.y = varPos.y || this.pos.y;
        return this;
    }
    
    Player.prototype.setAnimator = function(){
        this.animator = new Animator();
        return this;
    }

    return Player;
}).call(this);
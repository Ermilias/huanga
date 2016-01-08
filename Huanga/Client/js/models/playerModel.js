var DEPLACEMENT_DURATION = 6;
var ANIMATION_DURATION = 1;

app.models.PlayerModel = (function(){
	var Observable = app.libs.Observable;
	function PlayerModel(){
		Observable.call(this);
		this.id;
        this.name = name;
		//this.socket;
		this.team = {};
		this.model = {};
		this.pos = {x: 0,y: 0};
		this.prevPos = {x: 0,y: 0};
		this.direction = {bottom: 0, top: 1 , left: 2, right: 3};
		this.look =  Math.floor(Math.random() * 4);
		this.ref = {height: 0, width: 0};
		this.smokeRef = {height: 0, width: 0};
		this.circleRef = {height: 0, width: 0};
		this.estateAnimation = -1;
		this.smokeEstateAnimation = -1;
	}
	PlayerModel.prototype = Object.create(Observable.prototype);
	PlayerModel.prototype.constructor = PlayerModel;

	PlayerModel.prototype.setTeam = function(teamId){
		teams[teamId].addMember(this);
		return this;
	}

	PlayerModel.prototype.setId = function(id){
		this.id = id;
		return this;
	}

	PlayerModel.prototype.setSocket = function(socket){
		this.socket = socket;
		return this;
	}
	PlayerModel.prototype.setPos = function(varPos){
		this.pos.x = varPos.x || this.pos.x;
		this.pos.y = varPos.y || this.pos.y;
		return this;
	}
	PlayerModel.prototype.setDirection = function(direction){ // {top:true}
		this.look = direction;
	}
	PlayerModel.prototype.setModel = function(model){
		this.model = model;	
		return this;
	}

	PlayerModel.prototype.isMoveCompleted = function(finalPos,dir){
		
		this.deplacer(dir);
		if (finalPos !== this.pos){ // in case off lag so pos is always accurate
			this.setPos(finalPos);
		}
	}
	
	PlayerModel.prototype.deplacer = function(direction) {
		// On ne peut pas se déplacer si un mouvement est déjà en cours !
		if(this.estateAnimation !== -1) {
			return false;
		}

		// On change la direction du personnage
		this.look = direction;
			
		var prochaineCase = this.getCoordonneesAdjacentes(this.look);
		
		if (prochaineCase === false){
			return false;
		}
		// On commence l'animation
		this.estateAnimation = 1;
			
		// On effectue le déplacement
		this.pos.x = prochaineCase.x;
		this.pos.y = prochaineCase.y;
		//console.log(socket);
		socket.emit('updatePos', {id: this.id ,newPos: prochaineCase, dir: direction});
		return true;
	}

	PlayerModel.prototype.drawChar= function(){
		var frame = 0;
		var moveX = 0;
		var	moveY = 0;

		if(this.estateAnimation >= DEPLACEMENT_DURATION) {
			this.estateAnimation = -1;
		} else if(this.estateAnimation >= 0) {
			frame = Math.floor(this.estateAnimation / ANIMATION_DURATION);
			if(frame > 3) {
				frame %= 6;
			}

			var pixelsToGo = this.model.resolution - (this.model.resolution * (this.estateAnimation / DEPLACEMENT_DURATION));

			if(this.look === this.direction.top) {
				moveY = pixelsToGo;
			} else if(this.look === this.direction.bottom) {
				moveY = -pixelsToGo;
			} else if(this.look === this.direction.left) {
				moveX = pixelsToGo;
			} else if(this.look === this.direction.right) {
				moveX = -pixelsToGo;
			}
			this.estateAnimation++;
		}

		var image = new Image();
		image.src = this.team.image;
		//console.log(this.model.player);
		if (this.id === this.model.player.id){
			var circle = new Image();
			circle.src = Pics.paths.effects + Pics.effects.circle + this.model.resolution + '.png';

			this.circleRef.height = circle.height;
			this.circleRef.width = circle.width;
			this.model.ctx.drawImage(
				circle,
				0, 0,
				this.circleRef.width, this.circleRef.height,
				(this.pos.x % 16 * this.circleRef.width) + moveX, 
				(this.pos.y % 16 * this.circleRef.height) + moveY,
				this.circleRef.width, this.circleRef.height
			);
		}
		this.ref.height = image.height / 4;
		this.ref.width = image.width / 6;
		this.model.ctx.drawImage(
			image,
			this.ref.width * frame, this.look * this.ref.height,
			this.ref.width, this.ref.height,
			(this.pos.x % 16 * this.ref.width) + moveX, 
			(this.pos.y % 16 * this.ref.height) + moveY,
			this.ref.width, this.ref.height
		);
	}

	PlayerModel.prototype.smokeScreen = function(){
	var frame = 0;
	var smokeImage = new Image();
		smokeImage.src = Pics.paths.effects + Pics.effects.smoke + this.model.resolution + '.png';
		//console.log(smokeImage.src);
		//console.log(smokeImage.height,smokeImage.width/12);
		this.smokeRef.height = smokeImage.height;
		this.smokeRef.width = smokeImage.width / 12;
		if(this.smokeEstateAnimation >= 12) {
			this.smokeEstateAnimation = -1;
			this.isEaten = false;
			if (socket.id === this.id){
				document.getElementById('playerTeam').setAttribute('src','./image/teams/Chara' + this.team.name.charAt(0).toUpperCase() + this.team.name.substring(1) + '.png');
			}
			return;
		}
		if (this.smokeEstateAnimation === -1) {
			this.smokeEstateAnimation = 0;
		};
		if(this.smokeEstateAnimation >= 0) {
			frame = Math.floor(this.smokeEstateAnimation / 1);
			if(frame > 6) {
				frame %= 12;
			}
			this.smokeEstateAnimation++;
			console.log(this.smokeEstateAnimation);
		}
		this.model.ctx.drawImage(
		smokeImage,
		this.smokeRef.width * frame, 0,
		this.smokeRef.width, this.smokeRef.height,
		this.pos.x % 16 * this.smokeRef.width,
		this.pos.y % 16 * this.smokeRef.height,
		this.smokeRef.width, this.smokeRef.height);
}



	PlayerModel.prototype.drawCurrentArena = function(player){
		var img = {x: (Math.floor(player.pos.y / 16)),
				   y: (Math.floor(player.pos.x / 16))};
		player.model.canvasBg.src = player.model.canvasBgArray[img.x][img.y];
	}
	

	PlayerModel.prototype.getCoordonneesAdjacentes = function(direction) {
		switch(direction) {
			case this.direction.bottom : 
				if (this.model.map.checkCol({x: this.pos.x, y: (this.pos.y + 1)})){
					this.prevPos.y = this.pos.y;
					this.pos.y++;
				}else{
					return false;
				}
				break;
			case this.direction.left : 
				if (this.model.map.checkCol({x: (this.pos.x - 1), y: this.pos.y})){
					this.prevPos.x = this.pos.x;
					this.pos.x--;
				}else{
					return false;
				}
				break;
			case this.direction.right: 
				if (this.model.map.checkCol({x: (this.pos.x + 1), y: this.pos.y})){
					this.prevPos.x = this.pos.x;
					this.pos.x++;
				}else{
					return false;
				}
				break;
			case this.direction.top : 
				if (this.model.map.checkCol({x: this.pos.x, y: (this.pos.y - 1)})){
					this.prevPos.y = this.pos.y;
					this.pos.y--;
				}else{
					return false;
				}
				break;
		}
		this.stillOnArena();
		return this.pos;
	}
	
	PlayerModel.prototype.isOnCurrentArena = function(pos){
		var mapPos = {x: (Math.floor(this.pos.y / 16)),
				   y: (Math.floor(this.pos.x / 16))};
		var otherMapPos = {x: (Math.floor(pos.y / 16)),
				   y: (Math.floor(pos.x / 16))};
			if (mapPos.x === otherMapPos.x && mapPos.y === otherMapPos.y){
				return true;
			}else{
				return false;
			}
	}

	PlayerModel.prototype.stillOnArena = function(){
		if (this.isOnCurrentArena(this.prevPos) === false){
			this.drawCurrentArena(this);
		}
	}



	return PlayerModel;
}).call(this);
var DEPLACEMENT_DURATION = 6;
var ANIMATION_DURATION = 1;

app.models.PlayerModel = (function(){
	var Observable = app.libs.Observable;
	function PlayerModel(){
		Observable.call(this);
		this.id = '';
		this.socket;
		this.teamPic = ['./image/fire_32.png','./image/water_32.png','./image/earth_32.png'];
		this.rand = Math.floor(Math.random() * this.teamPic.length);
		this.team = {};
		this.model = {};
		this.pos = {x: 0,y: 0};
		this.prevPos = {x: 0,y: 0};
		this.direction = {bottom: 0, top: 1 , left: 2, right: 3};
		this.look =  Math.floor(Math.random() * 4);
		this.ref = {height: 0, width: 0};
		this.estateAnimation = -1;
	}
	PlayerModel.prototype = Object.create(Observable.prototype);
	PlayerModel.prototype.constructor = PlayerModel;

	PlayerModel.prototype.setTeam = function(teamId){
		this.team = {image : this.teamPic[teamId]};;
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
		socket.emit('updatePos', {newPos: prochaineCase, dir: direction});
		// On commence l'animation
		this.estateAnimation = 1;
			
		// On effectue le déplacement
		this.pos.x = prochaineCase.x;
		this.pos.y = prochaineCase.y;
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

			var pixelsToGo = 32 - (32 * (this.estateAnimation / DEPLACEMENT_DURATION));

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
		this.ref.height = image.height / 4;
		this.ref.width = image.width / 6;
		var tile = new Image();
		this.model.ctx.drawImage(
			image,
			this.ref.width * frame, this.look * this.ref.height,
			this.ref.width, this.ref.height,
			(this.pos.x % 16 * 32) - (this.ref.width / 2) + 16 + moveX, (this.pos.y % 16 * 32) - this.ref.height + 32 + moveY,
			this.ref.width, this.ref.height
		);
		var img = {x: (Math.floor(this.pos.y / 16)),
				   y: (Math.floor(this.pos.x / 16))};
		this.model.canvasBg.src = this.model.canvasBgArray[img.x][img.y];
	}

	PlayerModel.prototype.getCoordonneesAdjacentes = function(direction) {
	switch(direction) {
		case this.direction.bottom : 
			if (this.model.map.checkCol({x: this.pos.x, y: (this.pos.y + 1)})){
				this.pos.y++;
			}else{
				return false;
			}
			break;
		case this.direction.left : 
			if (this.model.map.checkCol({x: (this.pos.x - 1), y: this.pos.y})){
				this.pos.x--;
			}else{
				return false;
			}
			break;
		case this.direction.right: 
			if (this.model.map.checkCol({x: (this.pos.x + 1), y: this.pos.y})){
				this.pos.x++;
			}else{
				return false;
			}
			break;
		case this.direction.top : 
			if (this.model.map.checkCol({x: this.pos.x, y: (this.pos.y - 1)})){
				this.pos.y--;
			}else{
				return false;
			}
			break;
	}
	return this.pos;
}


	return PlayerModel;
}).call(this);
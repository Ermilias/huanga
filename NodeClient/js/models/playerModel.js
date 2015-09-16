var DEPLACEMENT_DURATION = 6;
var ANIMATION_DURATION = 1;


app.models.PlayerModel = (function(){
	function PlayerModel(){
		this.id = '';
		this.teamPic = ['./image/fire.png','./image/water.png','./image/earth.png'];
		this.rand = Math.floor(Math.random() * this.teamPic.length);
		this.team = {image : this.teamPic[this.rand]};
		this.pos = {x: 0,y: 0};
		this.prevPos = {x: 0,y: 0};
		this.direction = {top: 0,  left: 1, bottom: 2, right: 3};
		this.look = 2;
		this.ref = {height: 0, width: 0};
		this.estateAnimation = -1;
	}

	PlayerModel.prototype.setTeam = function(team){
		this.team = team;
		return this;
	}
	PlayerModel.prototype.setPos = function(pos){
		this.pos.x = pos.x || this.pos.x;
		this.pos.y = pos.y || this.pos.y;
		return this;
	}
	PlayerModel.prototype.setDirection = function(direction){ // {top:true}
		this.look = direction;
	}
	PlayerModel.prototype.setView = function(view){
		this.view = view;
		this.view.player = this;
	}
	PlayerModel.prototype.updateViewMap = function(view){
		view.player = this;
	}
	
	PlayerModel.prototype.deplacer = function(direction) {
		// On ne peut pas se déplacer si un mouvement est déjà en cours !
		if(this.estateAnimation !== -1) {
			return false;
		}

		// On change la direction du personnage
		this.look = direction;
			
		var prochaineCase = this.getCoordonneesAdjacentes(this.look);
		
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
		if (this.pos.x === 0 && this.pos.y === 0){
			this.pos = this.view.randPos();
		}this.view.ctx.drawImage(
			image,
			this.ref.width * frame, this.look * this.ref.height,
			this.ref.width, this.ref.height,
			(this.pos.x % 16 * 32) - (this.ref.width / 2) + 16 + moveX, (this.pos.y % 16 * 32) - this.ref.height + 32 + moveY,
			this.ref.width, this.ref.height
		);
		var img = {x: (Math.floor(this.pos.y / 16)),
				   y: (Math.floor(this.pos.x / 16))};
				   console.log(img.x,img.y);//,this.view.canvasBgArray[img.x][img.y]);
//console.log(this.view.canvasBgArray);
		this.view.canvasBg.src = this.view.canvasBgArray[img.x][img.y];//setAttribute('style','top: ' + (-img.x) + 'px; left: ' + (-img.y) + 'px;');
	}

	PlayerModel.prototype.getCoordonneesAdjacentes = function(direction) {
	switch(direction) {
		case this.direction.bottom : 
			this.prevPos.y = this.pos.y;
			this.pos.y++;
			break;
		case this.direction.left : 
			this.prevPos.x = this.pos.x;
			this.pos.x--;
			break;
		case this.direction.right: 
			this.prevPos.x = this.pos.x;
			this.pos.x++;
			break;
		case this.direction.top : 
			this.prevPos.y = this.pos.y;
			this.pos.y--;
			break;
	}
	return this.pos;
}


	return PlayerModel;
}).call(this);
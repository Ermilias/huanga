var ANIMATION_DURATION = 1;
var DEPLACEMENT_DURATION = 6;

app.models.PlayerModel = (function(){
	function PlayerModel(){
		this.id = '';
		this.team = {image : "./image/earth.png"};
		this.pos = {x: 0,y: 0};
		this.direction = {top: false, bottom: true, left: false, right: false};
		this.look = 2;
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
		this.direction.top = direction.top || false;
		this.direction.bottom = direction.bottom || false;
		this.direction.left = direction.left || false;
		this.direction.right = direction.right || false;
	}
	PlayerModel.prototype.setView = function(view){
		this.view = view;
		this.view.player = this;
	}
	PlayerModel.prototype.updateViewMap = function(view){
		view.player = this;
	}
	
	PlayerModel.prototype.deplacer = function(direction, map) {
		// On ne peut pas se déplacer si un mouvement est déjà en cours !
		console.log(deplacer)
		if(this.estateAnimation >= 0) {
			return false;
		}

		// On change la direction du personnage
		this.look = direction;
			
		// On vérifie que la case demandée est bien située dans la carte
		var prochaineCase = this.getCoordonneesAdjacentes(direction);
		//if(prochaineCase.x < 0 || prochaineCase.y < 0 || prochaineCase.x >= map.getLargeur() || prochaineCase.y >= map.getHauteur()) {
			// On retourne un booléen indiquant que le déplacement ne s'est pas fait, 
			// Ça ne coute pas cher et ca peut toujours servir
		// 	return false;
		// }
		
		// On commence l'animation
		this.estateAnimation = 1;
			
		// On effectue le déplacement
		this.pos.x = prochaineCase.x;
		this.pos.y = prochaineCase.y;
			this.view.drawChar();
		return true;
	}

	PlayerModel.prototype.getCoordonneesAdjacentes = function(direction) {
	var coord = {'x' : this.pos.x, 'y' : this.pos.y};
	switch(direction) {
		case direction.bottom : 
			coord.y++;
			break;
		case direction.left : 
			coord.x--;
			break;
		case direction.right: 
			coord.x++;
			break;
		case direction.top : 
			coord.y--;
			break;
	}
	return coord;
}


	return PlayerModel;
}).call(this);
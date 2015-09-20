app.controllers.GlobalController = (function(){
	'use strict';

	function GlobalController(model, view){
		this.model = model;
		this.view = view;
	}

	GlobalController.prototype.update = function(event){
		var on = event.on ? event.on.charAt(0).toUpperCase() + event.on.substring(1) : "";
		var cmd = event.cmd ? event.cmd.split('.')[0] : "";
		var val = event.val ? event.val : {};
		//val.id = event.cmd ? event.cmd.split('.')[1] : "";
		var fn = (cmd + on + 'Action');
		console.log(fn);
		if (typeof this[fn] === 'function'){
			this[fn](val);
		}
	}
	GlobalController.prototype.documentDOMContentLoadedAction = function(){
		//DO SOMETHING...
		this.model.loaded();
	}
	GlobalController.prototype.gameMapClickAction = function(){
		//DO SOMETHING...
		this.model.loaded();
	}
	
	GlobalController.prototype.upButtonTouchstartAction = function(){
		this.model.changeImage('upButton', 'pressed');
		this.windowKeyupAction(38);
	}
	
	GlobalController.prototype.upButtonTouchendAction = function(){
		this.model.changeImage('upButton', 'released');
	}
	
	GlobalController.prototype.downButtonTouchstartAction = function(){
		this.model.changeImage('downButton', 'pressed');
		this.windowKeyupAction(40);

	}
	
	GlobalController.prototype.downButtonTouchendAction = function(){
		this.model.changeImage('downButton', 'released');

	}
	
	GlobalController.prototype.leftButtonTouchstartAction = function(){
		this.model.changeImage('leftButton', 'pressed');
		this.windowKeyupAction(37);

	}
	
	GlobalController.prototype.leftButtonTouchendAction = function(){
		this.model.changeImage('leftButton', 'released');
	}
	
	GlobalController.prototype.rightButtonTouchstartAction = function(){
		this.model.changeImage('rightButton', 'pressed');
		this.windowKeyupAction(39);

	}
	
	GlobalController.prototype.rightButtonTouchendAction = function(){
		this.model.changeImage('rightButton', 'released');
	}
	GlobalController.prototype.bodyKeyupAction = function(val) {
		// On récupère le code de la touche
		switch(val.key) {
			case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
				this.model.deplacer('top');
				break;
			case 40 : case 115 : case 83 : // Flèche bas, s, S
				this.model.deplacer('bottom');
				break;
			case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
				this.model.deplacer('left');
				break;
			case 39 : case 100 : case 68 : // Flèche droite, d, D
				this.model.deplacer('right');
				break;
			default : 
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
		
		return false;
	}

	return GlobalController;
}).call(this);
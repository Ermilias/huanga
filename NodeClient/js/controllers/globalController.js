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
		val.id = event.cmd ? event.cmd.split('.')[1] : "";
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
	}
	
	GlobalController.prototype.upButtonTouchendAction = function(){
		this.model.changeImage('upButton', 'released');
	}
	
	GlobalController.prototype.downButtonTouchstartAction = function(){
		this.model.changeImage('downButton', 'pressed');
	}
	
	GlobalController.prototype.downButtonTouchendAction = function(){
		this.model.changeImage('downButton', 'released');
	}
	
	GlobalController.prototype.leftButtonTouchstartAction = function(){
		this.model.changeImage('leftButton', 'pressed');
	}
	
	GlobalController.prototype.leftButtonTouchendAction = function(){
		this.model.changeImage('leftButton', 'released');
	}
	
	GlobalController.prototype.rightButtonTouchstartAction = function(){
		this.model.changeImage('rightButton', 'pressed');
	}
	
	GlobalController.prototype.rightButtonTouchendAction = function(){
		this.model.changeImage('rightButton', 'released');
	}

	return GlobalController;
}).call(this);
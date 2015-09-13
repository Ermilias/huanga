app.models.GlobalModel = (function(){
	var Observable = app.libs.Observable;
	function GlobalModel(){
		Observable.call(this);
		this.playerId = '';
		this.players = {};

	}
	GlobalModel.prototype = Object.create(Observable.prototype);
	GlobalModel.prototype.constructor = GlobalModel;

	GlobalModel.prototype.eat = function(){
		this.notify({cmd:''});
	}
	
	GlobalModel.prototype.changeImage = function(buttonId, state){
		this.notify({cmd:'changeState', val:{buttonId:buttonId, state:state}});
	}

	GlobalModel.prototype.isEaten = function(){
		this.notify({cmd:''});
	}

	GlobalModel.prototype.isMoving = function(direction){
		this.notify({cmd:'isMoving', val: {direction: direction}});
		this.player.direction = direction;
	}

	GlobalModel.prototype.updateAllPos = function(newPos){
		/*
		* newPos will be an object :
		*	newPos = { player.id :  {pos: player.pos, direction: player.direction}, ... }
		*
		*	previousPos = { this.players.id :  {prevPos: player.pos, prevDirection: player.direction}, ... }
		*/
		this.notify({cmd:'updatePos', val: {pos: {old: previousPos, current: newPos}}});
		for (key in newPos){
			if (typeof newPos[key] === 'object'){
				this.players[key].direction = newPos[key].direction;
				this.players[key].pos = newPos[key].pos;
			}
		}
	}

	GlobalModel.prototype.deplacer = function(dir){
		this.notify({cmd: 'dir', val: dir});
	}

	GlobalModel.prototype.setPlayer = function(playerId){
		this.playerId = playerId;
		return this;
	}
	GlobalModel.prototype.setAllPlayer = function(playersTb){
		for (var i = otherTb.length - 1; i >= 0; i--) {
			this.players[playersTb[i].id] = playersTb[i];
		};
		return this;
	}
	GlobalModel.prototype.loaded = function(){
		this.notify({cmd: 'loaded'});
	}



	GlobalModel.prototype.checkKey = function(key){
		if (localStorage[key] === undefined){
			return key;
		}else{
			key = this.keyGenerator();
			this.checkKey(key);
		}
	}

	GlobalModel.prototype.keyGenerator = function(array,idLengh){
		var array = array || '';
		var idLength = idLength || 20;
		var baseKey = { 
			'1': '0123456789',
			'2': 'abcdefghijklmnopqrstuvwxyz',
			'3': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'4': '_-/*+#!%$£:;?,§=|~&'
		}
		var alpha = '';
		if (array !== ''){
			for (var i = 0; i < array.length; i++){
				console.log(baseKey[array[i]]);
				alpha += baseKey[array[i]];
			}
		}else{
			alpha = baseKey[1] + baseKey[2] + baseKey[3] + baseKey[4]
		}
		var table = [];
		var key ='';
		for(var letter in alpha){
			table.push(alpha[letter]);
		}
		table = this.shuffle(table);
		var j = 0;
		for (var i = 0; i < idLength; i++){
			j = j < table.length ? j : 0;
			key += table[j];
			j++
		}
		key = this.checkKey(key);
		return key;
	}

	GlobalModel.prototype.shuffle = function(array) {
	  var currentIndex = array.length;
	  var temporaryValue;
	  var randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

  return array;
}


	return GlobalModel;
}).call(this);
app.views.GlobalView = (function(){
	var Observable = app.libs.Observable;
	function GlobalView(model){
		Observable.call(this);
		this.model = model;
		this.init();
	}

	GlobalView.prototype = Object.create(Observable.prototype);
	GlobalView.prototype.constructor = GlobalView;
	GlobalView.prototype.init = function(){
		var elem = document;
		this.addListeners(elem,'click');
		this.addListeners(document, 'DOMContentLoaded');
	};

	GlobalView.prototype.updateGlobalInfo = function(keys){
		for (key in keys){
			if (document.getElementById(key)){
				var elem = document.getElementById(key)
				elem.innerHTML = this.model[key].toString() + keys[key].symb.toString();
			}
		}
	}

	GlobalView.prototype.addListeners = function(elem,onEvent){
		elem.addEventListener(onEvent, function(event){
			event.preventDefault();
			if (event.target.id){
				var value = {};
				if (event.target.parentNode.getElementsByTagName('input')){
					values = event.target.parentNode.getElementsByTagName('input');
					var length = values.length;
					for (var val =0; val < length; val++){
						value[values[val].id] = values[val].value;
					}
				}
				this.notify({cmd: event.target.id, on: onEvent, val: value});
			}else if(onEvent === 'DOMContentLoaded'){
				this.notify({cmd: 'document', on: onEvent, val: value});
			}
		}.bind(this))
	}

	GlobalView.prototype.update = function(event){
		console.log('global : event received : ' + event.cmd);
		}
		if (event.cmd === 'eventName'){
			// DO SOMETHING...
		}

	};
	return GlobalView;
}).call(this);
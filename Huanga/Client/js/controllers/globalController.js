app.controllers.GlobalController = (function() {
    'use strict';

    function GlobalController(model, view) {
        this.model = {
            [model.name]: model
        };
        this.view = {
            [view.name]: view
        };
        this.intervals = {};
    };
    /*
     *
     * A Controller can have as many model as you want/need
     *
     */
    GlobalController.prototype.addModel = function(model) {
        this.model[model.name] = model;
        return this;
    };
    /*
     *
     * A Controller can have as many view as you want/need
     *
     */
    GlobalController.prototype.addView = function(view) {
        this.view[view.name] = view;
        return this;
    };
    /*
     *
     * And so you might need to remove them at some time
     *
     */
    GlobalController.prototype.removeModel = function(model) {
        delete this.model[model.name];
        return this;
    };
    /*
     *
     * And so you might need to remove them at some time
     *
     */
    GlobalController.prototype.removeView = function(view) {
        delete this.view[view.name];
        return this;
    };
    /*
     *
     * set the list of parameters ('ids') that will be used as values
     * during function call
     *
     */
    GlobalController.prototype.fillIds = function(event) {
        if (typeof(event) !== 'undefined') {
            var array = event.split('_');
            var aL = array.length;
            var data = [];
            for (var i = 1; i < aL; i++) {
                data.push(array[i]);
            }
            return data;
        } else {
            return [];
        }
    };
    /*
     *
     * set the first part of the function name that will be call later
     *
     */
    GlobalController.prototype.setName = function(cmd) {
        if (typeof(cmd) !== 'undefined') {
            var cmds = cmd.split(' ');
            var array = [];
            var cL = cmds.length;
            for (var i = 0; i < cL; i++){
                var newCmd = cmds[i].split('_')[0].split('-');
                if (newCmd.indexOf('any') === -1){
                    array[i] = [];
                    array[i].push(newCmd);
                }
            }
            var aL = array.length;
            var data = [];

            for (var i = 0; i < aL; i++) {
                data[i] = data[i] || [];
                var aiL = array[i].length;
                for (var j = 0; j < aiL; j++) {
                data[i].push(array[i][j][0]);
                    var aijL = array[i][j].length;
                    for (var k = 1; k < aijL; k++){
                        data[i][j] += (array[i][j][k].charAt(0).toUpperCase() + array[i][j][k].substring(1));
                    }
                }
            }
            return data;
        } else {
            return [];
        }
    };
    /*
     *
     *
     * update will catch all notify() from any view(s) that have this controller attached
     * the controller will then use information send from the view to automaticaly call the
     * function needed if already defined, else it will do nothing
     *
     *
     */
    GlobalController.prototype.update = function(event) {
        var on = event.on ? event.on.charAt(0).toUpperCase() + event.on.substring(1) : "";
        var cmd = this.setName(event.cmd);
        var val = {
            data: event.val,
            target: event.target,
            id: this.fillIds(event.cmd)
        };
        var fn = [];
        var cmdL = cmd.length;
        for (var i = 0; i < cmdL; i++){
            fn.push(cmd[i] + on + 'Action');
        }
        //console.log(val);
        //
        //
        // You should keep 'console.log(fn);' during developpment process as it will give you
        // the right syntax for your functions name! (So you'll just have to copy/past it into your code ;-) )
        console.log('list of function: ', fn);
        //
        //
        var fnL = fn.length;
        for (var i = fnL - 1; i >= 0; i--) {
            // console.log(fn[i], typeof this[fn[i]] === 'function');
            if (typeof this[fn[i]] === 'function') {
                this[fn[i]](val);
            }
        };
    };
    /*
     *
     * documentDOMContentLoadedAction() is the sole mandatory function of the controller as it will
     * allow the call of all the listener that need the DOM to be loaded first
     * but you can add extra calls towards models here if they don't need it!
     *
     */
    GlobalController.prototype.documentDOMContentLoadedAction = function() {
        // this call (this.view['GlobalView'].activateListeners();)
        // is mandatory as it will allow the activations of all
        // the orther listeners that MUST wait for the whole DOM to be loaded
        // leave it at the end if you need to put other call from there
        setTimeout(function() {
            this.model['GlobalModel'].completeInit();
        }.bind(this),150);
    };

    return GlobalController;
}).call(this);

//////////////////////////////////////////
//////////////////////////////////////////
/*
 *
 * For maintenance purpose I suggest you to add your custom methods
 * pass this point or in another file using this syntax:
 *
 * app.controllers.NameOfController.prototype.elmentEventAction = function() {};
 *
 * REMEMBER IF YOU WANT YOU CAN REDEFINE A PROTOTYPE, BUT IT WILL OVERRIDE THE PREVIOUS ONE!!!
 * so make sure of what you are up to before doing so!! 
 *
 */
//////////////////////////////////////////
//////////////////////////////////////////

	app.controllers.GlobalController.prototype.documentDOMContentLoadedAction = function(){
		//DO SOMETHING...
        this.model['FormModel'].setForm('radioForm');
		this.view['GlobalView'].activateListeners();
		this.model['GlobalModel'].loaded();
	}
	
	app.controllers.GlobalController.prototype.upButtonTouchstartAction = function(){
		this.model['GlobalModel'].changeImage('upButton', 'pressed');
        clearInterval(this.intervals['move']);
        this.intervals['move'] = setInterval(function(){this.documentKeydownAction({data: 38})}.bind(this),50);
	}
	
	app.controllers.GlobalController.prototype.upButtonTouchendAction = function(){
		this.model['GlobalModel'].changeImage('upButton', 'released');
        clearInterval(this.intervals['move']);
	}
	
	app.controllers.GlobalController.prototype.downButtonTouchstartAction = function(){
		this.model['GlobalModel'].changeImage('downButton', 'pressed');
        clearInterval(this.intervals['move']);
        this.intervals['move'] = setInterval(function(){this.documentKeydownAction({data: 40})}.bind(this),50);
	}
	
	app.controllers.GlobalController.prototype.downButtonTouchendAction = function(){
		this.model['GlobalModel'].changeImage('downButton', 'released');
        clearInterval(this.intervals['move']);
	}
	
	app.controllers.GlobalController.prototype.leftButtonTouchstartAction = function(){
		this.model['GlobalModel'].changeImage('leftButton', 'pressed');
        clearInterval(this.intervals['move']);
        this.intervals['move'] = setInterval(function(){this.documentKeydownAction({data: 37})}.bind(this),50);
	}
	
	app.controllers.GlobalController.prototype.leftButtonTouchendAction = function(){
		this.model['GlobalModel'].changeImage('leftButton', 'released');
        clearInterval(this.intervals['move']);
	}
	
	app.controllers.GlobalController.prototype.rightButtonTouchstartAction = function(){
		this.model['GlobalModel'].changeImage('rightButton', 'pressed');
        clearInterval(this.intervals['move']);
        this.intervals['move'] = setInterval(function(){this.documentKeydownAction({data: 39})}.bind(this),50);
	}
	
	app.controllers.GlobalController.prototype.rightButtonTouchendAction = function(){
		this.model['GlobalModel'].changeImage('rightButton', 'released');
        clearInterval(this.intervals['move']);
	}
    
    app.controllers.GlobalController.prototype.upButtonMousedownAction = function(){
        this.model['GlobalModel'].changeImage('upButton', 'pressed');
        clearInterval(this.intervals['move']);
        this.intervals['move'] = setInterval(function(){this.documentKeydownAction({data: 38})}.bind(this),50);
    }
    
    app.controllers.GlobalController.prototype.upButtonMouseupAction = function(){
        this.model['GlobalModel'].changeImage('upButton', 'released');
        clearInterval(this.intervals['move']);
    }
    
    app.controllers.GlobalController.prototype.downButtonMousedownAction = function(){
        this.model['GlobalModel'].changeImage('downButton', 'pressed');
        clearInterval(this.intervals['move']);
        this.intervals['move'] = setInterval(function(){this.documentKeydownAction({data: 40})}.bind(this),50);
    }
    
    app.controllers.GlobalController.prototype.downButtonMouseupAction = function(){
        this.model['GlobalModel'].changeImage('downButton', 'released');
        clearInterval(this.intervals['move']);
    }
    
    app.controllers.GlobalController.prototype.leftButtonMousedownAction = function(){
        this.model['GlobalModel'].changeImage('leftButton', 'pressed');
        clearInterval(this.intervals['move']);
        this.intervals['move'] = setInterval(function(){this.documentKeydownAction({data: 37})}.bind(this),50);
    }
    
    app.controllers.GlobalController.prototype.leftButtonMouseupAction = function(){
        this.model['GlobalModel'].changeImage('leftButton', 'released');
        clearInterval(this.intervals['move']);
    }
    
    app.controllers.GlobalController.prototype.rightButtonMousedownAction = function(){
        this.model['GlobalModel'].changeImage('rightButton', 'pressed');
        clearInterval(this.intervals['move']);
        this.intervals['move'] = setInterval(function(){this.documentKeydownAction({data: 39})}.bind(this),50);
    }
    
    app.controllers.GlobalController.prototype.rightButtonMouseupAction = function(){
        this.model['GlobalModel'].changeImage('rightButton', 'released');
        clearInterval(this.intervals['move']);
    }

	app.controllers.GlobalController.prototype.documentKeydownAction = function(val) {
		// On récupère le code de la touche
        console.log(val);
		switch(val.data) {
			case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
				console.log('ok');
                this.model['GlobalModel'].deplacer('top');
				break;
			case 40 : case 115 : case 83 : // Flèche bas, s, S
				this.model['GlobalModel'].deplacer('bottom');
				break;
			case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
				this.model['GlobalModel'].deplacer('left');
				break;
			case 39 : case 100 : case 68 : // Flèche droite, d, D
				this.model['GlobalModel'].deplacer('right');
				break;
			default : 
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
		
		return false;
	}
    app.controllers.GlobalController.prototype.applyResoClickAction = function(val){
        this.model['GlobalModel'].setResolution(val.data.reso[0]);
    }
    app.controllers.GlobalController.prototype.changeResolutionAction = function(val){
        var map = this.model['MapModel'];
        var model = this.model['GlobalModel'];
        for (var i = 0; i < teams.length; i++){
            teams[i].setImage(Pics.teamsPics[i] + val.data + '.png');
        }
        canvas.setAttribute('width', (val.data*16));
        canvas.setAttribute('height', (val.data*16));

        for (var i = 0; i < tiles.length; i++) {
            for (key in tiles[i]){ 
                var tile = tiles[i][key];
                var label = tile.name.split('_')[0];
                var type = tile.name.split('_')[1].split('.')[1];
                if (tile.type === 'block'){
                    tile.name = label + '_' + tile.factor * val.data + '.' + type;
                    tile.size = {width: tile.factor * val.data, height: tile.factor * val.data};
                }else{
                    tile.name = label + '_' + val.data + '.' + type;
                    tile.size = {width: val.data, height: val.data};
                }
                console.log(tile.name);
            }
        };
        map.setMapTilesList(tiles);
        map.generateMap();
        model.canvasBgArray = this.view['GlobalView'].drawCanvas(model.activeMap);
        setTimeout(function(){model.player.drawCurrentArena()},500);
        ;
    }
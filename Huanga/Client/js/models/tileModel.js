app.models.TileModel = (function(){
	function TileModel(){
		this.imageSrc = '';
		this.val = '';
		this.image = '';
		this.isBlock = true;
		this.pos = {x: 0,y: 0};
		this.size = {width: 0,height: 0};
		this.factor = 1;
		this.canDraw = true;
		this.direction = {top: false, bottom: true, left: false, right: false};
	}

	TileModel.prototype.setPosition = function(pos){
		this.pos.x = pos.x || this.pos.x;
		this.pos.y = pos.y || this.pos.y;
	}

	TileModel.prototype.setImage = function(image){
		this.image = this.imageSrc + image;
		return this;
	}
	TileModel.prototype.getImage = function(){
		return this.image;
	}
	TileModel.prototype.setImageSrc = function(path){
		this.imageSrc = path;
		return this;
	}
	TileModel.prototype.getImageSrc = function(){
		return this.imageSrc;
	}
	TileModel.prototype.setSize = function(size){
		this.size.width = size.width || this.size.width;
		this.size.height = size.height || this.size.height;
		return this;
	}
	TileModel.prototype.getSize = function(){
		return this.size;
	}
	TileModel.prototype.setIsBlock = function(bool){
		this.isBlock = bool || false;
		return this;
	}
	TileModel.prototype.getIsBlock = function(){
		return this.isBlock;
	}
	TileModel.prototype.setFactor = function(factor){
		this.factor = factor || 1;
		return this;
	}
	TileModel.prototype.getFactor = function(){
		return this.factor;
	}



	return TileModel;
}).call(this);
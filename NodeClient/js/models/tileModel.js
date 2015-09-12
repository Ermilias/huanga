app.models.TileModel = (function(){
	function TileModel(){
		this.imageSrc = './image/';
		this.image = 'imageName.png';
		this.isBlock = false;
		this.pos = {x: 0,y: 0};
		this.size = {width: 0,height: 0};
		this.direction = {top: false, bottom: true, left: false, right: false};
	}

	TileModel.prototype.setPosition = function(pos){
		this.pos.x = pos.x || this.pos.x;
		this.pos.y = pos.y || this.pos.y;
	}

	TileModel.prototype.setImage = function(image){
		this.image = image;
	}
	TileModel.prototype.getImage = function(){
		return this.image;
	}
	TileModel.prototype.setSize = function(size){
		this.size.width = size.width || this.size.width;
		this.size.height = size.height || this.size.height;
	}
	TileModel.prototype.getSize = function(){
		return this.size;
	}



	return TileModel;
}).call(this);
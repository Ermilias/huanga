app.models.ImageModel = (function(){
	function ImageModel(){
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

	ImageModel.prototype.setPosition = function(pos){
		this.pos.x = pos.x || this.pos.x;
		this.pos.y = pos.y || this.pos.y;
	}

	ImageModel.prototype.setImage = function(image){
		this.image = this.imageSrc + image;
		return this;
	}
	ImageModel.prototype.getImage = function(){
		return this.image;
	}
	ImageModel.prototype.setImageSrc = function(path){
		this.imageSrc = path;
		return this;
	}
	ImageModel.prototype.getImageSrc = function(){
		return this.imageSrc;
	}
	ImageModel.prototype.setSize = function(size){
		this.size.width = size.width || this.size.width;
		this.size.height = size.height || this.size.height;
		return this;
	}
	ImageModel.prototype.getSize = function(){
		return this.size;
	}
	ImageModel.prototype.setIsBlock = function(bool){
		this.isBlock = bool || false;
		return this;
	}
	ImageModel.prototype.getIsBlock = function(){
		return this.isBlock;
	}
	ImageModel.prototype.setFactor = function(factor){
		this.factor = factor || 1;
		return this;
	}
	ImageModel.prototype.getFactor = function(){
		return this.factor;
	}



	return ImageModel;
}).call(this);